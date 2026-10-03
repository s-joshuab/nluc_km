<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class SearchController extends Controller {
    public function global(Request $req) {
        $s = $req->get('q','');
        $out = ['research'=>[],'publications'=>[],'iec'=>[],'innovations'=>[],'technologies'=>[],'resources'=>[]];
        if (strlen($s) >= 2) {
            $out['research'] = DB::table('researches')->select('id','research_code','title')->where('title','like',"%$s%")->orWhere('research_code','like',"%$s%")->whereNull('deleted_at')->limit(8)->get();
            $out['publications'] = DB::table('publications')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at')->limit(8)->get();
            $out['iec'] = DB::table('iec_materials')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at')->limit(8)->get();
            $out['innovations'] = DB::table('innovations')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at')->limit(8)->get();
            $out['technologies'] = DB::table('technologies')->select('id','title')->where('title','like',"%$s%")->limit(8)->get();
            $out['resources'] = DB::table('knowledge_resources')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at')->limit(8)->get();
        }
        if ($req->wantsJson()) return response()->json($out);
        return Inertia::render('Search/Index', ['q'=>$s,'results'=>$out]);
    }
}
