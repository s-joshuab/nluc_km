import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

// ── Lucide-style inline SVG icons (zero bundle cost) ──────────────────────────
const icons = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  repository:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  records:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  myresearch:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  knowledge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  endorse:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  tx:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  access:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  qr:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>,
  pub:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>,
  iec:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  innovation:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  tech:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  commerce:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  report:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  users:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  roles:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  offices:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  colleges:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  bell:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  logout:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  globe:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

function NavSection({ title, children }) {
  return (
    <div className="mt-4 px-3">
      <div className="px-2 py-1 text-[10px] font-bold tracking-widest text-emerald-300/70 uppercase">{title}</div>
      <div className="mt-1 space-y-0.5">{children}</div>
    </div>
  );
}

function NavLink({ href, active, icon, children, badge }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-all duration-150 group relative
        ${active
          ? 'bg-emerald-500/20 text-emerald-100 font-medium shadow-sm border border-emerald-500/30'
          : 'text-emerald-100/70 hover:bg-white/5 hover:text-emerald-100'
        }`}
    >
      <span className={`${active ? 'text-emerald-300' : 'text-emerald-400/60 group-hover:text-emerald-300'} transition-colors`}>
        {icon}
      </span>
      <span className="flex-1 leading-tight">{children}</span>
      {badge != null && badge > 0 && (
        <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function AuthenticatedLayout({ header, children }) {
  const { auth, unreadCount, flash } = usePage().props;
  const [sidebar, setSidebar] = useState(true);
  const roles = auth?.roles || [];
  const isAdmin = auth?.isAdmin;
  const isFac = roles.includes('Research & Publication Facilitator');
  const isStaff = roles.includes('RPSU Staff');
  const canRpsu = isAdmin || isFac || isStaff;
  const url = typeof window !== 'undefined' ? window.location.pathname : '';
  const is = (p) => url.startsWith(p);
  const initials = `${auth?.user?.first_name?.[0] || ''}${auth?.user?.last_name?.[0] || ''}`;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
      <aside
        className={`${sidebar ? 'w-60' : 'w-0 overflow-hidden'} transition-all duration-300 bg-gradient-to-b from-emerald-950 to-emerald-900 min-h-screen flex flex-col sticky top-0 h-screen shadow-xl shrink-0`}
      >
        {/* Brand */}
        <div className="px-4 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-400/20 border border-emerald-400/30 rounded-xl flex items-center justify-center font-bold text-xs text-emerald-200 shrink-0">
              KM
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-white leading-tight truncate">DMMMSU-NLUC RPSU</div>
              <div className="text-[10px] text-emerald-300/70 truncate">Knowledge Management</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto pb-4 pt-2">
          <div className="px-3 mt-2">
            <NavLink href="/dashboard" active={url === '/dashboard'} icon={icons.dashboard}>Dashboard</NavLink>
          </div>

          <NavSection title="Research">
            <NavLink href="/repository" active={is('/repository')} icon={icons.repository}>Research Repository</NavLink>
            {canRpsu && <NavLink href="/research" active={url === '/research'} icon={icons.records}>Research Records</NavLink>}
            <NavLink href="/my-research" active={is('/my-research')} icon={icons.myresearch}>My Research</NavLink>
            <NavLink href="/knowledge-resources" active={is('/knowledge-resources')} icon={icons.knowledge}>Knowledge Resources</NavLink>
          </NavSection>

          <NavSection title="Transactions">
            <NavLink href="/endorsements" active={is('/endorsements')} icon={icons.endorse}>Endorsements</NavLink>
            <NavLink href="/my-transactions" active={is('/my-transactions')} icon={icons.tx}>My Transactions</NavLink>
            <NavLink href="/access-requests" active={is('/access-requests')} icon={icons.access}>Access Requests</NavLink>
            {(auth?.canQrReceived || isAdmin) && <NavLink href="/qr-received" active={is('/qr-received')} icon={icons.qr}>QR Received Queue</NavLink>}
            {(auth?.canQrRelease || isAdmin) && <NavLink href="/qr-release" active={is('/qr-release')} icon={icons.qr}>QR Release Queue</NavLink>}
          </NavSection>

          <NavSection title="Publication & IEC">
            <NavLink href="/publications" active={is('/publications')} icon={icons.pub}>R&E Publication</NavLink>
            <NavLink href="/iec-materials" active={is('/iec-materials')} icon={icons.iec}>IEC Materials</NavLink>
          </NavSection>

          <NavSection title="Innovation">
            <NavLink href="/innovations" active={is('/innovations') && !is('/innovations-create')} icon={icons.innovation}>Innovation</NavLink>
            <NavLink href="/technologies" active={is('/technologies')} icon={icons.tech}>Technology</NavLink>
            <NavLink href="/commercialization" active={is('/commercialization')} icon={icons.commerce}>Commercialization</NavLink>
          </NavSection>

          <NavSection title="Reports">
            <NavLink href="/reports/research" active={is('/reports/research')} icon={icons.report}>Research</NavLink>
            <NavLink href="/reports/publications" active={is('/reports/publications')} icon={icons.report}>Publications</NavLink>
            <NavLink href="/reports/iec" active={is('/reports/iec')} icon={icons.report}>IEC</NavLink>
            <NavLink href="/reports/innovations" active={is('/reports/innovations')} icon={icons.report}>Innovations</NavLink>
            <NavLink href="/reports/commercialization" active={is('/reports/commercialization')} icon={icons.report}>Commercialization</NavLink>
            <NavLink href="/reports/endorsements" active={is('/reports/endorsements')} icon={icons.report}>Endorsements</NavLink>
          </NavSection>

          {isAdmin && (
            <NavSection title="Administration">
              <NavLink href="/users" active={is('/users')} icon={icons.users}>Users</NavLink>
              <NavLink href="/roles" active={is('/roles')} icon={icons.roles}>Roles</NavLink>
              <NavLink href="/offices" active={is('/offices')} icon={icons.offices}>Offices</NavLink>
              <NavLink href="/colleges" active={is('/colleges')} icon={icons.colleges}>Colleges</NavLink>
            </NavSection>
          )}
        </nav>

        {/* User footer */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-100 flex items-center justify-center font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs text-white truncate">{auth?.user?.first_name} {auth?.user?.last_name}</div>
              <div className="text-[10px] text-emerald-300/60 truncate">{roles[0] || 'User'}</div>
            </div>
            <button
              onClick={() => router.post('/logout')}
              title="Logout"
              className="w-7 h-7 flex items-center justify-center text-emerald-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              {icons.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {icons.menu}
          </button>

          <div className="font-semibold text-slate-700 flex-1 truncate text-sm">{header}</div>

          {/* Search */}
          <form action="/search" method="get" className="hidden md:flex items-center relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              name="q"
              placeholder="Search…"
              className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none w-48 transition-all"
            />
          </form>

          {/* Notifications */}
          <Link href="/notifications" className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" title="Notifications">
            {icons.bell}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </Link>

          {/* Public site */}
          <Link href="/catalog" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
            {icons.globe}
            <span>Public Site</span>
          </Link>
        </header>

        {/* Flash messages */}
        {flash?.success && (
          <div className="mx-4 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            {flash.success}
          </div>
        )}
        {flash?.error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {flash.error}
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full page-fade">{children}</main>
      </div>
    </div>
  );
}
