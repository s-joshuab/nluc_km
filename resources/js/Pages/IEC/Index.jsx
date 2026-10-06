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
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
    </svg>
  ),
};

export default function Index({ rows, isMine }) {
  return (
    <>
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.book}
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  {isMine ? 'My IEC Materials' : 'IEC Materials'}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isMine
                    ? 'Manage information, education, and communication materials.'
                    : 'Manage registered IEC materials and related information.'}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/iec-materials/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm transition"
          >
            {Icons.plus}
            New IEC Material
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Total Materials
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
            title="No IEC materials found"
            hint={
              isMine
                ? 'Your IEC materials will appear here once they are recorded.'
                : 'Create an IEC material record to get started.'
            }
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">
                IEC Material Records
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Information, education, and communication materials
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Material
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Type
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      College
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
                      <td className="px-4 py-3 max-w-md">
                        <div className="font-medium text-slate-800 leading-snug">
                          {r.title}
                        </div>

                        {r.research?.research_code && (
                          <div className="mt-1">
                            <Link
                              href={`/repository/${r.research.id}`}
                              className="font-mono text-[11px] text-emerald-700 hover:text-emerald-900"
                            >
                              {r.research.research_code}
                            </Link>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                          {r.type?.name ?? '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <StatusBadge value={r.status?.name} />
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                          {r.college?.code ?? '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/iec-materials/${r.id}/edit`}
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


Index.layout = (page) => <AuthenticatedLayout header="IEC Materials">{page}</AuthenticatedLayout>;
