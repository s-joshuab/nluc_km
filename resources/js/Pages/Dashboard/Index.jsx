import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import DashboardCard from '../../Components/DashboardCard';
import StatusBadge from '../../Components/StatusBadge';
export default function Index({ stats, byCollege, byStatus, byType, byYear, endorseByStatus, my, recentResearch, notifications, records, myRoles }) {
  const isRecordsOnly = myRoles?.length === 1 && myRoles[0] === 'RPSU Staff';
  return (
    <AuthenticatedLayout header="Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardCard label="Total Research" value={stats.totalResearch} href="/repository" />
        <DashboardCard label="Ongoing" value={stats.ongoing} />
        <DashboardCard label="Completed" value={stats.completed} />
        <DashboardCard label="Published" value={stats.published} />
        <DashboardCard label="Pending Endorsements" value={stats.pendingEndorsements} href="/endorsements" />
        <DashboardCard label="QR Received" value={stats.st_QRReceived ?? 0} />
        <DashboardCard label="Under Processing" value={stats.st_UnderProcessing ?? 0} />
        <DashboardCard label="QR Released" value={stats.st_QRRelease ?? 0} />
        <DashboardCard label="Forwarded to RECI" value={stats.st_ForwardedEndorsedtoRECI ?? 0} />
        <DashboardCard label="Completed / Closed" value={stats.st_CompletedClosed ?? 0} />
        <DashboardCard label="Publications" value={stats.publications} href="/publications" />
        <DashboardCard label="IEC Materials" value={stats.iec} href="/iec-materials" />
        <DashboardCard label="Innovations" value={stats.innovations} href="/innovations" />
        <DashboardCard label="Commercialized" value={stats.commercialized} href="/commercialization" />
        <DashboardCard label="Pending Access Requests" value={stats.pendingAccess} href="/access-requests" />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold text-sm mb-2">My Summary</h3>
          <div className="text-sm space-y-1 text-gray-700">
            <div>My Research: <b>{my.research}</b></div>
            <div>My Transactions: <b>{my.transactions}</b></div>
            <div>Pending: <b>{my.pending}</b></div>
            <div>Bookmarks: <b>{my.bookmarks}</b></div>
          </div>
        </div>
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold text-sm mb-2">Records Office Queues</h3>
          <div className="text-sm space-y-1 text-gray-700">
            <div>Awaiting QR Received: <b>{records.awaitingReceived}</b></div>
            <div>QR Received Today: <b>{records.receivedToday}</b></div>
            <div>Awaiting QR Release: <b>{records.awaitingRelease}</b></div>
            <div>QR Released Today: <b>{records.releasedToday}</b></div>
          </div>
        </div>
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold text-sm mb-2">Recent Research</h3>
          <div className="space-y-2">{recentResearch.map(r => (
            <a key={r.id} href={`/repository/${r.id}`} className="block text-sm"><span className="font-medium">{r.research_code}</span> — {r.title} <StatusBadge value={r.status} /></a>
          ))}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white border rounded p-4"><h3 className="font-semibold text-sm mb-2">Research by College</h3>{byCollege.map(c => <div key={c.code} className="text-sm flex justify-between"><span>{c.code || c.name}</span><b>{c.total}</b></div>)}</div>
        <div className="bg-white border rounded p-4"><h3 className="font-semibold text-sm mb-2">Research by Status</h3>{byStatus.map(s => <div key={s.name} className="text-sm flex justify-between"><span>{s.name}</span><b>{s.total}</b></div>)}</div>
        <div className="bg-white border rounded p-4"><h3 className="font-semibold text-sm mb-2">Research by Type</h3>{byType.map(s => <div key={s.name} className="text-sm flex justify-between"><span>{s.name}</span><b>{s.total}</b></div>)}</div>
        <div className="bg-white border rounded p-4"><h3 className="font-semibold text-sm mb-2">Endorsements by Status</h3>{endorseByStatus.map(s => <div key={s.name} className="text-sm flex justify-between"><span>{s.name}</span><b>{s.total}</b></div>)}</div>
      </div>
    </AuthenticatedLayout>
  );
}
