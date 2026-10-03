import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ statuses, technologies }) {
  const { data, setData, post, processing } = useForm({ technology_id:'', status_id:'', potential_partner:'', industry:'', agreement_reference:'', license_information:'', date_started:'', date_commercialized:'', revenue_value:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New Commercialization Record">
      <form onSubmit={(e)=>{e.preventDefault(); post('/commercialization');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div><label className="text-xs font-medium">Technology*</label><select value={data.technology_id} onChange={(e)=>setData('technology_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{technologies.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status*</label><select value={data.status_id} onChange={(e)=>setData('status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Partner</label><input value={data.potential_partner} onChange={(e)=>setData('potential_partner',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Agreement Ref</label><input value={data.agreement_reference} onChange={(e)=>setData('agreement_reference',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
