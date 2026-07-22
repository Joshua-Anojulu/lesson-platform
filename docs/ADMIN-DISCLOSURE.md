# Administrator Disclosure and Two-Stage Approval

Campus or program: `TODO(owner)`  
Authorized administrator (principal or fine-arts director): `TODO(owner)`  
Pilot coordinator: `TODO(owner)`  
Public roster URL: `TODO(owner)`  
Prepared on: `TODO(owner)`

## Independent-product framing

The linked site is the director's personal recommendation roster. It is not a school or district program, vendor portal, clearance system, or endorsement. It uses no school branding and receives no school-supplied student roster. A teacher's listed affiliation is self-reported unless separately confirmed, and listing never means the school has vetted or cleared that teacher.

## Stage 1: Phase 0 concierge pilot

### What families can do

- Open a static roster link and view three teacher-owned public profiles.
- Read a teacher bio, instruments, self-reported affiliation, and rates.
- Choose to load a YouTube or Vimeo clip. No video-host request occurs before the click.
- Submit one private registration request with parent name and email, optional parent phone, student first name only, instrument, experience level, optional teacher preference, optional notes, and parent or guardian consent.

### Data flow and controls

- Vercel serves the pages and runs the server action.
- The production request writes to one private Neon Postgres `registrations` table. A local JSONL fallback exists only for development.
- Only the named pilot coordinator may read requests. There is no account, login, director dashboard, teacher dashboard, administrator interface, payment flow, analytics tracker, advertising tracker, or public family data.
- The form does not collect a student last name, birthdate, school, grade, payment information, or password.
- Per-IP throttling is process-local. Database uniqueness prevents duplicate requests with the same parent email, student first name, and instrument.
- A permanent notice on every public page states that the roster is personal and is not a school or district program or endorsement.

Stage 1 administrator decision:

☐ Approved for one documented Phase 0 registration wave  
☐ Declined  
☐ More information required: ______________________________________________

Authorized administrator signature: ___________________________  Date: _______________

Pilot coordinator acknowledgement: ____________________________  Date: _______________

## Stage 2: Planned v1, separate approval required

Stage 1 approval does not authorize the planned v1 product. Before v1 goes live for this campus's families, the administrator will receive an updated disclosure and data-protection record covering:

- Parent and teacher accounts with email sign-in and scoped program memberships.
- Household, guardian-student, enrollment, and request-state records with server-side tenant authorization.
- A director dashboard limited to aggregate enrollment counts by instrument or teacher, with no family payment status.
- First-party registration-funnel and share-link attribution with no third-party trackers on minor-visited pages.
- Stripe Connect direct charges to teacher-owned accounts, monthly teacher-issued invoices, refunds, disputes, webhook records, reconciliation, and payment data boundaries.
- Revised retention, deletion, export, incident, subprocessor, tax, and legal determinations.

The second approval must be documented before any v1 director dashboard or payment flow is enabled for campus families. A missing, declined, or unanswered decision is a negative pilot result and will not be worked around.

Stage 2 administrator decision:

☐ Approved after reviewing the updated v1 disclosure and data-protection record  
☐ Declined  
☐ Deferred pending updated materials

Authorized administrator signature: ___________________________  Date: _______________

Product owner signature: ______________________________________  Date: _______________

Administrator contact for questions: `TODO(owner)`
