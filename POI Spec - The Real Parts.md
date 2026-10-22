# POI Spec: only the real parts

Source: `Pilotspan Operational Intelligence Docs.pdf`. 3,994 words. This is the spec the POI test doc tests.

**About 30% is useful.** The state table is 15% of the doc and says almost nothing. Add the vision, the overview, and the conclusion. That is the rest.

## What it is

The rules-and-law brain of the Pilotspan AI. It stores official sources. People approve them. The AI answers from them, with citations. It says "I don't know" when it should.

## How it's built

- Check who the user is and which customer.
- Find role, state, payer, service.
- Ask the rules engine first.
- Search approved sources with filters.
- Rank by authority. Drop stale, retired, and unapproved sources.
- Write a short answer with citations.
- Check the action against permissions.
- Log the answer, sources, and feedback.

New sources go through this path:
- Find a source on an official site.
- Fetch. Read. Hash.
- Compare with the last version.
- Tag state and topic.
- Write a change summary.
- Compliance reviews.
- Approve for knowledge.
- Approve for rules, if needed.
- Publish to search.
- Test. Keep watching for changes.

Low-confidence reads go to a person. Nothing publishes itself.

## Source ranking (as written in §5.1)

1. Federal law and CMS guidance.
2. State law and state notices.
3. Payer and MCO manuals.
4. Agency policy.
5. Pilotspan docs.
6. Industry guidance, labeled "secondary".
7. Blogs, forums, social posts: never final.

Agency policy wins only if it is more specific and doesn't break higher law.

## Source status

Discovered, parsed, verified, under review, approved for knowledge, approved for rules, active, superseded or retired.

- No answers until "approved for knowledge".
- No rule changes until "approved for rules".

## Every source needs

Unique ID. Authority. Publisher and official domain. Jurisdiction. State. Agency type. Service line. Payer. Effective date (or "unknown"). Date fetched. Review due date. Owner. Status. Version and hash. Citation anchor. Replaces which source. Permission class.

## Every answer needs

- Plain answer.
- Scope: state, agency type, payer, service, date.
- What the user must do.
- What Pilotspan can do.
- Sources with title, link, section, version, date.
- Agency policy, if any.
- Confidence: Confirmed, Needs Review, Source Conflict, Not Configured.
- Who to escalate to.

## Pass marks

- Answers with a source: 100%
- Sources correct: 95%+
- Right state, payer, service: 90%+
- Customer leaks: 0
- Sources within review date: 100%
- Critical stale answers: 0
- Hard cases escalated right: 95%+
- Banned-action tests: 100%
- Helpfulness 4.3 of 5. Navigation 85%+.

## Watch schedule (federal only)

- Laws, CMS manuals, quality notices: check daily. Review in 5 days.
- OASIS and HOPE guidance: daily. 3 days.
- Final rules: daily. 10 days.
- Exclusion lists: LEIE monthly (2 days). SAM weekly (5 days).
- HIPAA: weekly. 10 days.
- NIST: monthly. 15 days.

## State packs

A pack covers: licensing, enrollment, EVV, documentation, billing, MCOs, workforce, payroll, quality, forms, change watching, product setup.

A state goes live only when:
- Source map is complete.
- Licensing, billing, workforce, and exclusion sources are approved.
- EVV is set up and tested.
- Forms are versioned.
- The state test suite passes.
- Training is done.
- The state compliance owner signs.

Texas is the baseline. Florida, California, New York, and North Carolina are next.

## Agency policies

- Upload, extract details, draft impact list, review, approve, enable, train, archive the old one.
- Needs title, owner, version, dates, state, status, and what it replaces.
- A change touches forms, templates, workflows, rules, training, tasks, reports.
- Old versions: audit only. Never current.
- Clash with higher law: flag. Send to compliance.

## Change rules

- A new rule can create an answer only after review.
- It can change product behavior only after rule approval, QA, and sign-off.
- Waivers and emergency rules need an end date and a re-review reminder.
- Every change gets an ID, scope, date, impacted items, training, tests, owner, and status.

## Security

- Least privilege. Separate permissions for policy, billing, HR, clinical.
- Keep patient data out of source loading.
- BAA and vendor check if a third party sees patient data.
- Documents are data. Not orders.
- Never auto-submit claims, assessments, payroll, reports, orders, messages, or exclusion clearance.
- Keep a model list, prompt versions, approvals, and rollback.

## Build order

1. Weeks 0–2: registry, approvals, versioning, citations.
2. Weeks 2–4: federal library, Texas, policies, cited answers.
3. Weeks 4–6: ten more states.
4. Weeks 6–8: all other states, payer module, dashboard.
5. After: impact analysis, audit packets, briefings.

## Cut

Executive overview. Vision. Promise. Objectives list. Scope lists. The 51-row state table. Example answer. Technical component list. Roles table (all TBD). Next steps. Conclusion.

## Flaws

1. **Two source rankings disagree.** §5.1 puts federal first and agency fourth. §13.2 puts agency policy plus an official source on top. It puts state above federal. It puts payer below federal. The AI cannot follow both. Worst flaw.
2. **The status path is a straight line.** It forces "approved for rules" on every source. §15 says rule review is "if needed".
3. **Confidence labels have no rules.** Nothing says when the AI picks Confirmed over Needs Review.
4. **The answer schema drops things §12 demands.** Escalation is only true or false, with no owner. Sources have no version.
5. **The source example misses two required fields.** Service line and permission class.
6. **Effective date may be "unknown".** The PRD says required. No rule for unknown dates.
7. **Pass marks differ.** §3.2 has 9 "release targets". §18 has 6 "release thresholds". Helpfulness, navigation, freshness, and escalation are in one list only.
8. **The schedule is not real.** Ten state packs in 2 weeks. About 40 more in 2 weeks. Each needs legal review, QA, training, and sign-off.
9. **Six phase-2 states have no requirements.** Illinois, Pennsylvania, Ohio, Georgia, Virginia, Arizona. Only 5 states get detail in §10.
10. **The state table is a phone book.** 44 of 51 rows say only "CMS State Survey Agency Directory". That lists contacts. It does not list the state's rules, Medicaid, or EVV sources. "Tier 1, 2, 3" is never defined. 25 states are Tier 1. The plan builds 10.
11. **Every owner is TBD.** Activation needs a state compliance owner to sign. Nobody can. The cover says "Production-Ready".
12. **Only federal sources have a watch schedule.** State, payer, and agency sources have none.
13. **Wage and payroll law sneaks in.** California meal and rest breaks. New York wage parity. High risk. No metric. Needs an employment lawyer.
14. **"Not legal advice" clashes with "consultant-level" answers** and "less reliance on consultants".
15. **No rule for past questions.** "What was the rule in March?" Old versions are audit-only.
16. **No retention rule. No speed, load, or uptime targets.**
17. **"State / territory" is a field.** No territory is in the table.

## Bottom line

Keep §5, §6, §12, §13, §15, §16, §17, and the gates. Delete the rest. Fix flaws 1, 3, 8, and 11 first. Flaw 1 changes what the AI tells users is the law.
