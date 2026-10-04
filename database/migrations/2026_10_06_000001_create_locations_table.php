<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $rows = [
            ['name' => 'Researcher', 'code' => 'LOC-RESEARCHER', 'sort_order' => 1, 'description' => 'Physical document is with the researcher/proponent'],
            ['name' => 'Records Office', 'code' => 'LOC-RECORDS', 'sort_order' => 2, 'description' => 'Physical document is at the Records Office (manual QR only, no system account)'],
            ['name' => 'RPSU / Research Office', 'code' => 'LOC-RPSU', 'sort_order' => 3, 'description' => 'Physical document is at the RPSU / Research Office'],
            ['name' => 'RECI Office – University', 'code' => 'LOC-RECI', 'sort_order' => 4, 'description' => 'Document forwarded to the RECI Office – University'],
        ];
        foreach ($rows as $r) {
            DB::table('locations')->updateOrInsert(
                ['code' => $r['code']],
                array_merge($r, ['is_active' => true, 'created_at' => now(), 'updated_at' => now()])
            );
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
