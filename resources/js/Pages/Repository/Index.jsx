
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { router, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';


const Icons = {
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-4 h-4"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  ),

  filter: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-4 h-4"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  ),

  book: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-5 h-5"
    >
      <path d="M4 5a3 3 0 0 1 3-3h13v18H7a3 3 0 0 0-3 3V5Z" />
      <path d="M4 5a3 3 0 0 1 3 3h13" />
    </svg>
  ),

  calendar: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-3.5 h-3.5"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),

  user: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-3.5 h-3.5"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),

  arrow: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-4 h-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),

  close: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-3.5 h-3.5"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
};


/* =========================================================
   FILTER FIELD
========================================================= */

function FilterField({
  label,
  children,
}) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-semibold text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}


/* =========================================================
   RESEARCH CARD
========================================================= */

function ResearchCard({ research }) {

  const leadName = [
    research.lead_researcher?.first_name,
    research.lead_researcher?.last_name,
  ]
    .filter(Boolean)
    .join(' ') || 'Not specified';


  return (
    <Link
      href={`/repository/${research.id}`}
      className="
        group block bg-white
        border border-slate-200
        rounded-2xl
        overflow-hidden
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-emerald-200
        hover:shadow-md
      "
    >

      <div className="p-5">

        {/* TOP META */}

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-2 min-w-0">

            <div className="
              w-9 h-9 rounded-xl
              bg-emerald-50
              text-emerald-600
              flex items-center justify-center
              shrink-0
            ">
              {Icons.book}
            </div>

            <div className="min-w-0">

              <p className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-emerald-600
                truncate
              ">
                {research.research_code || 'Research Record'}
              </p>

              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {research.college?.code || 'No college'}
                {research.type?.name && (
                  <> · {research.type.name}</>
                )}
              </p>

            </div>

          </div>


          <div className="shrink-0">
            <StatusBadge value={research.status?.name} />
          </div>

        </div>


        {/* TITLE */}

        <h3 className="
          mt-4
          text-sm
          font-bold
          leading-5
          text-slate-800
          line-clamp-2
          group-hover:text-emerald-700
          transition-colors
        ">
          {research.title}
        </h3>


        {/* DESCRIPTION */}

        {research.abstract && (
          <p className="
            mt-2
            text-xs
            leading-5
            text-slate-500
            line-clamp-2
          ">
            {research.abstract}
          </p>
        )}


        {/* DETAILS */}

        <div className="
          mt-4
          pt-3
          border-t
          border-slate-100
          grid
          grid-cols-2
          gap-3
        ">

          <div className="flex items-center gap-2 min-w-0">

            <div className="text-slate-400 shrink-0">
              {Icons.user}
            </div>

            <div className="min-w-0">

              <p className="text-[10px] text-slate-400">
                Lead Researcher
              </p>

              <p className="
                text-xs
                font-medium
                text-slate-600
                truncate
              ">
                {leadName}
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2 min-w-0">

            <div className="text-slate-400 shrink-0">
              {Icons.calendar}
            </div>

            <div className="min-w-0">

              <p className="text-[10px] text-slate-400">
                Year
              </p>

              <p className="text-xs font-medium text-slate-600">
                {research.year || '—'}
              </p>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="
          mt-4
          flex
          items-center
          justify-between
        ">

          <span className="
            text-[11px]
            text-slate-400
          ">
            View research record
          </span>

          <span className="
            text-slate-300
            group-hover:text-emerald-600
            group-hover:translate-x-0.5
            transition-all
          ">
            {Icons.arrow}
          </span>

        </div>

      </div>

    </Link>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function Index({
  rows,
  filters,
  lookups,
}) {

  const [f, setF] = useState(filters || {});


  /* =======================================================
     ACTIVE FILTER COUNT
  ======================================================= */

  const activeFilterCount = useMemo(() => {

    return Object.entries(f || {})
      .filter(([key, value]) => {

        if (key === 'page') return false;

        return value !== undefined &&
               value !== null &&
               String(value).trim() !== '';

      })
      .length;

  }, [f]);


  /* =======================================================
     UPDATE FILTER
  ======================================================= */

  const updateFilter = (key, value) => {

    setF(prev => ({
      ...prev,
      [key]: value,
    }));

  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const submit = (e) => {

    e?.preventDefault();

    router.get(
      '/repository',
      f,
      {
        preserveState: true,
        preserveScroll: true,
      }
    );

  };


  /* =======================================================
     RESET
  ======================================================= */

  const resetFilters = () => {

    const empty = {
      search: '',
      college_id: '',
      research_type_id: '',
      research_status_id: '',
      researcher: '',
      sdg: '',
      year: '',
    };

    setF(empty);

    router.get(
      '/repository',
      {},
      {
        preserveState: true,
        preserveScroll: true,
      }
    );

  };


  return (
    <AuthenticatedLayout header="Research Repository">

      <div className="space-y-5">


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-3
        ">

          <div>

            <div className="flex items-center gap-2">

              <div className="
                w-9 h-9
                rounded-xl
                bg-emerald-50
                text-emerald-600
                flex items-center justify-center
              ">
                {Icons.book}
              </div>

              <div>

                <h1 className="
                  text-xl
                  font-bold
                  text-slate-900
                ">
                  Research Repository
                </h1>

                <p className="
                  text-sm
                  text-slate-500
                  mt-0.5
                ">
                  Browse and discover institutional research records.
                </p>

              </div>

            </div>

          </div>


          <div className="
            text-xs
            text-slate-400
            sm:text-right
          ">

            <span className="font-semibold text-slate-700">
              {rows?.total ?? rows?.data?.length ?? 0}
            </span>

            {' '}research records

          </div>

        </div>


        {/* ===================================================
            SEARCH / FILTER PANEL
        =================================================== */}

        <form
          onSubmit={submit}
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* SEARCH BAR */}

          <div className="
            p-4
            border-b
            border-slate-100
          ">

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-2
            ">

              <div className="relative flex-1">

                <div className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                ">
                  {Icons.search}
                </div>

                <input
                  type="text"
                  placeholder="Search by title, research code, keyword..."
                  value={f.search || ''}
                  onChange={(e) =>
                    updateFilter('search', e.target.value)
                  }
                  className="
                    w-full
                    h-10
                    pl-9
                    pr-3
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-emerald-400
                    focus:ring-2
                    focus:ring-emerald-100
                    outline-none
                    transition
                  "
                />

              </div>


              <button
                type="submit"
                className="
                  h-10
                  px-5
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-sm
                  font-semibold
                  transition
                  shadow-sm
                "
              >
                Search
              </button>

            </div>

          </div>


          {/* FILTER HEADER */}

          <div className="
            px-4
            py-3
            flex
            items-center
            justify-between
            gap-3
          ">

            <div className="flex items-center gap-2">

              <div className="text-slate-500">
                {Icons.filter}
              </div>

              <span className="
                text-xs
                font-bold
                text-slate-700
              ">
                Filters
              </span>

              {activeFilterCount > 0 && (
                <span className="
                  inline-flex
                  items-center
                  justify-center
                  min-w-5
                  h-5
                  px-1.5
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  text-[10px]
                  font-bold
                ">
                  {activeFilterCount}
                </span>
              )}

            </div>


            {activeFilterCount > 0 && (

              <button
                type="button"
                onClick={resetFilters}
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-xs
                  font-medium
                  text-slate-400
                  hover:text-red-500
                  transition
                "
              >
                {Icons.close}
                Clear filters
              </button>

            )}

          </div>


          {/* FILTER FIELDS */}

          <div className="
            px-4
            pb-4
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-3
          ">

            <FilterField label="College">

              <select
                value={f.college_id || ''}
                onChange={(e) =>
                  updateFilter('college_id', e.target.value)
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              >

                <option value="">
                  All Colleges
                </option>

                {lookups?.colleges?.map(c => (
                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.code} — {c.name}
                  </option>
                ))}

              </select>

            </FilterField>


            <FilterField label="Research Type">

              <select
                value={f.research_type_id || ''}
                onChange={(e) =>
                  updateFilter(
                    'research_type_id',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              >

                <option value="">
                  All Research Types
                </option>

                {lookups?.types?.map(type => (
                  <option
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </option>
                ))}

              </select>

            </FilterField>


            <FilterField label="Research Status">

              <select
                value={f.research_status_id || ''}
                onChange={(e) =>
                  updateFilter(
                    'research_status_id',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              >

                <option value="">
                  All Statuses
                </option>

                {lookups?.statuses?.map(status => (
                  <option
                    key={status.id}
                    value={status.id}
                  >
                    {status.name}
                  </option>
                ))}

              </select>

            </FilterField>


            <FilterField label="Year">

              <input
                type="text"
                placeholder="e.g. 2026"
                value={f.year || ''}
                onChange={(e) =>
                  updateFilter('year', e.target.value)
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              />

            </FilterField>


            <FilterField label="Researcher">

              <input
                type="text"
                placeholder="Researcher name"
                value={f.researcher || ''}
                onChange={(e) =>
                  updateFilter('researcher', e.target.value)
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              />

            </FilterField>


            <FilterField label="SDG">

              <input
                type="text"
                placeholder="Sustainable Development Goal"
                value={f.sdg || ''}
                onChange={(e) =>
                  updateFilter('sdg', e.target.value)
                }
                className="
                  w-full
                  h-9
                  px-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-xs
                  text-slate-600
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                  outline-none
                "
              />

            </FilterField>

          </div>

        </form>


        {/* ===================================================
            ACTIVE FILTERS
        =================================================== */}

        {activeFilterCount > 0 && (

          <div className="flex flex-wrap items-center gap-2">

            <span className="
              text-[11px]
              font-semibold
              text-slate-400
            ">
              Active filters:
            </span>

            {f.search && (
              <span className="
                px-2.5 py-1
                rounded-full
                bg-slate-100
                text-[11px]
                text-slate-600
              ">
                Search: {f.search}
              </span>
            )}

            {f.researcher && (
              <span className="
                px-2.5 py-1
                rounded-full
                bg-slate-100
                text-[11px]
                text-slate-600
              ">
                Researcher: {f.researcher}
              </span>
            )}

            {f.year && (
              <span className="
                px-2.5 py-1
                rounded-full
                bg-slate-100
                text-[11px]
                text-slate-600
              ">
                Year: {f.year}
              </span>
            )}

            {f.sdg && (
              <span className="
                px-2.5 py-1
                rounded-full
                bg-slate-100
                text-[11px]
                text-slate-600
              ">
                SDG: {f.sdg}
              </span>
            )}

          </div>

        )}


        {/* ===================================================
            RESULTS HEADER
        =================================================== */}

        <div className="
          flex
          items-center
          justify-between
          gap-3
        ">

          <div>

            <h2 className="
              text-sm
              font-bold
              text-slate-800
            ">
              Research Records
            </h2>

            <p className="
              text-xs
              text-slate-400
              mt-0.5
            ">
              Browse available research in the repository.
            </p>

          </div>

        </div>


        {/* ===================================================
            RESULTS
        =================================================== */}

        {rows?.data?.length > 0 ? (

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
          ">

            {rows.data.map(research => (
              <ResearchCard
                key={research.id}
                research={research}
              />
            ))}

          </div>

        ) : (

          <div className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-12
            text-center
          ">

            <div className="
              mx-auto
              w-14
              h-14
              rounded-2xl
              bg-slate-50
              text-slate-300
              flex
              items-center
              justify-center
              mb-4
            ">
              {Icons.book}
            </div>

            <h3 className="
              text-sm
              font-bold
              text-slate-700
            ">
              No research found
            </h3>

            <p className="
              text-xs
              text-slate-400
              mt-1
              max-w-sm
              mx-auto
            ">
              No research records match your current search
              or filter criteria.
            </p>

            {activeFilterCount > 0 && (

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-4
                  text-xs
                  font-semibold
                  text-emerald-600
                  hover:text-emerald-700
                "
              >
                Clear filters and try again
              </button>

            )}

          </div>

        )}


        {/* ===================================================
            PAGINATION
        =================================================== */}

        {rows?.data?.length > 0 && (
          <div className="pt-1">
            <Pagination data={rows} />
          </div>
        )}

      </div>

    </AuthenticatedLayout>
  );
}
