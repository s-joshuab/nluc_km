<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class IecMaterial extends Model {
    protected $fillable = ['research_id','title','description','iec_type_id','iec_status_id','college_id','target_audience','development_date','approval_date','release_date','file_path','remarks','created_by'];
    protected $casts = ['development_date'=>'date','approval_date'=>'date','release_date'=>'date'];
    public function research() { return $this->belongsTo(Research::class); }
    public function type() { return $this->belongsTo(IecType::class, 'iec_type_id'); }
    public function status() { return $this->belongsTo(IecStatus::class, 'iec_status_id'); }
    public function college() { return $this->belongsTo(College::class); }
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
}
