import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

const Icons = {
  Plus: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  ),
  Filter: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  File: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
};

export default function Index({ rows, filters, statuses, statusCounts }) {
  const [search, setSearch] = useState(filters?.search || '');

  const activeId = filters?.status_id ? Number(filters.status_id) : null;

  const countFor = (id) =>
    statusCounts?.find((c) => c.id === id)?.total || 0;

  const total =
    statusCounts?.reduce((sum, c) => sum + Number(c.total), 0) ||
    rows.total ||
    0;

  const go = (status_id) => {
    router.get(
      '/endorsements',
      {
        ...filters,
        search: search || undefined,
        status_id: status_id || undefined
      },
      {
        preserveState: true,
        preserveScroll: true
      }
    );
  };

  const submitSearch = (e) => {
    e.preventDefault();

    router.get(
      '/endorsements',
      {
        ...filters,
        search: search || undefined,
        status_id: activeId || undefined
      },
      {
        preserveState: true,
        preserveScroll: true
      }
    );
  };

  const clearSearch = () => {
    setSearch('');

    router.get(
      '/endorsements',
      {
        status_id: activeId || undefined
      },
      {
        preserveState: true,
        preserveScroll: true
      }
    );
  };

  return (
    <AuthenticatedLayout header="Research Endorsements">
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Icons.File />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Research Endorsements
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track submitted documents, processing status, and current location.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/endorsements/create"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm transition"
          >
            <Icons.Plus />
            New Endorsement
          </Link>
        </div>

        <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3">
          <form
            onSubmit={submitSearch}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icons.Search />
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reference number, document title, or researcher..."
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg px-4 py-2.5 font-medium"
            >
              <Icons.Search />
              Search
            </button>

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-sm px-3 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3">
          <div className="flex items-center gap-2 mb-2">
            <Icons.Filter />
            <span className="text-xs font-semibold text-gray-700">
              Filter by Status
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => go(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                !activeId
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
              }`}
            >
              All
              <span className="ml-1 opacity-75">({total})</span>
            </button>

            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => go(activeId === s.id ? null : s.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  activeId === s.id
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                {s.name}
                <span className="ml-1 opacity-75">
                  ({countFor(s.id)})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Endorsement Records
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {rows.data?.length || 0} of {rows.total || 0} records
            </p>
          </div>

          {activeId && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <Icons.Filter />
              Status filtered
            </span>
          )}
        </div>

        {rows.data?.length > 0 ? (
          <>
            <div className="hidden lg:block bg-white border border-emerald-100 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-emerald-50/70 border-b border-emerald-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Reference
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Document
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      Updated
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {rows.data.map((e) => (
                    <tr
                      key={e.id}
                      className="hover:bg-emerald-50/30 transition"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/endorsements/${e.id}`}
                          className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm"
                        >
                          {e.tracking_number}
                        </Link>

                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Endorsement #{e.id}
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-md">
                        <Link
                          href={`/endorsements/${e.id}`}
                          className="font-medium text-gray-800 hover:text-emerald-700 line-clamp-1"
                        >
                          {e.document_title}
                        </Link>

                        <div className="text-xs text-gray-500 mt-1">
                          {e.researcher?.first_name} {e.researcher?.last_name}
                          {e.type?.name && ` • ${e.type.name}`}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge value={e.current_status?.name} />
                      </td>

                      <td className="px-4 py-3">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                          <Icons.MapPin />
                          {e.current_location?.name || '—'}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600">
                        <div className="inline-flex items-center gap-1.5">
                          <Icons.Calendar />
                          {e.date_submitted || '—'}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-500">
                        {e.updated_at?.slice(0, 10) || '—'}
                      </td>

                      <td className="px-3 py-3">
                        <Link
                          href={`/endorsements/${e.id}`}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-700 hover:border-emerald-300 transition"
                        >
                          <Icons.ChevronRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-3">
              {rows.data.map((e) => (
                <Link
                  key={e.id}
                  href={`/endorsements/${e.id}`}
                  className="block bg-white border border-emerald-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-emerald-700">
                        {e.tracking_number}
                      </div>

                      <div className="font-semibold text-gray-800 mt-1 line-clamp-2">
                        {e.document_title}
                      </div>
                    </div>

                    <Icons.ChevronRight />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <StatusBadge value={e.current_status?.name} />

                    {e.type?.name && (
                      <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {e.type.name}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">
                        Location
                      </div>

                      <div className="text-xs font-medium text-gray-700 mt-1 flex items-center gap-1">
                        <Icons.MapPin />
                        {e.current_location?.name || '—'}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">
                        Submitted
                      </div>

                      <div className="text-xs font-medium text-gray-700 mt-1">
                        {e.date_submitted || '—'}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-3">
                    {e.researcher?.first_name} {e.researcher?.last_name}
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
              <Icons.File />
            </div>

            <h3 className="font-semibold text-gray-800 mt-3">
              No endorsements found
            </h3>

            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              There are no endorsement records matching the selected filters.
            </p>

            <Link
              href="/endorsements/create"
              className="inline-flex items-center gap-2 mt-4 text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              <Icons.Plus />
              Create new endorsement
            </Link>
          </div>
        )}

        <Pagination data={rows} />
      </div>
    </AuthenticatedLayout>
  );
}