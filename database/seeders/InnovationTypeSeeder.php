<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class InnovationTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Invention'],
            ['name' => 'Prototype'],
            ['name' => 'Process Innovation'],
            ['name' => 'Product Innovation'],
            ['name' => 'Service Innovation'],
            ['name' => 'Technology'],
            ['name' => 'Other']
        ];
        foreach ($rows as $r) {
            DB::table('innovation_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
