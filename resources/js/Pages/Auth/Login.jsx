import GuestLayout from '../../Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
  return (
    <GuestLayout>
      <h1 className="text-lg font-semibold mb-1">Sign in</h1>
      <p className="text-xs text-gray-500 mb-4">Use seeded accounts: admin@ (Administrator) / staff@ (RPSU Staff) / facilitator@ / researcher@ — password: password123</p>
      <form onSubmit={(e)=>{e.preventDefault(); post('/login');}} className="space-y-3">
        <div><label className="text-sm">Email</label><input type="email" value={data.email} onChange={(e)=>setData('email',e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />{errors.email && <div className="text-xs text-red-600">{errors.email}</div>}</div>
        <div><label className="text-sm">Password</label><input type="password" value={data.password} onChange={(e)=>setData('password',e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />{errors.password && <div className="text-xs text-red-600">{errors.password}</div>}</div>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={data.remember} onChange={(e)=>setData('remember',e.target.checked)} /> Remember me</label>
        <button disabled={processing} className="w-full bg-emerald-600 text-white rounded py-2 text-sm">Login</button>
      </form>
      <div className="text-center mt-3"><Link href="/" className="text-xs text-emerald-600 hover:underline">← Back to public site</Link></div>
    </GuestLayout>
  );
}
