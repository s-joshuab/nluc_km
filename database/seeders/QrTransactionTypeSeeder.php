<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class QrTransactionTypeSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name' => 'QR Received'],
            ['name' => 'QR Release']
        ];
        foreach ($rows as $r) {
            DB::table('qr_transaction_types')->updateOrInsert(['name' => $r['name']], array_merge($r, ['created_at'=>now(),'updated_at'=>now()]));
        }
    }
}
