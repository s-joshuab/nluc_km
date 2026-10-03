<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class InnovationStatus extends Model {
    protected $table = 'innovation_statuses';
    protected $fillable = ['name','description','is_active'];
}
