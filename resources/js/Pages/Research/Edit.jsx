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

export default function Edit({ item, lookups }) {
  const { data, setData, put, processing, errors } = useForm({
    research_code: item.research_code || '',
    title: item.title || '',
    abstract: item.abstract || '',
    keywords: item.keywords || '',
    research_type_id: item.research_type_id || '',
    research_status_id: item.research_status_id || '',
    research_area_id: item.research_area_id || '',
    college_id: item.college_id || '',
    lead_researcher_id: item.lead_researcher_id || '',
    start_date: item.start_date || '',
    end_date: item.end_date || '',
    funding_source: item.funding_source || '',
    funding_amount: item.funding_amount || '',
    sdg_alignment: item.sdg_alignment || '',
    ip_status_id: item.ip_status_id || '',
    date_submitted: item.date_submitted || '',
    date_completed: item.date_completed || '',
    remarks: item.remarks || '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/research/${item.id}`);
  };

  const selectOptions = (items = []) =>
    items.map((o) => (
      <option key={o.id} value={o.id}>
        {o.code ? `${o.code} — ${o.name}` : o.name}
      </option>
    ));

  return (
    <AuthenticatedLayout header={`Edit ${item.research_code}`}>
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/research"
              className="text-xs text-slate-400 hover:text-emerald-700 transition-colors"
            >
              ← Back to Research Records
            </Link>

            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-xl font-bold text-slate-800">
                Edit Research
              </h1>

              <span className="font-mono text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-500">
                {item.research_code}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-0.5">
              Update the research record and its classification details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/repository/${item.id}`}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              View Record
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60"
            >
              {processing ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <Section
          title="Basic Information"
          description="Update the primary information of the research project."
        >
          <Field label="Research Code" required error={errors.research_code}>
            <input
              value={data.research_code}
              onChange={(e) => setData('research_code', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Research Title" required error={errors.title}>
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Abstract" error={errors.abstract} className="md:col-span-2">
            <textarea
              value={data.abstract}
              onChange={(e) => setData('abstract', e.target.value)}
              rows={6}
              className={inputClass}
            />
          </Field>

          <Field label="Keywords" error={errors.keywords} className="md:col-span-2">
            <input
              value={data.keywords}
              onChange={(e) => setData('keywords', e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section
          title="Classification"
          description="Update the research classification and ownership."
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
          description="Update implementation dates and funding information."
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

          <Field label="Date Completed" error={errors.date_completed}>
            <input
              type="date"
              value={data.date_completed}
              onChange={(e) => setData('date_completed', e.target.value)}
              className={inputClass}
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

          <Field label="Funding Source" error={errors.funding_source}>
            <input
              value={data.funding_source}
              onChange={(e) => setData('funding_source', e.target.value)}
              className={inputClass}
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
            />
          </Field>
        </Section>

        <Section
          title="Additional Information"
          description="Update SDG alignment and other notes."
        >
          <Field label="SDG Alignment" error={errors.sdg_alignment}>
            <input
              value={data.sdg_alignment}
              onChange={(e) => setData('sdg_alignment', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Remarks" error={errors.remarks} className="md:col-span-2">
            <textarea
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              rows={4}
              className={inputClass}
            />
          </Field>
        </Section>

        <div className="flex justify-end gap-2 pb-4">
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
            {processing ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}