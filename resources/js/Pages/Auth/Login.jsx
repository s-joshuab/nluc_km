import GuestLayout from '../../Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
  return (
    <GuestLayout>
      <h1 className="text-xl font-bold text-slate-800 mb-1">Welcome back</h1>
      <p className="text-xs text-slate-400 mb-5">Sign in to access the knowledge management system.</p>

      <form onSubmit={(e) => { e.preventDefault(); post('/login'); }} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Email address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder="you@dmmmsu.edu.ph"
            autoComplete="email"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all
              ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="current-password"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all
              ${errors.password ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
          />
          {errors.password && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.password}</p>}
        </div>

        {/* Remember */}
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-slate-300 rounded peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-colors flex items-center justify-center">
              {data.remember && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          </div>
          <span className="text-xs text-slate-600 group-hover:text-slate-800">Keep me signed in</span>
        </label>

        {/* Submit */}
        <button
          disabled={processing}
          className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm shadow-sm shadow-emerald-900/30 transition-all"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>
              Signing in…
            </span>
          ) : 'Sign in'}
        </button>
      </form>

      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-800 hover:underline transition-colors">
          ← Back to public site
        </Link>
      </div>
    </GuestLayout>
  );
}
