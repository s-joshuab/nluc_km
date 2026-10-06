import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import EmptyState from '../../Components/EmptyState';
import { Link } from '@inertiajs/react';

const Icons = {
  tx: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
};

export default function MyTransactions({ rows }) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.tx}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">My Transactions</h1>
                <p className="text-xs text-slate-400 mt-0.5">Track your endorsement documents from submission to completion.</p>
              </div>
            </div>
          </div>
          <Link
            href="/endorsements/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm transition"
          >
            {Icons.plus}
            New Endorsement
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Total Transactions</div>
            <div className="text-xl font-bold text-slate-800 mt-1">{rows.total ?? 0}</div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Displayed</div>
            <div className="text-xl font-bold text-emerald-700 mt-1">{rows.data?.length ?? 0}</div>
          </div>
          <div className="hidden md:block bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Page</div>
            <div className="text-xl font-bold text-slate-800 mt-1">{rows.current_page ?? 1}</div>
          </div>
        </div>

        {rows.data.length === 0 ? (
          <EmptyState title="No transactions yet" hint="Create an endorsement to start tracking." />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">Transaction Records</h2>
              <p className="text-xs text-slate-400 mt-0.5">Reference number, current status, and document location</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Reference No.</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Location</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Submitted</th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.data.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/my-transactions/${e.id}`} className="font-mono text-xs text-emerald-700 hover:text-emerald-900">{e.tracking_number}</Link>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-medium text-slate-800 leading-snug truncate">{e.research?.title || e.document_title}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap">{e.type?.name ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap"><StatusBadge value={e.current_status?.name} /></td>
                      <td className="px-4 py-3 text-center text-xs font-medium text-slate-600 whitespace-nowrap">{e.current_location?.name || '—'}</td>
                      <td className="px-4 py-3 text-center text-xs text-slate-500 whitespace-nowrap">{e.date_submitted}</td>
                      <td className="px-4 py-3 text-center text-xs text-slate-500 whitespace-nowrap">{e.updated_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Pagination data={rows} />
      </div>
    </>
  );
}


MyTransactions.layout = (page) => <AuthenticatedLayout header="My Transactions">{page}</AuthenticatedLayout>;
