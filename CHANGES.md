# Corrections in this version

## Build errors fixed
- **lucide-react v1 removed brand icons** (`Twitter`, `Linkedin`, `Github`, `Facebook`): the home page now imports them from `components/icons/CustomIcons`.
- **`reactCompiler` config key** was ignored by Next 15 → moved to `experimental.reactCompiler`.
- **ESLint config** imported a path that doesn't exist (`eslint-config-next/core-web-vitals`) so linting crashed the build → rewritten with `FlatCompat` (`@eslint/eslintrc` added to devDependencies).
- **Firebase threw at import time** when env vars were missing, failing static prerendering of every page that touched auth → now warns, uses inert placeholders, and exports `isFirebaseConfigured`. Analytics is optional.
- **9 `react/no-unescaped-entities` lint errors** and 4 `exhaustive-deps` warnings fixed.

## Runtime bugs fixed
- `app/admin/layout.js` and `app/dashboard/layout.js` rendered a second `<html><body>` inside the root layout (invalid HTML / hydration errors).
- `AuthorizationGate` rendered protected pages for **signed-out users** holding a stale cookie. It now clears the cookie and redirects to login.
- `statusMachine.js` imported `../constants/shipmentStatus` but the folder was misspelled `lib/contants` → renamed. Added the missing transitions (exceptions, failed delivery, return to sender) plus `canTransition` / `nextStatuses`.
- Admin dashboard counted statuses the app never writes (`CUSTOMS_CLEARANCE`, `IN_TRANSIT` only), so those cards always showed 0 → now counts both vocabularies.
- Facilities table: `key` was on the inner `<tr>` instead of the fragment returned from `.map()`.
- Nav/footer linked to ~20 routes that 404'd (see below).

## Security fix
- **Firestore rules let any signed-in user write their own `users/{uid}` document, including `isAdmin: true`** (instant privilege escalation). Users can no longer create or modify their own `isAdmin` / `isAuthorized` flags.

## Added
- Pages: `/solutions`, `/enterprise`, `/developers`, `/api`, `/docs`, `/help`, `/status`, `/blog`, `/careers`, `/press`, `/investors`, `/privacy`, `/terms`, `/cookies`, `/gdpr`, `/services/*` (5), `/auth/forgot-password` (real password reset), `/signup` redirect, custom 404.
- Admin: real **Shipments list** (filter, search, pagination), **Customs queue** (clear shipments, writes timeline events), and the **shipment detail page rewritten** from hard-coded mock data to live Firestore data with working Update Status / Add Event / Flag Exception.
- Components: `PageTemplate`, `Footer`, `lib/constants/statusDisplay.js`.
- `.env.example`, sidebar links for the admin pages.

## Known issues / recommendations (not changed)
- **`shipments` rules allow `read: if true`**, so anyone can list every shipment including sender/recipient PII. Public tracking needs a sanitized lookup (e.g. a `publicTracking/{trackingNumber}` collection or a server route) before production.
- Shipment owners can update their own `currentStatus`; restrict status changes to admins.
- Several dashboard/admin pages (analytics, billing, fleet, exceptions, facilities, team, notifications) still show mock data.
- Marketing copy, the legal pages and `/status` are placeholders.
- `tailwind.config.js` is a Tailwind v3-style file that Tailwind v4 ignores; styling uses arbitrary values so nothing breaks.
