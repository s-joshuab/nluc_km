import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ types, statuses, colleges, ip, researches, users }) {
  const { data, setData, post, processing, errors } = useForm({ research_id:'', title:'', description:'', innovation_type_id:'', innovation_status_id:'', college_id:'', lead_innovator_id:'', development_date:'', ip_status_id:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New Innovation">
      <form onSubmit={(e)=>{e.preventDefault(); post('/innovations');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title*</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors.title && <div className="text-xs text-red-600">{errors.title}</div>}</div>
        <div><label className="text-xs font-medium">Type*</label><select value={data.innovation_type_id} onChange={(e)=>setData('innovation_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status*</label><select value={data.innovation_status_id} onChange={(e)=>setData('innovation_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Research</label><select value={data.research_id} onChange={(e)=>setData('research_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{researches.map(r=><option key={r.id} value={r.id}>{r.research_code}</option>)}</select></div>
        <div><label className="text-xs font-medium">College</label><select value={data.college_id} onChange={(e)=>setData('college_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{colleges.map(t=><option key={t.id} value={t.id}>{t.code}</option>)}</select></div>
        <div className="md:col-span-2"><label className="text-xs font-medium">Description</label><textarea value={data.description} onChange={(e)=>setData('description',e.target.value)} rows={3} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
