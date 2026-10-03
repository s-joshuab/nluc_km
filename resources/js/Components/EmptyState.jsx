export default function EmptyState({ title = 'No records found', hint, icon }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-10 text-center shadow-sm">
      <div className="flex items-center justify-center mb-4">
        {icon ?? (
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-slate-400">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
          </div>
        )}
      </div>
      <div className="font-semibold text-slate-700 text-base">{title}</div>
      {hint && <div className="text-sm text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">{hint}</div>}
    </div>
  );
}
