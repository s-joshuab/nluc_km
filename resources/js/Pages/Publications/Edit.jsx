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

export default function Edit({
  item,
  types,
  statuses,
  researches,
}) {
  const { data, setData, put, processing, errors } = useForm({
    research_id: item.research_id || '',
    title: item.title || '',
    publication_type_id: item.publication_type_id || '',
    publication_status_id: item.publication_status_id || '',
    journal: item.journal || '',
    publisher: item.publisher || '',
    publication_date: item.publication_date || '',
    doi: item.doi || '',
    url: item.url || '',
    abstract: item.abstract || '',
    keywords: item.keywords || '',
    remarks: item.remarks || '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/publications/${item.id}`);
  };

  return (
    <AuthenticatedLayout header="Edit Publication">
      <form onSubmit={submit} className="max-w-5xl mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/publications"
              className="text-xs text-slate-400 hover:text-emerald-700 transition"
            >
              ← Back to Publications
            </Link>

            <h1 className="text-xl font-bold text-slate-800 mt-2">
              Edit Publication
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Update the publication record and scholarly information.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/publications"
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
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
          title="Publication Information"
          description="Update the basic information of the publication."
        >
          <Field
            label="Publication Title"
            required
            error={errors.title}
            className="md:col-span-2"
          >
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
            />
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
                  {r.research_code} — {r.title?.slice(0, 70)}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Publication Type"
            required
            error={errors.publication_type_id}
          >
            <select
              value={data.publication_type_id}
              onChange={(e) =>
                setData('publication_type_id', e.target.value)
              }
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
            label="Publication Status"
            required
            error={errors.publication_status_id}
          >
            <select
              value={data.publication_status_id}
              onChange={(e) =>
                setData('publication_status_id', e.target.value)
              }
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

          <Field
            label="Publication Date"
            error={errors.publication_date}
          >
            <input
              type="date"
              value={data.publication_date}
              onChange={(e) =>
                setData('publication_date', e.target.value)
              }
              className={inputClass}
            />
          </Field>
        </Section>

        <Section
          title="Journal & Publisher"
          description="Update journal, publisher, and publication identifiers."
        >
          <Field label="Journal" error={errors.journal}>
            <input
              value={data.journal}
              onChange={(e) => setData('journal', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Publisher" error={errors.publisher}>
            <input
              value={data.publisher}
              onChange={(e) => setData('publisher', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="DOI" error={errors.doi}>
            <input
              value={data.doi}
              onChange={(e) => setData('doi', e.target.value)}
              className={inputClass}
              placeholder="10.xxxx/xxxxx"
            />
          </Field>

          <Field label="Publication URL" error={errors.url}>
            <input
              type="url"
              value={data.url}
              onChange={(e) => setData('url', e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </Field>
        </Section>

        <Section
          title="Publication Content"
          description="Update the abstract, keywords, and additional notes."
        >
          <Field
            label="Abstract"
            error={errors.abstract}
            className="md:col-span-2"
          >
            <textarea
              value={data.abstract}
              onChange={(e) => setData('abstract', e.target.value)}
              rows={6}
              className={inputClass}
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
            />
          </Field>
        </Section>

        <div className="flex justify-end gap-2 pb-4">
          <Link
            href="/publications"
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