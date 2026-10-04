<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PublicCatalogAccessTest extends TestCase
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

    public function test_guest_sees_public_preview(): void
    {
        $id = DB::table('researches')->whereNull('deleted_at')->value('id');
        $this->assertNotNull($id);
        $this->get('/catalog')->assertOk();
        $this->get("/catalog/{$id}")->assertOk();
    }

    public function test_logged_in_user_is_redirected_to_full_record(): void
    {
        $id = DB::table('researches')->whereNull('deleted_at')->value('id');
        $this->assertNotNull($id);
        $researcher = $this->makeUser('t.pub@x.test', 'Researcher');
        $this->actingAs($researcher)->get('/catalog')->assertRedirect('/repository');
        $this->actingAs($researcher)->get("/catalog/{$id}")->assertRedirect("/repository/{$id}");
        // Full record renders with files for logged-in users
        $this->actingAs($researcher)->get("/repository/{$id}")->assertOk();
    }
}
