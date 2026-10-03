<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Endorsement extends Model {
    protected $fillable = ['tracking_number','research_id','document_title','researcher_id','endorsement_type_id','current_stage_id','current_status_id','date_submitted','date_received','date_forwarded','remarks','created_by','updated_by'];
    protected $casts = ['date_submitted'=>'date','date_received'=>'date','date_forwarded'=>'date'];
    public function research() { return $this->belongsTo(Research::class); }
    public function researcher() { return $this->belongsTo(User::class, 'researcher_id'); }
    public function type() { return $this->belongsTo(EndorsementType::class, 'endorsement_type_id'); }
    public function currentStage() { return $this->belongsTo(WorkflowStage::class, 'current_stage_id'); }
    public function currentStatus() { return $this->belongsTo(WorkflowStatus::class, 'current_status_id'); }
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
    public function updater() { return $this->belongsTo(User::class, 'updated_by'); }
    public function statusHistory() { return $this->hasMany(EndorsementStatusHistory::class)->orderBy('changed_at'); }
    public function histories() { return $this->hasMany(EndorsementStatusHistory::class)->orderBy('changed_at'); }
    public function qrTransactions() { return $this->hasMany(EndorsementQrTransaction::class)->orderBy('transaction_date')->orderBy('transaction_time'); }
}
