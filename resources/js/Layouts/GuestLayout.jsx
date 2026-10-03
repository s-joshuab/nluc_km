export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-emerald-600">
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold">R</div>
          <div className="font-bold text-emerald-800 mt-2">DMMMSU-NLUC RPSU</div>
          <div className="text-xs text-gray-500">Knowledge Management & Research Management System</div>
        </div>
        {children}
      </div>
    </div>
  );
}
