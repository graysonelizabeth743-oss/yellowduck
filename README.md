# Yellowduck Freight Systems

Shipment tracking and logistics platform built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS 4**, and **Firebase** (Auth + Firestore).

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in your Firebase web-app credentials
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

The app builds and renders without Firebase credentials (Firebase calls simply fail at runtime
and a warning is logged), so CI builds don't need secrets.

### Firebase setup

1. Create a Firebase project; enable **Authentication → Email/Password** and **Firestore**.
2. Copy the web-app config into `.env.local` (see `.env.example`).
3. Deploy rules and indexes: `npx firebase deploy --only firestore:rules,firestore:indexes`
4. Register an account, then in the Firestore console set `isAuthorized: true` and `isAdmin: true`
   on your `users/{uid}` document to bootstrap the first admin. (Security rules deliberately
   prevent users from granting themselves these flags.)

## Routes

| Area | Routes |
|---|---|
| Public | `/`, `/about`, `/pricing`, `/contact`, `/track`, `/track/[id]`, `/solutions`, `/enterprise`, `/developers`, `/api`, `/docs`, `/help`, `/status`, `/blog`, `/careers`, `/press`, `/investors`, `/services/[express\|freight\|customs\|warehousing\|returns]` |
| Legal | `/privacy`, `/terms`, `/cookies`, `/gdpr` (template text, have counsel review) |
| Auth | `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/signup` → register |
| Customer dashboard | `/dashboard`, `/create`, `/shipments`, `/shipments/[id]`, `/tracking`, `/analytics`, `/billing`, `/invoices`, `/fleet`, `/team`, `/notifications`, `/settings`, `/help` |
| Admin | `/admin`, `/admin/shipments`, `/admin/shipments/[id]`, `/admin/customs`, `/admin/exceptions`, `/admin/facilities`, `/admin/analytics`, `/admin/users` |

## Project layout

```
app/           routes (App Router)
components/    shared UI (nav, auth gate, public page template/footer, map)
lib/           firebase client/auth, logistics (pricing, status machine), constants, content
services/      Firestore data access (shipments, users)
```
