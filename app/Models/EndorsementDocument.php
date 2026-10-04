<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class EndorsementDocument extends Model {
    protected $fillable = ['endorsement_id','original_name','stored_name','storage_path','mime_type','file_size','uploaded_by','remarks'];
    public function endorsement() { return $this->belongsTo(Endorsement::class); }
    public function uploader() { return $this->belongsTo(User::class, 'uploaded_by'); }
}
