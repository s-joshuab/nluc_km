import { Link, usePage, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const icons = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,

  repository: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,

  records: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,

  myresearch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,

  knowledge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,

  endorse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,

  tx: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,

  pub: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>,

  iec: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,

  innovation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,

  tech: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,

  commerce: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,

  report: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,

  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,

  roles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,

  offices: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,

  colleges: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,

  profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,

  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V22h-2.54v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 17a1.7 1.7 0 0 0-1.56-1.03H6V13.4h.54A1.7 1.7 0 0 0 8.1 12.37a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.47 7.5V7h2.54v.5a1.7 1.7 0 0 0 1.03 1.53 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03H22v2.54h-.5A1.7 1.7 0 0 0 19.4 15z"/></svg>,

  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,

  chevronDown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="6 9 12 15 18 9"/></svg>,

  chevronRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>,

  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,

  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,

  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
};

function NavSection({ title, children, collapsed }) {
  return (
    <div className="mt-4 px-3">
      {!collapsed && (
        <div className="px-2 py-1 text-[10px] font-bold tracking-widest text-emerald-300/70 uppercase">
          {title}
        </div>
      )}
      <div className="mt-1 space-y-0.5">{children}</div>
    </div>
  );
}

function NavLink({ href, active, icon, children, collapsed, badge }) {
  return (
    <Link
      href={href}
      title={collapsed ? children : undefined}
      className={`flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2.5 text-sm rounded-lg transition-all duration-150 group relative
        ${active
          ? 'bg-emerald-500/20 text-emerald-100 font-medium border border-emerald-500/30'
          : 'text-emerald-100/70 hover:bg-white/5 hover:text-emerald-100'
        }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-400 rounded-r-full" />
      )}

      <span className={`${active ? 'text-emerald-300' : 'text-emerald-400/60 group-hover:text-emerald-300'} transition-colors`}>
        {icon}
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 leading-tight">{children}</span>

          {badge != null && badge > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none min-w-[18px] text-center">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export default function AuthenticatedLayout({ header, children }) {
  const { auth, unreadCount, flash } = usePage().props;

  const [sidebar, setSidebar] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);

  const profileRef = useRef(null);

  const roles = auth?.roles || [];
  const isAdmin = auth?.isAdmin;
  const isFac = roles.includes('Research & Publication Facilitator');
  const isStaff = roles.includes('RPSU Staff');
  const isResearcher = roles.includes('Researcher');
  const canRpsu = isAdmin || isFac || isStaff;

  const url = typeof window !== 'undefined' ? window.location.pathname : '';

  const is = (p) => url.startsWith(p);

  const initials = `${auth?.user?.first_name?.[0] || ''}${auth?.user?.last_name?.[0] || ''}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
        setAdministrationOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        setAdministrationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeProfile = () => {
    setProfileOpen(false);
    setAdministrationOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${sidebar ? 'w-64' : 'w-[72px]'} transition-all duration-300 bg-gradient-to-b from-emerald-950 to-emerald-900 min-h-screen flex flex-col sticky top-0 h-screen shadow-xl shrink-0 print:hidden`}
      >
        <div className={`${sidebar ? 'px-4' : 'px-3'} pt-5 pb-4 border-b border-white/10`}>
          <div className={`flex items-center ${sidebar ? 'gap-3' : 'justify-center'}`}>
            <div className="w-9 h-9 bg-emerald-400/20 border border-emerald-400/30 rounded-xl flex items-center justify-center font-bold text-xs text-emerald-200 shrink-0">
              KM
            </div>

            {sidebar && (
              <div className="min-w-0">
                <div className="font-bold text-sm text-white leading-tight truncate">
                  DMMMSU-NLUC RPSU
                </div>
                <div className="text-[10px] text-emerald-300/70 truncate">
                  Knowledge Management
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pb-4 pt-2">
          <div className="px-3 mt-2">
            <NavLink
              href="/dashboard"
              active={url === '/dashboard'}
              icon={icons.dashboard}
              collapsed={!sidebar}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/profile"
              active={is('/profile')}
              icon={icons.profile}
              collapsed={!sidebar}
            >
              My Profile
            </NavLink>
          </div>

          <NavSection title="Research" collapsed={!sidebar}>
            <NavLink
              href="/repository"
              active={is('/repository')}
              icon={icons.repository}
              collapsed={!sidebar}
            >
              Research Repository
            </NavLink>

            {canRpsu && (
              <NavLink
                href="/research"
                active={url === '/research'}
                icon={icons.records}
                collapsed={!sidebar}
              >
                Research Records
              </NavLink>
            )}

            <NavLink
              href="/knowledge-resources"
              active={is('/knowledge-resources')}
              icon={icons.knowledge}
              collapsed={!sidebar}
            >
              Knowledge Resources
            </NavLink>
          </NavSection>

          {isResearcher && (
            <NavSection title="My Workspace" collapsed={!sidebar}>
              <NavLink
                href="/my-research"
                active={is('/my-research')}
                icon={icons.myresearch}
                collapsed={!sidebar}
              >
                My Research
              </NavLink>

              <NavLink
                href="/my-transactions"
                active={is('/my-transactions')}
                icon={icons.tx}
                collapsed={!sidebar}
              >
                My Transactions
              </NavLink>

              <NavLink
                href="/my-publications"
                active={is('/my-publications')}
                icon={icons.pub}
                collapsed={!sidebar}
              >
                My Publications
              </NavLink>

              <NavLink
                href="/my-iec-materials"
                active={is('/my-iec-materials')}
                icon={icons.iec}
                collapsed={!sidebar}
              >
                My IEC Materials
              </NavLink>

              <NavLink
                href="/my-innovations"
                active={is('/my-innovations')}
                icon={icons.innovation}
                collapsed={!sidebar}
              >
                My Innovations
              </NavLink>
            </NavSection>
          )}

          <NavSection title="Transactions" collapsed={!sidebar}>
            <NavLink
              href="/endorsements"
              active={is('/endorsements')}
              icon={icons.endorse}
              collapsed={!sidebar}
            >
              Endorsements
            </NavLink>
          </NavSection>

          <NavSection title="Publication & IEC" collapsed={!sidebar}>
            <NavLink
              href="/publications"
              active={is('/publications')}
              icon={icons.pub}
              collapsed={!sidebar}
            >
              R&E Publication
            </NavLink>

            <NavLink
              href="/iec-materials"
              active={is('/iec-materials')}
              icon={icons.iec}
              collapsed={!sidebar}
            >
              IEC Materials
            </NavLink>
          </NavSection>

          <NavSection title="Innovation" collapsed={!sidebar}>
            <NavLink
              href="/innovations"
              active={is('/innovations') && !is('/innovations-create')}
              icon={icons.innovation}
              collapsed={!sidebar}
            >
              Innovation
            </NavLink>

            <NavLink
              href="/technologies"
              active={is('/technologies')}
              icon={icons.tech}
              collapsed={!sidebar}
            >
              Technology
            </NavLink>

            <NavLink
              href="/commercialization"
              active={is('/commercialization')}
              icon={icons.commerce}
              collapsed={!sidebar}
            >
              Commercialization
            </NavLink>
          </NavSection>

          <NavSection title="Reports" collapsed={!sidebar}>
            <NavLink
              href="/reports"
              active={is('/reports')}
              icon={icons.report}
              collapsed={!sidebar}
            >
              Reports & Analytics
            </NavLink>
          </NavSection>
        </nav>

        <div
          ref={profileRef}
          className="relative border-t border-white/10 p-3"
        >
          {profileOpen && (
            <div
              className={`absolute bottom-full mb-2 ${sidebar ? 'left-3 right-3' : 'left-2 w-56'} bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50`}
            >
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-800 truncate">
                      {auth?.user?.first_name} {auth?.user?.last_name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {roles[0] || 'User'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-1.5">
                <Link
                  href="/profile"
                  onClick={closeProfile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-slate-400">
                    {icons.profile}
                  </span>
                  <span className="flex-1">My Profile</span>
                </Link>

                {isAdmin && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setAdministrationOpen(!administrationOpen)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        administrationOpen
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-700'
                      }`}
                    >
                      <span className={administrationOpen ? 'text-emerald-600' : 'text-slate-400'}>
                        {icons.settings}
                      </span>

                      <span className="flex-1 text-left">
                        Administration
                      </span>

                      <span className={`transition-transform ${administrationOpen ? 'rotate-90' : ''}`}>
                        {icons.chevronRight}
                      </span>
                    </button>

                    {administrationOpen && (
                      <div className="mt-1 ml-3 pl-3 border-l border-slate-200 space-y-0.5">
                        <Link
                          href="/users"
                          onClick={closeProfile}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {icons.users}
                          <span>Users</span>
                        </Link>

                        <Link
                          href="/roles"
                          onClick={closeProfile}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {icons.roles}
                          <span>Roles</span>
                        </Link>

                        <Link
                          href="/offices"
                          onClick={closeProfile}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {icons.offices}
                          <span>Offices</span>
                        </Link>

                        <Link
                          href="/colleges"
                          onClick={closeProfile}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {icons.colleges}
                          <span>Colleges</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => router.post('/logout')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span className="text-slate-400">
                    {icons.logout}
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              if (profileOpen) {
                setAdministrationOpen(false);
              }
            }}
            className={`w-full flex items-center ${
              sidebar ? 'gap-2.5 px-2' : 'justify-center px-1'
            } py-2 rounded-xl hover:bg-white/5 transition-colors`}
            title={!sidebar ? `${auth?.user?.first_name} ${auth?.user?.last_name}` : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-100 flex items-center justify-center font-bold text-xs shrink-0">
              {initials}
            </div>

            {sidebar && (
              <>
                <div className="min-w-0 flex-1 text-left">
                  <div className="font-medium text-xs text-white truncate">
                    {auth?.user?.first_name} {auth?.user?.last_name}
                  </div>
                  <div className="text-[10px] text-emerald-300/60 truncate">
                    {roles[0] || 'User'}
                  </div>
                </div>

                <span className="text-emerald-300/50">
                  {icons.chevronDown}
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm print:hidden">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {icons.menu}
          </button>

          <div className="font-semibold text-slate-700 flex-1 truncate text-sm">
            {header}
          </div>

          <form action="/search" method="get" className="hidden md:flex items-center relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>

            <input
              name="q"
              placeholder="Search…"
              className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none w-48 transition-all"
            />
          </form>

          <Link
            href="/notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            title="Notifications"
          >
            {icons.bell}

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </Link>

          <Link
            href="/catalog"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {icons.globe}
            <span>Public Site</span>
          </Link>
        </header>

        {flash?.success && (
          <div className="mx-4 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4 shrink-0 text-emerald-600"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4 shrink-0 text-red-500"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {flash.error}
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full page-fade">
          {children}
        </main>
      </div>
    </div>
  );
}