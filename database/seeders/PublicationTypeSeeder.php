<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PublicationTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'Journal Article'],
            ['name' => 'Conference Paper'],
            ['name' => 'Book Chapter'],
            ['name' => 'Technical Bulletin'],
            ['name' => 'Policy Brief']
        ];
        foreach ($rows as $r) {
            DB::table('publication_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
