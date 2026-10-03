<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class ResearchFile extends Model {
    use SoftDeletes;
    protected $fillable = ['research_id','file_type_id','original_name','stored_name','storage_path','mime_type','file_size','access_level_id','copyright_status_id','usage_permission_id','version','uploaded_by','remarks'];
    public function research() { return $this->belongsTo(Research::class); }
    public function fileType() { return $this->belongsTo(FileType::class); }
    public function accessLevel() { return $this->belongsTo(AccessLevel::class); }
    public function copyrightStatus() { return $this->belongsTo(CopyrightStatus::class); }
    public function usagePermission() { return $this->belongsTo(UsagePermission::class); }
    public function uploader() { return $this->belongsTo(User::class, 'uploaded_by'); }
    public function accessRequests() { return $this->hasMany(AccessRequest::class, 'research_file_id'); }
}
