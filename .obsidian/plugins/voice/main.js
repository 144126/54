const { Plugin, MarkdownView, Notice, requestUrl } = require("obsidian");
const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 8081;
const WAV = path.join(os.tmpdir(), "obsidian-voice.wav");
const TIMEOUT_MS = 1_620_000;
const STOP_GRACE_MS = Number(process.env.PI_VOICE_STOP_GRACE_MS) || 3000;
const PI_MODELS = path.join(os.homedir(), ".pi/agent/models.json");
const MODEL = "xai.grok-4.6";
const CONTEXT_CHARS = 3000;

const PROMPT = `You turn a raw speech-to-text transcript into clean written notes in Markdown.

Rules:
- Keep every idea, detail, fact, number, name, example, doubt and nuance. Losing or softening anything is the worst failure. When unsure, keep it.
- Remove only noise: filler (um, uh, like, you know), false starts, repeats, and stutters.
- When the speaker corrects themselves ("blue, no wait, green"), keep only the corrected version.
- Fix grammar, punctuation, and words the speech-to-text clearly misheard. Use the note context to spell names and terms right.
- Structure it so it reads well: short paragraphs, and headings or bullet lists where the content has clear parts or items. Keep a short thought as plain sentences. Match the style of the note.
- Keep the speaker's own voice, words and point of view. Do not add ideas, advice, summaries, or answers to questions they ask.
- Output only the cleaned text. No preamble, no code fences, no title unless the content needs one.`;

function post_wav(buf) {
	return new Promise((resolve, reject) => {
		const req = http.request(
			{
				hostname: HOST,
				port: PORT,
				path: "/",
				method: "POST",
				headers: { "Content-Length": buf.length },
				timeout: TIMEOUT_MS,
			},
			(res) => {
				const chunks = [];
				res.on("data", (c) => chunks.push(c));
				res.on("end", () => {
					const text = Buffer.concat(chunks).toString("utf8").trim();
					if (res.statusCode !== 200) reject(new Error(text || "STT " + res.statusCode));
					else resolve(text);
				});
			},
		);
		req.on("timeout", () => {
			req.destroy();
			reject(new Error("timeout"));
		});
		req.on("error", reject);
		req.end(buf);
	});
}

function mantle() {
	const p = JSON.parse(fs.readFileSync(PI_MODELS, "utf8")).providers["amazon-bedrock-mantle"];
	const key = p.apiKey.startsWith("$") ? process.env[p.apiKey.slice(1)] : p.apiKey;
	if (!key) throw new Error(p.apiKey + " not set");
	return { url: p.baseUrl + "/chat/completions", key };
}

async function refine(text, title, context) {
	const m = mantle();
	const res = await requestUrl({
		url: m.url,
		method: "POST",
		headers: { Authorization: "Bearer " + m.key, "Content-Type": "application/json" },
		body: JSON.stringify({
			model: MODEL,
			reasoning_effort: "low",
			messages: [
				{ role: "system", content: PROMPT },
				{
					role: "user",
					content: `Note title: ${title}\n\nNote text before the cursor (context only, do not repeat it):\n<context>\n${context}\n</context>\n\nTranscript to clean up:\n<transcript>\n${text}\n</transcript>`,
				},
			],
		}),
		throw: false,
	});
	if (res.status !== 200) throw new Error("grok " + res.status + " " + res.text.slice(0, 200));
	const out = res.json.choices[0].message.content.trim();
	if (!out) throw new Error("grok returned nothing");
	return out;
}

