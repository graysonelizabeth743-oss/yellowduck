import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-[#FFB800]">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-[#0F172A]">Page not found</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-[#0F172A] text-sm font-bold hover:bg-[#F0AE00] transition-colors">
            Go home
          </Link>
          <Link href="/track" className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#334155] hover:bg-[#F1F5F9] transition-colors">
            Track a package
          </Link>
        </div>
      </div>
    </div>
  );
}
