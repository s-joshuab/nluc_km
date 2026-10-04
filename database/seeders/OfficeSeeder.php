<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OfficeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name'=>'Research and Publication Services Unit','code'=>'RPSU','description'=>'NLUC RPSU main office'],
            ['name'=>'Academic Unit','code'=>'ACAD-UNIT','description'=>'NLUC Academic Unit origin'],
            ['name'=>'Academic Unit \u2013 Records Office','code'=>'ACAD-RECORDS','description'=>'Physical handoff point (manual QR, no system account)'],
            ['name'=>'RPSU \u2013 Records Office','code'=>'RPSU-RECORDS','description'=>'Physical release point (manual QR, no system account)'],
            ['name'=>'Research, Extension, Commercialization and Innovation Office \u2013 University','code'=>'RECI-U','description'=>'Downstream university office'],
        ];
        foreach ($rows as $r) { DB::table('offices')->updateOrInsert(['code'=>$r['code']], array_merge($r,['is_active'=>true,'created_at'=>now(),'updated_at'=>now()])); }
    }
}
