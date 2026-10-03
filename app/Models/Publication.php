<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Publication extends Model {
    protected $fillable = ['research_id','title','publication_type_id','publication_status_id','journal','publisher','publication_date','doi','url','abstract','keywords','file_path','remarks','created_by'];
    protected $casts = ['publication_date'=>'date'];
    public function research() { return $this->belongsTo(Research::class); }
    public function type() { return $this->belongsTo(PublicationType::class, 'publication_type_id'); }
    public function status() { return $this->belongsTo(PublicationStatus::class, 'publication_status_id'); }
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
}
