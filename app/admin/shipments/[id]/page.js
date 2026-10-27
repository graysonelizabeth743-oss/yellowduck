"use client";

import { useCallback, useEffect, useState, use } from "react";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Activity,
  Edit3,
  Flag,
  Loader2,
  MapPin,
  Package,
  Plus,
  Save,
  Shield,
  User,
} from "lucide-react";
import Sidebar from "@/components/nav/Sidebar";
import Topbar from "@/app/dashboard/components/Navbar";
import { auth } from "@/lib/firebase/client";
import {
  getShipment,
  getShipmentEvents,
  updateShipmentStatus,
  createShipmentEvent,
} from "@/services/shipment.service";
import { STATUS_DISPLAY, formatTimestamp } from "@/lib/constants/statusDisplay";

// ─── Shared UI ─────────────────────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, iconColor = "text-[#64748B]", children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
          {Icon && <Icon size={14} className={iconColor} />}
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-[#F8FAFC] last:border-0 gap-4">
      <span className="text-xs text-[#94A3B8] font-medium shrink-0">{label}</span>
      <span className="text-xs font-semibold text-[#334155] text-right break-words">{value || "—"}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const st = STATUS_DISPLAY[status];
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st?.tone ?? "bg-slate-100 text-slate-700"}`}>
      {st?.label ?? status ?? "Unknown"}
    </span>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#F8FAFC] focus:outline-none focus:border-[#FFB800] placeholder:text-[#CBD5E1]";

function formatDateTime(t) {
  if (!t) return "—";
  const d = typeof t.toDate === "function" ? t.toDate() : new Date(t);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminShipmentDetailPage(props) {
  const { id: shipmentId } = use(props.params);

  const [shipment, setShipment] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("LABEL_CREATED");
  const [statusNote, setStatusNote] = useState("");
  const [newEventLabel, setNewEventLabel] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getShipment(shipmentId);
      if (!data) {
        setShipment(null);
        setError("Shipment not found.");
        return;
      }
      setShipment(data);
      setSelectedStatus(data.currentStatus || "LABEL_CREATED");
      setEvents(await getShipmentEvents(shipmentId));
    } catch (err) {
      console.error("[AdminShipmentDetail]", err);
      setError(err?.message || "Unable to load shipment.");
    } finally {
      setLoading(false);
    }
  }, [shipmentId]);

  useEffect(() => {
    load();
  }, [load]);

  const author = () => auth.currentUser?.displayName || auth.currentUser?.email || "Admin";

  async function run(action, successMessage) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
      setNotice(successMessage);
      await load();
    } catch (err) {
      console.error("[AdminShipmentDetail] action failed", err);
      setError(err?.message || "Action failed.");
    } finally {
      setBusy(false);
    }
  }

  function saveStatus() {
    if (selectedStatus === shipment.currentStatus && !statusNote.trim()) return;
    run(async () => {
      await updateShipmentStatus({ shipmentId, status: selectedStatus });
      await createShipmentEvent({
        shipmentId,
        status: selectedStatus,
        location: shipment.currentLocation || "—",
        description: statusNote.trim() || `Status updated to ${STATUS_DISPLAY[selectedStatus]?.label ?? selectedStatus}`,
        author: author(),
      });
      setStatusNote("");
    }, "Status updated.");
  }

  function addEvent() {
    if (!newEventLabel.trim()) {
      setError("Event label is required.");
      return;
    }
    run(async () => {
      const location = newEventLocation.trim() || shipment.currentLocation || "—";
      await createShipmentEvent({
        shipmentId,
        status: shipment.currentStatus,
        location,
        description: newEventLabel.trim(),
        author: author(),
      });
      if (newEventLocation.trim()) {
        await updateShipmentStatus({
          shipmentId,
          status: shipment.currentStatus,
          extraFields: { currentLocation: newEventLocation.trim() },
        });
      }
      setNewEventLabel("");
      setNewEventLocation("");
    }, "Event added.");
  }

  function flagException() {
    run(async () => {
      await updateShipmentStatus({ shipmentId, status: "EXCEPTION" });
      await createShipmentEvent({
        shipmentId,
        status: "EXCEPTION",
        location: shipment.currentLocation || "—",
        description: statusNote.trim() || "Flagged as exception",
        author: author(),
      });
      setStatusNote("");
    }, "Shipment flagged as exception.");
  }

  const pkg = shipment?.package;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar isAdmin />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={shipment?.trackingNumber || "Shipment"} subtitle="Admin shipment detail" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/admin/shipments"
              aria-label="Back to shipments"
              className="p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-white transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            {shipment && (
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-extrabold text-[#0F172A] font-mono">{shipment.trackingNumber || shipmentId}</h2>
                  <StatusBadge status={shipment.currentStatus} />
                </div>
                <p className="text-sm text-[#64748B] mt-0.5">
                  {shipment.sender?.address?.city || "—"}, {shipment.sender?.address?.country || "—"} →{" "}
                  {shipment.recipient?.address?.city || "—"}, {shipment.recipient?.address?.country || "—"}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {notice && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          {loading && !shipment ? (
            <div className="flex items-center justify-center gap-2 py-20 text-sm text-[#64748B]">
              <Loader2 size={16} className="animate-spin" /> Loading shipment…
            </div>
          ) : shipment ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left */}
              <div className="space-y-6">
                <SectionCard title="Shipment Summary" icon={Package} iconColor="text-blue-500">
                  <InfoRow label="Service" value={shipment.pricing?.serviceCode} />
                  <InfoRow label="Total charge" value={shipment.pricing?.totalUSD != null ? `$${shipment.pricing.totalUSD}` : null} />
                  <InfoRow label="Contents" value={pkg?.contents} />
                  <InfoRow label="Weight" value={pkg?.weightKg != null ? `${pkg.weightKg} kg` : null} />
                  <InfoRow label="Chargeable" value={pkg?.chargeableWeight != null ? `${pkg.chargeableWeight} kg` : null} />
                  <InfoRow
                    label="Dimensions"
                    value={
                      pkg?.dimensions
                        ? `${pkg.dimensions.lengthCm} × ${pkg.dimensions.widthCm} × ${pkg.dimensions.heightCm} cm`
                        : null
                    }
                  />
                  <InfoRow label="Created" value={formatTimestamp(shipment.createdAt)} />
                  <InfoRow label="Location" value={shipment.currentLocation} />
                </SectionCard>

                <SectionCard title="Parties" icon={User} iconColor="text-purple-500">
                  {[
                    ["Sender", shipment.sender],
                    ["Recipient", shipment.recipient],
                  ].map(([label, p], i) => (
                    <div key={label} className={i ? "border-t border-[#F1F5F9] pt-4 mt-4" : ""}>
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider mb-1.5">{label}</p>
                      <p className="text-sm font-semibold text-[#0F172A]">{p?.name || "—"}</p>
                      {p?.company && <p className="text-xs text-[#64748B]">{p.company}</p>}
                      <p className="text-xs text-[#64748B]">{p?.email || "—"}</p>
                      <p className="text-xs text-[#64748B]">{p?.phone || "—"}</p>
                    </div>
                  ))}
                </SectionCard>
              </div>

              {/* Middle */}
              <div className="space-y-6">
                <SectionCard title="Timeline" icon={Activity} iconColor="text-green-500">
                  {events.length === 0 ? (
                    <p className="text-sm text-[#94A3B8]">No events recorded yet.</p>
                  ) : (
                    <ol className="space-y-4">
                      {events.map((ev) => (
                        <li key={ev.id} className="flex gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FFB800] shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#0F172A] leading-tight">
                              {ev.description || STATUS_DISPLAY[ev.status]?.label || ev.status}
                            </p>
                            <p className="text-[11px] text-[#64748B] mt-0.5 flex items-center gap-1">
                              <MapPin size={10} /> {ev.location || "—"}
                            </p>
                            <p className="text-[10px] text-[#94A3B8] mt-1">
                              {formatDateTime(ev.timestamp)} · {ev.author || "System"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </SectionCard>

                <SectionCard title="Add Timeline Event" icon={Plus} iconColor="text-blue-500">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="evt-label" className="block text-xs font-semibold text-[#334155] mb-1.5">Event</label>
                      <input id="evt-label" className={inputCls} placeholder="e.g. Arrived at JFK customs" value={newEventLabel} onChange={(e) => setNewEventLabel(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="evt-loc" className="block text-xs font-semibold text-[#334155] mb-1.5">Location (optional)</label>
                      <input id="evt-loc" className={inputCls} placeholder="e.g. JFK-HUB-01, New York" value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} />
                    </div>
                    <button
                      onClick={addEvent}
                      disabled={busy}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FFB800] text-[#0F172A] text-sm font-bold hover:bg-[#F0AE00] disabled:opacity-60 transition-colors"
                    >
                      <Plus size={14} /> Add Event
                    </button>
                  </div>
                </SectionCard>
              </div>

              {/* Right */}
              <div className="space-y-6">
                <SectionCard title="Update Status" icon={Edit3} iconColor="text-[#FFB800]">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="new-status" className="block text-xs font-semibold text-[#334155] mb-1.5">New status</label>
                      <select id="new-status" className={inputCls} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        {Object.entries(STATUS_DISPLAY).map(([value, { label }]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status-note" className="block text-xs font-semibold text-[#334155] mb-1.5">Note (optional)</label>
                      <input id="status-note" className={inputCls} placeholder="e.g. Delayed at customs gate 7" value={statusNote} onChange={(e) => setStatusNote(e.target.value)} />
                    </div>
                    <button
                      onClick={saveStatus}
                      disabled={busy}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#1E293B] disabled:opacity-60 transition-colors"
                    >
                      {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save Status
                    </button>
                  </div>
                </SectionCard>

                <SectionCard title="Customs" icon={Shield} iconColor="text-amber-500">
                  <InfoRow label="Contents" value={pkg?.contents} />
                  <InfoRow label="HS code" value={shipment.customs?.hsCode} />
                  <InfoRow label="Declared value" value={shipment.customs?.declaredValueUSD != null ? `$${shipment.customs.declaredValueUSD}` : null} />
                  <InfoRow label="Origin country" value={shipment.customs?.originCountry || shipment.sender?.address?.country} />
                  <InfoRow label="Purpose" value={shipment.customs?.purpose} />
                  <InfoRow label="Destination" value={shipment.recipient?.address?.country} />
                </SectionCard>

                <SectionCard title="Exception Management" icon={AlertTriangle} iconColor="text-red-500">
                  {shipment.currentStatus === "EXCEPTION" ? (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                      <AlertTriangle size={13} className="text-red-600 shrink-0" />
                      <p className="text-xs text-red-700 font-medium">This shipment has an active exception. Use Update Status to resolve it.</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2 mb-4">
                        <CheckCircle2 size={13} className="text-green-600 shrink-0" />
                        <p className="text-xs text-green-700 font-medium">No active exceptions</p>
                      </div>
                      <button
                        onClick={flagException}
                        disabled={busy}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
                      >
                        <Flag size={13} /> Flag as Exception
                      </button>
                    </>
                  )}
                </SectionCard>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
