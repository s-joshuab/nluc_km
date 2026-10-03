<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class UsagePermissionSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'View Only'],
            ['name' => 'Download Allowed'],
            ['name' => 'Restricted Download'],
            ['name' => 'External Link Only']
        ];
        foreach ($rows as $r) {
            DB::table('usage_permissions')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
