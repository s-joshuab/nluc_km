import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';

export default function ResearcherShow({ profile, rows }) {
  return (
    <PublicLayout>
      <div className="text-xs text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/researchers" className="hover:underline">Researchers</Link> / {profile.first_name} {profile.last_name}
      </div>
      <div className="bg-white border rounded-xl p-5 mt-2 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
          {(profile.first_name?.[0] || '')}{(profile.last_name?.[0] || '')}
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">{profile.first_name} {profile.last_name}</h1>
          <div className="text-sm text-gray-500">{profile.college?.name || ''} • {rows.length} {rows.length === 1 ? 'study' : 'studies'} in repository</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {rows.map((r) => (
          <div key={r.id} className="bg-white border rounded-xl p-4">
            <div className="text-[11px] text-gray-500">{r.research_code} • {r.date_submitted?.slice(0, 4)}</div>
            <Link href={`/catalog/${r.id}`} className="font-semibold text-sm hover:text-emerald-700">{r.title}</Link>
            <p className="text-xs text-gray-600 mt-1.5 line-clamp-3">{r.abstract?.slice(0, 200)}{(r.abstract?.length || 0) > 200 ? '…' : ''}</p>
            <div className="mt-2"><StatusBadge value={r.status?.name} /></div>
          </div>
        ))}
      </div>
      {rows.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-500 text-sm mt-4">No studies found.</div>}
    </PublicLayout>
  );
}
