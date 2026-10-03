<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class AuthController extends Controller {
    public function showLogin() {
        if (Auth::check()) return redirect()->route('dashboard');
        return Inertia::render('Auth/Login');
    }
    public function login(Request $request) {
        $cred = $request->validate(['email'=>'required|email','password'=>'required|string','remember'=>'nullable|boolean']);
        $remember = (bool)($cred['remember'] ?? false);
        if (!Auth::attempt(['email'=>$cred['email'],'password'=>$cred['password'],'is_active'=>true], $remember)) {
            // fallback: check if inactive
            if (Auth::attempt(['email'=>$cred['email'],'password'=>$cred['password']], false)) {
                Auth::logout();
                return back()->withErrors(['email'=>'Account is deactivated.']);
            }
            return back()->withErrors(['email'=>'Invalid credentials.']);
        }
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
    }
    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}
