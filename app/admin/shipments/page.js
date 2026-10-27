"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, RefreshCcw, Search, ChevronRight, AlertCircle } from "lucide-react";
import Sidebar from "@/components/nav/Sidebar";
import Topbar from "@/app/dashboard/components/Navbar";
import { getShipments } from "@/services/shipment.service";
import { STATUS_DISPLAY, formatTimestamp } from "@/lib/constants/statusDisplay";

const PAGE_SIZE = 20;

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const load = useCallback(async ({ append = false, cursor = null } = {}) => {
    setLoading(true);
    setError("");
    try {
      const result = await getShipments({
        statusFilter: statusFilter === "ALL" ? null : statusFilter,
        pageSize: PAGE_SIZE,
        lastDoc: append ? cursor : null,
      });
      setShipments((prev) => (append ? [...prev, ...result.shipments] : result.shipments));
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error("[AdminShipments]", err);
      setError(err?.message || "Unable to load shipments.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return shipments;
    return shipments.filter((s) =>
      [s.trackingNumber, s.sender?.name, s.recipient?.name, s.recipient?.address?.country]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [shipments, search]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar isAdmin />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Shipments" subtitle="All shipments across the network" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tracking, sender, recipient…"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              >
                <option value="ALL">All statuses</option>
                {Object.entries(STATUS_DISPLAY).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                onClick={() => load()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                <RefreshCcw size={13} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F1F5F9] text-left">
                    {["Tracking", "Sender", "Recipient", "Status", "Created", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC]">
                  {visible.map((s) => {
                    const st = STATUS_DISPLAY[s.currentStatus];
                    return (
                      <tr key={s.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-4 font-mono text-xs font-bold text-[#0F172A]">{s.trackingNumber || s.id}</td>
                        <td className="px-5 py-4 text-xs text-[#475569]">{s.sender?.name || "—"}</td>
                        <td className="px-5 py-4 text-xs text-[#475569]">
                          {s.recipient?.name || "—"}
                          {s.recipient?.address?.country && (
                            <span className="text-[#94A3B8]"> · {s.recipient.address.country}</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${st?.tone ?? "bg-slate-100 text-slate-700"}`}>
                            {st?.label ?? s.currentStatus ?? "Unknown"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-[#64748B]">{formatTimestamp(s.createdAt)}</td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/admin/shipments/${s.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] hover:underline"
                          >
                            View <ChevronRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!loading && visible.length === 0 && !error && (
              <p className="px-5 py-12 text-center text-sm text-[#94A3B8]">No shipments found.</p>
            )}
            {loading && (
              <div className="flex items-center justify-center gap-2 px-5 py-8 text-sm text-[#64748B]">
                <Loader2 size={16} className="animate-spin" /> Loading shipments…
              </div>
            )}
          </div>

          {hasMore && !loading && (
            <div className="flex justify-center">
              <button
                onClick={() => load({ append: true, cursor: lastDoc })}
                className="rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E293B]"
              >
                Load more
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
