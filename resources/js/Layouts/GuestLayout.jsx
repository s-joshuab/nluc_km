export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Brand header */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-6 py-6 text-center">
            <div className="w-14 h-14 mx-auto bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-emerald-200">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className="font-bold text-white text-base tracking-tight">DMMMSU-NLUC RPSU</div>
            <div className="text-xs text-emerald-200/80 mt-0.5">Knowledge Management System</div>
          </div>
          {/* Content */}
          <div className="px-6 py-6">{children}</div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-4 text-xs text-emerald-200/50">
          Don Mariano Marcos Memorial State University — North La Union Campus
        </div>
      </div>
    </div>
  );
}
