<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Innovation extends Model {
    protected $fillable = ['research_id','title','description','innovation_type_id','innovation_status_id','college_id','lead_innovator_id','development_date','ip_status_id','remarks','created_by'];
    protected $casts = ['development_date'=>'date'];
    public function research() { return $this->belongsTo(Research::class); }
    public function type() { return $this->belongsTo(InnovationType::class, 'innovation_type_id'); }
    public function status() { return $this->belongsTo(InnovationStatus::class, 'innovation_status_id'); }
    public function college() { return $this->belongsTo(College::class); }
    public function leadInnovator() { return $this->belongsTo(User::class, 'lead_innovator_id'); }
    public function ipStatus() { return $this->belongsTo(IpStatus::class, 'ip_status_id'); }
    public function technologies() { return $this->hasMany(Technology::class, 'innovation_id'); }
}
