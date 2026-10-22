# Pilotspan Operational Intelligence, Explained for Kids

This is the kid version of the Pilotspan Operational Intelligence (POI) document. The grown-up version is version 1.0, dated October 2, 2026. It has 23 sections. This one has the same 23 sections in the same order, with the same numbers. Only the words are easier.

Words in **bold** are explained in the word list at the end.

---

## The Quick Story

Imagine a school with a very smart, very careful librarian.

- Kids ask the librarian questions all day.
- The librarian never guesses. Every answer comes from a real book.
- The librarian shows you the book, the page, and the date the book was made.
- If two books disagree, or the librarian is not sure, the librarian says so and asks a grown-up.
- A new book only goes on the shelf after a teacher checks it.

POI is that librarian. It helps a computer helper called **Pilotspan AI** give answers that are true, current, and backed up by proof.

---

## Version Info (the "name tag" of the document)

| Thing | Value |
|---|---|
| Product | Pilotspan Operational Intelligence (POI) |
| Document Type | Production Architecture, Governance, and Implementation Specification: the big plan for how it is built, how it is run fairly and safely, and how it is made |
| Version | 1.0 |
| Status | Production-Ready Approval Baseline (the ready-to-approve starting version) |
| Date | October 2, 2026 |
| Covers | Rules from the country, the states, the insurance companies, each agency, plus how the product, the work steps, and everyday operations work |
| First customers | **Home health** and **hospice** agencies in the U.S. The first place it starts is Texas. |

---

## 1. The Big Picture

**What it is.** POI is the brain library behind Pilotspan AI. It holds the rules, the proof, and the facts.

**What it replaces.** Old paper rule books kept at each office, and AI answers nobody checked. POI is up to date, comes from trusted places, and knows which state you are in.

**What it does for people.** While they work, people get clear help with many topics:

