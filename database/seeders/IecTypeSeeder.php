<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class IecTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Brochure'],
            ['name' => 'Flyer'],
            ['name' => 'Poster'],
            ['name' => 'Manual'],
            ['name' => 'Infographic'],
            ['name' => 'Information Material'],
            ['name' => 'Video'],
            ['name' => 'Other']
        ];
        foreach ($rows as $r) {
            DB::table('iec_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
