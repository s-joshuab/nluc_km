<?php
namespace App\Services;
use App\Models\Endorsement;
use App\Models\EndorsementStatusHistory;
use App\Models\User;
use App\Models\WorkflowStage;
use App\Models\WorkflowStatus;
use Illuminate\Support\Facades\DB;
class EndorsementService {
    public static function create(array $data, User $creator): Endorsement {
        return DB::transaction(function () use ($data, $creator) {
            $stageId = WorkflowStage::where('code','STAGE-ACAD')->value('id');
            $statusId = WorkflowStatus::where('name','Endorsed / Submitted')->value('id');
            $tracking = $data['tracking_number'] ?? static::generateTracking();
            $end = Endorsement::create([
                'tracking_number'=>$tracking,'research_id'=>$data['research_id'] ?? null,
                'document_title'=>$data['document_title'],'researcher_id'=>$data['researcher_id'] ?? $creator->id,
                'endorsement_type_id'=>$data['endorsement_type_id'],'current_stage_id'=>$stageId,'current_status_id'=>$statusId,
                'date_submitted'=>now()->toDateString(),'remarks'=>$data['remarks'] ?? null,
                'created_by'=>$creator->id,
            ]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$end->id,'previous_stage_id'=>null,'new_stage_id'=>$stageId,
                'previous_status_id'=>null,'new_status_id'=>$statusId,'changed_by'=>$creator->id,'changed_at'=>now(),'remarks'=>'Submitted',
            ]);
            ActivityLogService::log('Created endorsement','endorsements','Endorsement',$end->id,$tracking,$creator->id);
            NotificationService::send($end->researcher_id, 'Endorsement submitted: '.$tracking, 'Your document is now at Academic Unit stage.', 'endorsement', '/my-transactions/'.$end->id);
            return $end;
        });
    }
    public static function updateProcessing(Endorsement $end, User $user, string $newStatusName, ?string $remarks = null): Endorsement {
        return DB::transaction(function () use ($end, $user, $newStatusName, $remarks) {
            $allowed = ['Received by RPSU','Under Processing','For Review','For Release','Forwarded / Endorsed to RECI','Completed / Closed'];
            if (!in_array($newStatusName, $allowed)) abort(422, 'Invalid RPSU processing status.');
            if (!$user->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator'])) abort(403, 'Only RPSU personnel can update processing status.');
            $statusId = WorkflowStatus::where('name',$newStatusName)->value('id');
            $stageCode = match($newStatusName) {
                'Received by RPSU','Under Processing','For Review','For Release' => 'STAGE-RPSU',
                'Forwarded / Endorsed to RECI' => 'STAGE-RECI',
                'Completed / Closed' => 'STAGE-RECI',
                default => 'STAGE-RPSU',
            };
            $stageId = WorkflowStage::where('code',$stageCode)->value('id');
            $prevStage = $end->current_stage_id; $prevStatus = $end->current_status_id;
            $end->update(['current_stage_id'=>$stageId,'current_status_id'=>$statusId,'updated_by'=>$user->id,
                'date_forwarded'=>$newStatusName==='Forwarded / Endorsed to RECI'?now()->toDateString():$end->date_forwarded]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$end->id,'previous_stage_id'=>$prevStage,'new_stage_id'=>$stageId,
                'previous_status_id'=>$prevStatus,'new_status_id'=>$statusId,'changed_by'=>$user->id,'changed_at'=>now(),'remarks'=>$remarks ?? $newStatusName,
            ]);
            ActivityLogService::log('RPSU processing update','endorsements','Endorsement',$end->id,"{$newStatusName} by {$user->fullName()}",$user->id);
            NotificationService::send($end->researcher_id, 'Endorsement update: '.$end->tracking_number, 'Status: '.$newStatusName, 'endorsement', '/my-transactions/'.$end->id);
            return $end->fresh();
        });
    }
    public static function generateTracking(): string {
        $year = now()->year;
        $count = Endorsement::whereYear('created_at',$year)->count() + 1;
        return sprintf('NLUC-END-%d-%04d', $year, $count);
    }
}
