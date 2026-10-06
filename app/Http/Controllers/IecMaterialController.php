<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreIecMaterialRequest;
use App\Models\IecMaterial;
use App\Services\ActivityLogService;
use App\Services\FileStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class IecMaterialController extends Controller {
    public function index(Request $req) {
        if (auth()->user()->isResearcherOnly()) abort(403, 'Researchers can only view their own IEC materials.');
        $q = IecMaterial::with(['research','type','status','college'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where('title','like',"%$s%");
        if ($v=$req->get('status_id')) $q->where('iec_status_id',$v);
        // Facilitators only see their college (+ shared records and linked research)
        if ($scope=auth()->user()->scopeCollegeId()) {
            $q->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id')
                ->orWhereHas('research', fn($r)=>$r->where('college_id',$scope)));
        }
        return Inertia::render('IEC/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'statuses'=>DB::table('iec_statuses')->get(),'filters'=>$req->only(['search','status_id'])]);
    }
    public function mine() {
        $u = auth()->id();
        $q = IecMaterial::with(['research','type','status','college'])
            ->where(fn($qq)=>$qq->where('created_by',$u)
                ->orWhereHas('research', fn($r)=>$r->where('lead_researcher_id',$u)
                    ->orWhereHas('researchers', fn($x)=>$x->where('users.id',$u))))
            ->orderByDesc('id');
        return Inertia::render('IEC/Index', ['rows'=>$q->paginate(15)->withQueryString(),'isMine'=>true,
            'statuses'=>DB::table('iec_statuses')->get(),'filters'=>[]]);
    }
    public function create() {
        return Inertia::render('IEC/Create', ['types'=>DB::table('iec_types')->get(),'statuses'=>DB::table('iec_statuses')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get()]);
    }
    public function store(StoreIecMaterialRequest $req) {
        $data = $req->validated(); unset($data['file']);
        $data['created_by'] = auth()->id();
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'iec'); $data['file_path'] = $m['storage_path']; }
        $r = IecMaterial::create($data);
        ActivityLogService::log('Created IEC material','iec','IecMaterial',$r->id,$r->title);
        return redirect()->route('iec.index')->with('success','IEC material saved.');
    }
    public function edit(IecMaterial $iecMaterial) {
        return Inertia::render('IEC/Edit', ['item'=>$iecMaterial,'types'=>DB::table('iec_types')->get(),'statuses'=>DB::table('iec_statuses')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get()]);
    }
    public function update(StoreIecMaterialRequest $req, IecMaterial $iecMaterial) {
        $data = $req->validated(); unset($data['file']);
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'iec'); $data['file_path'] = $m['storage_path']; }
        $iecMaterial->update($data);
        ActivityLogService::log('Updated IEC material','iec','IecMaterial',$iecMaterial->id,$iecMaterial->title);
        return redirect()->route('iec.index')->with('success','IEC material updated.');
    }
    public function destroy(IecMaterial $iecMaterial) {
        $iecMaterial->delete();
        return back()->with('success','IEC material archived.');
    }
}
