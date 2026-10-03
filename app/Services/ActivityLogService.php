<?php
namespace App\Services;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
class ActivityLogService {
    public static function log(string $action, ?string $module = null, ?string $recordType = null, $recordId = null, ?string $description = null, $userId = null): ActivityLog {
        return ActivityLog::create([
            'user_id'=>$userId ?? Auth::id(),
            'action'=>$action,'module'=>$module,'record_type'=>$recordType,'record_id'=>$recordId,'description'=>$description,
        ]);
    }
}
