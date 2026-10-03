<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class UsagePermission extends Model {
    protected $fillable = ['name','description','is_active'];
}
