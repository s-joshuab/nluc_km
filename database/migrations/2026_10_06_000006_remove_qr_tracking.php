<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * QR is handled physically at the Records Office (no system account),
     * so the system no longer records QR transactions. Legacy endorsements
     * sitting in QR statuses are moved forward; QR tables are dropped.
     */
    public function up(): void
    {
        $statusId = fn ($n) => DB::table('workflow_statuses')->where('name', $n)->value('id');
        $locId = fn ($c) => DB::table('locations')->where('code', $c)->value('id');
        $stageId = fn ($c) => DB::table('workflow_stages')->where('code', $c)->value('id');
        $actor = DB::table('user_roles')
            ->join('roles', 'roles.id', '=', 'user_roles.role_id')
            ->where('roles.name', 'RPSU Administrator')
            ->value('user_roles.user_id')
            ?? DB::table('users')->value('id');

        $moves = [
            ['from' => 'QR Received', 'to' => 'Received by RPSU', 'stage' => 'STAGE-RPSU', 'loc' => 'LOC-RPSU'],
            ['from' => 'QR Release', 'to' => 'Forwarded / Endorsed to RECI', 'stage' => 'STAGE-RECI', 'loc' => 'LOC-RECI'],
        ];
        foreach ($moves as $m) {
            $fromId = $statusId($m['from']);
            $toId = $statusId($m['to']);
            if (!$fromId || !$toId) {
                continue;
            }
            $rows = DB::table('endorsements')->where('current_status_id', $fromId)->get();
            foreach ($rows as $e) {
                DB::table('endorsements')->where('id', $e->id)->update([
                    'current_status_id' => $toId,
                    'current_stage_id' => $stageId($m['stage']) ?? $e->current_stage_id,
                    'current_location_id' => $locId($m['loc']) ?? $e->current_location_id,
                    'updated_at' => now(),
                ]);
                if ($actor) {
                    DB::table('endorsement_status_histories')->insert([
                        'endorsement_id' => $e->id,
                        'previous_stage_id' => $e->current_stage_id,
                        'new_stage_id' => $stageId($m['stage']) ?? $e->current_stage_id,
                        'previous_status_id' => $fromId,
                        'new_status_id' => $toId,
                        'previous_location_id' => $e->current_location_id,
                        'new_location_id' => $locId($m['loc']) ?? $e->current_location_id,
                        'changed_by' => $actor,
                        'changed_at' => now(),
                        'remarks' => 'QR tracking removed from system; moved forward automatically.',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        Schema::dropIfExists('endorsement_qr_transactions');
        Schema::dropIfExists('qr_transaction_types');
    }

    public function down(): void
    {
        // QR tables are intentionally not restored.
    }
};
