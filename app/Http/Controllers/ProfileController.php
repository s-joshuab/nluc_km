<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
class ProfileController extends Controller {
    public function show() {
        $user = auth()->user()->load(['roles','offices','college']);
        return Inertia::render('Profile/Show', ['user' => $user]);
    }
    public function update(Request $req) {
        $user = auth()->user();
        $d = $req->validate([
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',
            'suffix' => 'nullable|string|max:20',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);
        $user->update([
            'first_name' => $d['first_name'],
            'middle_name' => $d['middle_name'] ?? null,
            'last_name' => $d['last_name'],
            'suffix' => $d['suffix'] ?? null,
            'name' => $d['first_name'].' '.$d['last_name'],
            'email' => $d['email'],
        ] + (!empty($d['password']) ? ['password' => Hash::make($d['password'])] : []));
        return back()->with('success', 'Profile updated.');
    }
}
