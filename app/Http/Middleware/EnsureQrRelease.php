<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class EnsureQrRelease {
    public function handle(Request $request, Closure $next): Response {
        $user = $request->user();
        if (!$user) return redirect()->route('login');
        if ($user->canDoQrRelease() || $user->isAdmin()) return $next($request);
        abort(403, 'Only RPSU Staff or Administrator can encode QR Release.');
    }
}
