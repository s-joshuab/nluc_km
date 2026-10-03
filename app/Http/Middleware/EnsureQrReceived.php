<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class EnsureQrReceived {
    public function handle(Request $request, Closure $next): Response {
        $user = $request->user();
        if (!$user) return redirect()->route('login');
        if ($user->canDoQrReceived() || $user->isAdmin()) return $next($request);
        // Admin may view but only Records+ACAD-RECORDS may perform; allow admin pass for viewing? Strict: require QR right.
        // To let admin view pages but block store action, controller also validates. Here enforce strictly except admin view is allowed via isAdmin.
        abort(403, 'Only RPSU Staff or Administrator can encode QR Received.');
    }
}
