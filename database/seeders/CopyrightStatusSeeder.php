<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CopyrightStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'DMMMSU-Owned'],
            ['name' => 'Author-Owned'],
            ['name' => 'Licensed'],
            ['name' => 'Third-Party Copyright'],
            ['name' => 'Permission Required'],
            ['name' => 'Unknown']
        ];
        foreach ($rows as $r) {
            DB::table('copyright_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
