import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

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
      {error && (
        <div className="text-xs text-red-600 mt-1">
          {error}
        </div>
      )}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">
            {description}
          </p>
        )}
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function Create({ roles, offices, colleges }) {
  const { data, setData, post, processing, errors } = useForm({ first_name: '', last_name: '', email: '', employee_number: '', password: '', college_id: '', is_active: true, roles: [], offices: [], primary_office_id: '' });

  const toggle = (k, id) => { const arr = data[k].includes(id) ? data[k].filter(x => x !== id) : [...data[k], id]; setData(k, arr); };

  const submit = (e) => {
    e.preventDefault();
    post('/users');
  };

  return (
    <>
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/users"
              className="text-xs text-slate-400 hover:text-emerald-700 transition"
            >
              ← Back to Users
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Create User
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Register a new user account with roles and office assignments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/users"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Saving...' : 'Create User'}
            </button>
          </div>
        </div>

        <Section
          title="Personal Information"
          description="Provide the basic information for the new user account."
        >
          <Field label="First Name" required error={errors.first_name}>
            <input
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
              className={inputClass}
              placeholder="Enter first name"
            />
          </Field>

          <Field label="Last Name" required error={errors.last_name}>
            <input
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
              className={inputClass}
              placeholder="Enter last name"
            />
          </Field>

          <Field label="Email" required error={errors.email}>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className={inputClass}
              placeholder="user@example.com"
            />
          </Field>

          <Field label="Password (min 8)" required error={errors.password}>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className={inputClass}
              placeholder="Enter a secure password"
            />
          </Field>

          <Field label="Employee No" error={errors.employee_number}>
            <input
              value={data.employee_number}
              onChange={(e) => setData('employee_number', e.target.value)}
              className={inputClass}
              placeholder="Employee number"
            />
          </Field>

          <Field label="College" error={errors.college_id}>
            <select
              value={data.college_id}
              onChange={(e) => setData('college_id', e.target.value)}
              className={inputClass}
            >
              <option value="">—</option>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
            </select>
          </Field>
        </Section>

        <Section
          title="Roles & Offices"
          description="Assign roles and offices to the new user account."
        >
          <Field label="Roles" error={errors.roles}>
            <div className="mt-1.5 border border-slate-200 rounded-lg px-3 py-2.5 bg-white space-y-1.5 max-h-48 overflow-y-auto">
              {roles.map(r => (
                <label key={r.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.roles.includes(r.id)}
                    onChange={() => toggle('roles', r.id)}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  {r.name}
                </label>
              ))}
            </div>
          </Field>

          <div>
            <Field label="Offices" error={errors.offices}>
              <div className="mt-1.5 border border-slate-200 rounded-lg px-3 py-2.5 bg-white space-y-1.5 max-h-48 overflow-y-auto">
                {offices.map(o => (
                  <label key={o.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.offices.includes(o.id)}
                      onChange={() => toggle('offices', o.id)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    {o.code} — {o.name}
                  </label>
                ))}
              </div>
            </Field>

            <div className="mt-4">
              <Field label="Primary Office" error={errors.primary_office_id}>
                <select
                  value={data.primary_office_id}
                  onChange={(e) => setData('primary_office_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">—</option>
                  {offices.map(o => <option key={o.id} value={o.id}>{o.code}</option>)}
                </select>
              </Field>
            </div>
          </div>
        </Section>

        <div className="flex justify-end gap-2 pb-4">
          <Link
            href="/users"
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm disabled:opacity-60"
          >
            {processing ? 'Saving...' : 'Create User'}
          </button>
        </div>
      </form>
    </>
  );
}


Create.layout = (page) => <AuthenticatedLayout header="New User">{page}</AuthenticatedLayout>;
