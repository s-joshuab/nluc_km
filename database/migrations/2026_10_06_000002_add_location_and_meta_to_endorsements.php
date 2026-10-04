<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('endorsements', function (Blueprint $table) {
            $table->foreignId('current_location_id')->nullable()->after('current_status_id')->constrained('locations')->nullOnDelete();
            $table->foreignId('college_id')->nullable()->after('research_id')->constrained('colleges')->nullOnDelete();
            $table->string('department')->nullable()->after('college_id');
        });

        // Backfill current location from current status for existing rows
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
        foreach (DB::table('endorsements')->select('id', 'current_status_id')->get() as $e) {
            $statusName = $statuses[$e->current_status_id] ?? null;
            $code = $map[$statusName] ?? 'LOC-RPSU';
            DB::table('endorsements')->where('id', $e->id)->update(['current_location_id' => $locIds[$code] ?? null]);
        }
    }

    public function down(): void
    {
        Schema::table('endorsements', function (Blueprint $table) {
            $table->dropConstrainedForeignId('current_location_id');
            $table->dropConstrainedForeignId('college_id');
            $table->dropColumn('department');
        });
    }
};
