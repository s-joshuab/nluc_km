<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class EndorsementQrTransaction extends Model {
    protected $fillable = ['endorsement_id','transaction_type_id','reference_number','transaction_date','transaction_time','performed_by','office_id','remarks'];
    protected $casts = ['transaction_date'=>'date'];
    public function endorsement() { return $this->belongsTo(Endorsement::class); }
    public function type() { return $this->belongsTo(QrTransactionType::class, 'transaction_type_id'); }
    public function performer() { return $this->belongsTo(User::class, 'performed_by'); }
    public function office() { return $this->belongsTo(Office::class); }
}
