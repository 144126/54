# animators-hive-hub — every flaw found

reviewed 2026-10-06 · repo `~/i/edahogan/animators-hive-hub` · commit 86c79d8 · public fork github.com/144126/animators-hive-hub
"(live)" = reproduced on the dev server at :8080.

verdict: the sveltekit conversion is not shippable. sessions are forgeable, upvotes and most uploads 500, videos never upload, and the vectorize-only store loses data.

## critical

1. (live) session secret is public. `ahh-session-9f3c2e1a7b84d056` is in `wrangler.jsonc:13`, as fallback in `src/lib/server/session.ts:7`, and in `.dev.vars`; e32621d pushed it to the public fork. user ids leak in every api response (`author_id`, `user_id`, `creator_id`), so anyone can mint a cookie for any user. a forged cookie returned the test account and its email.
2. (live) upvoting is fully broken. vote id `v:<uuid>:<uuid>` is 75 bytes, vectorize max is 64 → `VECTOR_GET_ERROR (code = 40008): id too long; max is 64 bytes, got 75 bytes` (`src/routes/api/upvotes/+server.ts:6`). every card's vote check also 500s for signed-in users.
3. (live) uploads without a custom thumbnail fail. the auto thumbnail is a full-size jpeg data url (`src/lib/upload.ts:7-14`) stored in metadata, limit 10 KiB → `VECTOR_UPSERT_ERROR (code = 40016): oversized metadata … must not exceed 10240 bytes`. long titles, descriptions and comments hit the same 500.
4. videos never upload. `video_url` is a `blob:` url (`src/lib/upload.ts:22`); only the uploader's open tab can play it. everyone else, and the uploader after reload, gets a dead player. same for custom thumbnails. the toast still says "uploaded successfully".
5. (live) the feed loses content. every create rewrites one shared id list (`cat_add`, `src/lib/server/db.ts:63`). 5 parallel uploads left 1 of 6 animations in the feed; the other 5, including one already listed, vanished for good.
6. (live) new data is invisible for ~20 s (vectorize writes are async). after sign-up `/api/me` returned `null` for 20 s, so new users get `401 sign in required` on every action (a second test user got 401 at 6 s). new animations, comments and playlists don't show after posting, so people re-post.
7. (live) duplicate usernames. 2 parallel sign-ups, and 2 sign-ups 5 s apart, with the same username all succeeded.
8. hard ceiling. each shared list (`cat:a/n/l/i/c`) packs all ids into one 10 KiB field → ~276 ids. after ~276 animations, comments, playlists, items or communities site-wide, every new one 500s forever and leaves orphan rows.
9. not live anywhere. worker `animators-hive-hub` doesn't exist on the cloudflare account (api 10007), push to origin is 403, so the conversion only lives on the public fork; edahogan's repo is still the react+supabase app.
10. old data dropped. the index held 0 vectors before testing. (checked later: the old supabase project `yuewubncxzqopejwmqrf` returns NXDOMAIN, so there is nothing left to migrate.)

## high

