import { Link } from '@inertiajs/react';
export default function Pagination({ data }) {
  if (!data || !data.links) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-4">
      {data.links.map((l, i) => (
        <Link key={i} href={l.url || '#'} preserveScroll className={`px-2.5 py-1 text-sm border rounded ${l.active ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700'} ${!l.url ? 'opacity-40 pointer-events-none' : ''}`} dangerouslySetInnerHTML={{ __html: l.label }} />
      ))}
      <span className="text-xs text-gray-500 ml-2 self-center">Showing {data.from ?? 0}–{data.to ?? 0} of {data.total ?? 0}</span>
    </div>
  );
}
