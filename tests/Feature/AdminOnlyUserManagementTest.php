<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminOnlyUserManagementTest extends TestCase
{
    use DatabaseTransactions;

    private function makeUser(string $email, string $role): User
    {
        $roleId = DB::table('roles')->where('name', $role)->value('id');
        $user = User::create([
            'first_name' => 'Test', 'last_name' => $role, 'name' => "Test $role",
            'email' => $email, 'password' => Hash::make('password123'),
            'is_active' => true,
        ]);
        DB::table('user_roles')->insert([
            'user_id' => $user->id, 'role_id' => $roleId,
            'created_at' => now(), 'updated_at' => now(),
        ]);
        return $user;
    }

    private function payload(string $email): array
    {
        $staffId = DB::table('roles')->where('name', 'RPSU Staff')->value('id');
        return [
            'first_name' => 'New', 'last_name' => 'User', 'email' => $email,
            'password' => 'password123', 'roles' => [$staffId], 'offices' => [],
        ];
    }

    public function test_guest_is_redirected_to_login(): void
    {
        $this->get('/users')->assertRedirect('/login');
    }

    public function test_staff_cannot_view_or_create_users(): void
    {
        $staff = $this->makeUser('t.staff@x.test', 'RPSU Staff');
        $this->actingAs($staff)->get('/users')->assertForbidden();
        $this->actingAs($staff)->post('/users', $this->payload('t.new1@x.test'))->assertForbidden();
        $this->assertDatabaseMissing('users', ['email' => 't.new1@x.test']);
    }

    public function test_facilitator_and_researcher_cannot_create_users(): void
    {
        $fac = $this->makeUser('t.fac@x.test', 'Research & Publication Facilitator');
        $res = $this->makeUser('t.res@x.test', 'Researcher');
        $this->actingAs($fac)->post('/users', $this->payload('t.new2@x.test'))->assertForbidden();
        $this->actingAs($res)->post('/users', $this->payload('t.new3@x.test'))->assertForbidden();
        $this->actingAs($res)->get('/users/create')->assertForbidden();
    }

    public function test_admin_can_view_and_create_users(): void
    {
        $admin = $this->makeUser('t.admin@x.test', 'RPSU Administrator');
        $this->actingAs($admin)->get('/users')->assertOk();
        $this->actingAs($admin)->get('/users/create')->assertOk();
        $this->actingAs($admin)->post('/users', $this->payload('t.new4@x.test'))->assertRedirect('/users');
        $this->assertDatabaseHas('users', ['email' => 't.new4@x.test']);
    }

    public function test_only_admin_can_access_lookup_admin_pages(): void
    {
        $staff = $this->makeUser('t.staff2@x.test', 'RPSU Staff');
        $admin = $this->makeUser('t.admin2@x.test', 'RPSU Administrator');
        foreach (['/roles', '/offices', '/colleges'] as $url) {
            $this->actingAs($staff)->get($url)->assertForbidden();
            $this->actingAs($admin)->get($url)->assertOk();
        }
    }

    public function test_reports_hub_renders_all_tabs(): void
    {
        $admin = $this->makeUser('t.admin3@x.test', 'RPSU Administrator');
        $staff = $this->makeUser('t.staff3@x.test', 'RPSU Staff');
        foreach (['research','publications','iec','innovations','commercialization','endorsements'] as $tab) {
            $this->actingAs($admin)->get("/reports?tab={$tab}")->assertOk();
        }
        $this->actingAs($staff)->get('/reports')->assertOk();
        $this->actingAs($staff)->get('/reports/research')->assertRedirect('/reports?tab=research');
    }

    public function test_any_user_can_view_and_update_own_profile(): void
    {
        $res = $this->makeUser('t.prof@x.test', 'Researcher');
        $this->actingAs($res)->get('/profile')->assertOk();
        $this->actingAs($res)->put('/profile', [
            'first_name' => 'Updated', 'last_name' => 'Name', 'email' => 't.prof@x.test',
        ])->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 't.prof@x.test', 'first_name' => 'Updated']);
        auth()->logout();
        $this->get('/profile')->assertRedirect('/login');
    }
}
