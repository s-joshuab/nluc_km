<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreResearchRequest;
use App\Http\Requests\UpdateResearchRequest;
use App\Models\Research;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class ResearchController extends Controller {
    public function repository(Request $req) {
        $q = Research::with(['type','status','area','college','leadResearcher'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('title','like',"%$s%")->orWhere('research_code','like',"%$s%")->orWhere('keywords','like',"%$s%")->orWhere('abstract','like',"%$s%"));
        if ($v=$req->get('college_id')) $q->where('college_id',$v);
        if ($v=$req->get('research_type_id')) $q->where('research_type_id',$v);
        if ($v=$req->get('research_status_id')) $q->where('research_status_id',$v);
        if ($v=$req->get('research_area_id')) $q->where('research_area_id',$v);
        if ($v=$req->get('sdg')) $q->where('sdg_alignment','like',"%$v%");
        if ($v=$req->get('year')) $q->where(function ($qq) use ($v) { $qq->whereYear('date_submitted',$v)->orWhereYear('created_at',$v); });
        if ($v=$req->get('researcher')) $q->whereHas('researchers', fn($qq)=>$qq->where('users.first_name','like',"%$v%")->orWhere('users.last_name','like',"%$v%"));
        $rows = $q->paginate(12)->withQueryString();
        return Inertia::render('Repository/Index', ['rows'=>$rows,'filters'=>$req->only(['search','college_id','research_type_id','research_status_id','research_area_id','sdg','year','researcher']),
            'lookups'=>$this->lookups()]);
    }
    public function index(Request $req) {
        $this->authorize('create', Research::class);
        $q = Research::with(['type','status','college','leadResearcher'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('title','like',"%$s%")->orWhere('research_code','like',"%$s%"));
        if ($v=$req->get('college_id')) $q->where('college_id',$v);
        if ($v=$req->get('research_status_id')) $q->where('research_status_id',$v);
        return Inertia::render('Research/Index', ['rows'=>$q->paginate(15)->withQueryString(),'filters'=>$req->only(['search','college_id','research_status_id']),'lookups'=>$this->lookups()]);
    }
    public function myResearch() {
        $u = auth()->user();
        $rows = Research::with(['type','status','college'])
            ->where(fn($q)=>$q->where('lead_researcher_id',$u->id)->orWhereHas('researchers', fn($qq)=>$qq->where('users.id',$u->id)))
            ->orderByDesc('id')->paginate(12);
        return Inertia::render('Research/MyResearch', ['rows'=>$rows]);
    }
    public function create() {
        $this->authorize('create', Research::class);
        return Inertia::render('Research/Create', ['lookups'=>$this->lookups()]);
    }
    public function store(StoreResearchRequest $req) {
        $data = $req->validated();
        $team = $data['team'] ?? []; unset($data['team']);
        $data['created_by'] = auth()->id();
        $r = DB::transaction(function () use ($data, $team) {
            $r = Research::create($data);
            foreach ($team as $t) { DB::table('research_researcher')->updateOrInsert(['research_id'=>$r->id,'user_id'=>$t['user_id']],['research_role_id'=>$t['research_role_id'],'created_at'=>now(),'updated_at'=>now()]); }
            if (!empty($data['lead_researcher_id'])) {
                $leadRole = DB::table('research_roles')->where('name','Lead Researcher')->value('id');
                DB::table('research_researcher')->updateOrInsert(['research_id'=>$r->id,'user_id'=>$data['lead_researcher_id']],['research_role_id'=>$leadRole,'created_at'=>now(),'updated_at'=>now()]);
            }
            ActivityLogService::log('Created research','research','Research',$r->id,$r->research_code);
            return $r;
        });
        return redirect()->route('research.show',$r->id)->with('success','Research created.');
    }
    public function show(Research $research) {
        $research->load(['type','status','area','college','leadResearcher','ipStatus','team.user','team.role','files.fileType','files.accessLevel','files.copyrightStatus','files.usagePermission','publications.type','publications.status','iecMaterials.type','iecMaterials.status','innovations.type','innovations.status','innovations.technologies','endorsements.currentStage','endorsements.currentStatus','bookmarks']);
        $isBookmarked = $research->bookmarks()->where('user_id', auth()->id())->exists();
        return Inertia::render('Repository/Show', ['item'=>$research,'isBookmarked'=>$isBookmarked]);
    }
    public function edit(Research $research) {
        $this->authorize('update', $research);
        $research->load(['team']);
        return Inertia::render('Research/Edit', ['item'=>$research,'lookups'=>$this->lookups()]);
    }
    public function update(UpdateResearchRequest $req, Research $research) {
        $research->update($req->validated());
        ActivityLogService::log('Updated research','research','Research',$research->id,$research->research_code);
        return redirect()->route('research.show',$research->id)->with('success','Research updated.');
    }
    public function destroy(Research $research) {
        $this->authorize('delete', $research);
        $research->delete();
        ActivityLogService::log('Deleted research','research','Research',$research->id,$research->research_code);
        return redirect()->route('research.index')->with('success','Research archived.');
    }
    private function lookups(): array {
        return [
            'types'=>DB::table('research_types')->orderBy('name')->get(),
            'statuses'=>DB::table('research_statuses')->orderBy('name')->get(),
            'areas'=>DB::table('research_areas')->orderBy('name')->get(),
            'roles'=>DB::table('research_roles')->orderBy('name')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->orderBy('name')->get(),
            'ip'=>DB::table('ip_statuses')->orderBy('name')->get(),
            'users'=>DB::table('users')->select('id','first_name','last_name','email')->orderBy('last_name')->limit(200)->get(),
        ];
    }
}
