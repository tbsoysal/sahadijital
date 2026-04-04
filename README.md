# SahaDijital

**Dijital Halı Saha Yönetim Sistemi** — A modern B2B SaaS platform for futsal and sports field owners to manage reservations, accept online bookings, and track revenue.

---

## Overview

SahaDijital gives sports field businesses a complete digital operations layer. Field owners get a real-time reservation calendar, a public booking page customers can access directly, and a revenue dashboard — all without needing to manage a separate backend or admin panel.

Each business gets their own branded booking page at `/book/[slug]` that customers can visit to see availability and submit reservation requests in real time.

---

## Features

### Dashboard
- **Weekly calendar** with hourly slots (11:00–01:00 working day)
- Create, update, and delete reservations directly on the calendar
- Payment tracking per reservation (paid / unpaid)
- Multi-field support — switch between fields from the sidebar

### Online Booking
- Public-facing booking page at a unique slug per business
- Customers select a field, date, and available time slot
- Reservation requests submitted as **pending** — owner must approve
- Real-time slot availability: booked slots update live without page reload

### Approval Flow
- Pending bookings appear on the calendar with amber styling and a notification dot
- Pending count badge in the calendar header
- Owner clicks a pending slot to **Onayla** (approve) or **Reddet** (reject)
- Approving confirms the reservation; rejecting deletes it from the calendar and database

### Real-Time Sync
- Dashboard calendar and public booking page stay in sync via Supabase Realtime
- New online bookings appear on the owner's calendar instantly
- Slot availability on the booking page updates the moment a reservation is confirmed or deleted

### Revenue & Stats
- Monthly revenue tracked per field
- Paid vs. unpaid reservation counts
- Total reservation count

### Account Management
- Email/password authentication
- Password reset via email
- Profile and field settings (name, default price per hour)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Forms | React Hook Form + Zod |
| Date handling | date-fns |
| Icons | Lucide React |
| Language | TypeScript 5 |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, password reset
│   ├── book/[slug]/     # Public booking page + confirm flow
│   └── dashboard/       # Protected owner dashboard
│       ├── settings/
│       └── statics/
├── components/
│   ├── book/            # Booking page UI
│   └── dashboard/
│       └── calendar/    # WeeklyCalendar, ReservationMenu
├── context/
│   └── DashboardContext.tsx
├── lib/
│   ├── constants.tsx    # Working hours, views
│   ├── hooks/
│   │   ├── auth/
│   │   ├── booking/
│   │   └── dashboard/
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Supabase query layer
│   └── supabase/        # Browser + server clients
└── types/
    └── index.ts
```

### Architecture

```
Components → Hooks → Services → Supabase
```

- **Services** (`src/lib/services/`) — raw Supabase queries, no React state
- **Hooks** (`src/lib/hooks/`) — consume services, manage local state
- **Context** (`DashboardContext`) — global state: user, fields, selected field, sidebar

---

## Database Schema

### `reservations`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| field_id | uuid | FK → fields |
| customer_name | text | |
| customer_phone | text | |
| reservation_date | date | Working day date |
| start_time | time | 11:00–00:00 |
| end_time | time | 12:00–01:00 |
| price | numeric | |
| is_paid | boolean | |
| status | text | `confirmed` / `pending` |
| description | text | Optional |
| created_at | timestamptz | |

### `fields`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK → auth.users |
| name | text | |
| default_price | numeric | Pre-fills reservation form |
| created_at | timestamptz | |

### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid | FK → auth.users |
| business_name | text | Shown on booking page |
| slug | text | Unique, used in `/book/[slug]` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
git clone https://github.com/tbsoysal/sahadijital.git
cd sahadijital
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Supabase Setup

1. Create the `profiles`, `fields`, and `reservations` tables using the schema above
2. Enable **Row Level Security** on all tables
3. Add RLS policies:

```sql
-- Fields: owners manage their own fields
CREATE POLICY "Users manage own fields" ON fields
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Reservations: owners manage reservations for their fields
CREATE POLICY "Users manage own reservations" ON reservations
FOR ALL TO authenticated
USING (field_id IN (SELECT id FROM fields WHERE user_id = auth.uid()))
WITH CHECK (field_id IN (SELECT id FROM fields WHERE user_id = auth.uid()));

-- Reservations: public can read non-rejected reservations (for booking page)
CREATE POLICY "Public can read reservations for booking" ON reservations
FOR SELECT TO anon, authenticated
USING (status != 'rejected');

-- Reservations: public can submit pending requests
CREATE POLICY "Public can submit pending reservations" ON reservations
FOR INSERT TO anon
WITH CHECK (status = 'pending');
```

4. Enable **Realtime** on the `reservations` table:
   - Supabase Dashboard → Database → Replication → `supabase_realtime` publication → enable `reservations`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Working Day Convention

The working day runs from **11:00 to 01:00** (next calendar morning). All reservations — regardless of hour — are stored under the selected working date. Hours 00:00 and 01:00 are treated as the end of the current working day, not the start of the next calendar day.

---

## Roadmap

- [ ] SMS notifications on booking approval/rejection
- [ ] Daily and monthly calendar views
- [ ] Multi-hour booking support on the public booking page
- [ ] Stripe payment integration for online deposits
- [ ] Customer accounts and booking history
- [ ] Analytics dashboard with charts

---

## License

Private — all rights reserved.
