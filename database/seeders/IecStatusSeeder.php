<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class IecStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Proposed'],
            ['name' => 'Under Development'],
            ['name' => 'For Review'],
            ['name' => 'Revision Required'],
            ['name' => 'For Approval'],
            ['name' => 'Approved'],
            ['name' => 'Released'],
            ['name' => 'Published']
        ];
        foreach ($rows as $r) {
            DB::table('iec_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
