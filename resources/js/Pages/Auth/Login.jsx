import GuestLayout from '../../Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

const inputClass = 'w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });

  const submit = (event) => {
    event.preventDefault();
    post('/login');
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-600">
        Sign in with your authorized NLUC account to access the research management system.
      </p>

      <form onSubmit={submit} aria-busy={processing} className="mt-8 space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
          <input
            id="login-email"
            type="email"
            value={data.email}
            onChange={(event) => setData('email', event.target.value)}
            placeholder="you@dmmmsu.edu.ph"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={`${inputClass} ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-emerald-600'}`}
          />
          {errors.email && <p id="login-email-error" role="alert" className="mt-2 text-sm text-red-700">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
          <input
            id="login-password"
            type="password"
            value={data.password}
            onChange={(event) => setData('password', event.target.value)}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            className={`${inputClass} ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-emerald-600'}`}
          />
          {errors.password && <p id="login-password-error" role="alert" className="mt-2 text-sm text-red-700">{errors.password}</p>}
        </div>

        <label htmlFor="login-remember" className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
          <input
            id="login-remember"
            type="checkbox"
            checked={data.remember}
            onChange={(event) => setData('remember', event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-emerald-800"
          />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={processing}
          className="flex w-full items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {processing ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <Link href="/" className="text-sm font-semibold text-emerald-800 hover:underline">
          ← Back to public site
        </Link>
      </div>
    </>
  );
}

Login.layout = (page) => <GuestLayout>{page}</GuestLayout>;
