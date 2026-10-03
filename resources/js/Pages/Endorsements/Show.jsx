import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
import Timeline from '../../Components/Timeline';
import { useForm } from '@inertiajs/react';
export default function Show({ item, canQrReceived, canQrRelease, canProcess, processingOptions }) {
  const qr = useForm({ reference_number:'', transaction_date:'', transaction_time:'', remarks:'' });
  const st = useForm({ status:'', remarks:'' });
  return (
    <AuthenticatedLayout header={`${item.tracking_number}`}>
      <div className="bg-white border rounded p-4">
        <h1 className="font-semibold">{item.document_title}</h1>
        <div className="text-xs text-gray-500 mt-1">Researcher: {item.researcher?.first_name} {item.researcher?.last_name} • Type: {item.type?.name}</div>
        <div className="mt-2 flex gap-2 items-center text-sm"><span>{item.current_stage?.name}</span><StatusBadge value={item.current_status?.name} /></div>
        <div className="text-xs text-gray-500 mt-1">Submitted: {item.date_submitted} • Received: {item.date_received || '—'} • Forwarded: {item.date_forwarded || '—'}</div>
        {item.remarks && <div className="text-sm text-gray-600 mt-2">Remarks: {item.remarks}</div>}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold text-sm mb-2">Timeline</h3>
          <Timeline histories={item.histories || item.status_history || []} qrs={item.qr_transactions || []} />
          <h3 className="font-semibold text-sm mt-4 mb-2">QR Transactions</h3>
          <div className="space-y-2 text-sm">{(item.qr_transactions||[]).map(q=>(
            <div key={q.id} className="border rounded p-2"><b>{q.type?.name}</b> — {q.reference_number}<div className="text-xs text-gray-500">{q.transaction_date} {q.transaction_time} • {q.office?.name} • by {q.performer?.first_name} {q.performer?.last_name}</div>{q.remarks && <div className="text-xs">{q.remarks}</div>}</div>
          ))}{(item.qr_transactions||[]).length===0 && <div className="text-xs text-gray-500">No QR transactions yet.</div>}</div>
        </div>
        <div className="space-y-4">
          {canProcess && (
            <div className="bg-white border rounded p-4">
              <h3 className="font-semibold text-sm mb-2">RPSU Processing</h3>
              <form onSubmit={(e)=>{e.preventDefault(); st.post(`/endorsements/${item.id}/status`);}} className="space-y-2">
                <select value={st.data.status} onChange={(e)=>st.setData('status',e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm"><option value="">Select status…</option>{processingOptions.map(o=><option key={o} value={o}>{o}</option>)}</select>
                <input value={st.data.remarks} onChange={(e)=>st.setData('remarks',e.target.value)} placeholder="Remarks" className="w-full border rounded px-2 py-1.5 text-sm" />
                <button className="bg-gray-800 text-white text-sm rounded px-3 py-1.5">Update Status</button>
              </form>
              <p className="text-[11px] text-gray-500 mt-2">RPSU statuses: Received by RPSU → Under Processing → For Release → (QR Release) → Forwarded to RECI → Completed.</p>
            </div>
          )}
          {canQrReceived && (
            <div className="bg-purple-50 border border-purple-200 rounded p-4">
              <h3 className="font-semibold text-sm mb-1">QR Received <span className="text-xs font-normal">(encode manual QR from Academic Unit Records Office)</span></h3>
              <form onSubmit={(e)=>{e.preventDefault(); qr.post(`/qr-received/${item.id}`);}} className="space-y-2">
                <input value={qr.data.reference_number} onChange={(e)=>qr.setData('reference_number',e.target.value)} placeholder="QR / Reference number*" className="w-full border rounded px-2 py-1.5 text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={qr.data.transaction_date} onChange={(e)=>qr.setData('transaction_date',e.target.value)} className="border rounded px-2 py-1.5 text-sm" />
                  <input type="time" value={qr.data.transaction_time} onChange={(e)=>qr.setData('transaction_time',e.target.value)} className="border rounded px-2 py-1.5 text-sm" />
                </div>
                <input value={qr.data.remarks} onChange={(e)=>qr.setData('remarks',e.target.value)} placeholder="Remarks" className="w-full border rounded px-2 py-1.5 text-sm" />
                <button className="bg-purple-700 text-white text-sm rounded px-3 py-1.5">Save QR Received</button>
              </form>
            </div>
          )}
          {canQrRelease && (
            <div className="bg-amber-50 border border-amber-200 rounded p-4">
              <h3 className="font-semibold text-sm mb-1">QR Release <span className="text-xs font-normal">(encode manual QR from RPSU Records Office)</span></h3>
              <form onSubmit={(e)=>{e.preventDefault(); qr.post(`/qr-release/${item.id}`);}} className="space-y-2">
                <input value={qr.data.reference_number} onChange={(e)=>qr.setData('reference_number',e.target.value)} placeholder="QR / Reference number*" className="w-full border rounded px-2 py-1.5 text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={qr.data.transaction_date} onChange={(e)=>qr.setData('transaction_date',e.target.value)} className="border rounded px-2 py-1.5 text-sm" />
                  <input type="time" value={qr.data.transaction_time} onChange={(e)=>qr.setData('transaction_time',e.target.value)} className="border rounded px-2 py-1.5 text-sm" />
                </div>
                <input value={qr.data.remarks} onChange={(e)=>qr.setData('remarks',e.target.value)} placeholder="Remarks" className="w-full border rounded px-2 py-1.5 text-sm" />
                <button className="bg-amber-600 text-white text-sm rounded px-3 py-1.5">Save QR Release</button>
              </form>
            </div>
          )}
          {!canQrReceived && !canQrRelease && !canProcess && (
            <div className="bg-white border rounded p-4 text-xs text-gray-500">You can view the status but cannot change it. QR references are encoded by RPSU staff/admin after the manual QR at the records office.</div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
