<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ResourceTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Guidelines'],
            ['name' => 'Policies'],
            ['name' => 'Templates'],
            ['name' => 'FAQs'],
            ['name' => 'Procedures'],
            ['name' => 'Best Practices'],
            ['name' => 'Research Instruments'],
            ['name' => 'Training Materials'],
            ['name' => 'Reference Materials'],
            ['name' => 'External Resources']
        ];
        foreach ($rows as $r) {
            DB::table('resource_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
