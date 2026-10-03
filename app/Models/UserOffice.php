<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class UserOffice extends Model {
    protected $fillable = ['user_id','office_id','is_primary','assigned_from','assigned_until'];
    protected $casts = ['is_primary'=>'boolean','assigned_from'=>'date','assigned_until'=>'date'];
    public function user() { return $this->belongsTo(User::class); }
    public function office() { return $this->belongsTo(Office::class); }
}
