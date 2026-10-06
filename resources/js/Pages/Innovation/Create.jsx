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

export default function Create({ types, statuses, colleges, ip, researches, users }) {
  const { data, setData, post, processing, errors } = useForm({
    research_id: '',
    title: '',
    description: '',
    innovation_type_id: '',
    innovation_status_id: '',
    college_id: '',
    lead_innovator_id: '',
    development_date: '',
    ip_status_id: '',
    remarks: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/innovations');
  };

  return (
    <>
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/innovations"
              className="text-xs text-slate-400 hover:text-emerald-700 transition"
            >
              ← Back to Innovations
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Create Innovation
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Record a new innovation and link it to research outputs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/innovations"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Saving...' : 'Save Innovation'}
            </button>
          </div>
        </div>

        <Section
          title="Innovation Information"
          description="Provide the basic information about the innovation."
        >
          <Field
            label="Innovation Title"
            required
            error={errors.title}
            className="md:col-span-2"
          >
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
              placeholder="Enter the complete innovation title"
            />
          </Field>

          <Field
            label="Innovation Type"
            required
            error={errors.innovation_type_id}
          >
            <select
              value={data.innovation_type_id}
              onChange={(e) => setData('innovation_type_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select type</option>

              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Innovation Status"
            required
            error={errors.innovation_status_id}
          >
            <select
              value={data.innovation_status_id}
              onChange={(e) => setData('innovation_status_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select status</option>

              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Linked Research" error={errors.research_id}>
            <select
              value={data.research_id}
              onChange={(e) => setData('research_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select research</option>

              {researches.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.research_code}{r.title ? ` — ${r.title?.slice(0, 70)}` : ''}
                </option>
              ))}
            </select>
          </Field>

          <Field label="College" error={errors.college_id}>
            <select
              value={data.college_id}
              onChange={(e) => setData('college_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select college</option>

              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}{c.name ? ` — ${c.name}` : ''}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        <Section
          title="Development Details"
          description="Identify the lead innovator, timeline and IP position."
        >
          <Field label="Lead Innovator" error={errors.lead_innovator_id}>
            <select
              value={data.lead_innovator_id}
              onChange={(e) => setData('lead_innovator_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select lead innovator</option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Development Date" error={errors.development_date}>
            <input
              type="date"
              value={data.development_date}
              onChange={(e) => setData('development_date', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="IP Status"
            error={errors.ip_status_id}
            className="md:col-span-2"
          >
            <select
              value={data.ip_status_id}
              onChange={(e) => setData('ip_status_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select IP status</option>

              {ip.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        <Section
          title="Description & Remarks"
          description="Describe the innovation and add supporting notes."
        >
          <Field
            label="Description"
            error={errors.description}
            className="md:col-span-2"
          >
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              rows={6}
              className={inputClass}
              placeholder="Describe the innovation, its novelty and intended use..."
            />
          </Field>

          <Field
            label="Remarks"
            error={errors.remarks}
            className="md:col-span-2"
          >
            <textarea
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Additional notes or remarks..."
            />
          </Field>
        </Section>

        <div className="flex justify-end gap-2 pb-4">
          <Link
            href="/innovations"
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm disabled:opacity-60"
          >
            {processing ? 'Saving...' : 'Save Innovation'}
          </button>
        </div>
      </form>
    </>
  );
}


Create.layout = (page) => <AuthenticatedLayout header="New Innovation">{page}</AuthenticatedLayout>;
