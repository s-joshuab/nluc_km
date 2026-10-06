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
        // Scoped facilitators only see aggregates of their own college
        $scope = $u->scopeCollegeId();
        $rq = fn() => DB::table('researches')->whereNull('deleted_at')->when($scope, fn($q)=>$q->where('college_id',$scope));
        $stats['totalResearch'] = $rq()->count();
        $stats['ongoing'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Ongoing')->whereNull('researches.deleted_at')->when($scope, fn($q)=>$q->where('researches.college_id',$scope))->count();
        $stats['completed'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Completed')->whereNull('researches.deleted_at')->when($scope, fn($q)=>$q->where('researches.college_id',$scope))->count();
        $stats['published'] = DB::table('researches')->join('research_statuses as s','s.id','=','researches.research_status_id')->where('s.name','Published')->whereNull('researches.deleted_at')->when($scope, fn($q)=>$q->where('researches.college_id',$scope))->count();
        $stats['publications'] = DB::table('publications as p')->whereNull('p.deleted_at')
            ->when($scope, fn($q)=>$q->where(fn($qq)=>$qq->whereIn('p.research_id', fn($r)=>$r->select('id')->from('researches')->where('college_id',$scope)->whereNull('deleted_at'))->orWhereIn('p.created_by', fn($usr)=>$usr->select('id')->from('users')->where('college_id',$scope))))->count();
        $stats['iec'] = DB::table('iec_materials')->whereNull('deleted_at')
            ->when($scope, fn($q)=>$q->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id')))->count();
        $stats['innovations'] = DB::table('innovations')->whereNull('deleted_at')
            ->when($scope, fn($q)=>$q->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id')))->count();
        $stats['commercialized'] = DB::table('commercialization_records as c')->join('commercialization_statuses as s','s.id','=','c.status_id')->where('s.name','Commercialized')->count();
        foreach (['Endorsed / Submitted','Received by RPSU','Under Processing','For Review','For Release','Forwarded / Endorsed to RECI','Completed / Closed'] as $st) {
            $key = preg_replace('/[^A-Za-z0-9]+/','', $st);
            $eq = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->where('s.name',$st);
            if ($scope) $eq->where(fn($qq)=>$qq->where('e.college_id',$scope)
                ->orWhereIn('e.researcher_id', fn($usr)=>$usr->select('id')->from('users')->where('college_id',$scope))
                ->orWhereIn('e.research_id', fn($r)=>$r->select('id')->from('researches')->where('college_id',$scope)->whereNull('deleted_at')));
            $stats['st_'.$key] = $eq->count();
        }
        $stats['newlySubmitted'] = $stats['st_EndorsedSubmitted'] ?? 0;
        $byCollege = DB::table('researches as r')->leftJoin('colleges as c','c.id','=','r.college_id')->select('c.code','c.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->when($scope, fn($q)=>$q->where('r.college_id',$scope))->groupBy('c.id','c.code','c.name')->orderByDesc('total')->get();
        $byStatus = DB::table('researches as r')->join('research_statuses as s','s.id','=','r.research_status_id')->select('s.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->when($scope, fn($q)=>$q->where('r.college_id',$scope))->groupBy('s.name')->get();
        $byType = DB::table('researches as r')->join('research_types as t','t.id','=','r.research_type_id')->select('t.name',DB::raw('COUNT(r.id) as total'))->whereNull('r.deleted_at')->when($scope, fn($q)=>$q->where('r.college_id',$scope))->groupBy('t.name')->get();
        $byYear = DB::table('researches')->select(DB::raw('YEAR(COALESCE(date_submitted, created_at)) as yr'),DB::raw('COUNT(*) as total'))->whereNull('deleted_at')->when($scope, fn($q)=>$q->where('college_id',$scope))->groupBy('yr')->orderBy('yr')->get();
        $endorseByStatus = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->select('s.name',DB::raw('COUNT(e.id) as total'))
            ->when($scope, fn($q)=>$q->where(fn($qq)=>$qq->where('e.college_id',$scope)
                ->orWhereIn('e.researcher_id', fn($usr)=>$usr->select('id')->from('users')->where('college_id',$scope))
                ->orWhereIn('e.research_id', fn($r)=>$r->select('id')->from('researches')->where('college_id',$scope)->whereNull('deleted_at'))))
            ->groupBy('s.name')->get();
        // Role-scoped
        $myResearch = DB::table('research_researcher')->where('user_id',$u->id)->count();
        $myTx = DB::table('endorsements')->where('researcher_id',$u->id)->count();
        $myPending = DB::table('endorsements as e')->join('workflow_statuses as s','s.id','=','e.current_status_id')->where('e.researcher_id',$u->id)->whereNotIn('s.name',['Completed / Closed'])->count();
        $myBookmarks = DB::table('bookmarks')->where('user_id',$u->id)->count();
        $recentQ = DB::table('researches as r')->leftJoin('colleges as c','c.id','=','r.college_id')->leftJoin('research_statuses as s','s.id','=','r.research_status_id')->select('r.id','r.research_code','r.title','c.code as college','s.name as status','r.created_at')->whereNull('r.deleted_at');
        if ($scope) $recentQ->where('r.college_id',$scope);
        // Researchers only ever see their own recent items
        if ($u->isResearcherOnly()) $recentQ->where(fn($qq)=>$qq->where('r.lead_researcher_id',$u->id)
            ->orWhereIn('r.id', fn($t)=>$t->select('research_id')->from('research_researcher')->where('user_id',$u->id)));
        $recentResearch = $recentQ->orderByDesc('r.id')->limit(5)->get();
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
