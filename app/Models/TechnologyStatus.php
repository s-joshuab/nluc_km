<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TechnologyStatus extends Model {
    protected $table = 'technology_statuses';
    protected $fillable = ['name','description','is_active'];
}
