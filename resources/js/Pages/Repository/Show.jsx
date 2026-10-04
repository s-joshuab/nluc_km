import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import StatusBadge from '../../Components/StatusBadge';
import Timeline from '../../Components/Timeline';
import { useForm, Link, router } from '@inertiajs/react';

const Icon = {
  bookmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z" />
    </svg>
  ),

  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  ),

  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),

  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),

  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M8 9h1M15 9h1M8 13h1M15 13h1M8 17h1M15 17h1M11 21v-4h2v4" />
    </svg>
  ),

  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  ),

  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),

  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  ),

  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),

  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="m5 12 4 4L19 6" />
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

function RelatedItem({ title, meta, href }) {
  const content = (
    <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        {Icon.file}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-700 truncate group-hover:text-emerald-700">
          {title}
        </p>

        {meta && (
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
            {meta}
          </p>
        )}
      </div>

      {href && (
        <span className="text-slate-300 group-hover:text-emerald-600">
          {Icon.arrow}
        </span>
      )}
    </div>
  );

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default function Show({ item, isBookmarked }) {
  const {
    data,
    setData,
    post,
    processing,
    errors,
  } = useForm({
    file: null,
    file_type_id: '',
    access_level_id: '',
    copyright_status_id: '',
    usage_permission_id: '',
    version: '1.0',
    remarks: '',
  });

  const submitFile = (e) => {
    e.preventDefault();

    post(`/research/${item.id}/files`, {
      forceFormData: true,
    });
  };

  const bookmark = () => {
    router.post('/bookmarks/toggle', {
      research_id: item.id,
    });
  };

  const team = item.team || [];
  const files = item.files || [];
  const publications = item.publications || [];
  const iecMaterials = item.iec_materials || [];
  const innovations = item.innovations || [];
  const endorsements = item.endorsements || [];

  return (
    <AuthenticatedLayout header={`${item.research_code} — Details`}>

      <div className="space-y-5">

        <Link
          href="/repository"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-600 transition"
        >
          ← Back to Repository
        </Link>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="h-1 bg-emerald-500" />

          <div className="p-5 sm:p-6">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wide">
                    {item.research_code}
                  </span>

                  {item.status?.name && (
                    <StatusBadge value={item.status.name} />
                  )}

                  {item.sdg_alignment && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold">
                      {item.sdg_alignment}
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold leading-tight text-slate-900 max-w-4xl">
                  {item.title}
                </h1>

                <p className="text-sm text-slate-500 mt-2 max-w-3xl">
                  {item.type?.name || 'Research'} · {item.college?.name || 'Institutional Research'}
                </p>

              </div>

              <button
                type="button"
                onClick={bookmark}
                className={`
                  inline-flex items-center justify-center gap-2
                  px-4 py-2.5 rounded-xl
                  border text-xs font-semibold
                  transition shrink-0
                  ${
                    isBookmarked
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                  }
                `}
              >
                {Icon.bookmark}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">

              <MetaItem
                icon={Icon.building}
                label="College"
                value={item.college?.name}
              />

              <MetaItem
                icon={Icon.file}
                label="Research Type"
                value={item.type?.name}
              />

              <MetaItem
                icon={Icon.user}
                label="Lead Researcher"
                value={
                  `${item.lead_researcher?.first_name || ''} ${item.lead_researcher?.last_name || ''}`.trim()
                }
              />

              <MetaItem
                icon={Icon.calendar}
                label="Research Period"
                value={
                  item.start_date || item.end_date
                    ? `${item.start_date || '—'} → ${item.end_date || '—'}`
                    : '—'
                }
              />

            </div>

          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 space-y-5">

            <SectionCard
              title="Research Abstract"
              subtitle="Overview and scope of the research"
              icon={Icon.file}
            >
              <div className="text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                {item.abstract || 'No abstract provided.'}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Keywords
                  </p>

                  <p className="text-xs text-slate-600 mt-1 leading-5">
                    {item.keywords || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Research Area
                  </p>

                  <p className="text-xs font-medium text-slate-600 mt-1">
                    {item.area?.name || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Funding Source
                  </p>

                  <p className="text-xs font-medium text-slate-600 mt-1">
                    {item.funding_source || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Funding Amount
                  </p>

                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    {item.funding_amount || '—'}
                  </p>
                </div>

              </div>
            </SectionCard>

            <SectionCard
              title="Research Team"
              subtitle={`${team.length} ${team.length === 1 ? 'member' : 'members'}`}
              icon={Icon.user}
            >
              {team.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {team.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-full bg-white border border-slate-200 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {member.user?.first_name?.charAt(0)}
                        {member.user?.last_name?.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">
                          {member.user?.first_name} {member.user?.last_name}
                        </p>

                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {member.role?.name || 'Research Team Member'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  No research team members listed.
                </p>
              )}
            </SectionCard>

            <SectionCard
              title="Research Files"
              subtitle="Documents and knowledge resources attached to this research"
              icon={Icon.file}
            >

              {files.length > 0 ? (
                <div className="space-y-3">

                  {files.map((file) => {
                    return (
                      <div
                        key={file.id}
                        className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition"
                      >

                        <div className="flex items-start gap-3">

                          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                            {Icon.file}
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="text-xs font-bold text-slate-700 break-all">
                                {file.original_name}
                              </h4>

                              {file.access_level?.name && (
                                <StatusBadge value={file.access_level.name} />
                              )}

                            </div>

                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[10px] text-slate-400">
                              <span>
                                {file.file_type?.name || 'Document'}
                              </span>

                              <span>
                                Version {file.version || '1.0'}
                              </span>

                              <span>
                                {file.file_size
                                  ? `${(file.file_size / 1024).toFixed(1)} KB`
                                  : 'Size unavailable'}
                              </span>
                            </div>

                          </div>

                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">

                          <a
                            href={`/research-files/${file.id}/download`}
                            className="
                              inline-flex items-center gap-1.5
                              px-3 py-1.5
                              rounded-lg
                              bg-emerald-50
                              text-emerald-700
                              text-[11px]
                              font-semibold
                              hover:bg-emerald-100
                              transition
                            "
                          >
                            {Icon.download}
                            Download
                          </a>

                        </div>

                      </div>
                    );
                  })}

                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-2">
                    {Icon.file}
                  </div>

                  <p className="text-xs text-slate-400">
                    No files have been attached to this research.
                  </p>
                </div>
              )}

              <details className="mt-5 pt-4 border-t border-slate-100">
                <summary className="cursor-pointer text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  Upload file · RPSU only
                </summary>

                <form
                  onSubmit={submitFile}
                  className="mt-4 space-y-3"
                >

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      File
                    </label>

                    <input
                      type="file"
                      onChange={(e) =>
                        setData('file', e.target.files?.[0] || null)
                      }
                      className="
                        block
                        w-full
                        text-xs
                        text-slate-500
                        file:mr-3
                        file:rounded-lg
                        file:border-0
                        file:bg-emerald-50
                        file:px-3
                        file:py-2
                        file:text-xs
                        file:font-semibold
                        file:text-emerald-700
                        hover:file:bg-emerald-100
                      "
                    />

                    {errors.file && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {errors.file}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                        File Type ID
                      </label>

                      <input
                        value={data.file_type_id}
                        onChange={(e) =>
                          setData('file_type_id', e.target.value)
                        }
                        className="
                          w-full h-9 px-3 rounded-lg
                          border border-slate-200
                          text-xs
                          focus:border-emerald-400
                          focus:ring-2
                          focus:ring-emerald-100
                          outline-none
                        "
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                        Access Level ID
                      </label>

                      <input
                        value={data.access_level_id}
                        onChange={(e) =>
                          setData('access_level_id', e.target.value)
                        }
                        className="
                          w-full h-9 px-3 rounded-lg
                          border border-slate-200
                          text-xs
                          focus:border-emerald-400
                          focus:ring-2
                          focus:ring-emerald-100
                          outline-none
                        "
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="
                      px-4 py-2
                      rounded-lg
                      bg-emerald-600
                      hover:bg-emerald-700
                      disabled:opacity-50
                      text-white
                      text-xs
                      font-semibold
                      transition
                    "
                  >
                    {processing ? 'Uploading...' : 'Upload File'}
                  </button>

                </form>
              </details>

            </SectionCard>

          </div>

          <div className="space-y-5">

            <SectionCard
              title="Research Information"
              subtitle="Key record information"
              icon={Icon.building}
            >
              <div className="space-y-4">

                <MetaItem
                  icon={Icon.building}
                  label="College"
                  value={item.college?.name}
                />

                <MetaItem
                  icon={Icon.file}
                  label="Research Type"
                  value={item.type?.name}
                />

                <MetaItem
                  icon={Icon.user}
                  label="Lead Researcher"
                  value={
                    `${item.lead_researcher?.first_name || ''} ${item.lead_researcher?.last_name || ''}`.trim()
                  }
                />

                <MetaItem
                  icon={Icon.calendar}
                  label="Start Date"
                  value={item.start_date}
                />

                <MetaItem
                  icon={Icon.calendar}
                  label="End Date"
                  value={item.end_date}
                />

                <MetaItem
                  icon={Icon.file}
                  label="Research Area"
                  value={item.area?.name}
                />

                <MetaItem
                  icon={Icon.file}
                  label="SDG Alignment"
                  value={item.sdg_alignment}
                />

              </div>
            </SectionCard>

            <SectionCard
              title="Related Knowledge"
              subtitle="Knowledge assets connected to this research"
              icon={Icon.link}
            >

              <div className="space-y-1">

                {publications.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-3 mb-1">
                      Publications
                    </p>

                    {publications.map((publication) => (
                      <RelatedItem
                        key={publication.id}
                        title={publication.title}
                        meta={publication.status?.name}
                      />
                    ))}
                  </div>
                )}

                {iecMaterials.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-3 mb-1">
                      IEC Materials
                    </p>

                    {iecMaterials.map((material) => (
                      <RelatedItem
                        key={material.id}
                        title={material.title}
                        meta={material.status?.name}
                      />
                    ))}
                  </div>
                )}

                {innovations.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-3 mb-1">
                      Innovations
                    </p>

                    {innovations.map((innovation) => (
                      <RelatedItem
                        key={innovation.id}
                        title={innovation.title}
                      />
                    ))}
                  </div>
                )}

                {endorsements.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-3 mb-1">
                      Endorsements
                    </p>

                    {endorsements.map((endorsement) => (
                      <RelatedItem
                        key={endorsement.id}
                        title={endorsement.tracking_number}
                        meta={endorsement.current_status?.name}
                        href={`/endorsements/${endorsement.id}`}
                      />
                    ))}
                  </div>
                )}

                {!publications.length &&
                  !iecMaterials.length &&
                  !innovations.length &&
                  !endorsements.length && (
                    <div className="py-6 text-center">
                      <p className="text-xs text-slate-400">
                        No related knowledge assets found.
                      </p>
                    </div>
                  )}

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

            {item.timeline && (
              <SectionCard
                title="Research Timeline"
                subtitle="Record activity and status history"
                icon={Icon.calendar}
              >
                <Timeline items={item.timeline} />
              </SectionCard>
            )}

          </div>

        </div>

      </div>

    </AuthenticatedLayout>
  );
}