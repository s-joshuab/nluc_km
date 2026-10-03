<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class FileTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Research Proposal'],
            ['name' => 'Terminal Report'],
            ['name' => 'Published Research'],
            ['name' => 'Dataset'],
            ['name' => 'Methodology'],
            ['name' => 'Research Instrument'],
            ['name' => 'Supporting Document'],
            ['name' => 'Presentation'],
            ['name' => 'Other']
        ];
        foreach ($rows as $r) {
            DB::table('file_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
