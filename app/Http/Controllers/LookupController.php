<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class LookupController extends Controller {
    // Admin-only enforced via route middleware (role:RPSU Administrator)
    public function roles() { return Inertia::render('Roles/Index', ['rows'=>DB::table('roles')->orderBy('name')->paginate(15)]); }
    public function offices() { return Inertia::render('Offices/Index', ['rows'=>DB::table('offices')->orderBy('name')->paginate(15)]); }
    public function colleges() { return Inertia::render('Colleges/Index', ['rows'=>DB::table('colleges')->orderBy('name')->paginate(15)]); }
    public function storeRole(Request $r) { $d=$r->validate(['name'=>'required|unique:roles,name','description'=>'nullable|string']); DB::table('roles')->insert($d+['created_at'=>now(),'updated_at'=>now()]); return back()->with('success','Role saved.'); }
    public function storeOffice(Request $r) { $d=$r->validate(['name'=>'required|string','code'=>'required|unique:offices,code','description'=>'nullable|string','is_active'=>'boolean']); DB::table('offices')->insert($d+['created_at'=>now(),'updated_at'=>now()]); return back()->with('success','Office saved.'); }
    public function storeCollege(Request $r) { $d=$r->validate(['name'=>'required|string','code'=>'required|unique:colleges,code','description'=>'nullable|string','is_active'=>'boolean']); DB::table('colleges')->insert($d+['created_at'=>now(),'updated_at'=>now()]); return back()->with('success','College saved.'); }
    public function toggleOffice($id) { $o=DB::table('offices')->find($id); DB::table('offices')->where('id',$id)->update(['is_active'=>!$o->is_active]); return back(); }
    public function toggleCollege($id) { $o=DB::table('colleges')->find($id); DB::table('colleges')->where('id',$id)->update(['is_active'=>!$o->is_active]); return back(); }
}
