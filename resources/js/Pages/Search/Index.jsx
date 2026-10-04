import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import EmptyState from '../../Components/EmptyState';

const Icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0 text-slate-300">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

function Section({ title, items, base }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <span className="inline-flex items-center bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-full font-semibold">
          {items.length}
        </span>
      </div>
      <div className="p-2 flex-1">
        {items.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center">No matches.</div>
        ) : (
          <div className="space-y-0.5">
            {items.map((i) => (
              <Link
                key={i.id}
                href={`/${base}/${i.id}`}
                className="group flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="min-w-0 flex-1">
                  {i.research_code && (
                    <div className="font-mono text-[10px] text-slate-400 mb-0.5">{i.research_code}</div>
                  )}
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 leading-snug line-clamp-2 transition-colors">
                    {i.title}
                  </div>
                </div>
                <span className="group-hover:text-emerald-500 transition-colors">
                  {Icons.arrow}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index({ q, results }) {
  const research = results.research ?? [];
  const publications = results.publications ?? [];
  const iec = results.iec ?? [];
  const innovations = results.innovations ?? [];
  const technologies = results.technologies ?? [];
  const resources = results.resources ?? [];
  const total = research.length + publications.length + iec.length + innovations.length + technologies.length + resources.length;

  const stats = [
    { label: 'Total Matches', value: total, highlight: true },
    { label: 'Research', value: research.length },
    { label: 'Publications', value: publications.length },
    { label: 'IEC Materials', value: iec.length },
    { label: 'Innovations', value: innovations.length },
    { label: 'Technologies', value: technologies.length },
    { label: 'Resources', value: resources.length },
  ];

  return (
    <AuthenticatedLayout header={`Search: ${q}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            {Icons.search}
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Search results
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {total} match{total === 1 ? '' : 'es'} for <span className="font-semibold text-slate-600">“{q}”</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
                {s.label}
              </div>
              <div className={`text-xl font-bold mt-1 ${s.highlight ? 'text-emerald-700' : 'text-slate-800'}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {total === 0 ? (
          <EmptyState
            title={`No results for “${q}”`}
            hint="Try a different keyword, or browse the repository modules."
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            <Section title="Research" items={research} base="repository" />
            <Section title="Publications" items={publications} base="publications" />
            <Section title="IEC Materials" items={iec} base="iec-materials" />
            <Section title="Innovations" items={innovations} base="innovations" />
            <Section title="Technologies" items={technologies} base="technologies" />
            <Section title="Resources" items={resources} base="knowledge-resources" />
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
