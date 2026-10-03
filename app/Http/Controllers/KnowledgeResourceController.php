<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreKnowledgeResourceRequest;
use App\Models\KnowledgeResource;
use App\Services\ActivityLogService;
use App\Services\FileStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class KnowledgeResourceController extends Controller {
    public function index(Request $req) {
        $q = KnowledgeResource::with(['type','college','accessLevel'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('title','like',"%$s%")->orWhere('description','like',"%$s%"));
        if ($v=$req->get('resource_type_id')) $q->where('resource_type_id',$v);
        return Inertia::render('KnowledgeResources/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'types'=>DB::table('resource_types')->get(),'filters'=>$req->only(['search','resource_type_id'])]);
    }
    public function create() {
        return Inertia::render('KnowledgeResources/Create', ['types'=>DB::table('resource_types')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->get(),'levels'=>DB::table('access_levels')->get()]);
    }
    public function store(StoreKnowledgeResourceRequest $req) {
        $data = $req->validated(); unset($data['file']);
        $data['uploaded_by'] = auth()->id();
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'resources'); $data['file_path'] = $m['storage_path']; }
        $r = KnowledgeResource::create($data);
        ActivityLogService::log('Created knowledge resource','knowledge','KnowledgeResource',$r->id,$r->title);
        return redirect()->route('knowledge-resources.index')->with('success','Resource saved.');
    }
    public function edit(KnowledgeResource $knowledgeResource) {
        return Inertia::render('KnowledgeResources/Edit', ['item'=>$knowledgeResource,'types'=>DB::table('resource_types')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->get(),'levels'=>DB::table('access_levels')->get()]);
    }
    public function update(StoreKnowledgeResourceRequest $req, KnowledgeResource $knowledgeResource) {
        $data = $req->validated(); unset($data['file']);
        if ($req->hasFile('file')) { $m = FileStorageService::storeGeneric($req->file('file'),'resources'); $data['file_path'] = $m['storage_path']; }
        $knowledgeResource->update($data);
        return redirect()->route('knowledge-resources.index')->with('success','Resource updated.');
    }
    public function destroy(KnowledgeResource $knowledgeResource) {
        $knowledgeResource->delete();
        return back()->with('success','Resource archived.');
    }
}
