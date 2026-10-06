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
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-5 grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function Create({ lookups }) {
  const { data, setData, post, processing, errors } = useForm({
    research_code: '',
    title: '',
    abstract: '',
    keywords: '',
    research_type_id: '',
    research_status_id: '',
    research_area_id: '',
    college_id: '',
    lead_researcher_id: '',
    start_date: '',
    end_date: '',
    funding_source: '',
    funding_amount: '',
    sdg_alignment: '',
    ip_status_id: '',
    date_submitted: '',
    remarks: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/research');
  };

  const selectOptions = (items = []) =>
    items.map((o) => (
      <option key={o.id} value={o.id}>
        {o.code ? `${o.code} — ${o.name}` : o.name}
      </option>
    ));

  return (
    <>
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/research"
              className="text-xs text-slate-400 hover:text-emerald-700 transition-colors"
            >
              ← Back to Research Records
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Create Research Record
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Register a new research project in the repository.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/research"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Saving...' : 'Save Research'}
            </button>
          </div>
        </div>

        <Section
          title="Basic Information"
          description="Enter the primary information of the research project."
        >
          <Field label="Research Code" required error={errors.research_code}>
            <input
              value={data.research_code}
              onChange={(e) => setData('research_code', e.target.value)}
              className={inputClass}
              placeholder="e.g. RES-2026-001"
            />
          </Field>

          <Field label="Research Title" required error={errors.title} className="md:col-span-1">
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
              placeholder="Enter the complete research title"
            />
          </Field>

          <Field label="Abstract" error={errors.abstract} className="md:col-span-2">
            <textarea
              value={data.abstract}
              onChange={(e) => setData('abstract', e.target.value)}
              rows={6}
              className={inputClass}
              placeholder="Provide a brief summary of the research..."
            />
          </Field>

          <Field
            label="Keywords"
            error={errors.keywords}
            className="md:col-span-2"
          >
            <input
              value={data.keywords}
              onChange={(e) => setData('keywords', e.target.value)}
              className={inputClass}
              placeholder="Enter keywords separated by commas"
            />
          </Field>
        </Section>

        <Section
          title="Classification"
          description="Categorize the research according to the available classifications."
        >
          <Field label="Research Type" required error={errors.research_type_id}>
            <select
              value={data.research_type_id}
              onChange={(e) => setData('research_type_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select research type</option>
              {selectOptions(lookups.types)}
            </select>
          </Field>

          <Field label="Research Status" required error={errors.research_status_id}>
            <select
              value={data.research_status_id}
              onChange={(e) => setData('research_status_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select status</option>
              {selectOptions(lookups.statuses)}
            </select>
          </Field>

          <Field label="Research Area" error={errors.research_area_id}>
            <select
              value={data.research_area_id}
              onChange={(e) => setData('research_area_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select research area</option>
              {selectOptions(lookups.areas)}
            </select>
          </Field>

          <Field label="College" error={errors.college_id}>
            <select
              value={data.college_id}
              onChange={(e) => setData('college_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select college</option>
              {selectOptions(lookups.colleges)}
            </select>
          </Field>

          <Field label="Lead Researcher" error={errors.lead_researcher_id}>
            <select
              value={data.lead_researcher_id}
              onChange={(e) => setData('lead_researcher_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select lead researcher</option>
              {lookups.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name} ({u.email})
                </option>
              ))}
            </select>
          </Field>

          <Field label="IP Status" error={errors.ip_status_id}>
            <select
              value={data.ip_status_id}
              onChange={(e) => setData('ip_status_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select IP status</option>
              {selectOptions(lookups.ip)}
            </select>
          </Field>
        </Section>

        <Section
          title="Research Period & Funding"
          description="Provide the implementation period and funding information."
        >
          <Field label="Start Date" error={errors.start_date}>
            <input
              type="date"
              value={data.start_date}
              onChange={(e) => setData('start_date', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="End Date" error={errors.end_date}>
            <input
              type="date"
              value={data.end_date}
              onChange={(e) => setData('end_date', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Funding Source" error={errors.funding_source}>
            <input
              value={data.funding_source}
              onChange={(e) => setData('funding_source', e.target.value)}
              className={inputClass}
              placeholder="e.g. Institutional Fund"
            />
          </Field>

          <Field label="Funding Amount" error={errors.funding_amount}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={data.funding_amount}
              onChange={(e) => setData('funding_amount', e.target.value)}
              className={inputClass}
              placeholder="0.00"
            />
          </Field>
        </Section>

        <Section
          title="Additional Information"
          description="Add sustainability, submission, and other relevant details."
        >
          <Field label="SDG Alignment" error={errors.sdg_alignment}>
            <input
              value={data.sdg_alignment}
              onChange={(e) => setData('sdg_alignment', e.target.value)}
              className={inputClass}
              placeholder="e.g. SDG 4, SDG 9"
            />
          </Field>

          <Field label="Date Submitted" error={errors.date_submitted}>
            <input
              type="date"
              value={data.date_submitted}
              onChange={(e) => setData('date_submitted', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Remarks" error={errors.remarks} className="md:col-span-2">
            <textarea
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Add additional notes or remarks..."
            />
          </Field>
        </Section>

        <div className="flex items-center justify-end gap-2 pb-4">
          <Link
            href="/research"
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm disabled:opacity-60"
          >
            {processing ? 'Saving...' : 'Save Research'}
          </button>
        </div>
      </form>
    </>
  );
}


Create.layout = (page) => <AuthenticatedLayout header="New Research">{page}</AuthenticatedLayout>;
