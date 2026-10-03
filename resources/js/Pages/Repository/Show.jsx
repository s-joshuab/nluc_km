import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
import Timeline from '../../Components/Timeline';
import { useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';
export default function Show({ item, isBookmarked }) {
  const { data, setData, post, processing, errors } = useForm({ file: null, file_type_id: '', access_level_id: '', copyright_status_id: '', usage_permission_id: '', version: '1.0', remarks: '' });
  const [reqFile, setReqFile] = useState(null);
  const [reason, setReason] = useState('');
  const submitFile = (e) => { e.preventDefault(); post(`/research/${item.id}/files`, { forceFormData: true }); };
  const bookmark = () => router.post('/bookmarks/toggle', { research_id: item.id });
  const requestAccess = (fid) => router.post('/access-requests', { research_file_id: fid, reason });
  return (
    <AuthenticatedLayout header={`${item.research_code} — Details`}>
      <div className="bg-white border rounded p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">{item.title}</h1>
            <div className="text-xs text-gray-500 mt-1">{item.research_code} • {item.college?.name} • {item.type?.name} • {item.area?.name}</div>
            <div className="mt-2 flex gap-2"><StatusBadge value={item.status?.name} />{item.sdg_alignment && <StatusBadge value={item.sdg_alignment} />}</div>
          </div>
          <button onClick={bookmark} className="text-sm border rounded px-3 py-1.5">{isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}</button>
        </div>
        <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">{item.abstract}</p>
        <div className="text-xs text-gray-500 mt-2">Keywords: {item.keywords} • Funding: {item.funding_source} ({item.funding_amount}) • {item.start_date} → {item.end_date}</div>
        <div className="mt-3"><h3 className="font-semibold text-sm">Team</h3><div className="text-sm text-gray-700">{item.team?.map(t=><span key={t.id} className="mr-3">{t.user?.first_name} {t.user?.last_name} ({t.role?.name})</span>)}</div></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold text-sm mb-2">Files</h3>
          <div className="space-y-2">
            {(item.files||[]).map(f => (
              <div key={f.id} className="border rounded p-2 text-sm">
                <div className="font-medium">{f.original_name} <StatusBadge value={f.access_level?.name} /></div>
                <div className="text-xs text-gray-500">{f.file_type?.name} • v{f.version} • {(f.file_size/1024).toFixed(1)} KB</div>
                <div className="flex gap-2 mt-1">
                  <a href={`/research-files/${f.id}/download`} className="text-emerald-600 text-xs underline">Download</a>
                  {['Restricted','Metadata Only','RPSU Staff Only'].includes(f.access_level?.name) && (
                    <button onClick={()=>setReqFile(f.id)} className="text-xs text-gray-600 underline">Request access</button>
                  )}
                </div>
                {reqFile===f.id && (
                  <div className="mt-2 flex gap-2">
                    <input value={reason} onChange={(e)=>setReason(e.target.value)} placeholder="Reason" className="border rounded px-2 py-1 text-xs flex-1" />
                    <button onClick={()=>requestAccess(f.id)} className="text-xs bg-gray-800 text-white rounded px-2 py-1">Submit</button>
                  </div>
                )}
              </div>
            ))}
            {(item.files||[]).length===0 && <div className="text-xs text-gray-500">No files yet.</div>}
          </div>
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer text-emerald-600">Upload file (RPSU only)</summary>
            <form onSubmit={submitFile} className="mt-2 space-y-2">
              <input type="file" onChange={(e)=>setData('file', e.target.files[0])} className="text-xs" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="file_type_id" value={data.file_type_id} onChange={(e)=>setData('file_type_id',e.target.value)} className="border rounded px-2 py-1 text-xs" />
                <input placeholder="access_level_id" value={data.access_level_id} onChange={(e)=>setData('access_level_id',e.target.value)} className="border rounded px-2 py-1 text-xs" />
              </div>
              <button disabled={processing} className="bg-emerald-600 text-white text-xs rounded px-3 py-1.5">Upload</button>
            </form>
          </details>
        </div>
        <div className="space-y-4">
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold text-sm mb-2">Related Knowledge</h3>
            <div className="text-sm space-y-1">
              <div>Publications: {(item.publications||[]).map(p=><div key={p.id}>• {p.title} ({p.status?.name})</div>)}</div>
              <div>IEC: {(item.iec_materials||[]).map(m=><div key={m.id}>• {m.title} ({m.status?.name})</div>)}</div>
              <div>Innovations: {(item.innovations||[]).map(m=><div key={m.id}>• {m.title}</div>)}</div>
              <div>Endorsements: {(item.endorsements||[]).map(m=><div key={m.id}><Link className="text-emerald-600 underline" href={`/endorsements/${m.id}`}>{m.tracking_number}</Link> — {m.current_status?.name}</div>)}</div>
            </div>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold text-sm mb-2">Remarks</h3>
            <div className="text-sm text-gray-600">{item.remarks || '—'}</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
