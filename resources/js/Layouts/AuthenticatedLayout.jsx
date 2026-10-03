import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

function NavSection({ title, children }) {
  return (
    <div className="mt-5 px-2">
      <div className="px-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">{title}</div>
      <div className="mt-1.5 space-y-0.5">{children}</div>
    </div>
  );
}
function NavLink({ href, active, children }) {
  return (
    <Link href={href} className={`block px-3 py-2 text-sm rounded-lg transition-colors ${active ? 'bg-emerald-700 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'}`}>{children}</Link>
  );
}

export default function AuthenticatedLayout({ header, children }) {
  const { auth, unreadCount, flash } = usePage().props;
  const [sidebar, setSidebar] = useState(true);
  const roles = auth?.roles || [];
  const offices = auth?.offices || [];
  const isAdmin = auth?.isAdmin;
  const isFac = roles.includes('Research & Publication Facilitator');
  const isResearcher = roles.includes('Researcher');
  const isStaff = roles.includes('RPSU Staff');
  const canRpsu = isAdmin || isFac || isStaff;
  const url = typeof window !== 'undefined' ? window.location.pathname : '';
  const is = (p) => url.startsWith(p);
  return (
    <div className="min-h-screen bg-emerald-50/50 flex">
      {sidebar && (
        <aside className="w-64 bg-white border-r border-emerald-100 min-h-screen flex flex-col sticky top-0 h-screen">
          <div className="p-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center font-bold text-sm">R</div>
              <div>
                <div className="font-bold text-sm leading-tight">DMMMSU-NLUC RPSU</div>
                <div className="text-[11px] text-emerald-100">Knowledge & Research Mgt</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto pb-6">
            <div className="mt-2"><NavLink href="/dashboard" active={url==='/dashboard'}>Dashboard</NavLink></div>
            <NavSection title="Research">
              <NavLink href="/repository" active={is('/repository')}>Research Repository</NavLink>
              {canRpsu && <NavLink href="/research" active={url==='/research'}>Research Records</NavLink>}
              <NavLink href="/my-research" active={is('/my-research')}>My Research</NavLink>
              <NavLink href="/knowledge-resources" active={is('/knowledge-resources')}>Knowledge Resources</NavLink>
            </NavSection>
            <NavSection title="Transactions">
              <NavLink href="/endorsements" active={is('/endorsements')}>Endorsements</NavLink>
              <NavLink href="/my-transactions" active={is('/my-transactions')}>My Transactions</NavLink>
              <NavLink href="/access-requests" active={is('/access-requests')}>Access Requests</NavLink>
              {(auth?.canQrReceived || isAdmin) && <NavLink href="/qr-received" active={is('/qr-received')}>QR Received Queue</NavLink>}
              {(auth?.canQrRelease || isAdmin) && <NavLink href="/qr-release" active={is('/qr-release')}>QR Release Queue</NavLink>}
            </NavSection>
            <NavSection title="Publication & IEC">
              <NavLink href="/publications" active={is('/publications')}>R&E Publication</NavLink>
              <NavLink href="/iec-materials" active={is('/iec-materials')}>IEC Materials</NavLink>
            </NavSection>
            <NavSection title="Innovation">
              <NavLink href="/innovations" active={is('/innovations') && !is('/innovations-create')}>Innovation</NavLink>
              <NavLink href="/technologies" active={is('/technologies')}>Technology</NavLink>
              <NavLink href="/commercialization" active={is('/commercialization')}>Commercialization</NavLink>
            </NavSection>
            <NavSection title="Reports">
              <NavLink href="/reports/research" active={is('/reports/research')}>Research Reports</NavLink>
              <NavLink href="/reports/publications" active={is('/reports/publications')}>Publication Reports</NavLink>
              <NavLink href="/reports/iec" active={is('/reports/iec')}>IEC Reports</NavLink>
              <NavLink href="/reports/innovations" active={is('/reports/innovations')}>Innovation Reports</NavLink>
              <NavLink href="/reports/commercialization" active={is('/reports/commercialization')}>Commercialization Reports</NavLink>
              <NavLink href="/reports/endorsements" active={is('/reports/endorsements')}>Endorsement Reports</NavLink>
            </NavSection>
            {isAdmin && (
              <NavSection title="Administration">
                <NavLink href="/users" active={is('/users')}>Users</NavLink>
                <NavLink href="/roles" active={is('/roles')}>Roles</NavLink>
                <NavLink href="/offices" active={is('/offices')}>Offices</NavLink>
                <NavLink href="/colleges" active={is('/colleges')}>Colleges</NavLink>
              </NavSection>
            )}
          </nav>
          <div className="p-3 border-t border-emerald-100 bg-emerald-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {(auth?.user?.first_name?.[0] || '')}{(auth?.user?.last_name?.[0] || '')}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-gray-800 truncate">{auth?.user?.first_name} {auth?.user?.last_name}</div>
                <div className="text-[11px] text-gray-500 truncate">{roles.join(', ')}</div>
              </div>
            </div>
          </div>
        </aside>
      )}
      <div className="flex-1 min-w-0">
        <header className="bg-white/90 backdrop-blur border-b border-emerald-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setSidebar(!sidebar)} className="px-2.5 py-1.5 border border-emerald-200 rounded-lg text-sm text-emerald-800 hover:bg-emerald-50">☰</button>
          <div className="font-semibold text-gray-800 flex-1 truncate">{header}</div>
          <form action="/search" method="get" className="hidden md:block">
            <input name="q" placeholder="Global search…" className="border border-emerald-200 rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </form>
          <Link href="/notifications" className="relative px-2.5 py-1.5 border border-emerald-200 rounded-lg text-sm hover:bg-emerald-50">🔔{unreadCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full px-1.5">{unreadCount}</span>}</Link>
          <Link href="/catalog" className="text-sm text-emerald-700 hover:underline hidden sm:block">Public Site</Link>
          <Link href="/my-transactions" className="text-sm text-gray-600 hidden sm:block">My Transactions</Link>
          <button onClick={() => router.post('/logout')} className="text-sm px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg">Logout</button>
        </header>
        {flash?.success && <div className="m-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded text-sm">{flash.success}</div>}
        {flash?.error && <div className="m-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">{flash.error}</div>}
        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
