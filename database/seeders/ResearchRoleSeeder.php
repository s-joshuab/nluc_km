<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ResearchRoleSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Lead Researcher'],
            ['name' => 'Co-Researcher'],
            ['name' => 'Research Assistant'],
            ['name' => 'Adviser'],
            ['name' => 'Other']
        ];
        foreach ($rows as $r) {
            DB::table('research_roles')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
