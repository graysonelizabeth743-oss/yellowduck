import Link from "next/link";
import Logo from "@/components/Logo";
import {
  FOOTER_COLUMNS,
  FOOTER_SOCIALS,
  FOOTER_CONTACT,
  FOOTER_LEGAL,
  FOOTER_META,
} from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo size="md" theme="light" />
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
              {FOOTER_META.tagline}
            </p>

            <ul className="space-y-2">
              {FOOTER_CONTACT.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors"
                    >
                      <Icon size={14} />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              {FOOTER_SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#1E293B] text-[#64748B] hover:bg-[#334155] hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-white transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FFB800] text-[#0F172A]">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-5 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#475569]">{FOOTER_META.copyright}</p>
          <nav className="flex flex-wrap items-center gap-5" aria-label="Legal">
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#475569] hover:text-[#64748B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
