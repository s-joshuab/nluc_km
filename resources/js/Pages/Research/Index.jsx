import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import EmptyState from '../../Components/EmptyState';
import { Link } from '@inertiajs/react';

const Icons = {
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" strokeLinecap="round" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
    </svg>
  ),
};

export default function Index({ rows }) {
  return (
    <>
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.search}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Research Records</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage and maintain registered research projects
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/research/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium transition shadow-sm"
          >
            {Icons.plus}
            New Research
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Total Records
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.total ?? 0}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Current Page
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.data?.length ?? 0}
            </div>
          </div>

          <div className="hidden md:block bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Records Displayed
            </div>
            <div className="text-xl font-bold text-emerald-700 mt-1">
              {rows.data?.length ?? 0}
            </div>
          </div>
        </div>

        {rows.data.length === 0 ? (
          <EmptyState
            title="No research records yet"
            hint="Create your first research record to get started."
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Research List
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registered research projects and their current status
                </p>
              </div>

              <span className="text-xs text-slate-400">
                {rows.total ?? 0} records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Research
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      College
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {rows.data.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link
                          href={`/repository/${r.id}`}
                          className="font-mono text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                        >
                          {r.research_code}
                        </Link>
                        {r.type?.name && (
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {r.type.name}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 max-w-md">
                        <Link
                          href={`/repository/${r.id}`}
                          className="font-medium text-slate-800 hover:text-emerald-700 transition-colors"
                        >
                          <span className="line-clamp-2 leading-snug">
                            {r.title}
                          </span>
                        </Link>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                          {r.college?.code ?? '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <StatusBadge value={r.status?.name} />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/repository/${r.id}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            {Icons.eye}
                            View
                          </Link>

                          <Link
                            href={`/research/${r.id}/edit`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            {Icons.edit}
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
      </div>
    </>
  );
}


Index.layout = (page) => <AuthenticatedLayout header="Research Records">{page}</AuthenticatedLayout>;
