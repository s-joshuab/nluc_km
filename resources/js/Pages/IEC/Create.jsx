import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ types, statuses, colleges, researches }) {
  const { data, setData, post, processing, errors } = useForm({ research_id:'', title:'', description:'', iec_type_id:'', iec_status_id:'', college_id:'', target_audience:'', development_date:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New IEC Material">
      <form onSubmit={(e)=>{e.preventDefault(); post('/iec-materials');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title*</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors.title && <div className="text-xs text-red-600">{errors.title}</div>}</div>
        <div><label className="text-xs font-medium">Type*</label><select value={data.iec_type_id} onChange={(e)=>setData('iec_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status*</label><select value={data.iec_status_id} onChange={(e)=>setData('iec_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">College</label><select value={data.college_id} onChange={(e)=>setData('college_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{colleges.map(t=><option key={t.id} value={t.id}>{t.code} — {t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Research</label><select value={data.research_id} onChange={(e)=>setData('research_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{researches.map(r=><option key={r.id} value={r.id}>{r.research_code}</option>)}</select></div>
        <div><label className="text-xs font-medium">Target Audience</label><input value={data.target_audience} onChange={(e)=>setData('target_audience',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Development Date</label><input type="date" value={data.development_date} onChange={(e)=>setData('development_date',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><label className="text-xs font-medium">Description</label><textarea value={data.description} onChange={(e)=>setData('description',e.target.value)} rows={3} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
