<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class WorkflowStatus extends Model {
    protected $table = 'workflow_statuses';
    protected $fillable = ['name','description','is_active'];
}
