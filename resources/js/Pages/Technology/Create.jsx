import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ statuses, innovations }) {
  const { data, setData, post, processing } = useForm({ innovation_id:'', title:'', description:'', technology_status_id:'', technology_readiness_level:'', ip_reference:'', development_date:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New Technology">
      <form onSubmit={(e)=>{e.preventDefault(); post('/technologies');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div><label className="text-xs font-medium">Innovation*</label><select value={data.innovation_id} onChange={(e)=>setData('innovation_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{innovations.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
        <div><label className="text-xs font-medium">Title*</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Status*</label><select value={data.technology_status_id} onChange={(e)=>setData('technology_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">TRL</label><input value={data.technology_readiness_level} onChange={(e)=>setData('technology_readiness_level',e.target.value)} placeholder="e.g. TRL 6" className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><label className="text-xs font-medium">Description</label><textarea value={data.description} onChange={(e)=>setData('description',e.target.value)} rows={3} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
