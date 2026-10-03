<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
class UserController extends Controller {
    // Admin-only enforced via route middleware (role:RPSU Administrator)
    public function index(Request $req) {
        $q = User::with(['roles','offices','college'])->orderBy('last_name');
        if ($s=$req->get('search')) $q->where(fn($qq)=>$qq->where('first_name','like',"%$s%")->orWhere('last_name','like',"%$s%")->orWhere('email','like',"%$s%"));
        return Inertia::render('Users/Index', ['rows'=>$q->paginate(15)->withQueryString(),'filters'=>$req->only(['search'])]);
    }
    public function create() {
        return Inertia::render('Users/Create', ['roles'=>DB::table('roles')->get(),'offices'=>DB::table('offices')->where('is_active',true)->get(),'colleges'=>DB::table('colleges')->where('is_active',true)->get()]);
    }
    public function store(Request $req) {
        $d = $req->validate(['first_name'=>'required|string|max:100','middle_name'=>'nullable|string|max:100','last_name'=>'required|string|max:100','suffix'=>'nullable|string|max:20','email'=>'required|email|unique:users,email','employee_number'=>'nullable|string|unique:users,employee_number','password'=>'required|string|min:8','college_id'=>'nullable|exists:colleges,id','is_active'=>'boolean','roles'=>'array','roles.*'=>'exists:roles,id','offices'=>'array','offices.*'=>'exists:offices,id','primary_office_id'=>'nullable|exists:offices,id']);
        $u = User::create(['first_name'=>$d['first_name'],'middle_name'=>$d['middle_name']??null,'last_name'=>$d['last_name'],'suffix'=>$d['suffix']??null,'name'=>$d['first_name'].' '.$d['last_name'],'email'=>$d['email'],'employee_number'=>$d['employee_number']??null,'password'=>Hash::make($d['password']),'college_id'=>$d['college_id']??null,'is_active'=>$d['is_active']??true]);
        foreach ($d['roles'] ?? [] as $rid) DB::table('user_roles')->insert(['user_id'=>$u->id,'role_id'=>$rid,'created_at'=>now(),'updated_at'=>now()]);
        foreach ($d['offices'] ?? [] as $oid) DB::table('user_offices')->insert(['user_id'=>$u->id,'office_id'=>$oid,'is_primary'=>($d['primary_office_id']??null)==$oid,'assigned_from'=>now()->toDateString(),'created_at'=>now(),'updated_at'=>now()]);
        return redirect()->route('users.index')->with('success','User created.');
    }
    public function edit(User $user) {
        $user->load(['roles','offices']);
        return Inertia::render('Users/Edit', ['item'=>$user,'roles'=>DB::table('roles')->get(),'offices'=>DB::table('offices')->where('is_active',true)->get(),'colleges'=>DB::table('colleges')->where('is_active',true)->get()]);
    }
    public function update(Request $req, User $user) {
        $d = $req->validate(['first_name'=>'required|string|max:100','middle_name'=>'nullable|string|max:100','last_name'=>'required|string|max:100','suffix'=>'nullable|string|max:20','email'=>'required|email|unique:users,email,'.$user->id,'employee_number'=>'nullable|string|unique:users,employee_number,'.$user->id,'password'=>'nullable|string|min:8','college_id'=>'nullable|exists:colleges,id','is_active'=>'boolean','roles'=>'array','roles.*'=>'exists:roles,id','offices'=>'array','offices.*'=>'exists:offices,id','primary_office_id'=>'nullable|exists:offices,id']);
        $user->update(['first_name'=>$d['first_name'],'middle_name'=>$d['middle_name']??null,'last_name'=>$d['last_name'],'suffix'=>$d['suffix']??null,'name'=>$d['first_name'].' '.$d['last_name'],'email'=>$d['email'],'employee_number'=>$d['employee_number']??null,'college_id'=>$d['college_id']??null,'is_active'=>$d['is_active']??true] + (!empty($d['password'])?['password'=>Hash::make($d['password'])]:[]));
        DB::table('user_roles')->where('user_id',$user->id)->delete();
        foreach ($d['roles'] ?? [] as $rid) DB::table('user_roles')->insert(['user_id'=>$user->id,'role_id'=>$rid,'created_at'=>now(),'updated_at'=>now()]);
        DB::table('user_offices')->where('user_id',$user->id)->delete();
        foreach ($d['offices'] ?? [] as $oid) DB::table('user_offices')->insert(['user_id'=>$user->id,'office_id'=>$oid,'is_primary'=>($d['primary_office_id']??null)==$oid,'assigned_from'=>now()->toDateString(),'created_at'=>now(),'updated_at'=>now()]);
        return redirect()->route('users.index')->with('success','User updated.');
    }
    public function destroy(User $user) {
        if ($user->id === auth()->id()) return back()->withErrors(['user'=>'Cannot delete yourself.']);
        $user->update(['is_active'=>false]);
        return back()->with('success','User deactivated.');
    }
}
