import { router } from '@inertiajs/react';
import { useState } from 'react';
export default function SearchInput({ value='', placeholder='Search…' }) {
  const [v, setV] = useState(value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.get(window.location.pathname, { search: v }, { preserveState: true }); }} className="flex gap-2">
      <input value={v} onChange={(e)=>setV(e.target.value)} placeholder={placeholder} className="border rounded px-3 py-2 text-sm w-64" />
      <button className="px-3 py-2 bg-gray-800 text-white text-sm rounded">Search</button>
    </form>
  );
}
