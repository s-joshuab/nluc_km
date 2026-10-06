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
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" strokeLinecap="round" />
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
                {Icons.cpu}
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Technologies
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage technologies developed from innovations.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/technologies/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm transition"
          >
            {Icons.plus}
            New Technology
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Total Technologies
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.total ?? 0}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Displayed
            </div>
            <div className="text-xl font-bold text-emerald-700 mt-1">
              {rows.data?.length ?? 0}
            </div>
          </div>

          <div className="hidden md:block bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Page
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.current_page ?? 1}
            </div>
          </div>
        </div>

        {rows.data.length === 0 ? (
          <EmptyState
            title="No technologies found"
            hint="Create a technology record to get started."
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">
                Technology Records
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Technologies, parent innovations, readiness levels and statuses
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Technology
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Innovation
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      TRL
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {rows.data.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3 max-w-sm">
                        <div className="font-medium text-slate-800 leading-snug">
                          {r.title}
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-xs">
                        <div className="text-xs text-slate-600 leading-snug">
                          {r.innovation?.title ?? '—'}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <StatusBadge value={r.status?.name} />
                      </td>

                      <td className="px-4 py-3 text-center">
                        {r.technology_readiness_level ? (
                          <span className="inline-flex bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap">
                            {r.technology_readiness_level}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/technologies/${r.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                        >
                          {Icons.edit}
                          Edit
                        </Link>
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


Index.layout = (page) => <AuthenticatedLayout header="Technologies">{page}</AuthenticatedLayout>;
