<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class IpStatus extends Model {
    protected $table = 'ip_statuses';
    protected $fillable = ['name','description','is_active'];
}
