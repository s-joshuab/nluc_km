<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ResearchTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Basic Research'],
            ['name' => 'Applied Research'],
            ['name' => 'Developmental Research'],
            ['name' => 'Institutional Research'],
            ['name' => 'Thesis'],
            ['name' => 'Dissertation'],
            ['name' => 'Capstone'],
            ['name' => 'Extension-Based Research']
        ];
        foreach ($rows as $r) {
            DB::table('research_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
