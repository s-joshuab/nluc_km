<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CommercializationStatusSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'For Assessment'],
            ['name' => 'Under Development'],
            ['name' => 'For IP Protection'],
            ['name' => 'For Commercialization'],
            ['name' => 'Negotiation'],
            ['name' => 'Licensed'],
            ['name' => 'Commercialized'],
            ['name' => 'Completed']
        ];
        foreach ($rows as $r) {
            DB::table('commercialization_statuses')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
