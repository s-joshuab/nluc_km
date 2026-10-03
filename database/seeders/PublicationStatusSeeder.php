<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PublicationStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Draft'],
            ['name' => 'Preparing'],
            ['name' => 'Submitted'],
            ['name' => 'Under Review'],
            ['name' => 'Revision Required'],
            ['name' => 'Accepted'],
            ['name' => 'Published']
        ];
        foreach ($rows as $r) {
            DB::table('publication_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
