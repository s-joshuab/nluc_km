<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ResearchStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Ongoing'],
            ['name' => 'Completed'],
            ['name' => 'Published'],
            ['name' => 'Archived']
        ];
        foreach ($rows as $r) {
            DB::table('research_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
