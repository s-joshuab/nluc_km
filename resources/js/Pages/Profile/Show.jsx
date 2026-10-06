import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

const inputClass =
  'mt-1.5 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

const labelClass = 'text-xs font-semibold text-slate-600';

function Field({ label, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className={labelClass}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="p-5 grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function Show({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    first_name: user.first_name || '',
    middle_name: user.middle_name || '',
    last_name: user.last_name || '',
    suffix: user.suffix || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    put('/profile', { onSuccess: () => setData({ ...data, password: '', password_confirmation: '' }) });
  };

  const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
          <p className="text-xs text-slate-400 mt-0.5">Your account information, roles, and office assignment.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-800 truncate">
                {user.first_name} {user.middle_name} {user.last_name} {user.suffix}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(user.roles || []).map((r) => (
                  <span key={r.id} className="inline-flex bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] px-2.5 py-1 rounded-full font-semibold">
                    {r.name}
                  </span>
                ))}
                {(user.offices || []).map((o) => (
                  <span key={o.id} className="inline-flex bg-slate-100 text-slate-600 border border-slate-200 text-[11px] px-2.5 py-1 rounded-full font-medium">
                    {o.code} — {o.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Employee No.</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{user.employee_number || '—'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">College</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{user.college ? `${user.college.code} — ${user.college.name}` : '—'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Status</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{user.is_active ? 'Active' : 'Inactive'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Member Since</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{user.created_at?.slice(0, 10) || '—'}</div>
            </div>
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="space-y-4">
            <Section title="Edit Profile" description="Update your name and email address.">
              <Field label="First Name" required error={errors.first_name}>
                <input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Middle Name" error={errors.middle_name}>
                <input value={data.middle_name} onChange={(e) => setData('middle_name', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Last Name" required error={errors.last_name}>
                <input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Suffix" error={errors.suffix}>
                <input value={data.suffix} onChange={(e) => setData('suffix', e.target.value)} placeholder="Jr., Sr., III" className={inputClass} />
              </Field>
              <Field label="Email" required error={errors.email} className="md:col-span-2">
                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
              </Field>
            </Section>

            <Section title="Change Password" description="Leave blank to keep your current password.">
              <Field label="New Password" error={errors.password}>
                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Min. 8 characters" className={inputClass} />
              </Field>
              <Field label="Confirm New Password">
                <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className={inputClass} />
              </Field>
            </Section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}


Show.layout = (page) => <AuthenticatedLayout header="My Profile">{page}</AuthenticatedLayout>;