11. (live) any signed-in user can add items to anyone's playlist, and to playlists/animations that don't exist (`src/routes/api/playlist-items/+server.ts:5`).
12. (live) comments on nonexistent posts are accepted (`src/routes/api/comments/+server.ts:35`).
13. every sign-up sends the user's email to google: the embed text falls back to `email` (`src/lib/server/db.ts:30`) and `mail:<email>` ids are embedded too.
14. embeddings are never used (no `query()` anywhere), yet every write calls gemini: sign-up ×3, each vote or comment count change, each list rewrite. gemini down, rate-limited or key missing → every write 500s.
15. sign-up is 3 separate writes (`src/routes/api/auth/signup/+server.ts:27-29`). an email over 59 bytes, or a username of ~20 cjk characters, fails the 64-byte id limit after the user row and `name:` pointer are saved → that username is taken forever by a dead account.
16. vote and comment counts are read-modify-write on stale rows and rewrite the whole row → lost counts and overwritten changes.
17. no rate limiting: sign-in brute force, spam, and every request burns paid gemini calls.
18. sessions: 30-day token with no server revocation (sign-out only deletes the cookie), non-constant-time mac compare (`session.ts:56`), a non-numeric expiry never expires (`session.ts:58`).
19. pbkdf2 at 80,000 iterations (`session.ts:14`) vs owasp's 600,000; workers caps pbkdf2 at 100,000. 80k took 32 ms in node on this laptop, so it likely exceeds the free plan's 10 ms cpu limit (error 1102).
20. the dev server listens on all interfaces (lan 192.168.1.2, vpn 10.8.0.11) and writes to the only (production) index with the public secret; there is no separate dev index.
21. `tmp/CP Lecturer Guide v1.1.pdf` (ncc education, "must not be reproduced") and `tmp/Project Work.docx` (student name + id P0013366) are published in both public repos.

## medium — features and ux

22. feed, profile and community pages show at most 20 items, no paging; each feed load reads every animation (with 768 floats each) plus ~40 lookups.
23. comments, playlists and playlist items load every row in the site on each view, then one lookup per row.
24. the playlist page fetches `/api/playlists/[id]` twice (`src/lib/data.ts:57-65`).
25. posts are dead: no create endpoint, so `/api/posts`, `/post/[id]`, PostCard and PostDetailView never show anything; the feed still calls `/api/posts` whenever it's empty.
26. nothing can be edited or deleted (animations, comments, playlists, items, communities, account); no password reset or change; no email verification.
27. no public profiles (only your own `/profile`); author names aren't links; location and website are saved but never shown; avatar can't be set, yet the edit page says it's "managed through your authentication provider".
28. communities: member count is always 1, no join; non-latin names slug to "" (unreachable `/c/`, all collide); names over 58 chars 500.
29. no server-side checks of lengths, username characters, email format, or url schemes (`website_url`, `video_url`, `thumbnail_url` accept anything, including `javascript:` and tracking urls).
30. the upload modal says "uploading…" though nothing uploads; the 50 mb limit is meaningless; object urls are never revoked; no timeout if the video seek never fires; your profile grid doesn't refresh after upload.
31. ssr (read from code, not observed): `auth()` keeps module-level `$state` on the server and calls `fetch('/api/me')` with a relative url, which fails there → after the first request the server renders the logged-out landing page for everyone, then the client flips to a spinner. all data loads in `$effect`, so ssr is spinners only; hooks know the user but don't pass it, so every page also calls `/api/me`.
32. every request with a cookie does a database lookup (`src/hooks.server.ts:9`).
33. on phones the nav is `hidden md:flex` with no menu, so communities can't be reached (`src/components/Header.svelte:26`).
34. landing and edit-profile pages draw a second header under the global one; landing and playlist pages have two `<h1>`s.
35. race-prone ui: the community picker fetches on every keystroke with no debounce or order guard and loses its label when you search again; switching new/top fast can show the wrong list; detail pages never reset `err`, so one failed load sticks; the detail upvote count stays stale across navigation.
36. missing error handling: the communities page and vote checks use `.then` without `catch` → unhandled rejections and a blank page that looks like "no data".
37. cards show the vote count twice (heart + button) and use a heart for an upvote; the detail upvote button is a bare number; PostCard puts a button inside a link.
38. accessibility: modals have no focus trap, no initial focus, no scroll lock, and escape only works if focus is already inside; the account menu doesn't close on outside click; toasts lack `aria-live`; icon-only back links have no label; the empty `<track kind="captions">` is fake.
39. the name is inconsistent: "animation" (header), "animators hive hub" (title), "the home for animators" (landing), "AI Animator Support Site" (report); no per-page titles.

## low — code and tooling

