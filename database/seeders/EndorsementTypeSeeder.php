<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class EndorsementTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Research Document Endorsement'],
            ['name' => 'Publication Endorsement'],
            ['name' => 'IEC Endorsement']
        ];
        foreach ($rows as $r) {
            DB::table('endorsement_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
