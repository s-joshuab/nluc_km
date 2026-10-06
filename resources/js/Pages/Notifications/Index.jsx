import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { router } from '@inertiajs/react';

const Icons = {
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

export default function Index({ rows }) {
  const items = rows.data ?? [];
  const unread = items.filter((n) => !n.is_read).length;
  const read = items.length - unread;

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.bell}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Notifications</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Updates on your research workflow and account activity.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.post('/notifications/read-all')}
            className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700 text-xs font-medium rounded-lg px-3.5 py-2.5 shadow-sm transition"
          >
            {Icons.check}
            Mark all as read
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Total Notifications
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.total ?? 0}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Unread
            </div>
            <div className="text-xl font-bold text-emerald-700 mt-1">
              {unread}
            </div>
          </div>

          <div className="hidden md:block bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Read
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {read}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="No notifications"
            hint="You're all caught up. New updates will appear here."
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {unread > 0
                  ? `${unread} unread notification${unread === 1 ? '' : 's'}`
                  : 'All notifications have been read'}
              </p>
            </div>

            <div className="divide-y divide-slate-50">
              {items.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3.5 flex gap-3 transition-colors hover:bg-slate-50/70 ${n.is_read ? 'opacity-70' : ''}`}
                >
                  <div className="shrink-0 pt-1.5">
                    {!n.is_read ? (
                      <span className="block w-2 h-2 rounded-full bg-emerald-500" />
                    ) : (
                      <span className="block w-2 h-2 rounded-full bg-slate-200" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-800 leading-snug">
                      {n.title}
                    </div>
                    <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {n.message}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1.5">
                      {n.created_at} • {n.type}
                      {n.link && (
                        <a href={n.link} className="text-emerald-600 hover:text-emerald-800 font-medium ml-1.5 transition-colors">
                          Open →
                        </a>
                      )}
                    </div>
                    {!n.is_read && (
                      <button
                        onClick={() => router.post(`/notifications/${n.id}/read`)}
                        className="inline-flex items-center gap-1 mt-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
                      >
                        {Icons.check}
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Pagination data={rows} />
      </div>
    </>
  );
}


Index.layout = (page) => <AuthenticatedLayout header="Notifications">{page}</AuthenticatedLayout>;
