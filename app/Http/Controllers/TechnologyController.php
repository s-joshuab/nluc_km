<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreTechnologyRequest;
use App\Models\Technology;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class TechnologyController extends Controller {
    public function index(Request $req) {
        if (auth()->user()->isResearcherOnly()) abort(403, 'Technologies are managed by RPSU staff.');
        $q = Technology::with(['innovation','status'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where('title','like',"%$s%");
        // Facilitators only see technologies under their college's innovations
        if ($scope=auth()->user()->scopeCollegeId()) {
            $q->whereHas('innovation', fn($i)=>$i->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id')
                ->orWhereHas('research', fn($r)=>$r->where('college_id',$scope))));
        }
        return Inertia::render('Technology/Index', ['rows'=>$q->paginate(15)->withQueryString(),'filters'=>$req->only(['search'])]);
    }
    public function create() {
        return Inertia::render('Technology/Create', ['statuses'=>DB::table('technology_statuses')->get(),
            'innovations'=>DB::table('innovations')->select('id','title')->whereNull('deleted_at')->limit(200)->get()]);
    }
    public function store(StoreTechnologyRequest $req) {
        $t = Technology::create($req->validated());
        ActivityLogService::log('Created technology','technologies','Technology',$t->id,$t->title);
        return redirect()->route('technologies.index')->with('success','Technology saved.');
    }
    public function edit(Technology $technology) {
        return Inertia::render('Technology/Edit', ['item'=>$technology,'statuses'=>DB::table('technology_statuses')->get(),
            'innovations'=>DB::table('innovations')->select('id','title')->whereNull('deleted_at')->limit(200)->get()]);
    }
    public function update(StoreTechnologyRequest $req, Technology $technology) {
        $technology->update($req->validated());
        return redirect()->route('technologies.index')->with('success','Technology updated.');
    }
    public function destroy(Technology $technology) {
        $technology->delete();
        return back()->with('success','Technology deleted.');
    }
}
