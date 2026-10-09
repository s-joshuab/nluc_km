import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

function authorsOf(research) {
  const names = [];
  if (research.lead_researcher) {
    names.push(`${research.lead_researcher.first_name} ${research.lead_researcher.last_name}`);
  }
  (research.team || []).forEach((member) => {
    const name = `${member.user?.first_name} ${member.user?.last_name}`;
    if (name.trim() && !names.includes(name)) names.push(name);
  });
  return names.join(', ') || '—';
}

const inputClass = 'w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20';

export default function Catalog({ rows, filters, types, colleges, years }) {
  const [form, setForm] = useState(filters || {});
  const hasFilters = Boolean(form.search || form.college_id || form.research_type_id || form.year);

  const submit = (event) => {
    event.preventDefault();
    router.get('/catalog', form, { preserveState: true, preserveScroll: true, only: ['rows'] });
  };

  const clearFilters = () => {
    setForm({});
    router.get('/catalog', {}, { preserveState: true, preserveScroll: true, only: ['rows'] });
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Research Catalog</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Public view shows titles, authors, and abstracts.{' '}
          <Link href="/login" className="font-semibold text-emerald-700 hover:underline">Login</Link>
          {' '}to view complete records and download files.
        </p>
      </header>

      <form onSubmit={submit} role="search" className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">Find research</h2>
          <p className="mt-1 text-sm text-slate-600">Search the catalog or narrow the results with filters.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium text-slate-700">Title, code, or keyword</label>
            <input
              id="catalog-search"
              type="search"
              placeholder="Search research"
              value={form.search || ''}
              onChange={(event) => setForm({ ...form, search: event.target.value })}
              className={inputClass}
            />
          </div>
          <div className="lg:col-span-3">
            <label htmlFor="catalog-college" className="mb-2 block text-sm font-medium text-slate-700">College</label>
            <select
              id="catalog-college"
              value={form.college_id || ''}
              onChange={(event) => setForm({ ...form, college_id: event.target.value })}
              className={inputClass}
            >
              <option value="">All colleges</option>
              {colleges.map((college) => <option key={college.id} value={college.id}>{college.code} — {college.name}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="catalog-type" className="mb-2 block text-sm font-medium text-slate-700">Research type</label>
            <select
              id="catalog-type"
              value={form.research_type_id || ''}
              onChange={(event) => setForm({ ...form, research_type_id: event.target.value })}
              className={inputClass}
            >
              <option value="">All types</option>
              {types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="catalog-year" className="mb-2 block text-sm font-medium text-slate-700">Year</label>
            <select
              id="catalog-year"
              value={form.year || ''}
              onChange={(event) => setForm({ ...form, year: event.target.value })}
              className={inputClass}
            >
              <option value="">All years</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="rounded-lg bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900">
            Search catalog
          </button>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              Clear filters
            </button>
          )}
        </div>
      </form>

      <section className="mt-10" aria-labelledby="catalog-results-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <h2 id="catalog-results-heading" className="text-xl font-bold text-slate-900">Research results</h2>
          <p className="text-sm text-slate-600" aria-live="polite">
            <strong className="text-slate-900">{rows.total ?? 0}</strong> {rows.total === 1 ? 'record' : 'records'} found
          </p>
        </div>

        {rows.data.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {rows.data.map((research) => (
              <article key={research.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-6">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono text-slate-700">{research.research_code}</span>
                  {research.college?.code && <span>• {research.college.code}</span>}
                  {research.date_submitted && <span>• {research.date_submitted.slice(0, 4)}</span>}
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 md:text-lg">
                  <Link href={`/catalog/${research.id}`} className="hover:text-emerald-700">
                    {research.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{authorsOf(research)}</p>
                {research.abstract && (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {research.abstract.slice(0, 200)}{research.abstract.length > 200 ? '…' : ''}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge value={research.status?.name} />
                    <StatusBadge value={research.type?.name} />
                  </div>
                  <Link href={`/catalog/${research.id}`} className="whitespace-nowrap text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                    View abstract →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No research found" hint="Try adjusting your filters or clear them to browse all records." />
        )}
      </section>

      <div className="mt-7">
        <Pagination data={rows} />
      </div>
    </>
  );
}

Catalog.layout = (page) => <PublicLayout>{page}</PublicLayout>;
