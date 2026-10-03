<?php
namespace App\Http\Controllers;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class ReportController extends Controller {
    private function filters(Request $r) { return $r->only(['search','college_id','research_type_id','research_status_id','stage_id','status_id','date_from','date_to']); }
    private function lookups() {
        return ['colleges'=>DB::table('colleges')->orderBy('name')->get(),'types'=>DB::table('research_types')->orderBy('name')->get(),
        'statuses'=>DB::table('research_statuses')->orderBy('name')->get(),'stages'=>DB::table('workflow_stages')->orderBy('sort_order')->get(),
        'wstatuses'=>DB::table('workflow_statuses')->orderBy('id')->get()];
    }
    public function research(Request $r) { return Inertia::render('Reports/Research', ['rows'=>ReportService::research($this->filters($r)),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]); }
    public function publications(Request $r) {
        $q = DB::table('publications as p')->leftJoin('researches as re','re.id','=','p.research_id')->leftJoin('publication_statuses as s','s.id','=','p.publication_status_id')->leftJoin('publication_types as t','t.id','=','p.publication_type_id')->select('p.*','re.research_code','s.name as status','t.name as type');
        if ($r->date_from) $q->whereDate('p.publication_date','>=',$r->date_from);
        if ($r->date_to) $q->whereDate('p.publication_date','<=',$r->date_to);
        if ($r->search) $q->where('p.title','like','%'.$r->search.'%');
        return Inertia::render('Reports/Publications', ['rows'=>$q->orderByDesc('p.id')->paginate(20)->withQueryString(),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]);
    }
    public function iec(Request $r) {
        $q = DB::table('iec_materials as m')->leftJoin('iec_statuses as s','s.id','=','m.iec_status_id')->leftJoin('iec_types as t','t.id','=','m.iec_type_id')->leftJoin('colleges as c','c.id','=','m.college_id')->select('m.*','s.name as status','t.name as type','c.code as college');
        if ($r->search) $q->where('m.title','like','%'.$r->search.'%');
        return Inertia::render('Reports/IEC', ['rows'=>$q->orderByDesc('m.id')->paginate(20)->withQueryString(),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]);
    }
    public function innovations(Request $r) {
        $q = DB::table('innovations as i')->leftJoin('innovation_statuses as s','s.id','=','i.innovation_status_id')->leftJoin('colleges as c','c.id','=','i.college_id')->select('i.*','s.name as status','c.code as college');
        if ($r->search) $q->where('i.title','like','%'.$r->search.'%');
        return Inertia::render('Reports/Innovations', ['rows'=>$q->orderByDesc('i.id')->paginate(20)->withQueryString(),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]);
    }
    public function commercialization(Request $r) {
        $q = DB::table('commercialization_records as c')->join('technologies as t','t.id','=','c.technology_id')->join('commercialization_statuses as s','s.id','=','c.status_id')->select('c.*','t.title as technology','s.name as status');
        return Inertia::render('Reports/Commercialization', ['rows'=>$q->orderByDesc('c.id')->paginate(20)->withQueryString(),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]);
    }
    public function endorsements(Request $r) { return Inertia::render('Reports/Endorsements', ['rows'=>ReportService::endorsements($this->filters($r)),'filters'=>$this->filters($r),'lookups'=>$this->lookups()]); }
}
