export default function StatusBadge({ value }) {
  const color = (v) => {
    if (!v) return 'bg-gray-100 text-gray-700';
    if (/completed|closed|published|released|approved|commercialized/i.test(v)) return 'bg-green-100 text-green-800';
    if (/pending|submitted|proposed|for /i.test(v)) return 'bg-yellow-100 text-yellow-800';
    if (/processing|review|development|negotiation/i.test(v)) return 'bg-teal-100 text-teal-800';
    if (/rejected|revision/i.test(v)) return 'bg-red-100 text-red-800';
    if (/qr/i.test(v)) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-700';
  };
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color(value)}`}>{value}</span>;
}
