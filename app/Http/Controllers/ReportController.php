<?php
namespace App\Http\Controllers;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class ReportController extends Controller {
    public const TABS = ['research','publications','iec','innovations','commercialization','endorsements'];

    private function filters(Request $r) { return $r->only(['tab','search','college_id','research_type_id','research_status_id','stage_id','status_id','date_from','date_to']); }

    private function lookups() {
        return ['colleges'=>DB::table('colleges')->orderBy('name')->get(),'types'=>DB::table('research_types')->orderBy('name')->get(),
        'statuses'=>DB::table('research_statuses')->orderBy('name')->get(),'stages'=>DB::table('workflow_stages')->orderBy('sort_order')->get(),
        'wstatuses'=>DB::table('workflow_statuses')->orderBy('id')->get()];
    }

    private function counts(): array {
        return [
            'research' => DB::table('researches')->whereNull('deleted_at')->count(),
            'publications' => DB::table('publications')->whereNull('deleted_at')->count(),
            'iec' => DB::table('iec_materials')->whereNull('deleted_at')->count(),
            'innovations' => DB::table('innovations')->whereNull('deleted_at')->count(),
            'commercialization' => DB::table('commercialization_records')->count(),
            'endorsements' => DB::table('endorsements')->count(),
        ];
    }

    public function index(Request $r) {
        $tab = in_array($r->get('tab'), self::TABS) ? $r->get('tab') : 'research';
        $f = $this->filters($r);
        $rows = match($tab) {
            'research' => ReportService::research($f),
            'endorsements' => ReportService::endorsements($f),
            'publications' => $this->publicationsQuery($r),
            'iec' => $this->iecQuery($r),
            'innovations' => $this->innovationsQuery($r),
            'commercialization' => $this->commercializationQuery($r),
        };
        return Inertia::render('Reports/Index', [
            'tab' => $tab, 'rows' => $rows, 'filters' => $f,
            'lookups' => $this->lookups(), 'counts' => $this->counts(),
        ]);
    }

    private function publicationsQuery(Request $r) {
        $q = DB::table('publications as p')->leftJoin('researches as re','re.id','=','p.research_id')->leftJoin('publication_statuses as s','s.id','=','p.publication_status_id')->leftJoin('publication_types as t','t.id','=','p.publication_type_id')->select('p.*','re.research_code','s.name as status','t.name as type');
        if ($r->date_from) $q->whereDate('p.publication_date','>=',$r->date_from);
        if ($r->date_to) $q->whereDate('p.publication_date','<=',$r->date_to);
        if ($r->search) $q->where('p.title','like','%'.$r->search.'%');
        return $q->orderByDesc('p.id')->paginate(20)->withQueryString();
    }

    private function iecQuery(Request $r) {
        $q = DB::table('iec_materials as m')->leftJoin('iec_statuses as s','s.id','=','m.iec_status_id')->leftJoin('iec_types as t','t.id','=','m.iec_type_id')->leftJoin('colleges as c','c.id','=','m.college_id')->select('m.*','s.name as status','t.name as type','c.code as college');
        if ($r->search) $q->where('m.title','like','%'.$r->search.'%');
        if ($r->college_id) $q->where('m.college_id',$r->college_id);
        return $q->orderByDesc('m.id')->paginate(20)->withQueryString();
    }

    private function innovationsQuery(Request $r) {
        $q = DB::table('innovations as i')->leftJoin('innovation_statuses as s','s.id','=','i.innovation_status_id')->leftJoin('innovation_types as t','t.id','=','i.innovation_type_id')->leftJoin('colleges as c','c.id','=','i.college_id')->select('i.*','s.name as status','t.name as type','c.code as college');
        if ($r->search) $q->where('i.title','like','%'.$r->search.'%');
        if ($r->college_id) $q->where('i.college_id',$r->college_id);
        return $q->orderByDesc('i.id')->paginate(20)->withQueryString();
    }

    private function commercializationQuery(Request $r) {
        $q = DB::table('commercialization_records as c')->join('technologies as t','t.id','=','c.technology_id')->join('commercialization_statuses as s','s.id','=','c.status_id')->select('c.*','t.title as technology','s.name as status');
        if ($r->search) $q->where(fn($qq)=>$qq->where('t.title','like','%'.$r->search.'%')->orWhere('c.potential_partner','like','%'.$r->search.'%'));
        return $q->orderByDesc('c.id')->paginate(20)->withQueryString();
    }
}
