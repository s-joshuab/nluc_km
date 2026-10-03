<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Technology extends Model {
    protected $table = 'technologies';
    protected $fillable = ['innovation_id','title','description','technology_status_id','technology_readiness_level','ip_reference','development_date','remarks'];
    protected $casts = ['development_date'=>'date'];
    public function innovation() { return $this->belongsTo(Innovation::class, 'innovation_id'); }
    public function status() { return $this->belongsTo(TechnologyStatus::class, 'technology_status_id'); }
    public function commercializations() { return $this->hasMany(CommercializationRecord::class, 'technology_id'); }
}
