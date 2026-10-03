import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, statuses, technologies }) {
  const { data, setData, put, processing } = useForm({ technology_id:item.technology_id||'', status_id:item.status_id||'', potential_partner:item.potential_partner||'', industry:item.industry||'', agreement_reference:item.agreement_reference||'', license_information:item.license_information||'', date_started:item.date_started||'', date_commercialized:item.date_commercialized||'', revenue_value:item.revenue_value||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header="Edit Commercialization">
      <form onSubmit={(e)=>{e.preventDefault(); put(`/commercialization/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div><label className="text-xs font-medium">Status</label><select value={data.status_id} onChange={(e)=>setData('status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Partner</label><input value={data.potential_partner} onChange={(e)=>setData('potential_partner',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
