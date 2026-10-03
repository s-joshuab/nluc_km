import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, types, statuses, colleges, researches }) {
  const { data, setData, put, processing } = useForm({ research_id:item.research_id||'', title:item.title||'', description:item.description||'', iec_type_id:item.iec_type_id||'', iec_status_id:item.iec_status_id||'', college_id:item.college_id||'', target_audience:item.target_audience||'', development_date:item.development_date||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header="Edit IEC">
      <form onSubmit={(e)=>{e.preventDefault(); put(`/iec-materials/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Type</label><select value={data.iec_type_id} onChange={(e)=>setData('iec_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status</label><select value={data.iec_status_id} onChange={(e)=>setData('iec_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
