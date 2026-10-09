import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import DashboardCard from '../../Components/DashboardCard';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';

function SectionCard({ title, icon, children, action }) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 md:px-6">
        <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
          {icon}
          {title}
        </h3>
        {action}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function Stat({ label, value, color = 'text-slate-800' }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-700">{label}</span>
      <span className={`text-base font-bold ${color}`}>{value}</span>
    </div>
  );
}

function BarRow({ label, value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-28 shrink-0 text-sm leading-snug text-slate-700" title={label}>{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-emerald-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-7 text-right text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}

export default function Index({ stats, byCollege, byStatus, byType, byYear, endorseByStatus, my, recentResearch, notifications, tracking, myRoles }) {
  const maxCollege = Math.max(...(byCollege || []).map(c => c.total), 1);
  const maxStatus  = Math.max(...(byStatus  || []).map(s => s.total), 1);
  const maxType    = Math.max(...(byType    || []).map(s => s.total), 1);
  const maxEndorse = Math.max(...(endorseByStatus || []).map(s => s.total), 1);
  const isResearcherOnly = (myRoles || []).length === 1 && myRoles[0] === 'Researcher';
  const isAdmin = (myRoles || []).includes('RPSU Administrator');

  if (isResearcherOnly) {
    return (
      <>
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard
            title="My Summary"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            action={<Link href="/my-research" className="text-sm font-semibold text-emerald-700 hover:underline">View →</Link>}
          >
            <Stat label="My Research"    value={my.research} />
            <Stat label="My Transactions" value={my.transactions} />
            <Stat label="Pending"        value={my.pending} color="text-amber-600" />
            <Stat label="Bookmarks"      value={my.bookmarks} color="text-blue-600" />
          </SectionCard>

          <SectionCard
            title="My Recent Research"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
            action={<Link href="/my-research" className="text-sm font-semibold text-emerald-700 hover:underline">All →</Link>}
          >
            <div className="space-y-2.5">
              {recentResearch.map(r => (
                <Link key={r.id} href={`/repository/${r.id}`} className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-sm font-semibold text-slate-800 transition-colors group-hover:text-emerald-700">{r.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500">{r.research_code}</span>
                      <StatusBadge value={r.status} />
                    </div>
                  </div>
                </Link>
              ))}
              {recentResearch.length === 0 && <p className="text-sm text-slate-600">No research yet.</p>}
            </div>
          </SectionCard>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ── KPI CARDS ─────────────────────────────────────────────────── */}
      {isAdmin && (
        <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm md:flex-row md:items-end md:justify-between md:px-8 md:py-8">
          <div className="max-w-2xl border-l-4 border-emerald-700 pl-5">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">RPSU Administrator</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">Dashboard overview</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">Research, endorsements, and knowledge assets across the campus.</p>
          </div>
          <Link href="/reports" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900">
            View reports →
          </Link>
        </div>
      )}
      <div>
        <h2 className="mb-5 text-xl font-bold text-slate-900">Research Overview</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard label="Total Research" value={stats.totalResearch} href="/repository" />
          <DashboardCard label="Ongoing" value={stats.ongoing} />
          <DashboardCard label="Completed" value={stats.completed} />
          <DashboardCard label="Published" value={stats.published} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Endorsement Workflow</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <DashboardCard label="Newly Submitted" value={stats.newlySubmitted ?? 0} href="/endorsements" />
          <DashboardCard label="Received by RPSU" value={stats.st_ReceivedbyRPSU ?? 0} />
          <DashboardCard label="Under Processing"    value={stats.st_UnderProcessing ?? 0} />
          <DashboardCard label="For Release"   value={stats.st_ForRelease ?? 0} />
          <DashboardCard label="Forwarded to RECI"   value={stats.st_ForwardedEndorsedtoRECI ?? 0} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Knowledge Assets</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard label="Publications"            value={stats.publications}   href="/publications" />
          <DashboardCard label="IEC Materials"           value={stats.iec}            href="/iec-materials" />
          <DashboardCard label="Innovations"             value={stats.innovations}    href="/innovations" />
          <DashboardCard label="Commercialized"          value={stats.commercialized} href="/commercialization" />
        </div>
      </div>

      {/* ── SUMMARY PANELS ────────────────────────────────────────────── */}
      <h2 className="mb-5 mt-12 text-xl font-bold text-slate-900">Activity and tracking</h2>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {/* My Summary */}
        <SectionCard
          title="My Summary"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          action={<Link href="/my-research" className="text-sm font-semibold text-emerald-700 hover:underline">View →</Link>}
        >
          <Stat label="My Research"    value={my.research} />
          <Stat label="My Transactions" value={my.transactions} />
          <Stat label="Pending"        value={my.pending} color="text-amber-600" />
          <Stat label="Bookmarks"      value={my.bookmarks} color="text-blue-600" />
        </SectionCard>

        {/* Document Tracking */}
        <SectionCard
          title="Document Tracking"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
          action={<Link href="/endorsements" className="text-sm font-semibold text-emerald-700 hover:underline">All →</Link>}
        >
          <Stat label="Newly Submitted" value={tracking.newSubmitted} color="text-amber-600" />
          <Stat label="Received by RPSU" value={tracking.received} color="text-emerald-700" />
          <Stat label="Under Processing" value={tracking.processing} />
          <Stat label="For Release" value={tracking.forRelease} color="text-amber-600" />
          <Stat label="Forwarded to RECI" value={tracking.forwarded} />
          <Stat label="Completed" value={tracking.completed} color="text-emerald-700" />
        </SectionCard>

        {/* Recent Research */}
        <SectionCard
          title="Recent Research"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-blue-600"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
          action={<Link href="/repository" className="text-sm font-semibold text-emerald-700 hover:underline">All →</Link>}
        >
          <div className="space-y-2.5">
            {recentResearch.map(r => (
              <Link key={r.id} href={`/repository/${r.id}`} className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <div className="line-clamp-2 text-sm font-semibold text-slate-800 transition-colors group-hover:text-emerald-700">{r.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500">{r.research_code}</span>
                    <StatusBadge value={r.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── BREAKDOWN CHARTS ──────────────────────────────────────────── */}
      <h2 className="mb-5 mt-12 text-xl font-bold text-slate-900">Research breakdown</h2>
      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        <SectionCard
          title="By College"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-teal-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
        >
          {byCollege.map(c => <BarRow key={c.code} label={c.code || c.name} value={c.total} max={maxCollege} />)}
        </SectionCard>

        <SectionCard
          title="By Status"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        >
          {byStatus.map(s => <BarRow key={s.name} label={s.name} value={s.total} max={maxStatus} />)}
        </SectionCard>

        <SectionCard
          title="By Type"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-indigo-600"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
        >
          {byType.map(s => <BarRow key={s.name} label={s.name} value={s.total} max={maxType} />)}
        </SectionCard>

        <SectionCard
          title="Endorsements by Status"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
        >
          {endorseByStatus.map(s => <BarRow key={s.name} label={s.name} value={s.total} max={maxEndorse} />)}
        </SectionCard>
      </div>
    </>
  );
}


Index.layout = (page) => (
  <AuthenticatedLayout header="Dashboard" wide>
    {page}
  </AuthenticatedLayout>
);
