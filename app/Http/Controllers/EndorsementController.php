<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreEndorsementRequest;
use App\Http\Requests\UpdateEndorsementStatusRequest;
use App\Models\Endorsement;
use App\Services\EndorsementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class EndorsementController extends Controller {
    public function index(Request $req) {
        $q = Endorsement::with(['research','researcher','type','currentStage','currentStatus'])->orderByDesc('id');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('tracking_number','like',"%$s%")->orWhere('document_title','like',"%$s%"));
        if ($v=$req->get('stage_id')) $q->where('current_stage_id',$v);
        if ($v=$req->get('status_id')) $q->where('current_status_id',$v);
        return Inertia::render('Endorsements/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'filters'=>$req->only(['search','stage_id','status_id']),
            'stages'=>DB::table('workflow_stages')->orderBy('sort_order')->get(),
            'statuses'=>DB::table('workflow_statuses')->orderBy('id')->get()]);
    }
    public function myTransactions(Request $req) {
        $q = Endorsement::with(['currentStage','currentStatus','research'])->where('researcher_id', auth()->id())->orderByDesc('id');
        return Inertia::render('Transactions/MyTransactions', ['rows'=>$q->paginate(15)->withQueryString()]);
    }
    public function myShow(Endorsement $endorsement) {
        if ($endorsement->researcher_id !== auth()->id() && !auth()->user()->isAdmin() && !auth()->user()->hasRole('Research & Publication Facilitator') && !auth()->user()->canDoQrReceived() && !auth()->user()->canDoQrRelease()) abort(403);
        return $this->show($endorsement, 'Transactions/Show');
    }
    public function create() {
        return Inertia::render('Endorsements/Create', [
            'types'=>DB::table('endorsement_types')->get(),
            'researches'=>DB::table('researches')->select('id','research_code','title')->whereNull('deleted_at')->orderByDesc('id')->limit(200)->get(),
        ]);
    }
    public function store(StoreEndorsementRequest $req) {
        $end = EndorsementService::create($req->validated(), auth()->user());
        return redirect()->route('endorsements.show',$end->id)->with('success','Endorsement created: '.$end->tracking_number);
    }
    public function show(Endorsement $endorsement, $page = 'Endorsements/Show') {
        $endorsement->load(['research','researcher','type','currentStage','currentStatus','creator',
            'histories.newStage','histories.newStatus','histories.previousStage','histories.previousStatus','histories.changer',
            'qrTransactions.type','qrTransactions.performer','qrTransactions.office']);
        $u = auth()->user();
        return Inertia::render($page, ['item'=>$endorsement,
            'canQrReceived'=>$u->canDoQrReceived(),
            'canQrRelease'=>$u->canDoQrRelease(),
            'canProcess'=>$u->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']),
            'processingOptions'=>['Received by RPSU','Under Processing','For Review','For Release','Forwarded / Endorsed to RECI','Completed / Closed'],
        ]);
    }
    public function updateStatus(UpdateEndorsementStatusRequest $req, Endorsement $endorsement) {
        // Researchers cannot change statuses
        if (auth()->user()->hasRole('Researcher') && !auth()->user()->isAdmin() && !auth()->user()->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) abort(403, 'Researchers cannot change workflow statuses.');
        EndorsementService::updateProcessing($endorsement, auth()->user(), $req->status, $req->remarks);
        return back()->with('success','Status updated to '.$req->status);
    }
}
