<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RoleSeeder extends Seeder {
    public function run(): void {
        $rows = [
            ['name'=>'RPSU Administrator','description'=>'Main system administrator. Manage users, facilitators, research records, files, access requests, metadata, publication/IEC/innovation records, system settings, and administrative functions.'],
            ['name'=>'RPSU Staff','description'=>'RPSU processing staff. Receive and process documents, update current file location and status, maintain status history and remarks, and assist in research-related processing.'],
            ['name'=>'Research & Publication Facilitator','description'=>'College/area facilitator. Assist with research-related activities and facilitate processes within assigned scope.'],
            ['name'=>'Researcher','description'=>'Research user. Search research, view authorized files, request access, download permitted files, view own research, submit/track own endorsements, and monitor current file location.'],
        ];
        foreach ($rows as $r) { DB::table('roles')->updateOrInsert(['name'=>$r['name']], array_merge($r,['created_at'=>now(),'updated_at'=>now()])); }
        // Remove any other roles that have no user assignments (keep exactly the 4 official roles)
        $allowed = array_column($rows, 'name');
        DB::table('roles')->whereNotIn('name', $allowed)
            ->whereNotExists(function ($q) {
                $q->select(DB::raw(1))->from('user_roles')->whereColumn('user_roles.role_id', 'roles.id');
            })->delete();
    }
}
