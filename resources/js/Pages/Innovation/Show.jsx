import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
export default function Show({ item }) {
  return (
    <AuthenticatedLayout header={item.title}>
      <div className="bg-white border rounded p-4">
        <div className="text-xs text-gray-500">{item.type?.name} • <StatusBadge value={item.status?.name} /></div>
        <p className="text-sm mt-2">{item.description}</p>
        <h3 className="font-semibold text-sm mt-4">Technologies</h3>
        <div className="space-y-2 mt-1">{(item.technologies||[]).map(t=><div key={t.id} className="border rounded p-2 text-sm"><b>{t.title}</b> — {t.status?.name}<div className="text-xs text-gray-500">TRL: {t.technology_readiness_level} • IP: {t.ip_reference}</div><div className="text-xs mt-1">Commercialization: {(t.commercializations||[]).map(c=><span key={c.id} className="mr-2">{c.status?.name} ({c.potential_partner})</span>)}</div></div>)}
        {(item.technologies||[]).length===0 && <div className="text-xs text-gray-500">No technologies linked. Create one under Technology module.</div>}</div>
      </div>
    </AuthenticatedLayout>
  );
}
