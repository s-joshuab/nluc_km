<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class WorkflowStatusSeeder extends Seeder {
    public function run(): void {
        $rows = ['Endorsed / Submitted','QR Received','Received by RPSU','Under Processing','For Review','For Release','QR Release','Forwarded / Endorsed to RECI','Completed / Closed'];
        foreach ($rows as $n) { DB::table('workflow_statuses')->updateOrInsert(['name'=>$n], ['name'=>$n,'description'=>'','is_active'=>true,'created_at'=>now(),'updated_at'=>now()]); }
    }
}
