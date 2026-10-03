import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import EmptyState from '../../Components/EmptyState';
import { Link } from '@inertiajs/react';

export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Research Records">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Research Records</h2>
          <p className="text-xs text-slate-400 mt-0.5">{rows.total ?? 0} total records</p>
        </div>
        <Link
          href="/research/create"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium transition-colors shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Research
        </Link>
      </div>

      {rows.data.length === 0 ? (
        <EmptyState title="No research records yet" hint="Create your first research record to get started." />
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">College</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.data.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{r.research_code}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 max-w-xs">
                      <span className="line-clamp-2 leading-snug">{r.title}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-md font-medium">
                        {r.college?.code ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge value={r.status?.name} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/repository/${r.id}`}
                          className="text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:underline transition-colors"
                        >
                          View
                        </Link>
                        <span className="text-slate-200">|</span>
                        <Link
                          href={`/research/${r.id}/edit`}
                          className="text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