- licenses
- home health and hospice care
- **OASIS** and **HOPE** (forms about a patient's health)
- **EVV** (proof that a visit really happened)
- billing and claims (asking for money)
- quality
- staff and pay
- policies (the agency's own rules)
- being ready for a **survey** (an inspection) and for an audit (a check of your records)

**The proof rule.** Every answer about a rule or policy must show:

1. the state
2. the kind of agency
3. the payer or service, if it matters (who pays, what kind of care)
4. the name of the source
5. the web link of the source
6. the date the rule starts
7. the version
8. the exact spot in the source (like a page number)
9. how sure the answer is, and whether it fits this case

**What POI is NOT.**

- It is not a lawyer.
- It is not a doctor.
- It does not replace the agency's own lawyer.

It is a helper that points to the right rule. It helps people finish the job inside Pilotspan, keep their proof, and ask a human when it is not clear.

---

## 2. The Dream (Product Vision)

Every agency gets a smart advisor that:

- is always up to date
- always shows its proof
- lives inside Pilotspan

Nobody has to dig through messy manuals, websites, spreadsheets, emails, or old PDFs.

**Example questions a person could ask:**

- "What must I do for this Florida Medicaid EVV exception?"
- "Why was this claim rejected?"
- "What does our missed-visit policy say?"
- "What should we get ready for the inspection?"

**What they get back:** a short answer, with proof, that fits their state, plus a safe next step in the app.

**The promise, in three lines:**

- One trusted place for answers.
- One answer, with proof.
- One path to finish the work.

---

## 3. Goals and Report Cards

### 3.1 Goals

1. Swap old paper manuals for approved, saved-by-version, searchable knowledge.
2. Give answers with proof that match the agency, state, kind of care, payer, job role, and the date the rule starts (effective date).
3. Spot changes in official sources and send them to a compliance check **before** the AI uses them.
4. Connect answers to Pilotspan's work steps (workflows), tasks, templates, checklists, and reports.
5. Add new states one at a time without hard-wiring state rules into the product.
6. Let agencies help themselves, so they need outside consultants less for everyday questions.
7. Keep human approval for the big stuff: legal, health care, money, pay, claims, and sending reports to the government.

### 3.2 Report Card (the scores POI must hit before release)

| What we measure                  | What it means                                                         | Goal                 |
| -------------------------------- | --------------------------------------------------------------------- | -------------------- |
| Showing the source               | Rule answers that show where they came from                           | 100%                 |
| Source is correct                | Experts agree the source and section are right                        | 95% or more          |
| Right state                      | Correct state, payer, and service in the test set for the main states | 90% or more          |
| Keeping agencies apart           | One agency seeing another agency's policy or private patient info     | Zero. Not even once. |
| Sources are fresh                | Approved sources that have a valid check date                         | 100%                 |
| Old-answer accidents             | An answer uses a rule that was replaced                               | Zero serious ones    |
| Users like the help              | Rating for answers with sources                                       | 4.3 out of 5 or more |
| Finding the way                  | Users reach the Pilotspan screen we suggested                         | 85% or more          |
| Asking a human at the right time | Sends it to a person when proof is missing or fights itself           | 95% or more          |

---

## 4. What's In and What's Out

### In scope (POI does these)

- A library of official country-level rules and operating sources
- A "state pack" for every state and Washington, D.C.
- Guidance from insurance companies and state Medicaid
- Looking after each agency's own policies, steps, forms, and how-to guides (SOPs) through their whole life cycle
- Product help pages, release notes, and how-to guides for Pilotspan
- Services to bring in, version, approve, find, cite, test, and record sources
- The answer format for the AI, and links that jump straight into the right screen
- Figuring out what a change will affect, and work lists for reviewers
- Dashboards that watch rules and policies

### Out of scope (POI will NOT do these)

- Give legal advice all by itself
- Diagnose sickness, prescribe medicine, or decide treatment all by itself
- File reports, send OASIS or HOPE forms, send claims, pay workers, or clear a worker who is on an exclusion list, **unless a human says yes**
- Replace the agency's lawyer, compliance officer, accountant, biller, or clinical supervisor
- Scrape or use other people's content in a way that breaks their terms, contracts, or copyright rules

---

## 5. Which Sources to Trust (Source Authority Model)

### 5.1 The Trust Ladder

Pilotspan AI must rank and use sources in this order. When sources disagree, the higher one on the ladder wins:

1. **Country rules.** Federal laws, rules, official guidance from CMS and HHS, manuals, and program instructions.
2. **State rules.** State laws, rules, licensing office notices, Medicaid notices, and state inspection guidance.
3. **Payer manuals.** Official guides, bulletins, portals, price lists, and guidance on billing transactions from insurance companies and managed care plans.
4. **The agency's own rules.** Approved policy manuals, step-by-step guides, forms, contracts, and training.
5. **Pilotspan's own guides.** Approved product docs, set-up guides, and release notes.
6. **Helper groups.** Industry and accreditation advice, but only if it is labeled "secondary" (second-best).
7. **Not trusted as a final answer.** Blogs, forums, social media, random AI text, and summaries nobody approved.

### 5.2 The Life of a Source (like levels in a game)

A source climbs these steps:

1. Discovered (we found it)
2. Parsed (we read it into the computer)
3. Source Verified (we checked it is the real one)
4. Under Review (people are checking it)
5. Approved for Knowledge (the AI may now use it to answer)
6. Approved for Product Rule Use (the product may now change how it behaves)
7. Active (live)
8. Superseded or Retired (replaced or put away)

Two locks:

- 🔒 The AI **cannot** use a source for compliance (rule-following) answers until it reaches step 5, "Approved for Knowledge."
- 🔒 A source **cannot** change a product rule until it reaches step 6, "Approved for Product Rule Use."

---

## 6. The Knowledge Card (Knowledge Object Standard)

Every document, section, rule, table, form, notice, and agency policy **must** be saved as a versioned **knowledge object**. Think of it as a library card for each one. Each card has versions.

Here is a real example card, in plain words:

| Field | Example | What it means |
|---|---|---|
| source_id | CMS-HH-COP-42CFR484-2026-01 | the card's own ID |
| title | 42 CFR Part 484, Home Health Services | the name |
| authority_level | federal_regulation | how high on the trust ladder |
| publisher | eCFR / CMS | who made it |
| jurisdiction | US | which country-level area it covers |
| state | nothing | no single state, since it is national |
| agency_type | home_health | what kind of agency |
| payer_scope | medicare | who pays |
| topic_tags | conditions_of_participation, plan_of_care | what it is about |
| source_url | https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-484 | where it lives |
| effective_date | 2026-01-01 | the day the rule starts |
| retrieved_at | 2026-10-02T00:00:00Z | the day and time we got it |
| review_due_date | 2027-01-01 | when it must be checked again |
| approval_status | approved_for_knowledge | passed the gate |
| approval_owner | Pilotspan Compliance | who said yes |
| document_hash | sha256-hash (a long code in real life) | a fingerprint; if the file changes, the fingerprint changes |
| citation_anchor | 42 CFR 484.100 | the exact spot to point to |
| supersedes_source_id | nothing | it replaced nothing |
| content_license_notes | Official government source | we are allowed to use it |

### Must-have info on every card

| Info | Rule |
|---|---|
| Source ID | Required. Unique. Never changes. |
| How high on the trust ladder | Required |
| Publisher and official domain (website address) | Required |
| Where it applies (country-level) | Required |
| State or territory | Required when it applies |
| Agency type | Required |
| Kind of care (service line) | Required when it applies |
| Payer or managed care plan | Required when it applies |
| Start date | Required, or clearly marked "unknown" |
| Date we got it | Required |
| Date it must be rechecked | Required |
| Who approves it | Required |
| Approval status | Required |
| Version or fingerprint | Required |
| Exact spot to cite | Required |
| What it replaced | Required when there is a replacement |
| Who is allowed to see it | Required |

---

## 7. The Country-Level Library (Federal Intelligence Library)

### 7.1 Sources We Must Have

| Topic | Official source | Why we need it |
|---|---|---|
| Home health care rules | 42 CFR Part 484 | The country's rules for home health agencies to take part |
| Home health billing | CMS Medicare Claims Processing Manual, Chapter 10 | How home health agencies bill and process claims |
| Home health benefits | Medicare Benefit Policy Manual, Chapter 7 | What is covered |
| OASIS | CMS OASIS Data Sets and User Manuals | The current health-check form, plus guidance and Q&As |
| Home health quality | CMS Home Health Quality Reporting Program | All-payer OASIS and quality reporting requirements (reports on every patient, no matter who pays) |
| Hospice care rules | 42 CFR Part 418 | The country's patient-care participation requirements for hospice |
| HOPE | CMS HOPE Guidance Manual and HQRP resources | How hospice health checks are done and sent in |
| EVV | Medicaid.gov EVV resources | The country's starting rules for visit proof |
| HIPAA | HHS HIPAA Privacy and Security guidance | PHI (private patient health info), business associate (an outside company that handles that info), security and privacy requirements |
| Exclusion list (health) | HHS-OIG LEIE | The list of people not allowed to work in federal health programs |
| Exclusion list (government) | SAM.gov Exclusions API | A different list for government contracts. Not the same as LEIE. |
| CMS manuals | CMS Internet-Only Manuals | Official instructions and manual updates |
| CMS learning | Medicare Learning Network | Official provider education material (teaching for care providers) |
| AI safety | NIST AI RMF GenAI Profile | An AI governance (who is in charge and how) and risk-management framework |

### 7.2 How Often We Check for Changes

"Review time limit" is how many business days the team has to look at a change after it is found.

| What we watch | How often we look | Time to review |
|---|---|---|
| eCFR rules | Every day | 5 business days |
| CMS manuals and updates | Every day | 5 business days |
| OASIS and HOPE guidance | Every day | **3** business days |
| CMS quality reporting notices | Every day | 5 business days |
| CMS final rules | Every day, checking announcements | 10 business days |
| OIG LEIE list | Every month, plus when something happens | **2** business days |
| SAM.gov exclusions | Every week | 5 business days |
| HIPAA and security guidance | Every week | 10 business days |
| NIST AI guidance | Every month | 15 business days |

---

## 8. State Packs (State Compliance Pack Framework)

### 8.1 What a State Pack Is

A **state pack** is a locked toolbox for one jurisdiction (one state or D.C.). Inside are:

- official sources
- rules
- forms
- work steps
- settings
- tests
- approval records

**Important rule:** Pilotspan must not stuff a state's rules into the shared code. Instead, each state pack supplies versioned settings and retrieval metadata (labels the search uses to find things). A pack only turns on after four teams sign off: compliance, product, QA (testing), and customer success.

### 8.2 What Every State Pack Needs

| Section | What goes in it |
|---|---|
| Licensing | Agency type, state license, renewals, owner and branch rules, administrator rules |
| Provider enrollment | Medicaid sign-up, NPI and provider IDs, which payers and managed care plans the agency joins |
| EVV | Which services need it, the state's model, the **aggregator**, other EVV options, exceptions, how to send it in |
| Documentation | What the state adds to the federal paperwork and supervision rules |
| Billing | Medicaid manuals, payer IDs, permission slips (authorizations), deadlines to bill, claims and rate rules |
| MCOs (managed care plans) | Official manuals, bulletins, authorizations, portals, contacts |
| Workforce | Worker licenses, registries, exclusion checks, background checks, and who is allowed to work |
| Payroll | State and local rules on wages, overtime, travel, paid time off, and taxes, when this is turned on |
| Quality and inspection | State inspection, incident, QAPI, infection, and emergency-readiness rules |
| Forms | Official state forms, their versions, deadlines, and the matching Pilotspan template |
| Change watching | Official news feeds, reviewers, time limits, and start dates |
| Product settings | Needed switches, rules, templates, connections, and test scenarios |

### 8.3 The State Gate (when a state becomes "Pilotspan AI Approved")

A state gets the badge only when **all nine** are true:

1. The map of official sources is complete.
2. Licensing, provider, and enrollment sources are approved.
3. The EVV model and the relevant connections (integrations) are set up and tested.
4. The Medicaid and managed care billing sources are approved.
5. Workforce and exclusion sources are reviewed.
6. Required forms and policy templates have versions.
7. The state's own test suite passes.
8. Customer Success training is done.
9. The state's compliance owner signs to turn it on.

---

## 9. The State List (State Source Registry)

The **CMS State Survey Agency Directory** is the national source index (the big phone book) of state inspection offices. It must be saved as the primary discovery reference (the first place to look). Then each state pack must point to its own specific licensing, Medicaid, EVV, payer, workforce, and form sources.

Every state and D.C. is "Planned" except **Texas, which is "Pilot Baseline"**.

Each state has an "Initial Tier" (Tier 1, Tier 2, or Tier 3). The lists below are grouped by tier.

**Tier 1 (25):** Arizona, Arkansas, California, Colorado, Florida, Georgia, Illinois, Indiana, Kentucky, Louisiana, Maryland, Massachusetts, Michigan, Minnesota, Missouri, New Jersey, New York, North Carolina, Ohio, Pennsylvania, South Carolina, Tennessee, Texas, Virginia, Washington.

**Tier 2 (14):** Alabama, Connecticut, District of Columbia, Iowa, Kansas, Mississippi, Nebraska, Nevada, New Mexico, Oklahoma, Oregon, Utah, West Virginia, Wisconsin.

**Tier 3 (12):** Alaska, Delaware, Hawaii, Idaho, Maine, Montana, New Hampshire, North Dakota, Rhode Island, South Dakota, Vermont, Wyoming.

**Where each state starts looking.** Most states start with "CMS State Survey Agency Directory → that state." These seven have a special first stop (and still use the CMS directory too):

| State | First official stop |
|---|---|
| Arkansas | Arkansas Medicaid EVV |
| California | CDPH Licensing & Certification |
| Florida | AHCA Home Health EVV |
| New York | NYSDOH LHCSA and Home Care Profiles |
| North Carolina | NC Medicaid EVV |
| Oklahoma | Oklahoma State Department of Health |
| Texas | Texas HHSC |

---

## 10. The Five First Big States (Priority State Pack Requirements)

### 10.1 Texas (the first one, always kept fresh)

- Texas HHSC: licensing, providers, EVV, who can work, registry, and rule notices
- Texas Medicaid / TMHP billing and sign-up help
- Texas Medicaid managed care manuals
- Texas HCSSA policy and inspection guidance
- Texas exclusions, Nurse Aide Registry, and the SEMARC / EMR / NAR steps where they apply
- Texas worker and pay rules **only after a lawyer looks**
- Texas is Pilotspan's first live baseline, but it must be re-checked all the time.

### 10.2 Florida

- AHCA licensing and inspection rules
- Florida Medicaid sign-up and managed care library
- AHCA EVV and HHAeXchange rules, and rules for other connections
- State notices, claims, pre-approval, and incident-reporting rules
- Florida worker and wage rules when the Workforce/Payroll Suite is on

### 10.3 California

- CDPH Home Health Agency licensing and certification
- DHCS / Medi-Cal sign-up and managed care library
- California EVV and other-EVV technical details
- CDSS Home Care Organization content, if non-medical home care is on
- California wage, overtime, meal and rest break, and travel rules **only after an employment lawyer looks**

### 10.4 New York

- NYSDOH CHHA / LHCSA licensing, registration, and Certificate of Need content
- eMedNY Medicaid billing and managed care content
- New York EVV and the state aggregator set-up
- Wage parity and worker content **only after an employment lawyer looks**
- CHHA / LHCSA forms, reports, and renewal date tracking

### 10.5 North Carolina

- NC Medicaid EVV, Sandata, and other-EVV content
- State licensing and provider sign-up sources
- Managed care standard-plan manuals and billing help
- State worker, license, and exclusion sources

---

## 11. The Agency's Own Rules (Agency Policy Library)

### 11.1 The Life of a Policy

1. The agency uploads it.
2. We pull out its info (title, owner, dates).
3. We guess what changes it would cause (draft impact check).
4. The agency's compliance team reviews it.
5. It becomes an approved version.
6. The AI is allowed to find it.
7. Staff are trained and say "I read it."
8. When a new version comes, the old one is put in the archive.

### 11.2 Policy Rules

- Every policy needs: a title, an owner, a version, a start date, a review date, the kind of care, which states it covers, an approval status, and what it replaced.
- The AI **must** prefer the applicable agency-approved policy over general advice when the policy is **more specific** and does **not** conflict with authoritative law or regulation.
- When a policy changes, we must check what it touches: forms, templates, work steps, rules, training, open tasks, and reports.
- Old policies stay for audits, but they must **never** be given out as the current instructions.
- If a policy fights a higher authority, the AI must say so and send it to compliance review.

---

## 12. How the AI Must Answer (AI Answering Contract)

Every answer about rules, policies, payers, or "consultant-style" advice must have these eight parts:

1. **Plain answer.** Easy words.
2. **Where it applies.** State, agency type, payer, service, and start date.
3. **What you must do.**
4. **What Pilotspan can help you finish.**
5. **Official sources.** Title, link, who said it, section, and version or start date.
6. **The agency's own policy**, if there is one. Title, version, and date.
7. **How sure it is:** Confirmed, Needs Review, Source Conflict, or Not Configured.
8. **Who to ask next:** the compliance owner, a supervisor, the billing lead, or Pilotspan support.

### Example

**Question:** "Why is this Florida Medicaid home-health claim blocked by EVV?"

**Answer:**

- **Why:** The claim is blocked because the set-up (configured) EVV record is incomplete, or it has not reached the required "accepted" state.
- **Where it applies:** Florida, Medicaid, home health, the set-up service code.
- **What to do:** Open the EVV exception. Check for missing check-in, check-out, place, or service info. Fix it the way the agency allows. Ask for a review if needed.
- **What Pilotspan can do:** Open the EVV exception screen and show the current capture, sync, aggregator, and ready-to-bill status.
- **Source:** The official Florida AHCA EVV source, with its effective date and section shown.
- **How sure:** "Needs Review" if the payer, service code, or authorization is not complete.

---

## 13. How the AI Finds Its Answer (AI Retrieval Architecture)

### 13.1 The Ten Steps

1. Check who the user is (authenticate them) and which agency (tenant) they belong to.
2. Learn their role, agency type, state, branch, payer, service, and what they are doing.
3. Sort the question: policy, regulation, work step, billing, health paperwork, workers, pay, or "how do I use the app."
4. Ask the **rules engine** first. It is the strict part that follows exact rules, with no guessing.
5. Search the approved knowledge, with filters.
6. Rank what we found by how trusted and how well it fits.
7. Throw out anything old, retired, unapproved, or that the user is not allowed to see.
8. Write a limited answer with sources.
9. Check that the action it suggests is allowed for this user.
10. Write it all down: the answer, sources, version, and feedback.

### 13.2 Who Wins When Sources Disagree

From strongest to weakest:

1. The agency's approved policy that fits, **plus** the official country, state, or payer source that fits (these two work together)
2. Official state rule
3. Official federal rule
4. Approved payer manual
5. Pilotspan guide
6. Clearly labeled second-best advice

### 13.3 The Answer Form (Required Response Schema)

Every answer is filled into the same form, like a worksheet:

| Box | What goes in it |
|---|---|
| answer | A short, plain answer |
| applicability | State (like TX), agency type (home_health), payer (Medicaid), service (home_health_visit), "true as of" date (effective_as_of, like 2026-10-02) |
| required_actions | What the person must do (a list, empty in the sample) |
| pilotspan_actions | What Pilotspan can do (a list, empty in the sample) |
| sources | A list. For each: title, url, section, effective_date (like 2026-01-01), authority (like state_regulation) |
| agency_policy | Title, version (like 3.2), status (like approved) |
| confidence | How sure (like "confirmed") |
| limitations | What we could not cover (a list, empty in the sample) |
| escalation_required | true or false: must a human step in? (false in the sample) |

---

## 14. The Parts and Their Jobs (Technical Components)

| Part | Its job |
|---|---|
| Source Registry | The master list: official links, owners, how often to check, trust level, and status |
| Ingestion Service | Gets, reads, scans (OCR), fingerprints, cuts up, versions, and spots changes in documents |
| Metadata Service | Puts labels on things: place, state, payer, service, topic, start date (effective date), and who may see it |
| Approval Service | Runs the review steps for compliance, health care, billing, and agency policy |
| Knowledge Retrieval Service | Does a mixed (hybrid) search of only approved sources, using the labels as filters |
| Rules Engine | Does the exact stuff: deadlines, checks, EVV, billing, tasks, and settings |
| Citation Service | Gives the exact source, section, version, start date, and a link that jumps there |
| AI Orchestrator | Builds the question for the AI model, picks the model, shapes the answer, and runs the safety gates |
| Evaluation Service | Tests accuracy, freshness, citations, safety, and fit |
| Audit Service | Remembers the question, the sources, the suggested action, who approved, the answer version, and feedback |
| Change Impact Service | Connects a source change to the work steps, forms, rules, tests, training, and active tasks it touches |

---

## 15. How New Documents Come In (Data Ingestion Workflow)

The conveyor belt, in order:

1. Find the official source.
2. Check the publisher and website are real.
3. Fetch or download it.
4. Pull out the text and find its structure.
5. Compare its fingerprint to the old version.
6. Sort by place and topic.
7. Write a summary of what changed.
8. Put it in the compliance review line.
9. Approve it as knowledge.
10. If needed, review the exact rules it changes.
11. Publish it into the search index.
12. Test the AI with it.
13. Keep watching to stay fresh.

### 15.1 The Rules of the Belt

- Only watch **allowed** official links, APIs, feeds, downloads, or content channels we have a contract for.
- Keep the original file, link, time we got it, fingerprint, page and section markers, and every past version.
- Use a **hand-review line** when:
  - the computer is not sure it read it right
  - the PDF layout changed
  - the start date is unclear
  - the document is not an official one
- Do **not** bring in protected payer content without a contract or legal OK.
- Do **not** let regulatory changes go straight into AI answers or product rules on their own.

---

## 16. Handling Changes (Change Management)

### 16.1 The Change Card (Change Impact Object)

Every approved change **must** make a card:

| Field | Rule |
|---|---|
| Change ID | Unique. Never changes. |
| Source ID and version | Required |
| Where it applies | Required |
| Start date | Required, or flagged "unknown" |
| Parts of the app it hits | Required |
| Forms and templates it hits | Required |
| Rules and settings it hits | Required |
| Training needed | Required |
| Tests needed | Required |
| Compliance owner | Required |
| Progress | Draft → Reviewed → Approved → Deployed → Monitored |

### 16.2 Change Rules

- A new rule or bulletin can start **feeding answers** only after a review.
- A new rule or bulletin can **change how the product acts** only after: the rules engine approves, QA shows proof, and the launch is signed off.
- Short-term waivers and emergency rules need an explicit end date and an automatic reminder to review again.
- If a source fights a current agency policy, the AI must say so and send it to compliance review.

---

## 17. Safety, Privacy, and Keeping AI in Check (Security, Privacy, and AI Governance)

- **Least privilege.** People only see what they need: their own tenant (agency), state, payer, work step (workflow), and patient.
- **Keep patient info out** of source bringing-in wherever possible. Rule sources should be public or allowed content.
- **Separate keys.** Agency policy, billing, HR and pay, health care, and admin knowledge must each have their own enforced permissions.
- **Paperwork with vendors.** If an outside company handles private patient info, we need a business associate agreement and a vendor check.
- **Don't trust what you fetch.** Documents, uploads, emails, and web pages could be tricks. Guard against **prompt injection** (hidden text that tries to boss the AI around).
- **The AI never presses "send" by itself** on claims, assessments, pay, regulatory reports, orders, messages, or exclusion-clearing decisions.
- **Keep the AI's records:** the list of approved models, model cards, test results, prompt versions, release approvals, and a way to roll back.
- **Use the NIST AI RMF Generative AI Profile** as the working guide for managing risk, watching, and governing.

---

## 18. Testing (Quality Assurance and Evaluation)

| What we test | What must be true |
|---|---|
| Source correctness | The right official source and exact spot |
| Place correctness | The right state or territory and agency type |
| Payer fit | The right payer or managed care plan source |
| Date correctness | The current rule is picked; retired ones are left out |
| Agency policy correctness | The current approved policy version is used |
| Conflict handling | Fights are shown and sent up, not hidden |
| Agencies kept apart | No policy, source, patient info, or task leaks between agencies |
| Work step accuracy | Links and suggested steps match the live Pilotspan screens and permissions |
| Safety | No legal advice, no diagnosis, no AI acting alone on claims, pay, or assessments |
| Record keeping | The question, sources, answer version, feedback, and action state are saved |
| Change spreading | A new source makes a review and the right search behavior |
| Prompt injection | Untrusted content cannot beat the system, policy, or permission rules |

### Release Thresholds (the "can we launch?" test)

- **100%** pass on the agencies-kept-apart tests
- **100%** pass on the "AI must not act alone" tests
- **100%** of rule and policy answers show a citation
- **95% or more** citations correct in a sample checked by experts
- **90% or more** state and payer fit for approved priority state packs
- **Zero** unfixed serious problems with old sources or people seeing what they should not

---

## 19. The Plan and Timeline (Implementation Roadmap)

| Phase | When | What gets built | Door to the next phase |
|---|---|---|---|
| **0. Foundation** | Weeks 0–2 | Source registry, label model, approval flow, policy versions, citation service, governance council | Architecture, security, and compliance approve |
| **1. Federal + Texas** | Weeks 2–4 | Federal library, Texas pack, agency policy library, cited AI answers, testing tools | Texas pilot user testing (UAT) and citation tests pass |
| **2. Priority States** | Weeks 4–6 | Packs for Florida, California, New York, North Carolina, Illinois, Pennsylvania, Ohio, Georgia, Virginia, and Arizona | State gates all finished |
| **3. National Coverage** | Weeks 6–8 | The rest of the state packs, payer and managed care module, change monitoring dashboard, set-up playbooks | Quality and freshness goals met |
| **4. Consultant Intelligence** | Never-ending | Change-impact checks, audit proof packets, compliance work queues, executive rule briefings | Measured customer adoption, and less need for support |

---

## 20. Who Is In Charge (Roles and Responsibilities)

This part is a table with two columns: Function and Accountable Owner. Both boxes just say **TBD**, which means **"to be decided."**

---

## 21. The Launch Checklist (Production Go-Live Checklist)

Before going live, every box must be ticked:

- [ ] The source trust ladder is approved.
- [ ] The federal source library is approved and has versions.
- [ ] The Texas source pack is finished and signed.
- [ ] Agency policy upload, versioning, and approval are live.
- [ ] The citation service is live and checked.
- [ ] The AI answer form is forced on every rule and policy answer.
- [ ] State, payer, and agency filters are forced on.
- [ ] Search leaves out draft, old, retired, and not-allowed documents.
- [ ] Agency-keeping-apart and role permission tests pass.
- [ ] Prompt injection and trick-search tests pass.
- [ ] The change-impact steps work.
- [ ] The rule-watching dashboard works.
- [ ] Alerts for stale sources are set up.
- [ ] The compliance escalation ("ask a human") workflow works.
- [ ] The QA release report is approved.
- [ ] Security, compliance, product, and executives have all signed.

---

## 22. What To Do Next (Immediate Next Steps)

1. Approve POI as the **must-use** base for knowledge and source control for all Pilotspan AI compliance (rule-following) and policy experiences.
2. Name owners for the federal library, the Texas pack, and the first five priority state packs.
3. Build the Source Registry, Agency Policy Library, Approval Service, and Citation Service **before** adding more AI regulatory (rule) answers.
4. Start with a Federal + Texas live pilot, using only approved official sources and agency-approved policies.
5. Make every AI answer show its source, start date, where it applies, and whether to ask a human.
6. Turn on each new state only after its state pack, rules, QA proof, product settings, and customer-success training are approved.
7. Hold a **governance review every quarter** (every 3 months) on how fresh the sources are, how good the answers are, safety events, state readiness, and customer feedback.

---

## 23. The Ending (Conclusion)

POI is the "thinking layer" that makes Pilotspan AI **trustworthy, current, and able to grow**. It takes rules, payer advice, agency manuals, and work steps, and turns them into checked answers and clear next steps.

It keeps these jobs **separate**:

1. bringing in sources
2. compliance approval
3. exact rules
4. AI searching
5. a human saying yes to action

Because of that, Pilotspan can act like a top-notch consultant **without pretending that AI replaces legal, clinical (health care), financial, or regulatory accountability**. In plain words: the AI is not the lawyer, the doctor, the accountant, or the government.

The lasting (durable) advantage: an agency can run its whole business from one place, and always know **where every important answer came from, where it applies, and what to do next.**

---

## Word List (Hard Words, Made Easy)

| Word | Kid meaning |
|---|---|
| **Pilotspan** | The company and its app that agencies use to run their work |
| **POI** | Pilotspan Operational Intelligence, the careful librarian behind the AI |
| **Pilotspan AI** | The computer helper that answers questions |
| **Home health agency** | A group of nurses and helpers who visit sick or hurt people at home |
| **Hospice** | Care for people who are very sick and near the end of life, to keep them comfortable |
| **Agency** | The business that gives the care |
| **Compliance** | Following the rules |
| **Federal** | The whole country (the U.S. government) |
| **CMS / HHS** | Parts of the U.S. government that run health programs |
| **Medicare / Medicaid** | Government programs that pay for health care |
| **Payer / MCO** | The company or plan that pays the bill |
| **Claim** | A bill sent to a payer to get paid |
| **EVV** | Electronic Visit Verification. Proof, like a check-in, that a care visit really happened |
| **Aggregator** | A place that collects the EVV proofs |
| **OASIS** | The health-check form for home health patients |
| **HOPE** | The health-check form for hospice patients |
| **Survey** | An inspection, where the state visits to see if the rules are followed |
| **PHI** | Private patient health info |
| **HIPAA** | The law that keeps patient info private |
| **Exclusion list** | A list of people who are not allowed to work in federal health programs |
| **LEIE / SAM.gov** | Two of those lists |
| **Policy / SOP** | The agency's own rules and step-by-step guide |
| **Citation** | Pointing to exactly where an answer came from |
| **Metadata** | Labels on a document, like a name tag |
| **Hash** | A fingerprint for a file. If the file changes, the fingerprint changes |
| **Superseded** | Replaced by something newer |
| **Tenant isolation** | Each agency's stuff is kept in its own locked room |
| **Rules engine** | A strict program that follows exact rules, with no guessing |
| **Prompt injection** | A trick: hidden text that tries to make the AI break its rules |
| **QA** | Quality assurance, which means testing |
| **UAT** | User acceptance testing: real users try it before launch |
| **KPI** | A score on the report card |
| **SLA** | A promised time limit |
| **Tier** | A priority group |
| **Escalate** | Pass it up to a human who can decide |

*End. Same 23 sections, same numbers, simpler words.*
