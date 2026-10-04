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

export default function Create({ statuses, innovations }) {
  const { data, setData, post, processing, errors } = useForm({
    innovation_id: '',
    title: '',
    description: '',
    technology_status_id: '',
    technology_readiness_level: '',
    ip_reference: '',
    development_date: '',
    remarks: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/technologies');
  };

  return (
    <AuthenticatedLayout header="New Technology">
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/technologies"
              className="text-xs text-slate-400 hover:text-emerald-700 transition"
            >
              ← Back to Technologies
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Create Technology
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Record a new technology developed from an innovation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/technologies"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Saving...' : 'Save Technology'}
            </button>
          </div>
        </div>

        <Section
          title="Technology Information"
          description="Link the technology to its parent innovation."
        >
          <Field
            label="Parent Innovation"
            required
            error={errors.innovation_id}
          >
            <select
              value={data.innovation_id}
              onChange={(e) => setData('innovation_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select innovation</option>

              {innovations.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Technology Title"
            required
            error={errors.title}
          >
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
              placeholder="Enter the technology title"
            />
          </Field>

          <Field
            label="Technology Status"
            required
            error={errors.technology_status_id}
          >
            <select
              value={data.technology_status_id}
              onChange={(e) => setData('technology_status_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select status</option>

              {statuses.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Technology Readiness Level"
            error={errors.technology_readiness_level}
          >
            <input
              value={data.technology_readiness_level}
              onChange={(e) => setData('technology_readiness_level', e.target.value)}
              placeholder="e.g. TRL 6"
              className={inputClass}
            />
          </Field>
        </Section>

        <Section
          title="Development Details"
          description="Capture IP reference and development timeline."
        >
          <Field label="IP Reference" error={errors.ip_reference}>
            <input
              value={data.ip_reference}
              onChange={(e) => setData('ip_reference', e.target.value)}
              className={inputClass}
              placeholder="IP application or registration reference"
            />
          </Field>

          <Field label="Development Date" error={errors.development_date}>
            <input
              type="date"
              value={data.development_date}
              onChange={(e) => setData('development_date', e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section
          title="Description & Remarks"
          description="Describe the technology and add supporting notes."
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
              placeholder="Describe the technology, its function and application..."
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
            href="/technologies"
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm disabled:opacity-60"
          >
            {processing ? 'Saving...' : 'Save Technology'}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
