<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CollegeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name'=>'College of Education','code'=>'CE','description'=>'NLUC College of Education'],
            ['name'=>'College of Information Systems','code'=>'CIS','description'=>'NLUC College of Information Systems'],
            ['name'=>'College of Agricultural and Biosystems Engineering','code'=>'CABE','description'=>'NLUC CABE'],
            ['name'=>'College of Agribusiness Management','code'=>'CABM','description'=>'NLUC CABM'],
            ['name'=>'College of Agriculture','code'=>'CA','description'=>'NLUC College of Agriculture'],
            ['name'=>'College of Arts and Sciences','code'=>'CAS','description'=>'NLUC College of Arts and Sciences'],
            ['name'=>'College of Veterinary Medicine','code'=>'CVM','description'=>'NLUC College of Veterinary Medicine'],
            ['name'=>'College of Environmental Studies','code'=>'CES','description'=>'NLUC College of Environmental Studies'],
            ['name'=>'College of Graduate Studies','code'=>'CGS','description'=>'NLUC College of Graduate Studies'],
        ];
        foreach ($rows as $r) { DB::table('colleges')->updateOrInsert(['code'=>$r['code']], array_merge($r,['is_active'=>true,'created_at'=>now(),'updated_at'=>now()])); }
    }
}
