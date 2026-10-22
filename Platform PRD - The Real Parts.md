# Platform PRD: only the real parts

Source: `~/Downloads/Pilotspan AI Platform PRD (2).pdf` (15 pages, 4,608 words).

This is the source that the two test docs copy from. It is the least bloated of the three. It is still about 75% fluff.

## Verdict

**About 25% is useful (~1,100 words).**

- About 40% is sales talk, not requirements: executive overview, vision, "differentiators", user table, packaging, conclusion. None of it can be built or tested.
- Another 15% repeats itself: risks table, launch checklist, and next steps restate rules already in section 9.
- The real content is: 57 numbered requirements, the tier table, the pass marks, the document fields, and the build order. They are below.

## What it is

An AI helper inside every Pilotspan screen for home health and hospice agencies. It finds screens, answers policy questions with sources, ranks work, drafts notes, explains billing, drafts messages, and writes boss briefs. A human approves anything risky.

## How it should be built (one idea)

The AI only understands the request. Plain Pilotspan services check the rules and do the work. The AI never answers policy from memory. Search comes first, with filters, then the answer.

## The one rule table (the 5 tiers)

| Tier | What | Rule |
|---|---|---|
| 0 | Info ("where is the billing report?") | Answer by itself, with a link or source |
| 1 | Draft (a message, a summary) | Draft only. User reviews before use |
| 2 | Suggest work (rank the claims queue) | Explain why. User approves the action |
| 3 | Prepare something big (claim fix, OASIS/HOPE package) | Rule checks plus human approval |
| 4 | Diagnose, make clinical decisions, submit claims, message patients, change orders | **Never** |

## What it must do (57 requirements, one line per area)

- **Navigator (8):** an AI button everywhere; knows page, role, customer, record; gives link, steps, button; guided mode; says why a feature is hidden; searches help with citations; sends unsupported asks to support; voice and text.
- **Policy (9):** ingest documents; no answers until owner, version, date, scope, approval exist; approved sources only, with title, section, version, date; agency policy beats generic content; warns on conflict or old sources; checklist and link; impact list on a new manual; reminds owners; locked answer records.
- **Work queue (7):** a ranked list by role; says why; action buttons; catches missing steps; risky actions need approval; agencies can change ranking; tracks result and feedback.
- **Notes (8):** draft from clinician input; pre-visit summary; missing parts found by rules first; no invented findings; flags odd data; clinician signs; full trail kept; templates work if AI is down. Drafts are labeled "draft".
- **Billing (7):** explain holds; claim-ready checklist; denial patterns; fix plans; payer advice only from current sources; never submit, adjust, write off, or appeal alone; money estimates show data and confidence.
- **Compliance (7):** find exceptions; fix checklist; audit packets; policy changes show impact; track fixes to closure; flag "unsure"; "Ask Compliance" with ready summary.
- **Messages (6):** drafts; tone and language; user reviews before send; call summaries; link to record; block or warn on patient data over a bad channel.
- **Boss briefs (5):** daily, weekly, monthly; explain changes; drill-down links; facts apart from guesses; benchmarks only with rights and anonymity.

## Security rules (11, all keep)

BAA before any vendor sees patient data. Customers separated at every layer (search, prompts, tools, logs, vectors). Least privilege. Encrypt everything; secrets in one vault. No training on customer data. Audit log of user, tools, sources, proposal, approval, outcome. Human approval for clinical, legal, money, regulatory, outside messages. Documents and emails are data, not orders. Minimum data to models. Model list, release approvals, rollback. Incident plan.

## Pass marks

| What | Target | When |
|---|---|---|
| Permissions, customer separation, banned actions, human review | 100% | Before launch |
| Correct citations | ≥ 95% | Before launch |
| Critical workflow advice | ≥ 95% | Before launch |
| Right screen found | ≥ 85% | Before launch |
| Critical made-up answers | 0 | Before launch |
| Speed | Search < 3 s, answer < 8 s | Before launch (no percentile given) |
| Tasks finished with AI | ≥ 70% | After pilot |
| Task time cut | ≥ 30% | After pilot |
| Helpfulness | ≥ 4.3 / 5 | After pilot |
| Drafts accepted with small edits | ≥ 60% | After pilot |
| Search time cut ≥ 60%. New user under 5 min | | After pilot |
| Fewer support tickets ≥ 20%. Fewer exceptions ≥ 20% in 6 months | | After launch |

## What every document needs

Owner. Source type. Version and effective date. Review date. Status (draft, approved, superseded, retired). Module. State, payer, agency when it applies. Permission class. Citation anchor. Customer ID if it is customer-only.

## Build order

0. Weeks 0–2: governance, gateway, vendor and BAA check, document pipeline, test set.
1. Weeks 2–4: Navigator and cited policy answers in Admin and Home Health web.
2. Weeks 4–10: ranked work queue and rule-based exception checks.
3. Weeks 10–14: notes, billing explanations, message drafts.
4. Weeks 14–20: hospice, mobile voice, cross-platform, boss briefs.
5. "Months 20–22": automation playbooks and benchmarks. (Typo or not? See flaw 1.)

