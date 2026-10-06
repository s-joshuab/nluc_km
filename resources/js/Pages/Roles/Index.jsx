import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { useForm } from '@inertiajs/react';

const inputClass =
  'mt-1.5 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

const labelClass = 'text-xs font-semibold text-slate-600';

const Icons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Index({ rows }) {
  const { data, setData, post, processing, errors, reset } = useForm({ name: '', description: '' });

  const submit = (e) => {
    e.preventDefault();
    post('/roles', { onSuccess: () => reset() });
  };

  return (
    <>
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {Icons.shield}
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Roles
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage user roles and their access levels.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Total Roles
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.total ?? 0}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Displayed
            </div>
            <div className="text-xl font-bold text-emerald-700 mt-1">
              {rows.data?.length ?? 0}
            </div>
          </div>

          <div className="hidden md:block bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              Page
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1">
              {rows.current_page ?? 1}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">
              Add Role
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Create a new role with an optional description
            </p>
          </div>

          <form onSubmit={submit} className="p-4 grid md:grid-cols-3 gap-3 items-end">
            <div>
              <label className={labelClass}>
                Role Name
              </label>
              <input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Role name"
                className={inputClass}
              />
              {errors.name && (
                <div className="text-xs text-red-600 mt-1">
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Description
              </label>
              <input
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Description"
                className={inputClass}
              />
              {errors.description && (
                <div className="text-xs text-red-600 mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition disabled:opacity-60 md:justify-self-end md:w-auto w-full"
            >
              {processing ? 'Adding...' : 'Add Role'}
            </button>
          </form>
        </div>

        {rows.data.length === 0 ? (
          <EmptyState
            title="No roles found"
            hint="Add a role using the form above to get started."
          />
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">
                Role Records
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Defined roles and their descriptions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Description
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {rows.data.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="inline-flex bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                          {r.name}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs text-slate-700">
                          {r.description || '—'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Pagination data={rows} />
      </div>
    </>
  );
}


Index.layout = (page) => <AuthenticatedLayout header="Roles">{page}</AuthenticatedLayout>;
