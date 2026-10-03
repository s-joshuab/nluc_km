<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Research extends Model {
    use SoftDeletes;
    protected $table = 'researches';
    protected $fillable = ['research_code','title','abstract','keywords','research_type_id','research_status_id','research_area_id','college_id','lead_researcher_id','start_date','end_date','funding_source','funding_amount','sdg_alignment','ip_status_id','date_submitted','date_completed','remarks','created_by'];
    protected $casts = ['start_date'=>'date','end_date'=>'date','date_submitted'=>'date','date_completed'=>'date','funding_amount'=>'decimal:2'];
    public function type() { return $this->belongsTo(ResearchType::class, 'research_type_id'); }
    public function status() { return $this->belongsTo(ResearchStatus::class, 'research_status_id'); }
    public function area() { return $this->belongsTo(ResearchArea::class, 'research_area_id'); }
    public function college() { return $this->belongsTo(College::class); }
    public function leadResearcher() { return $this->belongsTo(User::class, 'lead_researcher_id'); }
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
    public function ipStatus() { return $this->belongsTo(IpStatus::class, 'ip_status_id'); }
    public function researchers() { return $this->belongsToMany(User::class, 'research_researcher')->withPivot('research_role_id')->withTimestamps(); }
    public function team() { return $this->hasMany(ResearchResearcher::class, 'research_id'); }
    public function files() { return $this->hasMany(ResearchFile::class, 'research_id'); }
    public function publications() { return $this->hasMany(Publication::class, 'research_id'); }
    public function endorsements() { return $this->hasMany(Endorsement::class, 'research_id'); }
    public function iecMaterials() { return $this->hasMany(IecMaterial::class, 'research_id'); }
    public function innovations() { return $this->hasMany(Innovation::class, 'research_id'); }
    public function bookmarks() { return $this->hasMany(Bookmark::class, 'research_id'); }
}
