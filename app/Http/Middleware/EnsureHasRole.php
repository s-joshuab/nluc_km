<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class EnsureHasRole {
    public function handle(Request $request, Closure $next, ...$roles): Response {
        $user = $request->user();
        if (!$user) return redirect()->route('login');
        if (empty($roles) || $user->hasAnyRole($roles) || $user->isAdmin()) return $next($request);
        abort(403, 'Unauthorized: required role ['.implode(',', $roles).']');
    }
}
