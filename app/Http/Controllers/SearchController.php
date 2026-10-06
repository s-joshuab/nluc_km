<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class SearchController extends Controller {
    public function global(Request $req) {
        // Researchers navigate via My pages — global search would expose other records
        if (auth()->user()->isResearcherOnly()) abort(403, 'Use My Research and related pages to find your records.');
        $s = $req->get('q','');
        $scope = auth()->user()->scopeCollegeId();
        $out = ['research'=>[],'publications'=>[],'iec'=>[],'innovations'=>[],'technologies'=>[],'resources'=>[]];
        if (strlen($s) >= 2) {
            $rq = DB::table('researches')->select('id','research_code','title')->where(fn($qq)=>$qq->where('title','like',"%$s%")->orWhere('research_code','like',"%$s%"))->whereNull('deleted_at');
            if ($scope) $rq->where('college_id',$scope);
            $out['research'] = $rq->limit(8)->get();
            $pq = DB::table('publications as p')->select('p.id','p.title')->where('p.title','like',"%$s%")->whereNull('p.deleted_at');
            if ($scope) $pq->where(fn($qq)=>$qq->whereIn('p.research_id', fn($r)=>$r->select('id')->from('researches')->where('college_id',$scope)->whereNull('deleted_at'))->orWhereIn('p.created_by', fn($u)=>$u->select('id')->from('users')->where('college_id',$scope)));
            $out['publications'] = $pq->limit(8)->get();
            $iq = DB::table('iec_materials')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at');
            if ($scope) $iq->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id'));
            $out['iec'] = $iq->limit(8)->get();
            $nq = DB::table('innovations')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at');
            if ($scope) $nq->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id'));
            $out['innovations'] = $nq->limit(8)->get();
            $tq = DB::table('technologies as t')->select('t.id','t.title')->where('t.title','like',"%$s%");
            if ($scope) $tq->whereIn('t.innovation_id', fn($i)=>$i->select('id')->from('innovations')->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id'))->whereNull('deleted_at'));
            $out['technologies'] = $tq->limit(8)->get();
            $kq = DB::table('knowledge_resources')->select('id','title')->where('title','like',"%$s%")->whereNull('deleted_at');
            if ($scope) $kq->where(fn($qq)=>$qq->where('college_id',$scope)->orWhereNull('college_id'));
            $out['resources'] = $kq->limit(8)->get();
        }
        if ($req->wantsJson()) return response()->json($out);
        return Inertia::render('Search/Index', ['q'=>$s,'results'=>$out]);
    }
}
