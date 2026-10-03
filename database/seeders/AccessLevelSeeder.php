<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class AccessLevelSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Public'],
            ['name' => 'DMMMSU Researchers'],
            ['name' => 'RPSU Staff Only'],
            ['name' => 'Restricted'],
            ['name' => 'Metadata Only']
        ];
        foreach ($rows as $r) {
            DB::table('access_levels')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
