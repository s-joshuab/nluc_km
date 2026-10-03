<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class EndorsementStatusHistory extends Model {
    protected $fillable = ['endorsement_id','previous_stage_id','new_stage_id','previous_status_id','new_status_id','changed_by','changed_at','remarks'];
    protected $casts = ['changed_at'=>'datetime'];
    public function endorsement() { return $this->belongsTo(Endorsement::class); }
    public function previousStage() { return $this->belongsTo(WorkflowStage::class, 'previous_stage_id'); }
    public function newStage() { return $this->belongsTo(WorkflowStage::class, 'new_stage_id'); }
    public function previousStatus() { return $this->belongsTo(WorkflowStatus::class, 'previous_status_id'); }
    public function newStatus() { return $this->belongsTo(WorkflowStatus::class, 'new_status_id'); }
    public function changer() { return $this->belongsTo(User::class, 'changed_by'); }
}