40. `pnpm lint` fails: prettier flags 38 files (no `.prettierrc`, svelte plugin not loaded, lockfile checked); eslint has 23 errors (21 `svelte/no-navigation-without-resolve`, unused `path` in `eslint.config.js:2`, 1 `prefer-writable-derived`).
41. svelte-check: 3 `state_referenced_locally` warnings (`UpvoteButton.svelte:17`, `AnimationDetailView.svelte:15`, `AuthModal.svelte:7`).
42. no tests at all.
43. dead code and files: `need_user`, `PostRow`, `auth().session`, `App.Platform.caches`, `export { parse }` in `session.ts`, `static/placeholder.svg`, the whole `supabase/` folder, supabase keys in `.env`.
44. duplication: vectorize types in both `app.d.ts` and `db.ts`; `j()` re-implements sveltekit's `json()`; upvote logic copied into `AnimationDetailView`; every `.btn*` class repeats the same base; dev host/port set in both `package.json` and `vite.config.ts`.
45. deploy gaps: `GEMINI_API_KEY` isn't provisioned for prod; `SESSION_SECRET` is a plain var (shown in the dashboard) instead of a secret; `.node-version` is 22 but dev runs node 24.18.0; `vite preview` doesn't run the worker.
46. `AddToPlaylistModal.svelte:41` matches the leftover postgres text "duplicate key value".
47. metadata indexes k/t/u/n/c exist but nothing queries them.
48. the readme says gemini-embedding-2 is "hosted EmbeddingGemma 2" with no source.

## project report (`tmp/Project Work.docx`)

49. it describes a different system: react + node + firebase (firestore, storage, auth, hosting, oauth 2.0); the code is sveltekit + cloudflare vectorize (before 2026-10-06, react + supabase).
50. it marks as achieved features that don't exist: job board and applications (FR6/FR7), tags/tools (FR3), search/filter (FR4), share (FR5), reporting (FR8), admin moderation (FR9), authenticity badge (FR10), email verification, employer role, ratings, follows.
51. it reports user tests and lighthouse results for those missing features, and the numbers disagree (2.2 s / 94% / 91% vs 2.1 s / 96% / 89%); "an impressive 34 points" is a poor lighthouse score.
52. leaked chatbot token in the authenticity section: "…throughout the paper.<|human|>Checking of Authenticity…", after an off-topic definition of research authenticity.
53. too short: ~4,400 body words vs the required 6,000 ± 500; the abstract is 218 words vs 150–200.
54. missing required parts per the ncc guide: implementation chapter, architecture, any real diagram (the file has zero images), gantt chart, risk and configuration management, test scripts, appendices, lists of figures and tables.
55. "overview of the remaining chapters" promises chapters 4–8 and appendices that aren't there; numbering skips (1, 4, 5; "2.1/2.2" with no 2).
56. the conclusion's "summary" is a word-for-word copy of "summary of analysis", including "will be described further in the following chapters" and "tested and tested".
57. citations don't match references: mckinsey 2018 (list says 2017), banks 2020 (list: banks & deuze 2009); oxford economics 2020, smith and zhou 2022, gielen and neff 2021 aren't listed; elgammal et al. 2017 is listed but never cited.
58. garbled text: "talenty", "feed back", "The content can be an Admin moderate.", "changing friends", "crowdfunding the talent", a repeated firestore sentence.
59. the platform name "AI Animator Support Site" sounds pro-ai, the opposite of the thesis.

## leftovers from the review

- the probe left 30 test vectors in vectorize index `ahh` (6 `flawtest` users, 6 animations, 1 comment, 1 playlist, 2 items, 4 `cat:*` lists); the auto-mode classifier blocked deleting them. race ids are in `/tmp/claude-1000/-home-ed/a34f1ce6-c77c-47ea-b44b-0e34993ee751/scratchpad/live/race_ids.txt`.
- `CLOUDFLARE_API_TOKEN` in the shell gets `Authentication error [code: 10000]` on vectorize; run wrangler with `env -u CLOUDFLARE_API_TOKEN` to use the oauth login.
