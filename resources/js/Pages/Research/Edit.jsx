import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, lookups }) {
  const { data, setData, put, processing, errors } = useForm({ research_code:item.research_code||'', title:item.title||'', abstract:item.abstract||'', keywords:item.keywords||'', research_type_id:item.research_type_id||'', research_status_id:item.research_status_id||'', research_area_id:item.research_area_id||'', college_id:item.college_id||'', lead_researcher_id:item.lead_researcher_id||'', start_date:item.start_date||'', end_date:item.end_date||'', funding_source:item.funding_source||'', funding_amount:item.funding_amount||'', sdg_alignment:item.sdg_alignment||'', ip_status_id:item.ip_status_id||'', date_submitted:item.date_submitted||'', date_completed:item.date_completed||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header={`Edit ${item.research_code}`}>
      <form onSubmit={(e)=>{e.preventDefault(); put(`/research/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3">
        {Object.keys(data).map(k=>(
          <div key={k} className={['abstract','remarks'].includes(k)?'md:col-span-2':''}><label className="text-xs font-medium">{k}</label><input value={data[k]||''} onChange={(e)=>setData(k,e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors[k] && <div className="text-xs text-red-600">{errors[k]}</div>}</div>
        ))}
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
