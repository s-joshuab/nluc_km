<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreCommercializationRequest;
use App\Models\CommercializationRecord;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class CommercializationController extends Controller {
    public function index(Request $req) {
        if (auth()->user()->isResearcherOnly()) abort(403, 'Commercialization records are managed by RPSU staff.');
        $q = CommercializationRecord::with(['technology','status'])->orderByDesc('id');
        // Facilitators only see records under their college's innovations
        if ($scope=auth()->user()->scopeCollegeId()) {
            $q->whereHas('technology.innovation', fn($i)=>$i->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id')
                ->orWhereHas('research', fn($r)=>$r->where('college_id',$scope))));
        }
        return Inertia::render('Commercialization/Index', ['rows'=>$q->paginate(15)->withQueryString()]);
    }
    public function create() {
        return Inertia::render('Commercialization/Create', ['statuses'=>DB::table('commercialization_statuses')->get(),
            'technologies'=>DB::table('technologies')->select('id','title')->limit(200)->get()]);
    }
    public function store(StoreCommercializationRequest $req) {
        $data = $req->validated(); $data['created_by'] = auth()->id();
        $r = CommercializationRecord::create($data);
        ActivityLogService::log('Created commercialization record','commercialization','CommercializationRecord',$r->id,$r->agreement_reference);
        return redirect()->route('commercialization.index')->with('success','Record saved.');
    }
    public function edit(CommercializationRecord $commercialization) {
        return Inertia::render('Commercialization/Edit', ['item'=>$commercialization,'statuses'=>DB::table('commercialization_statuses')->get(),
            'technologies'=>DB::table('technologies')->select('id','title')->limit(200)->get()]);
    }
    public function update(StoreCommercializationRequest $req, CommercializationRecord $commercialization) {
        $commercialization->update($req->validated());
        return redirect()->route('commercialization.index')->with('success','Record updated.');
    }
    public function destroy(CommercializationRecord $commercialization) {
        $commercialization->delete();
        return back()->with('success','Record deleted.');
    }
}
