<?php
namespace App\Services;
use App\Models\AppNotification;
class NotificationService {
    public static function send(int $userId, string $title, ?string $message = null, string $type = 'info', ?string $link = null, ?array $data = null): AppNotification {
        return AppNotification::create([
            'user_id'=>$userId,'title'=>$title,'message'=>$message,'type'=>$type,'link'=>$link,'data'=>$data,
        ]);
    }
    public static function sendToMany(array $userIds, string $title, ?string $message = null, string $type = 'info', ?string $link = null, ?array $data = null): void {
        foreach (array_unique($userIds) as $uid) {
            if ($uid) static::send((int)$uid, $title, $message, $type, $link, $data);
        }
    }
}
