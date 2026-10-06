import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

const Icons = {
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  File: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
};

function Field({
  label,
  required,
  error,
  children,
  hint
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="text-[11px] text-gray-400 mt-1">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

export default function Create({ types, colleges, researches }) {
  const {
    data,
    setData,
    post,
    processing,
    errors
  } = useForm({
    document_title: '',
    research_id: '',
    endorsement_type_id: '',
    college_id: '',
    department: '',
    date_submitted: new Date().toISOString().slice(0, 10),
    supporting_file: null,
    remarks: ''
  });

  const submit = (e) => {
    e.preventDefault();

    post('/endorsements', {
      forceFormData: true
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-4">

        <div className="flex items-center gap-3">
          <Link
            href="/endorsements"
            className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-emerald-700 hover:border-emerald-300 transition"
          >
            <Icons.ArrowLeft />
          </Link>

          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              New Research Endorsement
            </h1>

            <p className="text-xs text-gray-500 mt-0.5">
              Register a research document for endorsement and tracking.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Icons.Info />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Endorsement workflow
              </p>

              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                After submitting this form, physically bring the document to
                the <strong>Records Office</strong> (QR is stamped there manually —
                no system account needed). RPSU staff will update the
                document's status and current location here.
              </p>

              <div className="mt-2 text-[11px] text-emerald-700">
                Tracking reference format:
                <span className="font-semibold ml-1">
                  RPSU-YYYY-XXXXX
                </span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <div className="bg-white border border-emerald-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icons.File />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    Document Information
                  </h2>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Provide the basic details of the document being endorsed.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <Field
                  label="Research / Document Title"
                  required
                  error={errors.document_title}
                >
                  <input
                    value={data.document_title}
                    onChange={(e) =>
                      setData('document_title', e.target.value)
                    }
                    placeholder="Enter the title of the research or document"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </Field>
              </div>

              <Field
                label="College"
                required
                error={errors.college_id}
              >
                <select
                  value={data.college_id}
                  onChange={(e) =>
                    setData('college_id', e.target.value)
                  }
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select college</option>

                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Department / Area"
                error={errors.department}
              >
                <input
                  value={data.department}
                  onChange={(e) =>
                    setData('department', e.target.value)
                  }
                  placeholder="Enter department or area"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-emerald-500"
                />
              </Field>

              <Field
                label="Document / Endorsement Type"
                required
                error={errors.endorsement_type_id}
              >
                <select
                  value={data.endorsement_type_id}
                  onChange={(e) =>
                    setData('endorsement_type_id', e.target.value)
                  }
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select document type</option>

                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Date Submitted"
                error={errors.date_submitted}
              >
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Calendar />
                  </div>

                  <input
                    type="date"
                    value={data.date_submitted}
                    onChange={(e) =>
                      setData('date_submitted', e.target.value)
                    }
                    className="mt-1 w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </Field>

            </div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800">
                Research Linkage
              </h2>

              <p className="text-[11px] text-gray-500 mt-0.5">
                Link this endorsement to an existing research record if applicable.
              </p>
            </div>

            <div className="p-5">
              <Field
                label="Linked Research"
                error={errors.research_id}
                hint="Optional. Leave blank if this endorsement is not linked to a repository record."
              >
                <select
                  value={data.research_id}
                  onChange={(e) =>
                    setData('research_id', e.target.value)
                  }
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">No linked research</option>

                  {researches.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.research_code} — {r.title?.slice(0, 100)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800">
                Supporting Document
              </h2>

              <p className="text-[11px] text-gray-500 mt-0.5">
                Attach a supporting file when necessary.
              </p>
            </div>

            <div className="p-5">
              <Field
                label="Supporting Document"
                error={errors.supporting_file}
                hint="Optional. Upload the supporting document associated with this endorsement."
              >
                <div className="mt-1 border-2 border-dashed border-gray-200 hover:border-emerald-300 rounded-xl p-5 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icons.Upload />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {data.supporting_file?.name || 'Choose a supporting file'}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Select a file from your computer.
                      </p>
                    </div>

                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 rounded-lg px-3 py-2 text-xs font-medium">
                      <Icons.Upload />
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setData(
                            'supporting_file',
                            e.target.files[0]
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </Field>
            </div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800">
                Remarks
              </h2>

              <p className="text-[11px] text-gray-500 mt-0.5">
                Add any additional information relevant to the endorsement.
              </p>
            </div>

            <div className="p-5">
              <Field
                label="Remarks"
                error={errors.remarks}
              >
                <textarea
                  value={data.remarks}
                  onChange={(e) =>
                    setData('remarks', e.target.value)
                  }
                  rows={4}
                  placeholder="Enter additional remarks or instructions..."
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </Field>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <Link
              href="/endorsements"
              className="text-sm text-gray-600 hover:text-gray-800 text-center sm:text-left"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-sm rounded-lg px-5 py-2.5 font-semibold shadow-sm transition"
            >
              {processing ? 'Submitting...' : 'Submit Endorsement'}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}


Create.layout = (page) => <AuthenticatedLayout header="New Research Endorsement">{page}</AuthenticatedLayout>;
