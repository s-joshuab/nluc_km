<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class AdminUserSeeder extends Seeder {
    public function run(): void {
        $roleId = fn($n) => DB::table('roles')->where('name',$n)->value('id');
        $officeId = fn($c) => DB::table('offices')->where('code',$c)->value('id');
        $collegeId = fn($c) => DB::table('colleges')->where('code',$c)->value('id');
        $users = [
            ['email'=>'admin@nluc.dmmmsu.edu.ph','first_name'=>'RPSU','last_name'=>'Administrator','employee_number'=>'NLUC-ADMIN-001','role'=>'RPSU Administrator','office'=>'RPSU','college'=>'CIS'],
            ['email'=>'staff@nluc.dmmmsu.edu.ph','first_name'=>'RPSU','last_name'=>'Staff','employee_number'=>'NLUC-STAFF-001','role'=>'RPSU Staff','office'=>'RPSU','college'=>null],
            ['email'=>'facilitator@nluc.dmmmsu.edu.ph','first_name'=>'Research','last_name'=>'Facilitator','employee_number'=>'NLUC-FAC-001','role'=>'Research & Publication Facilitator','office'=>'RPSU','college'=>'CED'],
            ['email'=>'researcher@nluc.dmmmsu.edu.ph','first_name'=>'Juan','last_name'=>'Researcher','employee_number'=>'NLUC-RES-001','role'=>'Researcher','office'=>null,'college'=>'CA'],
        ];
        foreach ($users as $u) {
            $user = User::updateOrCreate(['email'=>$u['email']], [
                'first_name'=>$u['first_name'],'last_name'=>$u['last_name'],
                'name'=>$u['first_name'].' '.$u['last_name'],
                'employee_number'=>$u['employee_number'],
                'password'=>Hash::make('password123'),
                'college_id'=>$u['college']?$collegeId($u['college']):null,
                'is_active'=>true,'email_verified_at'=>now(),
            ]);
            $rid = $roleId($u['role']);
            if ($rid) DB::table('user_roles')->updateOrInsert(['user_id'=>$user->id,'role_id'=>$rid],['created_at'=>now(),'updated_at'=>now()]);
            if ($u['office']) {
                $oid = $officeId($u['office']);
                if ($oid) {
                    DB::table('user_offices')->where('user_id',$user->id)->where('is_primary',true)->update(['is_primary'=>false]);
                    DB::table('user_offices')->updateOrInsert(['user_id'=>$user->id,'office_id'=>$oid],['is_primary'=>true,'assigned_from'=>now()->toDateString(),'created_at'=>now(),'updated_at'=>now()]);
                }
            }
        }
    }
}
