import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';

const Icon = {
  lightbulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M9 18h6M10 22h4" strokeLinecap="round" />
      <path d="M12 2a7 7 0 0 0-4.1 12.7c.7.6 1.1 1.4 1.1 2.3h6c0-.9.4-1.7 1.1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" strokeLinecap="round" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M8 9h1M15 9h1M8 13h1M15 13h1M8 17h1M15 17h1M11 21v-4h2v4" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8.6-8.6a1 1 0 0 0 0-1.4L12 2Z" />
      <circle cx="7" cy="7" r="1.5" />
    </svg>
  ),
};

function SectionCard({ title, subtitle, icon, children, action }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-800">
              {title}
            </h2>

            {subtitle && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {action}
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
}

function MetaItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="text-xs font-semibold text-slate-700 mt-0.5 break-words">
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

export default function Show({ item }) {
  const technologies = item.technologies || [];
  const leadName = item.lead_innovator
    ? `${item.lead_innovator.first_name || ''} ${item.lead_innovator.last_name || ''}`.trim()
    : '';

  return (
    <AuthenticatedLayout header={item.title}>
      <div className="space-y-5">

        <Link
          href="/innovations"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-600 transition"
        >
          ← Back to Innovations
        </Link>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="h-1 bg-emerald-500" />

          <div className="p-5 sm:p-6">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {item.type?.name && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wide">
                      {item.type.name}
                    </span>
                  )}

                  {item.status?.name && (
                    <StatusBadge value={item.status.name} />
                  )}

                  {item.research?.research_code && (
                    <Link
                      href={`/repository/${item.research.id}`}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wide hover:bg-emerald-100"
                    >
                      {item.research.research_code}
                    </Link>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold leading-tight text-slate-900 max-w-4xl">
                  {item.title}
                </h1>

                <p className="text-sm text-slate-500 mt-2 max-w-3xl">
                  {item.type?.name || 'Innovation'} · {item.college?.name || item.college?.code || 'Innovation record'}
                </p>

              </div>

              <Link
                href={`/innovations/${item.id}/edit`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition shrink-0"
              >
                {Icon.file}
                Edit Innovation
              </Link>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">

              <MetaItem
                icon={Icon.tag}
                label="Innovation Type"
                value={item.type?.name}
              />

              <MetaItem
                icon={Icon.building}
                label="College"
                value={item.college?.name || item.college?.code}
              />

              <MetaItem
                icon={Icon.user}
                label="Lead Innovator"
                value={leadName}
              />

              <MetaItem
                icon={Icon.calendar}
                label="Development Date"
                value={item.development_date}
              />

            </div>

          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 space-y-5">

            <SectionCard
              title="Innovation Description"
              subtitle="Overview and scope of the innovation"
              icon={Icon.file}
            >
              <div className="text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                {item.description || 'No description provided.'}
              </div>
            </SectionCard>

            <SectionCard
              title="Technologies"
              subtitle={`${technologies.length} ${technologies.length === 1 ? 'technology' : 'technologies'} linked`}
              icon={Icon.cpu}
              action={
                <Link
                  href="/technologies/create"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold hover:bg-emerald-100 transition shrink-0"
                >
                  + New Technology
                </Link>
              }
            >
              {technologies.length > 0 ? (
                <div className="space-y-3">
                  {technologies.map((t) => (
                    <div
                      key={t.id}
                      className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          {Icon.cpu}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-700">
                              {t.title}
                            </h4>

                            {t.status?.name && (
                              <StatusBadge value={t.status.name} />
                            )}
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[10px] text-slate-400">
                            <span>
                              TRL: {t.technology_readiness_level || '—'}
                            </span>
                            <span>
                              IP: {t.ip_reference || '—'}
                            </span>
                          </div>

                          {t.description && (
                            <p className="text-xs leading-5 text-slate-500 mt-2 whitespace-pre-wrap">
                              {t.description}
                            </p>
                          )}

                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2">
                              Commercialization
                            </p>

                            {(t.commercializations || []).length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {(t.commercializations || []).map((c) => (
                                  <span
                                    key={c.id}
                                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] px-2.5 py-1 rounded-full font-semibold"
                                  >
                                    {c.status?.name || 'Recorded'}
                                    {c.potential_partner && (
                                      <span className="font-normal text-emerald-600">
                                        · {c.potential_partner}
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[11px] text-slate-400">
                                No commercialization records linked.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-2">
                    {Icon.cpu}
                  </div>
                  <p className="text-xs text-slate-400">
                    No technologies linked. Create one under Technology module.
                  </p>
                </div>
              )}
            </SectionCard>

          </div>

          <div className="space-y-5">

            <SectionCard
              title="Innovation Information"
              subtitle="Key record information"
              icon={Icon.lightbulb}
            >
              <div className="space-y-4">

                <MetaItem
                  icon={Icon.tag}
                  label="Innovation Type"
                  value={item.type?.name}
                />

                <MetaItem
                  icon={Icon.building}
                  label="College"
                  value={item.college?.name || item.college?.code}
                />

                <MetaItem
                  icon={Icon.user}
                  label="Lead Innovator"
                  value={leadName}
                />

                <MetaItem
                  icon={Icon.calendar}
                  label="Development Date"
                  value={item.development_date}
                />

                <MetaItem
                  icon={Icon.tag}
                  label="IP Status"
                  value={item.ip_status?.name}
                />

                <MetaItem
                  icon={Icon.link}
                  label="Linked Research"
                  value={item.research ? `${item.research.research_code || ''}${item.research.title ? ` — ${item.research.title}` : ''}`.trim() : ''}
                />

              </div>
            </SectionCard>

            <SectionCard
              title="Remarks"
              icon={Icon.file}
            >
              <p className="text-xs leading-5 text-slate-600 whitespace-pre-wrap">
                {item.remarks || 'No remarks provided.'}
              </p>
            </SectionCard>

          </div>

        </div>

      </div>
    </AuthenticatedLayout>
  );
}
