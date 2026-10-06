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

export default function Create({ statuses, technologies }) {
  const { data, setData, post, processing, errors } = useForm({
    technology_id: '',
    status_id: '',
    potential_partner: '',
    industry: '',
    agreement_reference: '',
    license_information: '',
    date_started: '',
    date_commercialized: '',
    revenue_value: '',
    remarks: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/commercialization');
  };

  return (
    <>
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/commercialization"
              className="text-xs text-slate-400 hover:text-emerald-700 transition"
            >
              ← Back to Commercialization
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Create Commercialization Record
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Record a new technology commercialization engagement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/commercialization"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </div>

        <Section
          title="Commercialization Information"
          description="Link the record to a technology and its current stage."
        >
          <Field
            label="Technology"
            required
            error={errors.technology_id}
          >
            <select
              value={data.technology_id}
              onChange={(e) => setData('technology_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select technology</option>

              {technologies.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Status"
            required
            error={errors.status_id}
          >
            <select
              value={data.status_id}
              onChange={(e) => setData('status_id', e.target.value)}
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

          <Field label="Potential Partner" error={errors.potential_partner}>
            <input
              value={data.potential_partner}
              onChange={(e) => setData('potential_partner', e.target.value)}
              className={inputClass}
              placeholder="Partner company or organization"
            />
          </Field>

          <Field label="Industry" error={errors.industry}>
            <input
              value={data.industry}
              onChange={(e) => setData('industry', e.target.value)}
              className={inputClass}
              placeholder="Industry or sector"
            />
          </Field>
        </Section>

        <Section
          title="Agreement Details"
          description="Capture licensing, timeline and revenue information."
        >
          <Field label="Agreement Reference" error={errors.agreement_reference}>
            <input
              value={data.agreement_reference}
              onChange={(e) => setData('agreement_reference', e.target.value)}
              className={inputClass}
              placeholder="Agreement or contract reference"
            />
          </Field>

          <Field label="Revenue Value" error={errors.revenue_value}>
            <input
              value={data.revenue_value}
              onChange={(e) => setData('revenue_value', e.target.value)}
              className={inputClass}
              placeholder="0.00"
              inputMode="decimal"
            />
          </Field>

          <Field label="Date Started" error={errors.date_started}>
            <input
              type="date"
              value={data.date_started}
              onChange={(e) => setData('date_started', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Date Commercialized" error={errors.date_commercialized}>
            <input
              type="date"
              value={data.date_commercialized}
              onChange={(e) => setData('date_commercialized', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="License Information"
            error={errors.license_information}
            className="md:col-span-2"
          >
            <textarea
              value={data.license_information}
              onChange={(e) => setData('license_information', e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Licensing terms and related information..."
            />
          </Field>
        </Section>

        <Section
          title="Additional Notes"
          description="Add any supporting notes for this record."
        >
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
            href="/commercialization"
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm disabled:opacity-60"
          >
            {processing ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </form>
    </>
  );
}


Create.layout = (page) => <AuthenticatedLayout header="New Commercialization Record">{page}</AuthenticatedLayout>;
