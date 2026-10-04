<?php
namespace App\Http\Controllers;
use App\Http\Requests\StorePublicationRequest;
use App\Models\Publication;
use App\Services\ActivityLogService;
use App\Services\FileStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class PublicationController extends Controller {
    public function index(Request $req) {
        $q = Publication::with(['research','type','status'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('title','like',"%$s%")->orWhere('journal','like',"%$s%"));
        if ($v=$req->get('status_id')) $q->where('publication_status_id',$v);
        return Inertia::render('Publications/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'statuses'=>DB::table('publication_statuses')->get(),'filters'=>$req->only(['search','status_id'])]);
    }
    public function mine() {
        $u = auth()->id();
        $q = Publication::with(['research','type','status'])
            ->where(fn($qq)=>$qq->where('created_by',$u)
                ->orWhereHas('research', fn($r)=>$r->where('lead_researcher_id',$u)
                    ->orWhereHas('researchers', fn($x)=>$x->where('users.id',$u))))
            ->orderByDesc('id');
        return Inertia::render('Publications/Index', ['rows'=>$q->paginate(15)->withQueryString(),'isMine'=>true,
            'statuses'=>DB::table('publication_statuses')->get(),'filters'=>[]]);
    }
    public function create() {
        return Inertia::render('Publications/Create', ['types'=>DB::table('publication_types')->get(),
            'statuses'=>DB::table('publication_statuses')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get()]);
    }
    public function store(StorePublicationRequest $req) {
        $data = $req->validated(); unset($data['file']);
        $data['created_by'] = auth()->id();
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'publications'); $data['file_path'] = $m['storage_path']; }
        $p = Publication::create($data);
        ActivityLogService::log('Created publication','publications','Publication',$p->id,$p->title);
        return redirect()->route('publications.index')->with('success','Publication saved.');
    }
    public function edit(Publication $publication) {
        return Inertia::render('Publications/Edit', ['item'=>$publication,'types'=>DB::table('publication_types')->get(),
            'statuses'=>DB::table('publication_statuses')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get()]);
    }
    public function update(StorePublicationRequest $req, Publication $publication) {
        $data = $req->validated(); unset($data['file']);
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'publications'); $data['file_path'] = $m['storage_path']; }
        $publication->update($data);
        ActivityLogService::log('Updated publication','publications','Publication',$publication->id,$publication->title);
        return redirect()->route('publications.index')->with('success','Publication updated.');
    }
    public function destroy(Publication $publication) {
        $publication->delete();
        ActivityLogService::log('Deleted publication','publications','Publication',$publication->id,$publication->title);
        return back()->with('success','Publication archived.');
    }
}
