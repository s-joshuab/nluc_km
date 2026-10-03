# DMMMSU-NLUC RPSU Knowledge Management and Research Management System

Centralized web-based system for **Don Mariano Marcos Memorial State University – North La Union Campus (DMMMSU-NLUC)**,
**Research and Publication Services Unit (RPSU)**.

Combines Knowledge Management, Digital Research Repository, Research Management, ERP-style endorsement and
document tracking, R&E Publication, IEC Materials Development, Innovation, Technology, Commercialization,
Knowledge Resources, analytics/reports, and notifications.

**Stack:** Laravel 12 · PHP · React + Inertia.js · MySQL · Tailwind CSS · Vite · Laravel Storage

## Setup

```bash
composer install
npm install

# .env (MySQL via WAMP)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nluc_km
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate:fresh --seed
npm run build

# run
composer dev
# or: php artisan serve + npm run dev
```

## User Roles (4 only)

| Role | User type | Responsibilities |
|---|---|---|
| RPSU Administrator | Main system administrator | Manage users, facilitators, research records, files, access requests, metadata, publication/IEC/innovation records, system settings, and administrative functions. |
| RPSU Staff | RPSU processing staff | Receive and process documents, update current file location and status, record QR information from the Records Office, maintain status history and remarks, and assist in research-related processing. |
| Research & Publication Facilitator | College/area facilitator | Assist with research-related activities and facilitate processes within assigned scope. |
| Researcher | Research user | Search research, view authorized files, request access, download permitted files, view own research, submit/track own endorsements, and monitor current file location. |

Authorization is **role + office assignment**. QR stamping is manual at the records offices;
RPSU Staff / Administrator encode the QR reference in the system. Researchers can only view
statuses, never change them.

## Seeded Accounts (password: `password123` for all)

| Email | Role | Office | Notes |
|---|---|---|---|
| `admin@nluc.dmmmsu.edu.ph` | RPSU Administrator | RPSU | Full admin |
| `staff@nluc.dmmmsu.edu.ph` | RPSU Staff | RPSU | Updates file location / RPSU processing, QR transactions for assigned office, forwards to RECI |
| `facilitator@nluc.dmmmsu.edu.ph` | Research & Publication Facilitator | RPSU | Assists researchers |
| `researcher@nluc.dmmmsu.edu.ph` | Researcher | — | Own research, transactions, bookmarks |

## Public Showcase (no login)

- `/` — landing: stats, latest research, publications, researchers, IP & copyright
- `/catalog`, `/catalog/{id}` — research list and **abstract-only** detail
- `/researchers`, `/researchers/{id}` — researcher profiles
- `/showcase/publications`, `/showcase/ip-rights` — publications and IP/copyright showcase

Full records and file downloads require login.

## Endorsement Workflow

Academic Unit → Academic Unit – Records Office (**manual QR Received**, no system there) → RPSU (processing:
Received by RPSU → Under Processing → For Review → For Release) → RPSU – Records Office
(**manual QR Release**, no system there) → RECI Office – University (Forwarded / Endorsed to RECI → Completed / Closed).

The system lives only in the research office (RPSU). RPSU Staff / Administrator encode the manual QR
references here to update each paper's location and status. Offices/stages remain as location tracking.

Every status change writes a status history row, activity log, and notification inside a DB transaction.
