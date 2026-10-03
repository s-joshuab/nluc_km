export default function EmptyState({ title='No records', hint }) {
  return <div className="bg-white border rounded p-8 text-center text-gray-500"><div className="font-medium text-gray-700">{title}</div>{hint && <div className="text-sm mt-1">{hint}</div>}</div>;
}
