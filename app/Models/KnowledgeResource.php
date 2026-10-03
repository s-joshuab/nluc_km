<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class KnowledgeResource extends Model {
    protected $fillable = ['title','description','resource_type_id','college_id','file_path','external_url','access_level_id','version','uploaded_by','remarks'];
    public function type() { return $this->belongsTo(ResourceType::class, 'resource_type_id'); }
    public function college() { return $this->belongsTo(College::class); }
    public function accessLevel() { return $this->belongsTo(AccessLevel::class); }
    public function uploader() { return $this->belongsTo(User::class, 'uploaded_by'); }
}
