import StatusBadge from './StatusBadge';
export default function Timeline({ histories = [], qrs = [] }) {
  const events = [
    ...histories.map(h => ({ date: h.changed_at, title: `${h.new_stage?.name || ''} — ${h.new_status?.name || ''}`, by: h.changer ? `${h.changer.first_name} ${h.changer.last_name}` : '', remarks: h.remarks })),
    ...qrs.map(q => ({ date: `${q.transaction_date} ${q.transaction_time || ''}`, title: `${q.type?.name} (${q.reference_number})`, by: q.performer ? `${q.performer.first_name} ${q.performer.last_name}` : '', remarks: `${q.office?.name || ''} ${q.remarks || ''}` })),
  ].sort((a,b) => new Date(a.date) - new Date(b.date));
  if (!events.length) return <div className="text-sm text-gray-500">No timeline events yet.</div>;
  return (
    <ol className="relative border-l border-gray-200 ml-2 space-y-4">
      {events.map((e, i) => (
        <li key={i} className="ml-4">
          <div className="absolute w-3 h-3 bg-emerald-600 rounded-full -left-1.5 mt-1"></div>
          <div className="text-sm font-medium text-gray-800">{e.title}</div>
          <div className="text-xs text-gray-500">{e.date} {e.by ? `• ${e.by}` : ''}</div>
          {e.remarks && <div className="text-xs text-gray-600 mt-0.5">{e.remarks}</div>}
        </li>
      ))}
    </ol>
  );
}
