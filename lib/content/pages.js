// Content for marketing, service, support and legal pages.
// Rendered by components/public/PageTemplate.jsx

const CTA_START = {
  primary: { label: "Start for Free", href: "/auth/register" },
  secondary: { label: "Talk to Sales", href: "/contact" },
};

export const SERVICES = {
  express: {
    eyebrow: "Services",
    title: "Express Shipping",
    intro:
      "Time-critical parcels and documents, moved door to door with live milestone tracking and proactive delay alerts.",
    cta: CTA_START,
    stats: [
      { value: "1–3 days", label: "Typical international transit" },
      { value: "Live", label: "Milestone tracking" },
      { value: "24/7", label: "Exception monitoring" },
      { value: "SMS + Email", label: "Recipient notifications" },
    ],
    sections: [
      {
        heading: "What's included",
        bullets: [
          "Pickup scheduling from your dock or office",
          "Priority handling at origin and destination hubs",
          "Electronic customs documents generated at booking",
          "Proof of delivery with timestamp",
          "Automatic rerouting on missed delivery attempts",
          "Dimensional-weight pricing calculated up front",
        ],
      },
    ],
  },
  freight: {
    eyebrow: "Services",
    title: "Freight & Cargo",
    intro:
      "Pallets, containers and oversized consignments across air, sea and road, coordinated through a single shipment record.",
    cta: CTA_START,
    sections: [
      {
        heading: "Modes we coordinate",
        bullets: [
          "Air freight for urgent or high-value cargo",
          "Sea freight (FCL and LCL) for cost-efficient volume",
          "Road and rail for regional distribution",
          "Multi-leg shipments with a single tracking number",
        ],
      },
      {
        heading: "Visibility at every handoff",
        body: "Each hub scan, customs event and carrier handoff is written to the shipment timeline, so your team and your customers see the same status at the same time.",
      },
    ],
  },
  customs: {
    eyebrow: "Services",
    title: "Customs Clearance",
    intro:
      "Export and import clearance handled alongside the shipment, with documents, duties and holds visible in one place.",
    cta: CTA_START,
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Commercial invoice and declaration captured at booking",
          "Export customs pending / cleared milestones tracked",
          "Import customs pending / cleared milestones tracked",
          "Holds and document requests raised as exceptions",
          "Duty and tax estimates shown before you ship",
          "Admin queue for clearing agents to resolve holds",
        ],
      },
    ],
  },
  warehousing: {
    eyebrow: "Services",
    title: "Warehousing",
    intro:
      "Receive, store, pick and pack from regional facilities, with inventory movements tied back to shipments.",
    cta: CTA_START,
    sections: [
      {
        heading: "Capabilities",
        bullets: [
          "Inbound receiving and put-away",
          "Pick, pack and label on demand",
          "Cross-docking for fast turnaround",
          "Facility throughput and capacity monitoring",
        ],
      },
    ],
  },
  returns: {
    eyebrow: "Services",
    title: "Returns Management",
    intro:
      "Give customers a simple return path and give your team full visibility on every reverse shipment.",
    cta: CTA_START,
    sections: [
      {
        heading: "Reverse logistics, simplified",
        bullets: [
          "Return-to-sender flow built into the shipment lifecycle",
          "Failed-delivery handling with configurable retries",
          "Status updates for both sender and recipient",
          "Exception queue for damaged or refused parcels",
        ],
      },
    ],
  },
};

