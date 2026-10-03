import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ lookups }) {
  const { data, setData, post, processing, errors } = useForm({ research_code:'', title:'', abstract:'', keywords:'', research_type_id:'', research_status_id:'', research_area_id:'', college_id:'', lead_researcher_id:'', start_date:'', end_date:'', funding_source:'', funding_amount:'', sdg_alignment:'', ip_status_id:'', date_submitted:'', remarks:'' });
  const field = (k, label, type='text') => (
    <div><label className="text-xs font-medium">{label}</label><input type={type} value={data[k]||''} onChange={(e)=>setData(k,e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" />{errors[k] && <div className="text-xs text-red-600">{errors[k]}</div>}</div>
  );
  const sel = (k, label, opts) => (
    <div><label className="text-xs font-medium">{label}</label><select value={data[k]||''} onChange={(e)=>setData(k,e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{opts.map(o=><option key={o.id} value={o.id}>{o.code ? `${o.code} — ${o.name}` : o.name}</option>)}</select>{errors[k] && <div className="text-xs text-red-600">{errors[k]}</div>}</div>
  );
  return (
    <AuthenticatedLayout header="New Research">
      <form onSubmit={(e)=>{e.preventDefault(); post('/research');}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3">
        {field('research_code','Research Code*')}{field('title','Title*')}
        {sel('research_type_id','Type*',lookups.types)}{sel('research_status_id','Status*',lookups.statuses)}
        {sel('research_area_id','Area',lookups.areas)}{sel('college_id','College',lookups.colleges)}
        {sel('lead_researcher_id','Lead Researcher',lookups.users.map(u=>({id:u.id, name:`${u.first_name} ${u.last_name} (${u.email})`})))}{sel('ip_status_id','IP Status',lookups.ip)}
        {field('start_date','Start Date','date')}{field('end_date','End Date','date')}
        {field('funding_source','Funding Source')}{field('funding_amount','Funding Amount','number')}
        {field('sdg_alignment','SDG Alignment')}{field('date_submitted','Date Submitted','date')}
        <div className="md:col-span-2"><label className="text-xs font-medium">Abstract</label><textarea value={data.abstract} onChange={(e)=>setData('abstract',e.target.value)} rows={4} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2">{field('keywords','Keywords (comma separated)')}</div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save Research</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
