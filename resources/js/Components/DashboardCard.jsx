import { Link } from '@inertiajs/react';

const cardIcons = {
  'Total Research':          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  'Ongoing':                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  'Completed':               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  'Published':               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  'Pending Endorsements':    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  'Newly Submitted':         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  'Received by RPSU':        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/></svg>,
  'Under Processing':        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  'For Release':             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  'Forwarded to RECI':       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  'Completed / Closed':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  'Publications':            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>,
  'IEC Materials':           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  'Innovations':             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
  'Commercialized':          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  'Pending Access Requests': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

const cardColors = {
  'Total Research':          'bg-emerald-50 text-emerald-700',
  'Ongoing':                 'bg-sky-50 text-sky-700',
  'Completed':               'bg-green-50 text-green-700',
  'Published':               'bg-teal-50 text-teal-700',
  'Pending Endorsements':    'bg-amber-50 text-amber-700',
  'Newly Submitted':         'bg-amber-50 text-amber-700',
  'Received by RPSU':        'bg-violet-50 text-violet-700',
  'Under Processing':        'bg-cyan-50 text-cyan-700',
  'For Release':             'bg-orange-50 text-orange-700',
  'Forwarded to RECI':       'bg-indigo-50 text-indigo-700',
  'Completed / Closed':      'bg-slate-100 text-slate-700',
  'Publications':            'bg-sky-50 text-sky-700',
  'IEC Materials':           'bg-orange-50 text-orange-700',
  'Innovations':             'bg-violet-50 text-violet-700',
  'Commercialized':          'bg-emerald-50 text-emerald-700',
  'Pending Access Requests': 'bg-red-50 text-red-700',
};

export default function DashboardCard({ label, value, href }) {
  const icon = cardIcons[label] ?? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  );
  const tone = cardColors[label] ?? 'bg-slate-100 text-slate-700';

  const inner = (
    <div className={`flex h-full min-h-44 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${href ? 'transition-all duration-150 group-hover:border-emerald-300 group-hover:shadow-md' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-base font-semibold leading-snug text-slate-800">{label}</div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`} aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-2">
        <div className="text-4xl font-bold leading-none tracking-tight text-slate-900">{value ?? 0}</div>
        {href && <span className="whitespace-nowrap text-xs font-semibold text-emerald-700 group-hover:text-emerald-900">View →</span>}
      </div>
    </div>
  );

  return href
    ? <Link href={href} className="group block h-full">{inner}</Link>
    : inner;
}
