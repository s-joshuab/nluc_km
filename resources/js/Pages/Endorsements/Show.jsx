import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
import Timeline from '../../Components/Timeline';
import Modal from '../../Components/Modal';
import WorkflowChecklist from '../../Components/WorkflowChecklist';
import { useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
  'mt-1.5 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

function SectionCard({ title, subtitle, icon, children, action }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-800 truncate">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function MetaItem({ label, children }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-xs font-semibold text-slate-700 mt-0.5 break-words">{children}</div>
    </div>
  );
}

const Icons = {
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
  ),
};

export default function Show({ item, canProcess, processingOptions, flow }) {
  const st = useForm({ status: '', remarks: '', action_taken: '' });
  const doc = useForm({ file: null, remarks: '' });
  const [modal, setModal] = useState(null);

  const submitStatus = (e) => {
    e.preventDefault();
    if (!confirm(`Update status to "${st.data.status}"? This will be recorded in history.`)) return;
    st.post(`/endorsements/${item.id}/status`, { onSuccess: () => { st.reset(); setModal(null); } });
  };

  return (
    <AuthenticatedLayout header={item.tracking_number}>
      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <Link href="/endorsements" className="text-xs text-slate-400 hover:text-emerald-700 transition">
            ← Back to Endorsements
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1">
            <div>
              <div className="font-mono text-xs text-emerald-700">{item.tracking_number}</div>
              <h1 className="text-xl font-bold text-slate-800 mt-1 leading-snug">{item.document_title}</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {item.researcher?.first_name} {item.researcher?.last_name} • {item.type?.name}
                {item.college ? ` • ${item.college.code}` : ''}{item.department ? ` / ${item.department}` : ''}
              </p>
            </div>
            {canProcess && (
              <button
                onClick={() => setModal('process')}
                className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition shrink-0"
              >
                Update Status
              </button>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Current Status</div>
            <div className="mt-2"><StatusBadge value={item.current_status?.name} /></div>
            <div className="text-[11px] text-slate-400 mt-2">
              Submitted: {item.date_submitted || '—'} • Received: {item.date_received || '—'} • Forwarded: {item.date_forwarded || '—'}
            </div>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl shadow-sm p-5">
            <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Current Location</div>
            <div className="font-bold text-emerald-800 mt-1.5">📍 {item.current_location?.name || '—'}</div>
            <div className="text-[11px] text-slate-400 mt-1.5">Physical location of the document</div>
          </div>
        </div>

        {item.remarks && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Remarks</div>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.remarks}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <SectionCard title="Workflow Progress" subtitle="Submission to completion" icon={Icons.chart}>
              <WorkflowChecklist flow={flow || []} currentStatus={item.current_status?.name} histories={item.histories || []} />
            </SectionCard>
            <SectionCard title="Detailed Timeline" subtitle="Every recorded event" icon={Icons.clock}>
              <Timeline histories={item.histories || []} qrs={[]} />
            </SectionCard>
          </div>

          <div className="space-y-4">
            <SectionCard title="Processing History" subtitle="Actions and remarks per update">
              <div className="space-y-3">
                {(item.histories || []).map((h) => (
                  <div key={h.id} className="border-l-2 border-emerald-300 pl-3 py-0.5">
                    <div className="text-sm font-semibold text-slate-800">{h.new_status?.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {h.changed_at}{h.changer ? ` • ${h.changer.first_name} ${h.changer.last_name}` : ''}{h.new_location ? ` • 📍 ${h.new_location.name}` : ''}
                    </div>
                    {h.action_taken && <div className="text-xs text-slate-700 mt-1"><span className="font-semibold">Action:</span> {h.action_taken}</div>}
                    {h.remarks && <div className="text-xs text-slate-400 mt-0.5">{h.remarks}</div>}
                  </div>
                ))}
                {(item.histories || []).length === 0 && <p className="text-xs text-slate-400">No history yet.</p>}
              </div>
            </SectionCard>

            <SectionCard
              title="Supporting Documents"
              subtitle="Attachments for this transaction"
              icon={Icons.file}
            >
              <div className="space-y-2">
                {(item.documents || []).map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-3 border border-slate-200 rounded-xl px-3 py-2.5 hover:border-slate-300 transition">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-700 truncate">{d.original_name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{(d.file_size / 1024).toFixed(1)} KB • {d.uploader?.first_name} {d.uploader?.last_name}</div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <a href={`/endorsement-documents/${d.id}/download`} className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition">Download</a>
                      {canProcess && (
                        <button
                          onClick={() => { if (confirm('Remove this document?')) router.delete(`/endorsement-documents/${d.id}`); }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(item.documents || []).length === 0 && <p className="text-xs text-slate-400">No supporting documents attached.</p>}
              </div>
              {(canProcess || item.researcher?.id) && (
                <form
                  onSubmit={(e) => { e.preventDefault(); doc.post(`/endorsements/${item.id}/documents`, { forceFormData: true, onSuccess: () => doc.reset() }); }}
                  className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2"
                >
                  <input type="file" onChange={(e) => doc.setData('file', e.target.files[0])} className="text-xs flex-1 text-slate-600" />
                  <button className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition">Attach</button>
                </form>
              )}
            </SectionCard>

            <SectionCard title="Record Details" subtitle="Tracking metadata">
              <div className="grid grid-cols-2 gap-4">
                <MetaItem label="College">{item.college ? `${item.college.code} — ${item.college.name}` : '—'}</MetaItem>
                <MetaItem label="Department / Area">{item.department || '—'}</MetaItem>
                <MetaItem label="Endorsement Type">{item.type?.name || '—'}</MetaItem>
                <MetaItem label="Linked Research">{item.research ? `${item.research.research_code}` : '—'}</MetaItem>
              </div>
            </SectionCard>

            {!canProcess && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                <p className="text-xs text-slate-500 leading-relaxed">You can view the status but cannot change it. Only RPSU staff/admin can update the document status and location.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={modal === 'process'} onClose={() => setModal(null)} title="Update Processing Status">
        <form onSubmit={submitStatus} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">New Status*</label>
            <select value={st.data.status} onChange={(e) => st.setData('status', e.target.value)} className={inputClass}>
              <option value="">Select status…</option>
              {(processingOptions || []).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Action Taken</label>
            <textarea value={st.data.action_taken} onChange={(e) => st.setData('action_taken', e.target.value)} rows={2} placeholder="What was done on the document…" className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Remarks</label>
            <input value={st.data.remarks} onChange={(e) => st.setData('remarks', e.target.value)} placeholder="Remarks" className={inputClass} />
          </div>
          <button className="w-full px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition">
            Confirm Update
          </button>
          <p className="text-[11px] text-slate-400">Only valid next steps from "{item.current_status?.name}" are accepted. History is appended, never overwritten.</p>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}
