<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Office extends Model {
    protected $fillable = ['name','code','description','is_active'];
    protected $casts = ['is_active'=>'boolean'];
    public function users() { return $this->belongsToMany(User::class, 'user_offices'); }
    public function qrTransactions() { return $this->hasMany(EndorsementQrTransaction::class, 'office_id'); }
}
