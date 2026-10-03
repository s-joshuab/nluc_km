<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CopyrightStatus extends Model {
    protected $fillable = ['name','description','is_active'];
}