export const PAGES = {
  solutions: {
    eyebrow: "Solutions",
    title: "Logistics built around how you ship",
    intro:
      "From first-time exporters to enterprise supply chains, Yellowduck gives every team a clear view of where freight is and what happens next.",
    cta: CTA_START,
    items: [
      { title: "Express Shipping", body: "Fast door-to-door delivery with live tracking.", href: "/services/express" },
      { title: "Freight & Cargo", body: "Air, sea and road freight on one shipment record.", href: "/services/freight" },
      { title: "Customs Clearance", body: "Documents, duties and holds handled with the shipment.", href: "/services/customs" },
      { title: "Warehousing", body: "Regional storage, pick and pack, cross-docking.", href: "/services/warehousing" },
      { title: "Returns Management", body: "Reverse logistics your customers can actually use.", href: "/services/returns" },
      { title: "Developer API", body: "Create shipments and read tracking events programmatically.", href: "/developers" },
    ],
  },

  enterprise: {
    eyebrow: "Enterprise",
    title: "Logistics operations at scale",
    intro:
      "Role-based access, team management, invoicing and an admin console for exceptions, customs and facilities.",
    cta: { primary: { label: "Talk to Sales", href: "/contact" }, secondary: { label: "See pricing", href: "/pricing" } },
    sections: [
      {
        heading: "Built for larger teams",
        bullets: [
          "Admin approval workflow for new accounts",
          "Team seats and permissions",
          "Consolidated billing and invoices",
          "Fleet and facility visibility",
          "Analytics across lanes, carriers and exceptions",
          "Dedicated onboarding and support",
        ],
      },
    ],
  },

  developers: {
    eyebrow: "Developers",
    title: "Build on Yellowduck",
    intro:
      "Create shipments, fetch tracking events and subscribe to status changes from your own systems.",
    cta: { primary: { label: "Read the docs", href: "/docs" }, secondary: { label: "API reference", href: "/api" } },
    notice:
      "The public REST API is on the roadmap. The examples below describe the planned interface and are not yet live.",
    sections: [
      {
        heading: "Track a shipment",
        code: `curl https://api.yellowduck.io/v1/track/YDK-123456789 \\
  -H "Authorization: Bearer <API_KEY>"`,
      },
      {
        heading: "Planned capabilities",
        bullets: [
          "Create and update shipments",
          "Retrieve the full event timeline",
          "Webhooks for status changes",
          "Rate estimation by weight and lane",
        ],
      },
    ],
  },

  api: {
    eyebrow: "API Reference",
    title: "Yellowduck API",
    intro: "Resource overview for the planned REST interface.",
    notice: "This reference is a preview. Endpoints and payloads may change before general availability.",
    items: [
      { title: "GET /v1/track/{trackingNumber}", body: "Returns the current status and event timeline for a shipment.", tag: "Read" },
      { title: "POST /v1/shipments", body: "Creates a shipment from sender, recipient and package details.", tag: "Write" },
      { title: "GET /v1/shipments/{id}", body: "Retrieves a shipment record by ID.", tag: "Read" },
      { title: "POST /v1/rates", body: "Estimates cost using chargeable weight and destination.", tag: "Write" },
    ],
  },

  docs: {
    eyebrow: "Documentation",
    title: "Guides & documentation",
    intro: "Everything you need to book, track and manage shipments.",
    items: [
      { title: "Getting started", body: "Create an account, get approved, and book your first shipment.", href: "/auth/register" },
      { title: "Creating a shipment", body: "Walk through the shipment wizard: addresses, parcel details, service level and review.", href: "/dashboard/create" },
      { title: "Tracking a package", body: "Use a tracking number to see live status and the full event history.", href: "/track" },
      { title: "Shipment statuses", body: "From label created through customs to delivered, and what each status means.", href: "/help" },
      { title: "Billing & invoices", body: "Review invoices, payment methods and usage.", href: "/dashboard/billing" },
      { title: "API reference", body: "Planned REST endpoints for integrations.", href: "/api" },
    ],
  },

  help: {
    eyebrow: "Help Center",
    title: "How can we help?",
    intro: "Quick answers to common questions. Can't find yours? Our team is a message away.",
    cta: { primary: { label: "Contact support", href: "/contact" }, secondary: { label: "Track a package", href: "/track" } },
    sections: [
      { heading: "My account is waiting for approval", body: "New accounts are reviewed by an administrator before dashboard access is enabled. You'll be able to sign in as soon as approval is granted; contact support if it's been more than one business day." },
      { heading: "Where is my package?", body: "Enter your tracking number on the Track page. Statuses update as the shipment is scanned at each hub and customs checkpoint." },
      { heading: "Why is my shipment on hold?", body: "Holds are usually caused by missing customs documents or an address issue. Check the shipment timeline for the exception note, or contact support with the tracking number." },
      { heading: "How is the price calculated?", body: "Rates use the greater of actual weight and volumetric weight, then apply the service level and destination." },
    ],
  },

  status: {
    eyebrow: "System Status",
    title: "Platform status",
    intro: "Current state of Yellowduck services.",
    notice: "Illustrative data: connect this page to your monitoring provider to show live status.",
    items: [
      { title: "Tracking", body: "Public tracking lookups.", tag: "Operational", tagTone: "ok" },
      { title: "Dashboard", body: "Customer shipment management.", tag: "Operational", tagTone: "ok" },
      { title: "Authentication", body: "Sign in and registration.", tag: "Operational", tagTone: "ok" },
      { title: "Notifications", body: "Email and SMS delivery.", tag: "Operational", tagTone: "ok" },
    ],
  },

  blog: {
    eyebrow: "Blog",
    title: "Insights from the network",
    intro: "Guides and updates on international shipping, customs and logistics operations.",
    items: [
      { title: "Understanding volumetric weight", body: "Why a light, bulky box can cost more than a dense, heavy one, and how to pack smarter.", meta: "Guide · 4 min read", tag: "Guide" },
      { title: "Customs documents checklist", body: "The paperwork to have ready before an international shipment leaves your dock.", meta: "Checklist · 5 min read", tag: "Customs" },
      { title: "Reading a tracking timeline", body: "What each status means and when to worry about an exception.", meta: "Explainer · 3 min read", tag: "Tracking" },
    ],
  },

  careers: {
    eyebrow: "Careers",
    title: "Help us move the world's freight",
    intro: "We're a small team building logistics software that people can actually understand.",
    cta: { primary: { label: "Get in touch", href: "/contact" } },
    items: [
      { title: "Full-stack Engineer", body: "Next.js, Firebase and real-time data. Remote-friendly.", meta: "Engineering", tag: "Open" , tagTone: "ok"},
      { title: "Operations Analyst", body: "Own exception handling and carrier performance reporting.", meta: "Operations", tag: "Open", tagTone: "ok" },
      { title: "Customer Success Manager", body: "Onboard new accounts and keep shipments flowing.", meta: "Customer Success", tag: "Open", tagTone: "ok" },
    ],
  },

  press: {
    eyebrow: "Press",
    title: "Press & media",
    intro: "For interviews, brand assets and company information, contact our communications team.",
    cta: { primary: { label: "press@yellowduck.io", href: "mailto:press@yellowduck.io" } },
    sections: [
      { heading: "About Yellowduck", body: "Yellowduck Freight Systems provides shipment tracking, customs coordination and logistics management for businesses shipping internationally." },
    ],
  },

  investors: {
    eyebrow: "Investors",
    title: "Investor relations",
    intro: "Information for current and prospective investors.",
    cta: { primary: { label: "Contact investor relations", href: "mailto:investors@yellowduck.io" } },
    sections: [
      { heading: "Overview", body: "Yellowduck is building the operating layer for international shipments. For financial reports and updates, please contact our investor relations team." },
    ],
  },

  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    notice: "Template text. Have it reviewed by qualified counsel before publishing.",
    legal: {
      updated: "2026",
      clauses: [
        { heading: "Information we collect", body: "We collect account details (name, email, phone, company), shipment details (addresses, parcel contents, customs data) and usage data needed to operate the service." },
        { heading: "How we use information", body: "To create and deliver shipments, provide tracking, process payments, prevent fraud, meet customs and legal obligations, and improve the service." },
        { heading: "Sharing", body: "We share information with carriers, customs authorities and service providers only as needed to fulfil shipments and run the platform." },
        { heading: "Retention & security", body: "We keep data for as long as needed for the purposes above and apply technical and organisational safeguards to protect it." },
        { heading: "Your rights", body: "Depending on your location you may request access, correction or deletion of your data by contacting privacy@yellowduck.io." },
      ],
    },
  },

  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    notice: "Template text. Have it reviewed by qualified counsel before publishing.",
    legal: {
      updated: "2026",
      clauses: [
        { heading: "Acceptance", body: "By creating an account or using the service you agree to these terms." },
        { heading: "Accounts", body: "Accounts require administrator approval. You are responsible for activity under your account and for keeping credentials secure." },
        { heading: "Shipments", body: "You must provide accurate shipment and customs information and may not ship prohibited or restricted goods." },
        { heading: "Fees", body: "Charges are calculated from chargeable weight, service level and destination and are shown before booking." },
        { heading: "Liability", body: "To the extent permitted by law, liability is limited as set out in your service agreement." },
      ],
    },
  },

  cookies: {
    eyebrow: "Legal",
    title: "Cookie Settings",
    notice: "Template text. Have it reviewed by qualified counsel before publishing.",
    legal: {
      updated: "2026",
      clauses: [
        { heading: "Essential cookies", body: "We use a session cookie to keep you signed in and to protect dashboard and admin routes. The service cannot work without it." },
        { heading: "Analytics", body: "If analytics is enabled, it is used to understand how the service is used and is loaded only in the browser." },
        { heading: "Managing cookies", body: "You can clear or block cookies in your browser settings; doing so will sign you out." },
      ],
    },
  },

  gdpr: {
    eyebrow: "Legal",
    title: "GDPR",
    notice: "Template text. Have it reviewed by qualified counsel before publishing.",
    legal: {
      updated: "2026",
      clauses: [
        { heading: "Data controller", body: "Yellowduck acts as controller for account data and as processor for shipment data you submit." },
        { heading: "Your rights", body: "You may request access, rectification, erasure, restriction, portability and objection by contacting privacy@yellowduck.io." },
        { heading: "International transfers", body: "Shipments are international by nature; data is transferred only as required to deliver them, using appropriate safeguards." },
      ],
    },
  },
};
