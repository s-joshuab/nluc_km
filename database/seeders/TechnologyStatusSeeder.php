<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TechnologyStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Under Development'],
            ['name' => 'Validated'],
            ['name' => 'Ready for Transfer'],
            ['name' => 'Transferred'],
            ['name' => 'Commercialized']
        ];
        foreach ($rows as $r) {
            DB::table('technology_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
