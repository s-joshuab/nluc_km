import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';

export default function IpRights({ rows, summary, copyrights }) {
  return (
    <PublicLayout>
      <h1 className="text-xl font-bold text-gray-800">Intellectual Property & Copyright</h1>
      <p className="text-sm text-gray-500 mt-1">Innovations, technologies, and copyright status of repository holdings. Detailed documents require login.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        <div className="bg-white border rounded-xl p-4"><div className="text-2xl font-bold">{summary.total}</div><div className="text-xs text-gray-500">Innovations</div></div>
        <div className="bg-white border rounded-xl p-4"><div className="text-2xl font-bold">{summary.protected}</div><div className="text-xs text-gray-500">IP Protected / Copyrighted</div></div>
        <div className="bg-white border rounded-xl p-4"><div className="text-2xl font-bold">{summary.technologies}</div><div className="text-xs text-gray-500">Technologies</div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="font-bold text-sm text-gray-700 mb-2">Innovations</h2>
          <div className="space-y-2">
            {rows.data.map((i) => (
              <div key={i.id} className="bg-white border rounded-xl p-3.5">
                <div className="font-semibold text-sm">{i.title}</div>
                {i.description && <div className="text-xs text-gray-600 mt-1 line-clamp-2">{i.description.slice(0, 200)}</div>}
                <div className="text-xs text-gray-500 mt-1.5">{i.type?.name} • {i.college?.code} • {i.development_date?.slice(0, 4)}</div>
                <div className="mt-1.5"><StatusBadge value={i.ip_status?.name} /></div>
              </div>
            ))}
            {rows.data.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-gray-500 text-sm">No innovations showcased yet.</div>}
          </div>
          <Pagination data={rows} />
        </div>
        <div>
          <h2 className="font-bold text-sm text-gray-700 mb-2">Repository Files by Copyright Status</h2>
          <div className="bg-white border rounded-xl p-4 space-y-3">
            {copyrights.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm"><span className="font-medium">{c.name}</span><span className="font-bold">{c.total}</span></div>
                <div className="text-xs text-gray-500 mt-0.5">{c.description}</div>
                <div className="bg-gray-100 rounded h-2 mt-1"><div className="bg-emerald-500 h-2 rounded" style={{ width: `${Math.min(100, c.total * 10)}%` }} /></div>
              </div>
            ))}
            {copyrights.length === 0 && <div className="text-xs text-gray-400">No files archived yet.</div>}
            <div className="text-xs text-gray-500 border-t pt-3">
              Copyrighted and restricted materials are never publicly downloadable. <Link href="/login" className="text-emerald-600 hover:underline">Login</Link> with an authorized account to request access.
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
