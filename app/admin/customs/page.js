"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, RefreshCcw, Shield } from "lucide-react";
import Sidebar from "@/components/nav/Sidebar";
import Topbar from "@/app/dashboard/components/Navbar";
import { auth } from "@/lib/firebase/client";
import {
  getShipmentsByStatuses,
  updateShipmentStatus,
  createShipmentEvent,
} from "@/services/shipment.service";
import {
  CUSTOMS_STATUSES,
  CUSTOMS_CLEAR_TARGET,
  STATUS_DISPLAY,
  formatTimestamp,
} from "@/lib/constants/statusDisplay";

export default function AdminCustomsPage() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setShipments(await getShipmentsByStatuses(CUSTOMS_STATUSES));
    } catch (err) {
      console.error("[AdminCustoms]", err);
      setError(err?.message || "Unable to load the customs queue.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const exportPending = shipments.filter((s) => s.currentStatus === "EXPORT_CUSTOMS_PENDING").length;
    const importPending = shipments.filter((s) => s.currentStatus === "IMPORT_CUSTOMS_PENDING").length;
    return {
      total: shipments.length,
      exportPending,
      importPending,
      holds: shipments.length - exportPending - importPending,
    };
  }, [shipments]);

  async function handleClear(shipment) {
    const target = CUSTOMS_CLEAR_TARGET[shipment.currentStatus];
    if (!target) return;

    setBusyId(shipment.id);
    setError("");
    try {
      const author = auth.currentUser?.displayName || auth.currentUser?.email || "Customs Officer";
      await updateShipmentStatus({ shipmentId: shipment.id, status: target });
      await createShipmentEvent({
        shipmentId: shipment.id,
        status: target,
        location: shipment.currentLocation || "Customs",
        description: `Customs cleared (${STATUS_DISPLAY[shipment.currentStatus]?.label ?? shipment.currentStatus})`,
        author,
      });
      setShipments((prev) => prev.filter((s) => s.id !== shipment.id));
    } catch (err) {
      console.error("[AdminCustoms] clear failed", err);
      setError(err?.message || "Unable to clear this shipment.");
    } finally {
      setBusyId(null);
    }
  }

  const cards = [
    { label: "In customs queue", value: counts.total },
    { label: "Export pending", value: counts.exportPending },
    { label: "Import pending", value: counts.importPending },
    { label: "Holds", value: counts.holds },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar isAdmin />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Customs" subtitle="Clearance queue and holds" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cards.map((c) => (
              <div key={c.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-[#0F172A]">{loading ? "–" : c.value}</p>
                <p className="text-xs text-[#94A3B8] font-medium mt-0.5">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-60"
            >
              <RefreshCcw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#F1F5F9]">
              <Shield size={14} className="text-amber-600" />
              <h2 className="text-sm font-bold text-[#0F172A]">Awaiting clearance</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm text-[#64748B]">
                <Loader2 size={16} className="animate-spin" /> Loading…
              </div>
            ) : shipments.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
                <CheckCircle2 size={24} className="text-green-500" />
                <p className="text-sm text-[#64748B]">Nothing awaiting customs clearance.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#F8FAFC]">
                {shipments.map((s) => {
                  const st = STATUS_DISPLAY[s.currentStatus];
                  return (
                    <li key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/admin/shipments/${s.id}`}
                          className="font-mono text-xs font-bold text-[#0F172A] hover:underline"
                        >
                          {s.trackingNumber || s.id}
                        </Link>
                        <p className="mt-0.5 text-xs text-[#64748B] truncate">
                          {s.sender?.address?.country || "—"} → {s.recipient?.address?.country || "—"}
                          {s.package?.contents ? ` · ${s.package.contents}` : ""}
                        </p>
                      </div>
                      <span className={`self-start sm:self-auto inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${st?.tone ?? "bg-slate-100 text-slate-700"}`}>
                        {st?.label ?? s.currentStatus}
                      </span>
                      <span className="text-xs text-[#94A3B8] sm:w-24">{formatTimestamp(s.createdAt)}</span>
                      <button
                        onClick={() => handleClear(s)}
                        disabled={busyId === s.id}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-2 text-xs font-bold text-[#0F172A] hover:bg-[#F0AE00] disabled:opacity-60"
                      >
                        {busyId === s.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                        Clear
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
