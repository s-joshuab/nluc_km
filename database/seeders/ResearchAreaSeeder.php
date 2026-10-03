<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ResearchAreaSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Education'],
            ['name' => 'ICT and Information Systems'],
            ['name' => 'Agriculture'],
            ['name' => 'Agribusiness'],
            ['name' => 'Engineering'],
            ['name' => 'Sciences'],
            ['name' => 'Veterinary Medicine'],
            ['name' => 'Environment'],
            ['name' => 'Graduate Studies']
        ];
        foreach ($rows as $r) {
            DB::table('research_areas')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
