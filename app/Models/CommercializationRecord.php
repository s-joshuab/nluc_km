<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CommercializationRecord extends Model {
    protected $fillable = ['technology_id','status_id','potential_partner','industry','agreement_reference','license_information','date_started','date_commercialized','revenue_value','remarks','created_by'];
    protected $casts = ['date_started'=>'date','date_commercialized'=>'date','revenue_value'=>'decimal:2'];
    public function technology() { return $this->belongsTo(Technology::class); }
    public function status() { return $this->belongsTo(CommercializationStatus::class, 'status_id'); }
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
}
