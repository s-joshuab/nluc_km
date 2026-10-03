<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreInnovationRequest;
use App\Models\Innovation;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class InnovationController extends Controller {
    public function index(Request $req) {
        $q = Innovation::with(['research','type','status','college'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where('title','like',"%$s%");
        if ($v=$req->get('status_id')) $q->where('innovation_status_id',$v);
        return Inertia::render('Innovation/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'statuses'=>DB::table('innovation_statuses')->get(),'filters'=>$req->only(['search','status_id'])]);
    }
    public function create() {
        return Inertia::render('Innovation/Create', ['types'=>DB::table('innovation_types')->get(),'statuses'=>DB::table('innovation_statuses')->get(),
            'colleges'=>DB::table('colleges')->get(),'ip'=>DB::table('ip_statuses')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->limit(200)->get(),
            'users'=>DB::table('users')->select('id','first_name','last_name')->limit(200)->get()]);
    }
    public function store(StoreInnovationRequest $req) {
        $data = $req->validated(); $data['created_by'] = auth()->id();
        $r = Innovation::create($data);
        ActivityLogService::log('Created innovation','innovations','Innovation',$r->id,$r->title);
        return redirect()->route('innovations.index')->with('success','Innovation saved.');
    }
    public function show(Innovation $innovation) {
        $innovation->load(['research','type','status','college','leadInnovator','technologies.status','technologies.commercializations.status']);
        return Inertia::render('Innovation/Show', ['item'=>$innovation]);
    }
    public function edit(Innovation $innovation) {
        return Inertia::render('Innovation/Edit', ['item'=>$innovation,'types'=>DB::table('innovation_types')->get(),'statuses'=>DB::table('innovation_statuses')->get(),
            'colleges'=>DB::table('colleges')->get(),'ip'=>DB::table('ip_statuses')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->limit(200)->get(),
            'users'=>DB::table('users')->select('id','first_name','last_name')->limit(200)->get()]);
    }
    public function update(StoreInnovationRequest $req, Innovation $innovation) {
        $innovation->update($req->validated());
        return redirect()->route('innovations.index')->with('success','Innovation updated.');
    }
    public function destroy(Innovation $innovation) {
        $innovation->delete();
        return back()->with('success','Innovation archived.');
    }
}
