<?php
namespace App\Http\Controllers;
use App\Models\AppNotification;
use Inertia\Inertia;
class NotificationController extends Controller {
    public function index() {
        $rows = AppNotification::where('user_id', auth()->id())->orderByDesc('id')->paginate(20);
        return Inertia::render('Notifications/Index', ['rows'=>$rows]);
    }
    public function read(AppNotification $notification) {
        if ($notification->user_id !== auth()->id()) abort(403);
        $notification->update(['is_read'=>true,'read_at'=>now()]);
        return back();
    }
    public function readAll() {
        AppNotification::where('user_id', auth()->id())->where('is_read',false)->update(['is_read'=>true,'read_at'=>now()]);
        return back();
    }
}