function fmt(ms) {
	const s = Math.floor(ms / 1000);
	return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

module.exports = class VoicePlugin extends Plugin {
	onload() {
		this.sox = null;
		this.recording = false;
		this.jobs = 0;
		this.bar = this.addStatusBarItem();
		this.bar.style.cursor = "pointer";
		this.bar.onclick = () => this.recording && this.stop(this.mode);
		this.addCommand({
			id: "raw",
			name: "Record, then add raw words",
			hotkeys: [{ modifiers: ["Ctrl"], key: "E" }],
			callback: () => this.toggle("raw"),
		});
		this.addCommand({
			id: "refine",
			name: "Record, then add cleaned-up notes (Grok)",
			hotkeys: [{ modifiers: ["Ctrl"], key: "R" }],
			callback: () => this.toggle("refine"),
		});
		this.addCommand({
			id: "cancel",
			name: "Cancel recording",
			checkCallback: (check) => {
				if (!this.recording) return false;
				if (!check) this.cancel();
				return true;
			},
		});
	}

	onunload() {
		this.kill();
		clearInterval(this.tick);
	}

	show() {
		if (this.recording) {
			const label = this.mode === "refine" ? "clean" : "raw";
			this.bar.setText(`🔴 ${fmt(Date.now() - this.t0)} ${label} · Ctrl+E raw / Ctrl+R clean`);
		} else this.bar.setText(this.jobs ? "⏳ voice working…" : "");
	}

	toggle(mode) {
		if (this.recording) this.stop(mode);
		else this.start(mode);
	}

	start(mode) {
		try {
			fs.unlinkSync(WAV);
		} catch {}
		this.sox = spawn(
			"sox",
			["--buffer", "1024", "-d", "-r", "16000", "-c", "1", "-b", "16", WAV],
			{ stdio: "ignore", detached: true },
		);
		this.sox.unref();
		this.recording = true;
		this.mode = mode;
		this.t0 = Date.now();
		this.tick = setInterval(() => this.show(), 1000);
		this.show();
		this.sox.on("error", (err) => {
			this.sox = null;
			this.end_rec();
			new Notice("voice record failed: " + err.message);
		});
		this.sox.on("exit", () => {
			this.sox = null;
		});
	}

	end_rec() {
		this.recording = false;
		clearInterval(this.tick);
		this.show();
	}

	kill() {
		if (!this.sox) return;
		try {
			this.sox.kill("SIGINT");
		} catch {}
	}

	wait_exit() {
		return new Promise((resolve) => {
			const start = Date.now();
			const tick = () => {
				if (!this.sox || Date.now() - start > 2000) {
					if (this.sox) {
						try {
							this.sox.kill("SIGKILL");
						} catch {}
						this.sox = null;
					}
					resolve();
					return;
				}
				setTimeout(tick, 50);
			};
			tick();
		});
	}

	async cancel() {
		this.end_rec();
		this.kill();
		await this.wait_exit();
		new Notice("recording thrown away");
	}

	place(mode) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view || !view.file) return null;
		const ed = view.editor;
		const ph = `⏳voice-${Date.now()}⏳`;
		const cur = ed.getCursor();
		const line = ed.getLine(cur.line);
		const before = ed.getRange({ line: 0, ch: 0 }, cur).slice(-CONTEXT_CHARS);
		let pre = " ";
		if (mode === "refine") pre = line.trim() === "" ? "" : "\n\n";
		else if (cur.ch === 0 || /\s$/.test(line.slice(0, cur.ch))) pre = "";
		ed.replaceSelection(pre + ph);
		return { file: view.file, ph, before };
	}

	async put(slot, text) {
		for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
			const v = leaf.view;
			if (v.file !== slot.file) continue;
			const i = v.editor.getValue().indexOf(slot.ph);
			if (i < 0) continue;
			v.editor.replaceRange(text, v.editor.offsetToPos(i), v.editor.offsetToPos(i + slot.ph.length));
			return;
		}
		let found = false;
		await this.app.vault.process(slot.file, (s) => {
			found = s.includes(slot.ph);
			return found ? s.replace(slot.ph, text) : s + "\n\n" + text;
		});
		if (!found) new Notice("placeholder was gone, added at the end of " + slot.file.basename);
	}

	async stop(mode) {
		this.end_rec();
		const slot = this.place(mode);
		if (!slot) new Notice("no note focused — will copy the text to the clipboard");
		this.jobs++;
		this.show();
		try {
			await new Promise((r) => setTimeout(r, STOP_GRACE_MS));
			this.kill();
			await this.wait_exit();
			let size = 0;
			try {
				size = fs.statSync(WAV).size;
			} catch {}
			let text = size > 44 ? await post_wav(fs.readFileSync(WAV)) : "";
			if (text && mode === "refine") {
				try {
					text = await refine(text, slot ? slot.file.basename : "", slot ? slot.before : "");
				} catch (err) {
					new Notice("clean-up failed, added raw words instead: " + err.message, 10000);
				}
			}
			if (!text) new Notice("no speech");
			if (!slot) {
				if (text) {
					await navigator.clipboard.writeText(text);
					new Notice("copied to clipboard");
				}
				return;
			}
			await this.put(slot, text && mode === "refine" ? text + "\n" : text);
		} catch (err) {
			new Notice("voice failed: " + (err && err.message ? err.message : err), 10000);
			if (slot) await this.put(slot, "");
		} finally {
			this.jobs--;
			this.show();
		}
	}
};
