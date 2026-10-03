export default function DashboardCard({ label, value, href }) {
  const inner = (<div className="bg-white rounded-xl border border-emerald-100 border-l-4 border-l-emerald-600 p-4 shadow-sm"><div className="text-2xl font-bold text-gray-800">{value}</div><div className="text-xs text-gray-500 mt-1">{label}</div></div>);
  return href ? <a href={href} className="block transition-transform hover:-translate-y-0.5 hover:shadow-md">{inner}</a> : inner;
}
