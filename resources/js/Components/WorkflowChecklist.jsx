import StatusBadge from './StatusBadge';

// 8-step canonical checklist: ✓ done, → current, ○ pending
export default function WorkflowChecklist({ flow = [], currentStatus, histories = [] }) {
  const reached = new Set((histories || []).map((h) => h.new_status?.name).filter(Boolean));
  if (currentStatus) reached.add(currentStatus);
  const currentIdx = flow.indexOf(currentStatus);
  return (
    <ol className="space-y-0">
      {flow.map((step, i) => {
        const done = reached.has(step) && i < currentIdx;
        const current = step === currentStatus;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? 'bg-emerald-600 text-white' : current ? 'bg-amber-400 text-white ring-4 ring-amber-100' : 'bg-gray-100 text-gray-400'}`}>
                {done ? '✓' : current ? '→' : '○'}
              </div>
              {i < flow.length - 1 && <div className={`w-0.5 flex-1 min-h-3 ${i < currentIdx ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
            </div>
            <div className="pb-4">
              <div className={`text-sm ${current ? 'font-bold text-gray-800' : done ? 'font-medium text-gray-700' : 'text-gray-400'}`}>{step}</div>
              {current && <div className="mt-0.5"><StatusBadge value="current" /></div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
