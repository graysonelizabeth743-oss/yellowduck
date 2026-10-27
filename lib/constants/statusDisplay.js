// Display metadata for every status the app can encounter.
// Covers both the detailed lifecycle (SHIPMENT_STATUSES) and the simplified
// statuses written by the shipment wizard (IN_TRANSIT, CUSTOMS_HOLD, ...).

export const STATUS_DISPLAY = {
  LABEL_CREATED: { label: "Label created", tone: "bg-slate-100 text-slate-700" },
  PICKED_UP: { label: "Picked up", tone: "bg-slate-100 text-slate-700" },
  AT_ORIGIN_HUB: { label: "At origin hub", tone: "bg-sky-50 text-sky-700" },
  EXPORT_CUSTOMS_PENDING: { label: "Export customs pending", tone: "bg-amber-50 text-amber-700" },
  EXPORT_CUSTOMS_CLEARED: { label: "Export customs cleared", tone: "bg-green-50 text-green-700" },
  INTERNATIONAL_TRANSIT: { label: "International transit", tone: "bg-blue-50 text-blue-700" },
  ARRIVED_DESTINATION_COUNTRY: { label: "Arrived in destination", tone: "bg-blue-50 text-blue-700" },
  IMPORT_CUSTOMS_PENDING: { label: "Import customs pending", tone: "bg-amber-50 text-amber-700" },
  IMPORT_CUSTOMS_CLEARED: { label: "Import customs cleared", tone: "bg-green-50 text-green-700" },
  AT_DESTINATION_HUB: { label: "At destination hub", tone: "bg-sky-50 text-sky-700" },
  OUT_FOR_DELIVERY: { label: "Out for delivery", tone: "bg-violet-50 text-violet-700" },
  DELIVERED: { label: "Delivered", tone: "bg-green-50 text-green-700" },
  DELIVERY_FAILED: { label: "Delivery failed", tone: "bg-red-50 text-red-700" },
  RETURN_TO_SENDER: { label: "Return to sender", tone: "bg-red-50 text-red-700" },
  EXCEPTION: { label: "Exception", tone: "bg-red-50 text-red-700" },
  // Simplified statuses used by the wizard / dashboard
  IN_TRANSIT: { label: "In transit", tone: "bg-blue-50 text-blue-700" },
  CUSTOMS_HOLD: { label: "Customs hold", tone: "bg-amber-50 text-amber-700" },
  CUSTOMS_CLEARANCE: { label: "Customs clearance", tone: "bg-amber-50 text-amber-700" },
};

export const CUSTOMS_STATUSES = [
  "CUSTOMS_HOLD",
  "CUSTOMS_CLEARANCE",
  "EXPORT_CUSTOMS_PENDING",
  "IMPORT_CUSTOMS_PENDING",
];

// What "clear customs" moves each customs status to.
export const CUSTOMS_CLEAR_TARGET = {
  CUSTOMS_HOLD: "IN_TRANSIT",
  CUSTOMS_CLEARANCE: "IN_TRANSIT",
  EXPORT_CUSTOMS_PENDING: "EXPORT_CUSTOMS_CLEARED",
  IMPORT_CUSTOMS_PENDING: "IMPORT_CUSTOMS_CLEARED",
};

export function formatTimestamp(t) {
  if (!t) return "—";
  const d = typeof t.toDate === "function" ? t.toDate() : new Date(t);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
