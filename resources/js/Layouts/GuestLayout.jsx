import { Link } from '@inertiajs/react';

const capabilities = [
  {
    title: 'Research repository',
    description: 'Find and manage campus research in one place.',
  },
  {
    title: 'Endorsement tracking',
    description: 'Follow documents through each stage of the RPSU process.',
  },
  {
    title: 'Knowledge and innovation',
    description: 'Connect publications, IEC materials, and innovation records.',
  },
];

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-10 sm:px-10 lg:order-2 lg:min-h-screen lg:px-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden" aria-label="DMMMSU-NLUC RPSU home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-xs font-bold text-white">RPSU</span>
            <span className="text-sm font-bold text-slate-900">DMMMSU-NLUC</span>
          </Link>
          {children}
        </div>
      </main>

      <aside className="bg-emerald-950 px-6 py-10 text-white sm:px-10 lg:order-1 lg:min-h-screen lg:px-12 lg:py-12 xl:px-16">
        <div className="mx-auto flex h-full max-w-xl flex-col justify-between gap-12">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-700 bg-emerald-900 text-xs font-bold">RPSU</span>
            <div className="leading-tight">
              <p className="text-sm font-bold">DMMMSU-NLUC</p>
              <p className="mt-1 text-xs text-emerald-100">Research and Publication Services Unit</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-200">Knowledge Management System</p>
            <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Research knowledge, all in one place.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-emerald-50">
              A shared workspace for the North La Union Campus to organize research, track endorsements, and connect scholarly work with its outcomes.
            </p>

            <ul className="mt-10 space-y-5">
              {capabilities.map((capability) => (
                <li key={capability.title} className="border-l-2 border-emerald-500 pl-4">
                  <p className="font-semibold text-white">{capability.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-100">{capability.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs leading-relaxed text-emerald-200">
            Don Mariano Marcos Memorial State University — North La Union Campus
          </p>
        </div>
      </aside>
    </div>
  );
}
