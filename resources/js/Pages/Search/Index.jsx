import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
export default function Index({ q, results }) {
  const sec = (title, items, base) => (
    <div className="bg-white border rounded p-3">
      <h3 className="font-semibold text-sm mb-2">{title} ({items.length})</h3>
      {items.map(i => <Link key={i.id} href={`/${base}/${i.id}`} className="block text-sm text-emerald-600 underline">{i.research_code ? `${i.research_code} — ` : ''}{i.title}</Link>)}
      {items.length === 0 && <div className="text-xs text-gray-400">No matches.</div>}
    </div>
  );
  return (
    <AuthenticatedLayout header={`Search: ${q}`}>
      <div className="grid md:grid-cols-2 gap-3">
        {sec('Research', results.research, 'repository')}
        {sec('Publications', results.publications, 'publications')}
        {sec('IEC', results.iec, 'iec-materials')}
        {sec('Innovations', results.innovations, 'innovations')}
        {sec('Technologies', results.technologies, 'technologies')}
        {sec('Resources', results.resources, 'knowledge-resources')}
      </div>
    </AuthenticatedLayout>
  );
}
