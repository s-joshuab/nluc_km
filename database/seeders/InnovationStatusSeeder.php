<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class InnovationStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Concept'],
            ['name' => 'Under Development'],
            ['name' => 'Prototype'],
            ['name' => 'For IP Protection'],
            ['name' => 'Protected'],
            ['name' => 'For Commercialization'],
            ['name' => 'Commercialized']
        ];
        foreach ($rows as $r) {
            DB::table('innovation_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
