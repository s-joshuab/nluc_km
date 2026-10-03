<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class College extends Model {
    protected $fillable = ['name','code','description','is_active'];
    protected $casts = ['is_active'=>'boolean'];
    public function users() { return $this->hasMany(User::class); }
    public function researches() { return $this->hasMany(Research::class); }
    public function publications() { return $this->hasManyThrough(Publication::class, Research::class, 'college_id','research_id'); }
    public function iecMaterials() { return $this->hasMany(IecMaterial::class); }
    public function innovations() { return $this->hasMany(Innovation::class); }
}
