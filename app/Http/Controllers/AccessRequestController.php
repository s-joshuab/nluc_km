<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreAccessRequest;
use App\Models\AccessRequest;
use App\Models\AccessRequestStatus;
use App\Services\AccessRequestService;
use App\Services\ActivityLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
class AccessRequestController extends Controller {
    public function index(Request $req) {
        $u = auth()->user();
        $q = AccessRequest::with(['file.research','requester','status','reviewer'])->orderByDesc('id');
        if (!$u->isAdmin() && !$u->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) $q->where('requested_by',$u->id);
        if ($s=$req->get('status_id')) $q->where('status_id',$s);
        return Inertia::render('AccessRequests/Index', ['rows'=>$q->paginate(15)->withQueryString(),
            'statuses'=>\DB::table('access_request_statuses')->get(),'filters'=>$req->only(['status_id'])]);
    }
    public function store(StoreAccessRequest $req) {
        $pending = AccessRequestStatus::where('name','Pending')->value('id');
        $exists = AccessRequest::where('research_file_id',$req->research_file_id)->where('requested_by',auth()->id())->where('status_id',$pending)->exists();
        if ($exists) return back()->withErrors(['research_file_id'=>'You already have a pending request for this file.']);
        $r = AccessRequest::create(['research_file_id'=>$req->research_file_id,'requested_by'=>auth()->id(),'status_id'=>$pending,'reason'=>$req->reason]);
        ActivityLogService::log('Requested file access','access-requests','AccessRequest',$r->id,'File #'.$r->research_file_id);
        $admins = \App\Models\User::whereHas('roles', fn($q)=>$q->where('name','RPSU Administrator'))->pluck('id')->toArray();
        NotificationService::sendToMany($admins, 'New access request', 'File #'.$r->research_file_id.' requested by '.auth()->user()->fullName(), 'access', '/access-requests');
        return back()->with('success','Access request submitted.');
    }
    public function decide(Request $req, AccessRequest $accessRequest) {
        $req->validate(['decision'=>'required|in:approve,reject','remarks'=>'nullable|string']);
        AccessRequestService::decide($accessRequest, auth()->user(), $req->decision, $req->remarks);
        return back()->with('success','Request '.$req->decision.'d.');
    }
    public function cancel(AccessRequest $accessRequest) {
        if ($accessRequest->requested_by !== auth()->id()) abort(403);
        $cancelled = AccessRequestStatus::where('name','Cancelled')->value('id');
        $accessRequest->update(['status_id'=>$cancelled]);
        return back()->with('success','Request cancelled.');
    }
}
