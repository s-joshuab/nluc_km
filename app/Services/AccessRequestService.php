<?php
namespace App\Services;
use App\Models\AccessRequest;
use App\Models\AccessRequestStatus;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class AccessRequestService {
    public static function decide(AccessRequest $req, User $reviewer, string $decision, ?string $remarks = null): AccessRequest {
        if (!$reviewer->isAdmin() && !$reviewer->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) abort(403, 'Only RPSU-authorized personnel can review access requests.');
        $statusName = $decision === 'approve' ? 'Approved' : 'Rejected';
        return DB::transaction(function () use ($req, $reviewer, $statusName, $remarks) {
            $statusId = AccessRequestStatus::where('name',$statusName)->value('id');
            $req->update(['status_id'=>$statusId,'reviewed_by'=>$reviewer->id,'reviewed_at'=>now(),'remarks'=>$remarks]);
            ActivityLogService::log($statusName.' access request','access-requests','AccessRequest',$req->id,$statusName,$reviewer->id);
            NotificationService::send($req->requested_by, 'Access request '.$statusName, 'Your request for file #'.$req->research_file_id.' was '.$statusName.'.', 'access', '/access-requests');
            return $req->fresh();
        });
    }
}
