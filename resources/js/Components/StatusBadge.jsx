export default function StatusBadge({ value }) {
  const style = (v) => {
    if (!v) return 'bg-slate-100 text-slate-500 border-slate-200';
    if (/completed|closed|published|released|approved|commercialized/i.test(v))
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (/pending|submitted|proposed|for /i.test(v))
      return 'bg-amber-50 text-amber-700 border-amber-200';
    if (/processing|review|development|negotiation/i.test(v))
      return 'bg-sky-50 text-sky-700 border-sky-200';
    if (/rejected|revision/i.test(v))
      return 'bg-red-50 text-red-700 border-red-200';
    if (/qr/i.test(v))
      return 'bg-violet-50 text-violet-700 border-violet-200';
    if (/ongoing|active/i.test(v))
      return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };
  if (!value) return null;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${style(value)}`}>
      {value}
    </span>
  );
}
