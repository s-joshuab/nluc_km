import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ types, statuses, researches }) {
  const { data, setData, post, processing, errors } = useForm({ research_id:'', title:'', publication_type_id:'', publication_status_id:'', journal:'', publisher:'', publication_date:'', doi:'', url:'', abstract:'', keywords:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New Publication">
      <form onSubmit={(e)=>{e.preventDefault(); post('/publications');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title*</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors.title && <div className="text-xs text-red-600">{errors.title}</div>}</div>
        <div><label className="text-xs font-medium">Research</label><select value={data.research_id} onChange={(e)=>setData('research_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{researches.map(r=><option key={r.id} value={r.id}>{r.research_code} — {r.title?.slice(0,60)}</option>)}</select></div>
        <div><label className="text-xs font-medium">Type*</label><select value={data.publication_type_id} onChange={(e)=>setData('publication_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status*</label><select value={data.publication_status_id} onChange={(e)=>setData('publication_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Journal</label><input value={data.journal} onChange={(e)=>setData('journal',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Publisher</label><input value={data.publisher} onChange={(e)=>setData('publisher',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Date</label><input type="date" value={data.publication_date} onChange={(e)=>setData('publication_date',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">DOI</label><input value={data.doi} onChange={(e)=>setData('doi',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><label className="text-xs font-medium">Abstract</label><textarea value={data.abstract} onChange={(e)=>setData('abstract',e.target.value)} rows={3} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
