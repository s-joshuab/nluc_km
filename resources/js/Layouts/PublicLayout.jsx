import { Link, usePage } from '@inertiajs/react';

function NavLink({ href, children }) {
  const url = typeof window !== 'undefined' ? window.location.pathname : '';
  const active = url === href || (href !== '/' && url.startsWith(href));
  return (
    <Link href={href} className={`px-3 py-2 text-sm rounded-md ${active ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
      {children}
    </Link>
  );
}

export default function PublicLayout({ children }) {
  const { auth } = usePage().props;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-700 text-white rounded-lg flex items-center justify-center font-bold text-sm">RPSU</div>
            <div className="leading-tight">
              <div className="font-bold text-sm text-emerald-800">DMMMSU-NLUC RPSU</div>
              <div className="text-[11px] text-gray-500">Knowledge & Research Management System</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/catalog">Research</NavLink>
            <NavLink href="/researchers">Researchers</NavLink>
            <NavLink href="/showcase/publications">Publications</NavLink>
            <NavLink href="/showcase/ip-rights">IP & Copyright</NavLink>
          </nav>
          <div className="flex-1" />
          <form action="/catalog" method="get" className="hidden sm:block">
            <input name="search" placeholder="Search research…" className="border rounded-md px-3 py-1.5 text-sm w-48" />
          </form>
          {auth?.user ? (
            <Link href="/dashboard" className="text-sm px-4 py-2 bg-gray-800 text-white rounded-md">Dashboard</Link>
          ) : (
            <Link href="/login" className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-md">Login</Link>
          )}
        </div>
        <nav className="md:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/catalog">Research</NavLink>
          <NavLink href="/researchers">Researchers</NavLink>
          <NavLink href="/showcase/publications">Publications</NavLink>
          <NavLink href="/showcase/ip-rights">IP & Copyright</NavLink>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">{children}</main>
      <footer className="bg-gray-900 text-gray-300 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-bold text-white">DMMMSU – North La Union Campus</div>
            <div className="mt-1">Research and Publication Services Unit (RPSU)</div>
            <div className="text-xs text-gray-400 mt-2">Centralized Knowledge Management & Research Management System — from knowledge creation to utilization.</div>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Explore</div>
            <div className="space-y-1">
              <div><Link href="/catalog" className="hover:underline">Research Catalog</Link></div>
              <div><Link href="/researchers" className="hover:underline">Researchers</Link></div>
              <div><Link href="/showcase/publications" className="hover:underline">Publications</Link></div>
              <div><Link href="/showcase/ip-rights" className="hover:underline">IP & Copyright</Link></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Access</div>
            <div className="text-xs">Abstracts and basic metadata are open to the public. Full records and file downloads require an authorized NLUC account.</div>
            <Link href="/login" className="inline-block mt-2 text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-md">Login for full access</Link>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center text-xs py-3 text-gray-400">© DMMMSU-NLUC RPSU Knowledge Management System</div>
      </footer>
    </div>
  );
}
