import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function NavLink({ href, children }) {
  const url = typeof window !== 'undefined' ? window.location.pathname : '';
  const active = url === href || (href !== '/' && url.startsWith(href));
  return (
    <Link
      href={href}
      className={`px-3.5 py-2 text-sm rounded-lg font-medium transition-all duration-150
        ${active
          ? 'bg-emerald-700 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
        }`}
    >
      {children}
    </Link>
  );
}

export default function PublicLayout({ children }) {
  const { auth } = usePage().props;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              RPSU
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-bold text-sm text-emerald-800">DMMMSU-NLUC</div>
              <div className="text-[10px] text-slate-400">Knowledge & Research Management</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 ml-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/catalog">Research</NavLink>
            <NavLink href="/researchers">Researchers</NavLink>
            <NavLink href="/showcase/publications">Publications</NavLink>
            <NavLink href="/showcase/ip-rights">IP & Copyright</NavLink>
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <form action="/catalog" method="get" className="hidden sm:flex items-center relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              name="search"
              placeholder="Search research…"
              className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none w-44 transition-all"
            />
          </form>

          {/* CTA */}
          {auth?.user ? (
            <Link href="/dashboard" className="text-sm px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="text-sm px-4 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors shadow-sm">
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-slate-100 px-4 py-2 flex flex-col gap-0.5 bg-white">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/catalog">Research</NavLink>
            <NavLink href="/researchers">Researchers</NavLink>
            <NavLink href="/showcase/publications">Publications</NavLink>
            <NavLink href="/showcase/ip-rights">IP & Copyright</NavLink>
          </nav>
        )}
      </header>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 page-fade">{children}</main>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-700/60 rounded-lg flex items-center justify-center text-white text-xs font-bold">KM</div>
              <span className="font-bold text-white">DMMMSU – North La Union Campus</span>
            </div>
            <div className="text-sm text-slate-400">Research and Publication Services Unit (RPSU)</div>
            <div className="text-xs text-slate-500 mt-2 leading-relaxed">Centralized Knowledge Management & Research Management System — from knowledge creation to utilization.</div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Explore</div>
            <div className="space-y-2 text-slate-400">
              {[
                ['/catalog', 'Research Catalog'],
                ['/researchers', 'Researchers'],
                ['/showcase/publications', 'Publications'],
                ['/showcase/ip-rights', 'IP & Copyright'],
              ].map(([href, label]) => (
                <div key={href}>
                  <Link href={href} className="hover:text-emerald-400 transition-colors">
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Access Policy</div>
            <div className="text-xs text-slate-400 leading-relaxed">Abstracts and basic metadata are open to the public. Full records and file downloads require an authorized NLUC account.</div>
            <Link href="/login" className="inline-flex items-center gap-1.5 mt-3 text-xs px-3.5 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Login for full access
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-800 text-center text-xs py-3 text-slate-500">
          © {new Date().getFullYear()} DMMMSU-NLUC RPSU Knowledge Management System
        </div>
      </footer>
    </div>
  );
}
