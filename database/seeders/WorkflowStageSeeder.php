<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class WorkflowStageSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name'=>'Academic Unit','code'=>'STAGE-ACAD','sort_order'=>1,'description'=>'Origin academic unit'],
            ['name'=>'Academic Unit \u2013 Records Office','code'=>'STAGE-ACAD-REC','sort_order'=>2,'description'=>'Physical handoff point (manual QR, no system account)'],
            ['name'=>'RPSU','code'=>'STAGE-RPSU','sort_order'=>3,'description'=>'RPSU processing'],
            ['name'=>'RPSU \u2013 Records Office','code'=>'STAGE-RPSU-REC','sort_order'=>4,'description'=>'Physical release point (manual QR, no system account)'],
            ['name'=>'RECI Office \u2013 University','code'=>'STAGE-RECI','sort_order'=>5,'description'=>'Downstream university office'],
        ];
        foreach ($rows as $r) { DB::table('workflow_stages')->updateOrInsert(['code'=>$r['code']], array_merge($r,['is_active'=>true,'created_at'=>now(),'updated_at'=>now()])); }
    }
}
