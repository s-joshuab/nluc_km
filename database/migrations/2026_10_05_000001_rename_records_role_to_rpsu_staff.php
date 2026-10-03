<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('roles') || !Schema::hasTable('user_roles')) {
            return;
        }
        $old = DB::table('roles')->where('name', 'Records Office Personnel')->first();
        $new = DB::table('roles')->where('name', 'RPSU Staff')->first();
        if ($old && !$new) {
            DB::table('roles')->where('id', $old->id)->update([
                'name' => 'RPSU Staff',
                'description' => 'RPSU office staff; updates file/document location and performs QR transactions for assigned office/stage',
                'updated_at' => now(),
            ]);
        } elseif ($old && $new) {
            $oldAssignments = DB::table('user_roles')->where('role_id', $old->id)->get();
            foreach ($oldAssignments as $a) {
                $exists = DB::table('user_roles')
                    ->where('user_id', $a->user_id)
                    ->where('role_id', $new->id)
                    ->exists();
                if (!$exists) {
                    DB::table('user_roles')->insert([
                        'user_id' => $a->user_id,
                        'role_id' => $new->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
            DB::table('user_roles')->where('role_id', $old->id)->delete();
            DB::table('roles')->where('id', $old->id)->delete();
        }
    }

    public function down(): void
    {
        $staff = DB::table('roles')->where('name', 'RPSU Staff')->first();
        if ($staff) {
            DB::table('roles')->where('id', $staff->id)->update([
                'name' => 'Records Office Personnel',
                'description' => 'Performs QR transactions for assigned office/stage',
                'updated_at' => now(),
            ]);
        }
    }
};
