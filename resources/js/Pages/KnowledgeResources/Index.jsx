import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
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
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
      <path d="M14 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 20 4" strokeLinecap="round" />
      <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" strokeLinecap="round" />
    </svg>
  ),
};

export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Knowledge Resources">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              {Icons.book}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Knowledge Resources</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage reference materials and other knowledge resources.
              </p>
            </div>
          </div>

          <Link
            href="/knowledge-resources/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm transition"
          >
            {Icons.plus}
            New Resource
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Total Resources
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
            title="No knowledge resources found"
            hint="Create a knowledge resource to get started."
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">
                Resource Records
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Registered knowledge and reference materials
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 p-4">
              {rows.data.map((r) => (
                <div
                  key={r.id}
                  className="border border-slate-100 rounded-xl p-4 hover:border-emerald-200 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-slate-800 leading-snug">
                        {r.title}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="inline-flex bg-slate-100 text-slate-600 text-[11px] px-2 py-1 rounded-md font-medium">
                          {r.type?.name ?? '—'}
                        </span>

                        <span className="inline-flex bg-emerald-50 text-emerald-700 text-[11px] px-2 py-1 rounded-md font-medium">
                          {r.access_level?.name ?? '—'}
                        </span>

                        <span className="inline-flex bg-slate-100 text-slate-500 text-[11px] px-2 py-1 rounded-md font-medium">
                          v{r.version ?? '1.0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
                    {r.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] text-slate-400 truncate">
                      {r.college?.code ?? 'No college assigned'}
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/knowledge-resources/${r.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                      >
                        {Icons.edit}
                        Edit
                      </Link>

                      {r.external_url && (
                        <a
                          href={r.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition"
                        >
                          {Icons.external}
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Pagination data={rows} />
      </div>
    </AuthenticatedLayout>
  );
}