<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Location extends Model {
    protected $fillable = ['name','code','description','sort_order','is_active'];
    protected $casts = ['is_active'=>'boolean'];
    public function endorsements() { return $this->hasMany(Endorsement::class, 'current_location_id'); }
}
