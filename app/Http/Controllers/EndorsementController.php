<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreEndorsementRequest;
use App\Http\Requests\UpdateEndorsementStatusRequest;
use App\Models\Endorsement;
use App\Models\EndorsementDocument;
use App\Services\ActivityLogService;
use App\Services\EndorsementService;
use App\Services\FileStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class EndorsementController extends Controller {
    public function index(Request $req) {
        $q = Endorsement::with(['research','researcher','type','currentStage','currentStatus','currentLocation'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('tracking_number','like',"%$s%")->orWhere('document_title','like',"%$s%"));
        if ($v=$req->get('stage_id')) $q->where('current_stage_id',$v);
        if ($v=$req->get('status_id')) $q->where('current_status_id',$v);
        $counts = DB::table('endorsements as e')
            ->join('workflow_statuses as s','s.id','=','e.current_status_id')
            ->select('s.id','s.name',DB::raw('COUNT(e.id) as total'))->groupBy('s.id','s.name')->get();
        return Inertia::render('Endorsements/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'filters'=>$req->only(['search','stage_id','status_id']),
            'stages'=>DB::table('workflow_stages')->orderBy('sort_order')->get(),
            'statuses'=>DB::table('workflow_statuses')->whereIn('name', array_keys(EndorsementService::FLOW))->orderBy('id')->get(),
            'statusCounts'=>$counts]);
    }
    public function myTransactions(Request $req) {
        $q = Endorsement::with(['currentStage','currentStatus','currentLocation','type','research'])->where('researcher_id', auth()->id())->orderByDesc('id');
        return Inertia::render('Transactions/MyTransactions', ['rows'=>$q->paginate(15)->withQueryString()]);
    }
    public function myShow(Endorsement $endorsement) {
        if ($endorsement->researcher_id !== auth()->id() && !auth()->user()->isAdmin() && !auth()->user()->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) abort(403);
        return $this->show($endorsement, 'Transactions/Show');
    }
    public function create() {
        return Inertia::render('Endorsements/Create', [
            'types'=>DB::table('endorsement_types')->get(),
            'colleges'=>DB::table('colleges')->where('is_active',true)->orderBy('name')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get(),
        ]);
    }
    public function store(StoreEndorsementRequest $req) {
        $data = $req->validated();
        $file = $req->file('supporting_file');
        unset($data['supporting_file']);
        $end = EndorsementService::create($data, auth()->user());
        if ($file) {
            $meta = FileStorageService::storeGeneric($file, 'endorsements/'.$end->tracking_number);
            EndorsementDocument::create(array_merge($meta, ['endorsement_id'=>$end->id,'uploaded_by'=>auth()->id()]));
            ActivityLogService::log('Uploaded supporting document','endorsements','EndorsementDocument',$end->id,$meta['original_name']);
        }
        return redirect()->route('endorsements.show',$end->id)->with('success','Endorsement created: '.$end->tracking_number);
    }
    public function show(Endorsement $endorsement, $page = 'Endorsements/Show') {
        $endorsement->load(['research','researcher','type','college','currentStage','currentStatus','currentLocation','creator','documents.uploader',
            'histories.newStage','histories.newStatus','histories.previousStage','histories.previousStatus','histories.previousLocation','histories.newLocation','histories.changer']);
        $u = auth()->user();
        return Inertia::render($page, ['item'=>$endorsement,
            'canProcess'=>$u->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']),
            'processingOptions'=>['Received by RPSU','Under Processing','For Review','For Release','Forwarded / Endorsed to RECI','Completed / Closed'],
            'flow'=>array_keys(EndorsementService::FLOW),
        ]);
    }
    public function updateStatus(UpdateEndorsementStatusRequest $req, Endorsement $endorsement) {
        // Researchers cannot change statuses
        if (auth()->user()->hasRole('Researcher') && !auth()->user()->isAdmin() && !auth()->user()->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) abort(403, 'Researchers cannot change workflow statuses.');
        EndorsementService::updateProcessing($endorsement, auth()->user(), $req->status, $req->remarks, $req->action_taken);
        return back()->with('success','Status updated to '.$req->status);
    }
    public function storeDocument(Request $req, Endorsement $endorsement) {
        if (!auth()->user()->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) && $endorsement->researcher_id !== auth()->id()) abort(403);
        $req->validate(['file'=>'required|file|max:20480','remarks'=>'nullable|string|max:1000']);
        $meta = FileStorageService::storeGeneric($req->file('file'), 'endorsements/'.$endorsement->tracking_number);
        $doc = EndorsementDocument::create(array_merge($meta, ['endorsement_id'=>$endorsement->id,'uploaded_by'=>auth()->id(),'remarks'=>$req->remarks]));
        ActivityLogService::log('Uploaded supporting document','endorsements','EndorsementDocument',$doc->id,$meta['original_name']);
        return back()->with('success','Supporting document attached.');
    }
    public function downloadDocument(EndorsementDocument $document) {
        $end = $document->endorsement;
        $u = auth()->user();
        $allowed = $u->isAdmin() || $u->hasAnyRole(['RPSU Staff','Research & Publication Facilitator']) || $end->researcher_id === $u->id;
        if (!$allowed) abort(403, 'You do not have permission to download this document.');
        if (!Storage::disk('local')->exists($document->storage_path)) abort(404, 'File missing on disk.');
        return Storage::disk('local')->download($document->storage_path, $document->original_name);
    }
    public function destroyDocument(EndorsementDocument $document) {
        if (!auth()->user()->hasAnyRole(['RPSU Administrator','RPSU Staff'])) abort(403);
        $document->delete();
        return back()->with('success','Document removed.');
    }
}
