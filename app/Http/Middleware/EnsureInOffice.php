<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class EnsureInOffice {
    public function handle(Request $request, Closure $next, ...$codes): Response {
        $user = $request->user();
        if (!$user) return redirect()->route('login');
        if ($user->isAdmin()) return $next($request);
        if (empty($codes) || $user->inAnyOffice($codes)) return $next($request);
        abort(403, 'Unauthorized: required office ['.implode(',', $codes).']');
    }
}
