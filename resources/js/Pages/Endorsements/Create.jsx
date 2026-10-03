import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ types, researches }) {
  const { data, setData, post, processing, errors } = useForm({ document_title:'', research_id:'', endorsement_type_id:'', remarks:'' });
  return (
    <AuthenticatedLayout header="New Endorsement">
      <form onSubmit={(e)=>{e.preventDefault(); post('/endorsements');}} className="bg-white border rounded p-4 space-y-3 max-w-2xl">
        <div><label className="text-xs font-medium">Document Title*</label><input value={data.document_title} onChange={(e)=>setData('document_title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors.document_title && <div className="text-xs text-red-600">{errors.document_title}</div>}</div>
        <div><label className="text-xs font-medium">Research (optional)</label><select value={data.research_id} onChange={(e)=>setData('research_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{researches.map(r=><option key={r.id} value={r.id}>{r.research_code} — {r.title}</option>)}</select></div>
        <div><label className="text-xs font-medium">Endorsement Type*</label><select value={data.endorsement_type_id} onChange={(e)=>setData('endorsement_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select>{errors.endorsement_type_id && <div className="text-xs text-red-600">{errors.endorsement_type_id}</div>}</div>
        <div><label className="text-xs font-medium">Remarks</label><textarea value={data.remarks} onChange={(e)=>setData('remarks',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Submit Endorsement</button>
      </form>
    </AuthenticatedLayout>
  );
}
