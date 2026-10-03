<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AccessRequest extends Model {
    protected $fillable = ['research_file_id','requested_by','status_id','reason','reviewed_by','reviewed_at','remarks'];
    protected $casts = ['reviewed_at'=>'datetime'];
    public function file() { return $this->belongsTo(ResearchFile::class, 'research_file_id'); }
    public function requester() { return $this->belongsTo(User::class, 'requested_by'); }
    public function status() { return $this->belongsTo(AccessRequestStatus::class, 'status_id'); }
    public function reviewer() { return $this->belongsTo(User::class, 'reviewed_by'); }
}
