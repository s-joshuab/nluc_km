import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, roles, offices, colleges }) {
  const { data, setData, put, processing } = useForm({ first_name: item.first_name || '', last_name: item.last_name || '', email: item.email || '', employee_number: item.employee_number || '', password: '', college_id: item.college_id || '', is_active: !!item.is_active, roles: (item.roles || []).map(r => r.id), offices: (item.offices || []).map(o => o.id), primary_office_id: ((item.offices || []).find(o => o.pivot?.is_primary)?.id) || '' });
  const toggle = (k, id) => { const arr = data[k].includes(id) ? data[k].filter(x => x !== id) : [...data[k], id]; setData(k, arr); };
  return (
    <AuthenticatedLayout header={`Edit ${item.email}`}>
      <form onSubmit={(e) => { e.preventDefault(); put(`/users/${item.id}`); }} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div><label className="text-xs">First Name</label><input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs">Last Name</label><input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs">Email</label><input value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs">New Password (leave blank to keep)</label><input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Roles</label><div className="space-y-1 mt-1">{roles.map(r => <label key={r.id} className="text-xs flex gap-2"><input type="checkbox" checked={data.roles.includes(r.id)} onChange={() => toggle('roles', r.id)} />{r.name}</label>)}</div></div>
        <div><label className="text-xs font-medium">Offices</label><div className="space-y-1 mt-1">{offices.map(o => <label key={o.id} className="text-xs flex gap-2"><input type="checkbox" checked={data.offices.includes(o.id)} onChange={() => toggle('offices', o.id)} />{o.code}</label>)}</div>
          <label className="text-xs mt-2 block">Primary Office<select value={data.primary_office_id} onChange={(e) => setData('primary_office_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{offices.map(o => <option key={o.id} value={o.id}>{o.code}</option>)}</select></label>
        </div>
        <div><label className="text-xs flex gap-2 items-center"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} /> Active</label></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update User</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
