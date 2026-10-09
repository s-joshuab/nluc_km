import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigationLoading } from '../hooks/useNavigationLoading';
import { ContentSkeleton } from '../Components/Skeletons';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/researchers', label: 'Researchers' },
  { href: '/showcase/publications', label: 'Publications' },
  { href: '/showcase/ip-rights', label: 'IP & Copyright' },
];

function NavLink({ href, label, path, mobile = false, onClick }) {
  const active = path === href || (href !== '/' && path.startsWith(`${href}/`));
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`${mobile ? 'flex min-h-11 items-center rounded-lg px-4 py-3 text-base' : 'inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-sm'} font-medium transition-colors duration-150
        ${active ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      {label}
    </Link>
  );
}

export default function PublicLayout({ children }) {
  const page = usePage();
  const { auth } = page.props;
  const path = page.url.split('?')[0];
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navigating = useNavigationLoading();

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleDesktop = () => {
      if (desktopQuery.matches) setMobileOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleDesktop);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleDesktop);
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:gap-4">
          {/* Brand */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="DMMMSU-NLUC RPSU home">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-xs font-bold text-white">
              RPSU
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-bold text-slate-900">DMMMSU-NLUC</div>
              <div className="text-[11px] text-slate-600">Knowledge & Research Management</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="ml-2 hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => <NavLink key={item.href} {...item} path={path} />)}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <form action="/catalog" method="get" role="search" className="relative hidden items-center lg:flex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              name="search"
              type="search"
              aria-label="Search research catalog"
              placeholder="Search research…"
              className="w-36 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 xl:w-44"
            />
          </form>

          {/* CTA */}
          {auth?.user ? (
            <Link href="/dashboard" className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="shrink-0 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900">
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="public-mobile-menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div id="public-mobile-menu" className={`${mobileOpen ? 'block' : 'hidden'} max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden`}>
          <div className="mx-auto max-w-7xl px-4 py-5">
            <form action="/catalog" method="get" role="search" className="mb-5">
              <label htmlFor="mobile-catalog-search" className="mb-2 block text-sm font-semibold text-slate-700">Search the catalog</label>
              <div className="flex gap-2">
                <input
                  id="mobile-catalog-search"
                  name="search"
                  type="search"
                  placeholder="Title, code, or keyword"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
                <button type="submit" className="rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Search</button>
              </div>
            </form>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-slate-100 pt-4">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} path={path} mobile onClick={() => setMobileOpen(false)} />
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 py-6 page-fade">
        {children}
        {navigating && <ContentSkeleton />}
      </main>

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