Start with 3 to 5 pilot agencies. Build the gateway, rules, and tests before any clinical or billing AI ships.

## What was cut, and why

| Cut | Why |
|---|---|
| Section 1 overview, 2 vision, "North-Star", differentiators table | Sales talk. No requirement in it. |
| 3.1 goals | Same numbers as 3.2. |
| Section 4 user table (11 roles) | Restates the features per role. |
| 5 principles (10) | 6 repeat the security rules or tiers. The rest are style. |
| 6.1 components table (9) | One idea: the AI asks, services act. |
| 6.2 deployment advice | Covered by the security rules. |
| Example questions and example answer outputs | Illustration. |
| Section 8 platform table | Restates sections 7.x per product. |
| 9.2 NIST and OCR paragraph | Name-dropping. No test or rule comes out of it. |
| 12.3 customer success, 12.4 devops, 13 packaging | Sales and ops, not product requirements. |
| 14 risks table, 15 launch checklist, 16 next steps, 17 conclusion | Each restates the above. |

## Flaws, contradictions, things that don't make sense

1. **The schedule contradicts itself.** Phases 0 to 4 are in weeks (0–2, 2–4, ... 14–20). Phase 5 says "Months 20–22". Either that is a typo for weeks 20 to 22 (two weeks for "controlled automation"), or there is a 15-month gap nobody explains.
2. **The schedule is not believable.** Phase 0 (2 weeks) includes a governance charter, vendor review, BAA, threat model, gateway, document pipeline, and a red-team test set. Phase 1 (2 weeks) ships cited policy answers to real users.
3. **Nothing ranks law above agency policy.** Principle 9 says agency policy governs "whenever it is more specific than general guidance". AI-POL-04 says agency policy beats "generic or external content". Federal and state law is "external content". Read plainly, an agency policy that breaks the law wins. The test docs found this hole (their section 3.1). It is the worst gap in the PRD.
4. **Policy answers have no tier.** The five tiers use examples like "where is the billing report". The main feature, a cited policy or compliance answer, fits no tier. Tier 0 would let it answer alone.
5. **Real features with no requirement number.** Section 4 promises schedule conflict fixes, staffing suggestions, route help, intake and referral summaries, eligibility checklists, therapist and aide help, and internal admin diagnostics. Section 8 promises CRM summaries, integration diagnostics, and payroll reconciliation. None has an `AI-` ID. So none can be traced to a test. The test docs had to invent payroll cover (`AI-X017`).
6. **Rules with no number.** The guardrails in 7.4 (draft label, "ask, don't invent") and the acceptance criteria in 7.1 have no IDs. The security controls in 9.1 have no IDs. The test docs made up their own.
7. **Two pass-mark lists that disagree.** Section 3.2 has 10 KPIs. Section 10.2 has 8 release thresholds. Citation correctness and critical workflow accuracy appear only in 10.2. Helpfulness and completion appear only in 3.2. Goals "60% search time cut" and "new user under 5 minutes" appear only in 3.1. Nobody can say which list gates the launch.
8. **"A defined low threshold" is not defined.** 10.2 says non-critical wrong answers need "a defined low threshold". It gives none. "AI action approval rate" has the target "baseline measured by workflow", which is not a target.
9. **Speed target has no percentile or load.** "Under 3 seconds" and "under 8 seconds" for what share of requests, at what traffic?
10. **Log less vs log everything.** 9.1 says "do not store unnecessary prompt content". AI-DOC-07 says store the original input, every draft, every edit. AI-POL-09 says "immutable" answer records. Retention is never set. "Immutable" and "delete after N years" cannot both hold.
11. **The launch needs a pilot the schedule doesn't have.** The launch checklist says "pilot tenant program completed with acceptance metrics met". Several metrics need up to 6 months after adoption. No phase includes a pilot. Three to five agencies is also too few to prove 70% or 85%.
12. **Broken sentence.** In 6.2 a sentence ends mid-line: "sensitive information must only be used with tools meeting" then a stray bullet "appropriate cybersecurity standards." The CMS claim is also unsourced.
13. **"Version Control" has no version.** The table has no version number, date, author, or change history. Section 16 then asks to approve "V1.0".
14. **The test docs cite a "POI" this PRD never mentions.** "POI §5", "POI §13.2", "POI source §20" point to a document nobody has shown. This PRD has no section 13.2 about it either (13 is packaging).

## Corrections to the earlier notes

- The Platform test note said "Tier 0 through Tier 4 is never defined". It is defined here, in PRD §9.3. The test doc just never copies it. (Platform note fixed.)
- The test docs' "AI PRD §x" references checked out where I looked (§7.1 to 7.8, §9.3, §12.2, §13, §6.3). The "POI §x" references are the unverifiable ones.

## Bottom line

Keep sections 7, 9, 10, and the phases. Delete the rest. Then fix flaws 3, 4, 5, and 1 before anyone builds. Flaw 3 is a legal risk, not a style problem.
