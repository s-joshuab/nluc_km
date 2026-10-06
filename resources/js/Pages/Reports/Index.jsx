import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import EmptyState from '../../Components/EmptyState';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const TABS = [
  { key: 'research', label: 'Research' },
  { key: 'publications', label: 'Publications' },
  { key: 'iec', label: 'IEC Materials' },
  { key: 'innovations', label: 'Innovations' },
  { key: 'commercialization', label: 'Commercialization' },
  { key: 'endorsements', label: 'Endorsements' },
];

const Icons = {
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
};

const sel =
  'border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

const money = (v) => (v == null || v === '' ? '—' : `₱${Number(v).toLocaleString()}`);

function Cells({ tab, r }) {
  const td = 'px-4 py-3 text-xs text-slate-600';
  const sub = 'text-[11px] text-slate-400';
  switch (tab) {
    case 'research':
      return (<>
        <td className="px-4 py-3"><span className="font-mono text-xs text-emerald-700">{r.research_code}</span></td>
        <td className="px-4 py-3 max-w-sm"><span className="font-medium text-slate-800 leading-snug">{r.title}</span></td>
        <td className={td}>{r.college}</td>
        <td className={td}>{r.type}</td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={td}>{r.lead_researcher}</td>
        <td className={`${td} whitespace-nowrap`}>{r.date_submitted?.slice(0, 10)}</td>
      </>);
    case 'publications':
      return (<>
        <td className="px-4 py-3 max-w-sm"><span className="font-medium text-slate-800 leading-snug">{r.title}</span><div className={sub}>{r.research_code}</div></td>
        <td className={td}>{r.type}</td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={td}>{r.journal || '—'}</td>
        <td className={`${td} whitespace-nowrap`}>{r.publication_date?.slice(0, 10) || '—'}</td>
      </>);
    case 'iec':
      return (<>
        <td className="px-4 py-3"><span className="font-medium text-slate-800">{r.title}</span></td>
        <td className={td}>{r.type}</td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={td}>{r.college || '—'}</td>
        <td className={td}>{r.target_audience || '—'}</td>
      </>);
    case 'innovations':
      return (<>
        <td className="px-4 py-3"><span className="font-medium text-slate-800">{r.title}</span></td>
        <td className={td}>{r.type}</td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={td}>{r.college || '—'}</td>
        <td className={`${td} whitespace-nowrap`}>{r.development_date?.slice(0, 10) || '—'}</td>
      </>);
    case 'commercialization':
      return (<>
        <td className="px-4 py-3"><span className="font-medium text-slate-800">{r.technology}</span></td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={td}>{r.potential_partner || '—'}</td>
        <td className={td}>{r.agreement_reference || '—'}</td>
        <td className="px-4 py-3 text-xs text-slate-600 text-right whitespace-nowrap">{money(r.revenue_value)}</td>
      </>);
    case 'endorsements':
      return (<>
        <td className="px-4 py-3"><span className="font-mono text-xs text-emerald-700">{r.tracking_number}</span></td>
        <td className="px-4 py-3 max-w-sm"><span className="font-medium text-slate-800 leading-snug">{r.document_title}</span></td>
        <td className={td}>{r.stage}</td>
        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge value={r.status} /></td>
        <td className={`${td} whitespace-nowrap`}>{r.date_submitted?.slice(0, 10)}</td>
      </>);
    default:
      return null;
  }
}

const HEADERS = {
  research: ['Code', 'Title', 'College', 'Type', 'Status', 'Lead Researcher', 'Submitted'],
  publications: ['Title', 'Type', 'Status', 'Journal', 'Date'],
  iec: ['Title', 'Type', 'Status', 'College', 'Target Audience'],
  innovations: ['Title', 'Type', 'Status', 'College', 'Developed'],
  commercialization: ['Technology', 'Status', 'Partner', 'Agreement', 'Revenue'],
  endorsements: ['Tracking No.', 'Document', 'Stage', 'Status', 'Submitted'],
};

