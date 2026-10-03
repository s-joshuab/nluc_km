<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreQrTransactionRequest;
use App\Models\Endorsement;
use App\Services\QrTransactionService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class QrController extends Controller {
    public function receivedQueue() {
        $rows = Endorsement::with(['researcher','currentStatus'])
            ->whereHas('currentStatus', fn($q)=>$q->where('name','Endorsed / Submitted'))
            ->orderBy('id')->paginate(15);
        return Inertia::render('Qr/Received', ['rows'=>$rows]);
    }
    public function releaseQueue() {
        $rows = Endorsement::with(['researcher','currentStatus'])
            ->whereHas('currentStatus', fn($q)=>$q->where('name','For Release'))
            ->orderBy('id')->paginate(15);
        return Inertia::render('Qr/Release', ['rows'=>$rows]);
    }
    public function storeReceived(StoreQrTransactionRequest $req, Endorsement $endorsement) {
        QrTransactionService::qrReceived($endorsement, auth()->user(), $req->validated());
        return back()->with('success','QR Received recorded.');
    }
    public function storeRelease(StoreQrTransactionRequest $req, Endorsement $endorsement) {
        QrTransactionService::qrRelease($endorsement, auth()->user(), $req->validated());
        return back()->with('success','QR Release recorded.');
    }
}
