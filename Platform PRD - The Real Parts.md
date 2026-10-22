# Platform PRD: only the real parts

Source: `Pilotspan AI Platform PRD (2).pdf`. 4,608 words.

**About 20% is useful.** The rest is sales talk and repeats.

## What it is

An AI helper in every Pilotspan screen. It finds screens. It answers policy questions with sources. It ranks work. It drafts notes, messages, and bills. A human approves risky acts.

## How

The AI reads the request. Normal services check rules and do the work. Search first. Then answer.

## The 5 tiers

| Tier | What | Rule |
|---|---|---|
| 0 | Info | Answer alone. Show source. |
| 1 | Draft | User reviews first. |
| 2 | Suggest work | Explain. User approves. |
| 3 | Prepare big things | Rule checks. Human approves. |
| 4 | Diagnose, decide, submit claims, message patients, change orders | Never. |

## What it must do

- **Navigator:** link, steps, button. Explains hidden features. Cites help. Hands off to support.
- **Policy:** approved sources only. Shows version and date. Warns on conflict. Reminds owners.
- **Work queue:** ranked by role. Says why. Risky acts need approval.
- **Notes:** drafts only. Never invents. Clinician signs.
- **Billing:** explains holds. Fix plans. Never submits alone.
- **Compliance:** finds gaps. Fix checklist. Audit packets.
- **Messages:** user reviews before sending. Blocks patient data on bad channels.
- **Boss briefs:** facts apart from guesses.

## Security

- Sign a BAA before any vendor sees patient data.
- Keep customers apart at every layer.
- Least data. Encrypt all.
- No training on customer data.
- Log everything that matters.
- Documents are data. Not orders.
- Keep model list and rollback.

## Pass marks

Before launch:
- Permissions, customer walls, banned acts, human review: 100%
- Citations correct: 95%+
- Workflow advice correct: 95%+
- Right screen found: 85%+
- Critical made-up answers: 0
- Speed: search under 3s. Answer under 8s.

After pilot:
- Tasks done with AI: 70%+
- Time cut: 30%+
- Helpfulness: 4.3 of 5
- Drafts kept with small edits: 60%+
- Fewer tickets: 20%+

## Every document needs

Owner. Version. Effective date. Review date. Status. Scope. Permission class. Citation anchor.

## Build order

1. Weeks 0–2: governance and gateway.
2. Weeks 2–4: Navigator and policy answers.
3. Weeks 4–10: work queue.
4. Weeks 10–14: notes, billing, messages.
5. Weeks 14–20: hospice, mobile, boss briefs.
6. "Months 20–22": automation.

## Cut

Overview. Vision. User table. Principles. Component list. Examples. Platform table. NIST text. Packaging. Risks. Checklist. Next steps. Conclusion.

## Flaws

1. **Phase 5 says months. Others say weeks.** Typo or a 15-month gap.
2. **Two weeks for phase 0 is not real.** Same for phase 1.
3. **Nothing ranks law above agency policy.** A policy that breaks the law wins. Worst flaw.
4. **Policy answers have no tier.** Tier 0 would answer alone.
5. **Some features have no requirement ID.** Scheduling. Intake. Payroll. Admin tools.
6. **Guardrails and security rules have no IDs.** Hard to test.
7. **Two pass-mark lists disagree.** Which one gates launch?
8. **"Low threshold" for small errors is never set.**
9. **Speed has no percentile or load.**
10. **"Log less" clashes with "log everything".** Retention is never set.
11. **Launch needs a pilot. No phase has one.** Three agencies is too few.
12. **A sentence in 6.2 breaks mid-line.**
13. **"Version Control" has no version.**
14. **The test docs cite a "POI" this PRD never mentions.**

## Bottom line

Keep sections 7, 9, 10, and the phases. Fix flaws 3, 4, 5, and 1 first.