export default function Index({ tab, rows, filters, lookups, counts }) {
  const [f, setF] = useState(filters || { tab });
  const go = (patch) => router.get('/reports', { ...f, tab, ...patch }, { preserveState: true, preserveScroll: true, only: ['rows'] });
  const switchTab = (t) => router.get('/reports', { tab: t }, { preserveState: false });

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.report}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Reports & Analytics</h1>
                <p className="text-xs text-slate-400 mt-0.5">Live records from the system database. Filter, review, and print.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium shadow-sm transition print:hidden"
          >
            {Icons.print}
            Print
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => switchTab(t.key)}
              className={`text-left rounded-xl border p-4 shadow-sm transition ${tab === t.key ? 'bg-emerald-700 border-emerald-700' : 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow'}`}
            >
              <div className={`text-xl font-bold ${tab === t.key ? 'text-white' : 'text-slate-800'}`}>{counts?.[t.key] ?? 0}</div>
              <div className={`text-[11px] uppercase tracking-wide font-semibold mt-0.5 ${tab === t.key ? 'text-emerald-100' : 'text-slate-400'}`}>{t.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden print:hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => switchTab(t.key)}
                className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${tab === t.key ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); go({}); }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            <input placeholder="Keyword search…" value={f.search || ''} onChange={(e) => setF({ ...f, search: e.target.value })} className={sel} />
            {(tab === 'research' || tab === 'iec' || tab === 'innovations') && (
              <select value={f.college_id || ''} onChange={(e) => setF({ ...f, college_id: e.target.value })} className={sel}>
                <option value="">All Colleges</option>
                {lookups.colleges.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
              </select>
            )}
            {tab === 'research' && (
              <>
                <select value={f.research_type_id || ''} onChange={(e) => setF({ ...f, research_type_id: e.target.value })} className={sel}>
                  <option value="">All Types</option>
                  {lookups.types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <select value={f.research_status_id || ''} onChange={(e) => setF({ ...f, research_status_id: e.target.value })} className={sel}>
                  <option value="">All Statuses</option>
                  {lookups.statuses.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </>
            )}
            {tab === 'endorsements' && (
              <>
                <select value={f.stage_id || ''} onChange={(e) => setF({ ...f, stage_id: e.target.value })} className={sel}>
                  <option value="">All Stages</option>
                  {lookups.stages.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <select value={f.status_id || ''} onChange={(e) => setF({ ...f, status_id: e.target.value })} className={sel}>
                  <option value="">All Statuses</option>
                  {lookups.wstatuses.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </>
            )}
            {(tab === 'research' || tab === 'endorsements' || tab === 'publications') && (
              <>
                <input type="date" value={f.date_from || ''} onChange={(e) => setF({ ...f, date_from: e.target.value })} className={sel} />
                <input type="date" value={f.date_to || ''} onChange={(e) => setF({ ...f, date_to: e.target.value })} className={sel} />
              </>
            )}
            <div className="flex gap-2">
              <button className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm px-4 py-2.5 font-medium shadow-sm transition">Apply Filters</button>
              <button type="button" onClick={() => switchTab(tab)} className="px-4 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition">Reset</button>
            </div>
          </form>
        </div>

        {rows.data.length === 0 ? (
          <EmptyState title="No records found" hint="Try adjusting the filters for this report." />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">{TABS.find((t) => t.key === tab)?.label} Report</h2>
                <p className="text-xs text-slate-400 mt-0.5">{rows.total} record{rows.total === 1 ? '' : 's'} found</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {HEADERS[tab].map((h) => <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.data.map((r, i) => <tr key={r.id || i} className="hover:bg-slate-50/70 transition-colors"><Cells tab={tab} r={r} /></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="print:hidden"><Pagination data={rows} /></div>
      </div>
    </>
  );
}


Index.layout = (page) => <AuthenticatedLayout header="Reports & Analytics">{page}</AuthenticatedLayout>;
