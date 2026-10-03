<?php
namespace App\Services;
use App\Models\Endorsement;
use App\Models\EndorsementQrTransaction;
use App\Models\EndorsementStatusHistory;
use App\Models\QrTransactionType;
use App\Models\User;
use App\Models\WorkflowStage;
use App\Models\WorkflowStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class QrTransactionService {
    public static function qrReceived(Endorsement $endorsement, User $user, array $data): EndorsementQrTransaction {
        // QR stamping is manual at the records office (no system there).
        // RPSU Staff / Administrator encode the QR reference here.
        if (!$user->isStaff() && !$user->isAdmin()) {
            throw ValidationException::withMessages(['auth'=>'Only RPSU Staff or Administrator can encode QR Received.']);
        }
        return DB::transaction(function () use ($endorsement, $user, $data) {
            $typeId = QrTransactionType::where('name','QR Received')->value('id');
            $officeId = DB::table('offices')->where('code','ACAD-RECORDS')->value('id');
            $stageId = WorkflowStage::where('code','STAGE-ACAD-REC')->value('id');
            $statusId = WorkflowStatus::where('name','QR Received')->value('id');
            $tx = EndorsementQrTransaction::create([
                'endorsement_id'=>$endorsement->id,'transaction_type_id'=>$typeId,
                'reference_number'=>$data['reference_number'],
                'transaction_date'=>$data['transaction_date'] ?? now()->toDateString(),
                'transaction_time'=>$data['transaction_time'] ?? now()->format('H:i:s'),
                'performed_by'=>$user->id,'office_id'=>$data['office_id'] ?? $officeId,
                'remarks'=>$data['remarks'] ?? null,
            ]);
            $prevStage = $endorsement->current_stage_id; $prevStatus = $endorsement->current_status_id;
            $endorsement->update(['current_stage_id'=>$stageId,'current_status_id'=>$statusId,'date_received'=>$data['transaction_date'] ?? now()->toDateString(),'updated_by'=>$user->id]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$endorsement->id,'previous_stage_id'=>$prevStage,'new_stage_id'=>$stageId,
                'previous_status_id'=>$prevStatus,'new_status_id'=>$statusId,'changed_by'=>$user->id,'changed_at'=>now(),
                'remarks'=>'QR Received: '.($data['reference_number'] ?? ''),
            ]);
            ActivityLogService::log('QR Received','endorsements','Endorsement',$endorsement->id,"QR Received {$tx->reference_number} by {$user->fullName()}",$user->id);
            // Notify researcher
            NotificationService::send($endorsement->researcher_id, 'QR Received: '.$endorsement->tracking_number, 'Your document was received at Academic Unit Records Office. Ref: '.$tx->reference_number, 'qr', '/my-transactions/'.$endorsement->id);
            // Notify RPSU admins
            $admins = User::whereHas('roles', fn($q)=>$q->where('name','RPSU Administrator'))->pluck('id')->toArray();
            NotificationService::sendToMany($admins, 'Document ready for RPSU: '.$endorsement->tracking_number, 'QR Received completed. Ready for RPSU processing.', 'qr', '/endorsements/'.$endorsement->id);
            return $tx;
        });
    }

    public static function qrRelease(Endorsement $endorsement, User $user, array $data): EndorsementQrTransaction {
        if (!$user->isStaff() && !$user->isAdmin()) {
            throw ValidationException::withMessages(['auth'=>'Only RPSU Staff or Administrator can encode QR Release.']);
        }
        return DB::transaction(function () use ($endorsement, $user, $data) {
            $typeId = QrTransactionType::where('name','QR Release')->value('id');
            $officeId = DB::table('offices')->where('code','RPSU-RECORDS')->value('id');
            $stageId = WorkflowStage::where('code','STAGE-RPSU-REC')->value('id');
            $statusId = WorkflowStatus::where('name','QR Release')->value('id');
            $tx = EndorsementQrTransaction::create([
                'endorsement_id'=>$endorsement->id,'transaction_type_id'=>$typeId,
                'reference_number'=>$data['reference_number'],
                'transaction_date'=>$data['transaction_date'] ?? now()->toDateString(),
                'transaction_time'=>$data['transaction_time'] ?? now()->format('H:i:s'),
                'performed_by'=>$user->id,'office_id'=>$data['office_id'] ?? $officeId,
                'remarks'=>$data['remarks'] ?? null,
            ]);
            $prevStage = $endorsement->current_stage_id; $prevStatus = $endorsement->current_status_id;
            $endorsement->update(['current_stage_id'=>$stageId,'current_status_id'=>$statusId,'updated_by'=>$user->id]);
            EndorsementStatusHistory::create([
                'endorsement_id'=>$endorsement->id,'previous_stage_id'=>$prevStage,'new_stage_id'=>$stageId,
                'previous_status_id'=>$prevStatus,'new_status_id'=>$statusId,'changed_by'=>$user->id,'changed_at'=>now(),
                'remarks'=>'QR Release: '.($data['reference_number'] ?? ''),
            ]);
            ActivityLogService::log('QR Release','endorsements','Endorsement',$endorsement->id,"QR Release {$tx->reference_number} by {$user->fullName()}",$user->id);
            NotificationService::send($endorsement->researcher_id, 'QR Release: '.$endorsement->tracking_number, 'Your document was released by RPSU Records Office. Ref: '.$tx->reference_number, 'qr', '/my-transactions/'.$endorsement->id);
            return $tx;
        });
    }
}
