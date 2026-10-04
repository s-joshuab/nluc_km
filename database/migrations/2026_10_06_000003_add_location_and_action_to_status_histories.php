<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('endorsement_status_histories', function (Blueprint $table) {
            $table->foreignId('previous_location_id')->nullable()->after('previous_status_id')->constrained('locations')->nullOnDelete();
            $table->foreignId('new_location_id')->nullable()->after('new_status_id')->constrained('locations')->nullOnDelete();
            $table->text('action_taken')->nullable()->after('remarks');
        });

        // Backfill locations from status names for existing history rows
        $map = [
            'Endorsed / Submitted' => 'LOC-RESEARCHER',
            'QR Received' => 'LOC-RECORDS',
            'Received by RPSU' => 'LOC-RPSU',
            'Under Processing' => 'LOC-RPSU',
            'For Review' => 'LOC-RPSU',
            'For Release' => 'LOC-RPSU',
            'QR Release' => 'LOC-RECORDS',
            'Forwarded / Endorsed to RECI' => 'LOC-RECI',
            'Completed / Closed' => 'LOC-RECI',
        ];
        $locIds = DB::table('locations')->pluck('id', 'code');
        $statuses = DB::table('workflow_statuses')->pluck('name', 'id');
        foreach (DB::table('endorsement_status_histories')->select('id', 'previous_status_id', 'new_status_id')->get() as $h) {
            DB::table('endorsement_status_histories')->where('id', $h->id)->update([
                'previous_location_id' => $h->previous_status_id ? ($locIds[$map[$statuses[$h->previous_status_id] ?? ''] ?? 'LOC-RPSU'] ?? null) : null,
                'new_location_id' => $locIds[$map[$statuses[$h->new_status_id] ?? ''] ?? 'LOC-RPSU'] ?? null,
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('endorsement_status_histories', function (Blueprint $table) {
            $table->dropConstrainedForeignId('previous_location_id');
            $table->dropConstrainedForeignId('new_location_id');
            $table->dropColumn('action_taken');
        });
    }
};
