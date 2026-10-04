import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import { Link, usePage } from '@inertiajs/react';

function authorsOf(r) {
  const names = [];
  if (r.lead_researcher) names.push(`${r.lead_researcher.first_name} ${r.lead_researcher.last_name}`);
  (r.team || []).forEach((t) => {
    const n = `${t.user?.first_name} ${t.user?.last_name}${t.role ? ` (${t.role.name})` : ''}`;
    if (n.trim() && !names.includes(n)) names.push(n);
  });
  return names;
}

const Icons = {
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600 shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600 shrink-0">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-600 shrink-0">
      <path d="M9 18h6" /><path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-amber-600">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

export default function ResearchShow({ item, pubs, iec, innovations }) {
  const { auth } = usePage().props;
  const hasOutputs = (pubs || []).length > 0 || (iec || []).length > 0 || (innovations || []).length > 0;

  return (
    <PublicLayout>
      <div className="text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-700 hover:underline transition-colors">Home</Link>
        {' / '}
        <Link href="/catalog" className="hover:text-emerald-700 hover:underline transition-colors">Catalog</Link>
        {' / '}
        <span className="font-mono text-slate-500">{item.research_code}</span>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-5 md:p-6 mt-2 shadow-sm">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono flex-wrap">
          <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.research_code}</span>
          {item.college?.name && <><span>•</span><span>{item.college.name}</span></>}
          {item.type?.name && <><span>•</span><span>{item.type.name}</span></>}
        </div>
        <h1 className="text-lg md:text-xl font-bold text-slate-800 mt-2 leading-snug">{item.title}</h1>
        <div className="mt-2.5 flex gap-1.5 flex-wrap">
          <StatusBadge value={item.status?.name} />
          {item.sdg_alignment && <StatusBadge value={item.sdg_alignment} />}
        </div>

        <h2 className="font-bold text-slate-800 text-sm mt-5">Researchers</h2>
        <div className="text-sm text-slate-600 mt-1">{authorsOf(item).join('; ') || '—'}</div>

        <h2 className="font-bold text-slate-800 text-sm mt-5">Abstract</h2>
        <p className="text-sm text-slate-600 whitespace-pre-wrap mt-1 leading-relaxed">{item.abstract || 'No abstract provided.'}</p>

        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Keywords</div>
            <div className="text-sm text-slate-700 mt-1">{item.keywords || '—'}</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Research Area</div>
            <div className="text-sm text-slate-700 mt-1">{item.area?.name || '—'}</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Duration</div>
            <div className="text-sm text-slate-700 mt-1">{item.start_date || '?'} → {item.end_date || '?'}</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Year</div>
            <div className="text-sm text-slate-700 mt-1">{item.date_submitted?.slice(0, 4) || '—'}</div>
          </div>
        </div>

        {hasOutputs && (
          <div className="mt-5">
            <h2 className="font-bold text-slate-800 text-sm">Related Outputs</h2>
            <div className="mt-2 space-y-2">
              {(pubs || []).map((p) => (
                <div key={`p${p.id}`} className="flex items-start gap-2.5 border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                  {Icons.doc}
                  <div className="min-w-0">
                    <div className="text-sm text-slate-700 font-medium leading-snug">{p.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{p.journal || p.type?.name} • {p.publication_date?.slice(0, 4)}</div>
                  </div>
                </div>
              ))}
              {(iec || []).map((m) => (
                <div key={`i${m.id}`} className="flex items-start gap-2.5 border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                  {Icons.book}
                  <div className="min-w-0">
                    <div className="text-sm text-slate-700 font-medium leading-snug">{m.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{m.type?.name}</div>
                  </div>
                </div>
              ))}
              {(innovations || []).map((n) => (
                <div key={`n${n.id}`} className="flex items-start gap-2.5 border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                  {Icons.bulb}
                  <div className="min-w-0">
                    <div className="text-sm text-slate-700 font-medium leading-snug">{n.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{n.type?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            {Icons.lock}
          </div>
          <div className="flex-1 text-sm">
            <div className="font-semibold text-slate-800">This is a public preview — abstract and basic metadata only.</div>
            <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">Complete details, attached files, and downloads are available to authorized NLUC accounts after login.</div>
          </div>
          {auth?.user ? (
            <Link href={`/repository/${item.id}`} className="text-sm px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg whitespace-nowrap font-medium transition-colors shadow-sm text-center">
              View full record
            </Link>
          ) : (
            <Link href="/login" className="text-sm px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg whitespace-nowrap font-medium transition-colors shadow-sm text-center">
              Login to view all
            </Link>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
