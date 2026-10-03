<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class IecStatus extends Model {
    protected $table = 'iec_statuses';
    protected $fillable = ['name','description','is_active'];
}
