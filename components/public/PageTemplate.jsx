import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/public/Footer";

/**
 * Shared layout for marketing / legal / info pages.
 * `page` shape: see lib/content/pages.js
 */
export default function PageTemplate({ page }) {
  const { eyebrow, title, intro, stats, sections, legal, items, cta, notice } = page;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased">
      <main>
        {/* Hero */}
        <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-[#0F172A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFB800] mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
                {intro}
              </p>
            )}
            {cta && (
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={cta.primary.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFB800] text-[#0F172A] text-sm font-bold hover:bg-[#F0AE00] transition-colors"
                >
                  {cta.primary.label}
                  <ArrowRight size={15} />
                </Link>
                {cta.secondary && (
                  <Link
                    href={cta.secondary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#334155] text-[#CBD5E1] text-sm font-semibold hover:border-[#64748B] hover:text-white transition-colors"
                  >
                    {cta.secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {notice && (
            <div className="rounded-2xl border border-[#FFE082] bg-[#FFF8E1] px-5 py-4 text-sm text-[#92400E]">
              {notice}
            </div>
          )}

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
                  <p className="text-3xl font-extrabold text-[#0F172A]">{s.value}</p>
                  <p className="text-xs text-[#64748B] font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => {
                const Wrapper = item.href ? Link : "div";
                const wrapperProps = item.href ? { href: item.href } : {};
                return (
                  <Wrapper
                    key={item.title}
                    {...wrapperProps}
                    className="group block bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:border-[#FFB800] transition-colors"
                  >
                    {item.tag && (
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-1 rounded-full mb-3 ${
                          item.tagTone === "ok"
                            ? "bg-green-50 text-green-700"
                            : item.tagTone === "warn"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-[#F1F5F9] text-[#475569]"
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{item.body}</p>
                    {item.meta && <p className="mt-3 text-xs text-[#94A3B8]">{item.meta}</p>}
                  </Wrapper>
                );
              })}
            </div>
          )}

          {sections?.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{section.heading}</h2>
              {section.body && (
                <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 bg-white rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#334155]"
                    >
                      <CheckCircle2 size={16} className="text-[#FFB800] mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#0F172A] text-[#E2E8F0] text-xs sm:text-sm p-5 leading-relaxed">
                  <code>{section.code}</code>
                </pre>
              )}
            </section>
          ))}

          {legal && (
            <article className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
              <p className="text-xs text-[#94A3B8]">Last updated: {legal.updated}</p>
              {legal.clauses.map((c, i) => (
                <div key={c.heading}>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    {i + 1}. {c.heading}
                  </h2>
                  <p className="mt-2 text-sm text-[#475569] leading-relaxed">{c.body}</p>
                </div>
              ))}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
