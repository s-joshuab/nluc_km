<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ResearchResearcher extends Model {
    protected $table = 'research_researcher';
    protected $fillable = ['research_id','user_id','research_role_id'];
    public function research() { return $this->belongsTo(Research::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function role() { return $this->belongsTo(ResearchRole::class, 'research_role_id'); }
}
