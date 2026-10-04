<?php
namespace App\Services;
use Illuminate\Support\Facades\DB;
class ReportService {
    public static function research(array $f = []) {
        $q = DB::table('researches as r')
            ->leftJoin('colleges as c','c.id','=','r.college_id')
            ->leftJoin('research_types as rt','rt.id','=','r.research_type_id')
            ->leftJoin('research_statuses as rs','rs.id','=','r.research_status_id')
            ->leftJoin('users as u','u.id','=','r.lead_researcher_id')
            ->select('r.id','r.research_code','r.title','c.name as college','rt.name as type','rs.name as status','r.sdg_alignment','r.date_submitted','r.date_completed',DB::raw("CONCAT(COALESCE(u.first_name,''),' ',COALESCE(u.last_name,'')) as lead_researcher"));
        if (!empty($f['college_id'])) $q->where('r.college_id',$f['college_id']);
        if (!empty($f['research_type_id'])) $q->where('r.research_type_id',$f['research_type_id']);
        if (!empty($f['research_status_id'])) $q->where('r.research_status_id',$f['research_status_id']);
        if (!empty($f['date_from'])) $q->whereDate('r.date_submitted','>=',$f['date_from']);
        if (!empty($f['date_to'])) $q->whereDate('r.date_submitted','<=',$f['date_to']);
        if (!empty($f['search'])) $q->where(fn($qq)=>$qq->where('r.title','like','%'.$f['search'].'%')->orWhere('r.research_code','like','%'.$f['search'].'%'));
        return $q->orderByDesc('r.id')->paginate(20)->withQueryString();
    }
    public static function endorsements(array $f = []) {
        $q = DB::table('endorsements as e')
            ->leftJoin('workflow_stages as s','s.id','=','e.current_stage_id')
            ->leftJoin('workflow_statuses as st','st.id','=','e.current_status_id')
            ->leftJoin('researches as r','r.id','=','e.research_id')
            ->select('e.*','s.name as stage','st.name as status','r.research_code');
        if (!empty($f['stage_id'])) $q->where('e.current_stage_id',$f['stage_id']);
        if (!empty($f['status_id'])) $q->where('e.current_status_id',$f['status_id']);
        if (!empty($f['date_from'])) $q->whereDate('e.date_submitted','>=',$f['date_from']);
        if (!empty($f['date_to'])) $q->whereDate('e.date_submitted','<=',$f['date_to']);
        return $q->orderByDesc('e.id')->paginate(20)->withQueryString();
    }
}
