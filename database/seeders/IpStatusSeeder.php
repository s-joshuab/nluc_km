<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class IpStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Not Applicable'],
            ['name' => 'Pending'],
            ['name' => 'Under Review'],
            ['name' => 'Protected'],
            ['name' => 'Copyrighted']
        ];
        foreach ($rows as $r) {
            DB::table('ip_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
