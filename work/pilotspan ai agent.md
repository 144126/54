# Pilotspan AI Agent

**Status:** Built on branch `feature/ai-agent` (PHP backend) · **Date:** Sept 23, 2026

## What is it?
An assistant built into Pilotspan that helps staff find screens, get answers from approved agency policies, look up their work, and prepare routine records. It now lives **inside our Laravel (PHP) backend**, not in the Next.js app or a separate server.

## Why move it into the backend?
- **Safer:** it acts as the logged-in user, sees only that user's agency data, and gets the same permission checks as the rest of Pilotspan.
- **Simpler:** one system instead of three (Next.js AI route, the Qdrant/Cohere search service, and the "min" bridge).
- **Accountable:** every answer, lookup and action is logged, and the log can't be edited.

## What it can do (v1)
| Ask it… | It will… |
|---|---|
| "Where do I submit the NOA?" | Link the right screen, or explain why you can't access it |
| "What's our missed-visit policy?" | Answer from **approved** agency documents, with sources [1] |
| "Find patient Maria Garcia" | Show matching patients in your agency |
| "What's coming up for this patient?" | Summarize the episode, next visits, missed visits and unsigned orders |
| "Show my visits this week" | List visits (field staff see only their own) |
| "Which orders are unsigned?" | List them, oldest first |
| "Add this new patient…" | **Prepare** the record. Nothing is saved until you click **Approve** |

**It will never** diagnose, change meds or orders, sign, submit claims, send OASIS, or contact patients. These actions don't exist for the AI.

## PHP changes — done
| Area | What was built |
|---|---|
| **New module `app/Ai/`** | All AI code in one place: model client, agent loop, tools, safety and audit |
| **AI model connection** | Streams from Baseten, with automatic switch to a backup provider if it fails. No new packages added |
| **8 tools** | Screen finder, policy search, section reader, patient find, patient summary, visit list, unsigned orders, "propose new patient" |
| **Approvals** | Proposed changes are saved as drafts. **Approve** re-checks permissions and duplicates, runs once only, and expires after 24 hours |
| **Knowledge library** | Upload → approve → supersede/retire policy documents. Search combines keyword and meaning (pgvector) |
| **New API** | `/api/v1/ai/…` for chat (live streaming), approvals, feedback, screen search and documents. All behind the existing login |
| **Database** | 11 new `ai_*` tables. Messages encrypted; audit log is append-only and tamper-evident |
| **Safety switches** | Patient tools off until the BAA flag is on; per-agency on/off; daily usage limits; link/image filtering |
| **Scheduled jobs** | Nightly audit-integrity check and old-conversation cleanup |
| **Bug fixes** | Fixed a permissions crash (missing role constant) that also affected normal screens; AI routes now return correct error codes |
| **Tests** | 32 automated tests (agency isolation, permissions, approvals, streaming, audit). All pass |

## PHP changes — still to do
1. Test on staging Postgres (vector search, audit lock, query speed).
2. Turn on patient tools once the BAA is signed (`AI_PHI_ENABLED`).
3. Separate PHP-FPM pool for AI traffic; confirm live streaming works through the proxy.
4. Load product help documents into the new library and retire Qdrant/Cohere.
5. Confirm screen permissions and add step-by-step guides in the screen registry.
6. Add cms.gov web search, support escalation, policy review reminders, and PDF uploads.
7. Build the accuracy/safety test harness and the admin dashboard.
8. Next phases: priority work queue, claim-hold explanations, note and message drafts, hospice tools.
9. Upgrade Laravel 11 → 13 (Laravel 11 no longer gets security fixes).