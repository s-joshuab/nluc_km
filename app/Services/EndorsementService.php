<?php
namespace App\Services;
use App\Models\Endorsement;
use App\Models\EndorsementStatusHistory;
use App\Models\Location;
use App\Models\User;
use App\Models\WorkflowStage;
use App\Models\WorkflowStatus;
use Illuminate\Support\Facades\DB;
class EndorsementService {
    /** Canonical status flow. Key = current status, value = allowed next statuses.
     *  QR is handled physically at the Records Office (no system account),
     *  so QR steps do not exist in the digital workflow. */
    public const FLOW = [
        'Endorsed / Submitted' => ['Received by RPSU'],
        'Received by RPSU' => ['Under Processing', 'For Review'],
        'Under Processing' => ['For Review', 'For Release'],
        'For Review' => ['Under Processing', 'For Release'],
        'For Release' => ['Forwarded / Endorsed to RECI'],
        'Forwarded / Endorsed to RECI' => ['Completed / Closed'],
        'Completed / Closed' => [],
    ];

    public const LOCATION_BY_STATUS = [
        'Endorsed / Submitted' => 'LOC-RESEARCHER',
        'Received by RPSU' => 'LOC-RPSU',
        'Under Processing' => 'LOC-RPSU',
        'For Review' => 'LOC-RPSU',
        'For Release' => 'LOC-RPSU',
        'Forwarded / Endorsed to RECI' => 'LOC-RECI',
        'Completed / Closed' => 'LOC-RECI',
    ];

    public static function locationIdFor(string $statusName): ?int
    {
        $code = static::LOCATION_BY_STATUS[$statusName] ?? 'LOC-RPSU';
        return Location::where('code', $code)->value('id');
    }

    public static function assertTransition(string $from, string $to): void
    {
        $allowed = static::FLOW[$from] ?? [];
        if (!in_array($to, $allowed)) {
            abort(422, "Invalid workflow transition: '{$from}' → '{$to}'.");
        }
    }

    public static function create(array $data, User $creator): Endorsement {
        return DB::transaction(function () use ($data, $creator) {
            $stageId = WorkflowStage::where('code','STAGE-ACAD')->value('id');
            $statusId = WorkflowStatus::where('name','Endorsed / Submitted')->value('id');
            $tracking = $data['tracking_number'] ?? static::generateTracking();
            // Researchers can only submit for themselves
            $researcherId = $data['researcher_id'] ?? $creator->id;
            if ($creator->hasRole('Researcher') && !$creator->isAdmin() && !$creator->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) {
                $researcherId = $creator->id;
            }
            $end = Endorsement::create([
                'tracking_number'=>$tracking,'research_id'=>$data['research_id'] ?? null,
                'college_id'=>$data['college_id'] ?? null,'department'=>$data['department'] ?? null,
                'document_title'=>$data['document_title'],'researcher_id'=>$researcherId,
                'endorsement_type_id'=>$data['endorsement_type_id'],'current_stage_id'=>$stageId,'current_status_id'=>$statusId,
                'current_location_id'=>static::locationIdFor('Endorsed / Submitted'),
                'date_submitted'=>$data['date_submitted'] ?? now()->toDateString(),'remarks'=>$data['remarks'] ?? null,
                'created_by'=>$creator->id,
            ]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$end->id,'previous_stage_id'=>null,'new_stage_id'=>$stageId,
                'previous_status_id'=>null,'new_status_id'=>$statusId,
                'previous_location_id'=>null,'new_location_id'=>static::locationIdFor('Endorsed / Submitted'),
                'changed_by'=>$creator->id,'changed_at'=>now(),'remarks'=>'Submitted',
            ]);
            ActivityLogService::log('Created endorsement','endorsements','Endorsement',$end->id,$tracking,$creator->id);
            NotificationService::send($end->researcher_id, 'Endorsement submitted: '.$tracking, 'Your document is now with you. Bring it to the Records Office for manual QR.', 'endorsement', '/my-transactions/'.$end->id);
            return $end;
        });
    }

    public static function updateProcessing(Endorsement $end, User $user, string $newStatusName, ?string $remarks = null, ?string $actionTaken = null): Endorsement {
        return DB::transaction(function () use ($end, $user, $newStatusName, $remarks, $actionTaken) {
            if (!$user->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator'])) abort(403, 'Only RPSU personnel can update processing status.');
            $from = $end->currentStatus?->name;
            static::assertTransition($from, $newStatusName);
            $statusId = WorkflowStatus::where('name',$newStatusName)->value('id');
            if (!$statusId) abort(422, 'Unknown workflow status.');
            $stageCode = match($newStatusName) {
                'Received by RPSU','Under Processing','For Review','For Release' => 'STAGE-RPSU',
                'Forwarded / Endorsed to RECI' => 'STAGE-RECI',
                'Completed / Closed' => 'STAGE-RECI',
                default => 'STAGE-RPSU',
            };
            $stageId = WorkflowStage::where('code',$stageCode)->value('id');
            $prevStage = $end->current_stage_id; $prevStatus = $end->current_status_id; $prevLoc = $end->current_location_id;
            $newLoc = static::locationIdFor($newStatusName);
            $end->update(['current_stage_id'=>$stageId,'current_status_id'=>$statusId,'current_location_id'=>$newLoc,'updated_by'=>$user->id,
                'date_forwarded'=>$newStatusName==='Forwarded / Endorsed to RECI'?now()->toDateString():$end->date_forwarded]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$end->id,'previous_stage_id'=>$prevStage,'new_stage_id'=>$stageId,
                'previous_status_id'=>$prevStatus,'new_status_id'=>$statusId,
                'previous_location_id'=>$prevLoc,'new_location_id'=>$newLoc,
                'changed_by'=>$user->id,'changed_at'=>now(),'remarks'=>$remarks ?? $newStatusName,'action_taken'=>$actionTaken,
            ]);
            ActivityLogService::log('RPSU processing update','endorsements','Endorsement',$end->id,"{$newStatusName} by {$user->fullName()}",$user->id);
            NotificationService::send($end->researcher_id, 'Endorsement update: '.$end->tracking_number, 'Status: '.$newStatusName, 'endorsement', '/my-transactions/'.$end->id);
            return $end->fresh();
        });
    }

    public static function generateTracking(): string {
        $year = now()->year;
        $count = Endorsement::whereYear('created_at',$year)->count() + 1;
        return sprintf('RPSU-%d-%05d', $year, $count);
    }
}
