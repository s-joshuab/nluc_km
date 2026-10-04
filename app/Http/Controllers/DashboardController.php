<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class DashboardController extends Controller {
    public function index() {
        $u = auth()->user()->load(['roles','offices']);
        $roles = $u->roles->pluck('name')->toArray();
        $isAdmin = in_array('RPSU Administrator', $roles);
        $isFac = in_array('Research & Publication Facilitator', $roles);
        $isResearcher = in_array('Researcher', $roles);
        $isRecords = in_array('RPSU Staff', $roles);
        $stats = [];
        $stats['totalResearch'] = DB::table('researches')->whereNull('deleted_at')->count();
        $stats['ongoing'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Ongoing')->whereNull('researches.deleted_at')->count();
        $stats['completed'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Completed')->whereNull('researches.deleted_at')->count();
        $stats['published'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Published')->whereNull('researches.deleted_at')->count();
        $stats['publications'] = DB::table('publications')->whereNull('deleted_at')->count();
        $stats['iec'] = DB::table('iec_materials')->whereNull('deleted_at')->count();
        $stats['innovations'] = DB::table('innovations')->whereNull('deleted_at')->count();
        $stats['commercialized'] = DB::table('commercialization_records as c')->join('commercialization_statuses as s','s.id','=','c.status_id')->where('s.name','Commercialized')->count();
        foreach (['Endorsed / Submitted','Received by RPSU','Under Processing','For Review','For Release','Forwarded / Endorsed to RECI','Completed / Closed'] as $st) {
            $key = preg_replace('/[^A-Za-z0-9]+/','', $st);
            $stats['st_'.$key] = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->where('s.name',$st)->count();
        }
        $stats['newlySubmitted'] = $stats['st_EndorsedSubmitted'] ?? 0;
        $byCollege = DB::table('researches as r')->leftJoin('colleges as c','c.id','=','r.college_id')->select('c.code','c.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->groupBy('c.id','c.code','c.name')->orderByDesc('total')->get();
        $byStatus = DB::table('researches as r')->join('research_statuses as s','s.id','=','r.research_status_id')->select('s.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->groupBy('s.name')->get();
        $byType = DB::table('researches as r')->join('research_types as t','t.id','=','r.research_type_id')->select('t.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->groupBy('t.name')->get();
        $byYear = DB::table('researches')->select(DB::raw('YEAR(COALESCE(date_submitted, created_at)) as yr'),DB::raw('COUNT(*) as total'))->whereNull('deleted_at')->groupBy('yr')->orderBy('yr')->get();
        $endorseByStatus = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->select('s.name',DB::raw('COUNT(e.id) as total'))->groupBy('s.name')->get();
        // Role-scoped
        $myResearch = DB::table('research_researcher')->where('user_id',$u->id)->count();
        $myTx = DB::table('endorsements')->where('researcher_id',$u->id)->count();
        $myPending = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->where('e.researcher_id',$u->id)->whereNotIn('s.name',['Completed / Closed'])->count();
        $myBookmarks = DB::table('bookmarks')->where('user_id',$u->id)->count();
        $recentResearch = DB::table('researches as r')->leftJoin('colleges as c','c.id','=','r.college_id')->leftJoin('research_statuses as s','s.id','=','r.research_status_id')->select('r.id','r.research_code','r.title','c.code as college','s.name as status','r.created_at')->whereNull('r.deleted_at')->orderByDesc('r.id')->limit(5)->get();
        $myNotifs = DB::table('notifications')->where('user_id',$u->id)->orderByDesc('id')->limit(5)->get();
        // Document tracking snapshot (by status — QR is manual at the Records Office)
        $tracking = [
            'newSubmitted' => $stats['st_EndorsedSubmitted'] ?? 0,
            'received' => $stats['st_ReceivedbyRPSU'] ?? 0,
            'processing' => $stats['st_UnderProcessing'] ?? 0,
            'forRelease' => $stats['st_ForRelease'] ?? 0,
            'forwarded' => $stats['st_ForwardedEndorsedtoRECI'] ?? 0,
            'completed' => $stats['st_CompletedClosed'] ?? 0,
        ];
        return Inertia::render('Dashboard/Index', [
            'stats'=>$stats,'byCollege'=>$byCollege,'byStatus'=>$byStatus,'byType'=>$byType,'byYear'=>$byYear,'endorseByStatus'=>$endorseByStatus,
            'my'=>['research'=>$myResearch,'transactions'=>$myTx,'pending'=>$myPending,'bookmarks'=>$myBookmarks],
            'recentResearch'=>$recentResearch,'notifications'=>$myNotifs,
            'tracking'=>$tracking,
            'myRoles'=>$roles,
        ]);
    }
}
