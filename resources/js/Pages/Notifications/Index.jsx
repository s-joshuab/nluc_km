import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { router } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Notifications">
      <button onClick={() => router.post('/notifications/read-all')} className="mb-3 text-xs border rounded px-3 py-1.5 bg-white">Mark all as read</button>
      <div className="space-y-2">{rows.data.map(n => (
        <div key={n.id} className={`bg-white border rounded p-3 ${n.is_read ? 'opacity-70' : ''}`}>
          <div className="text-sm font-medium">{n.title}</div>
          <div className="text-xs text-gray-600">{n.message}</div>
          <div className="text-[11px] text-gray-400 mt-1">{n.created_at} • {n.type} {n.link && <a href={n.link} className="text-emerald-600 underline ml-1">Open</a>}</div>
          {!n.is_read && <button onClick={() => router.post(`/notifications/${n.id}/read`)} className="text-xs underline mt-1">Mark read</button>}
        </div>
      ))}
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
