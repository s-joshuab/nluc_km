<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class AccessRequestStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Pending'],
            ['name' => 'Approved'],
            ['name' => 'Rejected'],
            ['name' => 'Cancelled']
        ];
        foreach ($rows as $r) {
            DB::table('access_request_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
