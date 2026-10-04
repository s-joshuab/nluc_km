import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

const inputClass =
  'mt-1.5 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

const labelClass = 'text-xs font-semibold text-slate-600';

function Field({ label, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className={labelClass}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-4 grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function Create({ types, colleges, levels }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    resource_type_id: '',
    college_id: '',
    external_url: '',
    access_level_id: '',
    version: '1.0',
    remarks: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/knowledge-resources');
  };

  return (
    <AuthenticatedLayout header="New Knowledge Resource">
      <form onSubmit={submit} className="max-w-4xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              New Knowledge Resource
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Add a reference material or knowledge resource to the repository.
            </p>
          </div>

          <Link
            href="/knowledge-resources"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </Link>
        </div>

        <Section
          title="Resource Information"
          description="Provide the basic information and classification of the resource."
        >
          <Field label="Title" required className="md:col-span-2">
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={inputClass}
              placeholder="Enter resource title"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </Field>

          <Field label="Resource Type" required>
            <select
              value={data.resource_type_id}
              onChange={(e) => setData('resource_type_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.resource_type_id && (
              <p className="text-xs text-red-500 mt-1">{errors.resource_type_id}</p>
            )}
          </Field>

          <Field label="Access Level" required>
            <select
              value={data.access_level_id}
              onChange={(e) => setData('access_level_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Select access level</option>
              {levels.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.access_level_id && (
              <p className="text-xs text-red-500 mt-1">{errors.access_level_id}</p>
            )}
          </Field>

          <Field label="College">
            <select
              value={data.college_id}
              onChange={(e) => setData('college_id', e.target.value)}
              className={inputClass}
            >
              <option value="">No college assigned</option>
              {colleges.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Version">
            <input
              value={data.version}
              onChange={(e) => setData('version', e.target.value)}
              className={inputClass}
              placeholder="1.0"
            />
          </Field>
        </Section>

        <Section
          title="Resource Details"
          description="Add a description and optional external reference."
        >
          <Field label="External URL" className="md:col-span-2">
            <input
              type="url"
              value={data.external_url}
              onChange={(e) => setData('external_url', e.target.value)}
              className={inputClass}
              placeholder="https://example.com"
            />
          </Field>

          <Field label="Description" className="md:col-span-2">
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              rows={5}
              className={inputClass}
              placeholder="Describe the knowledge resource..."
            />
          </Field>

          <Field label="Remarks" className="md:col-span-2">
            <textarea
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Add remarks or additional notes..."
            />
          </Field>
        </Section>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/knowledge-resources"
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-medium rounded-lg px-5 py-2.5 shadow-sm transition"
          >
            {processing ? 'Saving...' : 'Save Resource'}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}