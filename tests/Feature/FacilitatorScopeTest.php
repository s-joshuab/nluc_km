<?php

namespace Tests\Feature;

use App\Models\Research;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FacilitatorScopeTest extends TestCase
{
    use DatabaseTransactions;

    private function makeUser(string $email, string $role, ?string $collegeCode = null): User
    {
        $roleId = DB::table('roles')->where('name', $role)->value('id');
        $user = User::create([
            'first_name' => 'Test', 'last_name' => $role, 'name' => "Test $role",
            'email' => $email, 'password' => Hash::make('password123'),
            'college_id' => $collegeCode ? DB::table('colleges')->where('code', $collegeCode)->value('id') : null,
            'is_active' => true,
        ]);
        DB::table('user_roles')->insert([
            'user_id' => $user->id, 'role_id' => $roleId,
            'created_at' => now(), 'updated_at' => now(),
        ]);
        return $user;
    }

    private function makeResearch(string $code, string $collegeCode): Research
    {
        return Research::create([
            'research_code' => $code, 'title' => "Title $code",
            'research_type_id' => DB::table('research_types')->value('id'),
            'research_status_id' => DB::table('research_statuses')->value('id'),
            'college_id' => DB::table('colleges')->where('code', $collegeCode)->value('id'),
        ]);
    }

    public function test_facilitator_sees_only_own_college_research(): void
    {
        $fac = $this->makeUser('t.facscope@x.test', 'Research & Publication Facilitator', 'CE');
        $own = $this->makeResearch('T-SCOPE-CE-1', 'CE');
        $other = $this->makeResearch('T-SCOPE-CIS-1', 'CIS');

        $res = $this->actingAs($fac)->get('/repository');
        $res->assertOk();
        $this->assertStringContainsString('T-SCOPE-CE-1', $res->getContent());
        $this->assertStringNotContainsString('T-SCOPE-CIS-1', $res->getContent());

        $this->actingAs($fac)->get("/repository/{$own->id}")->assertOk();
        $this->actingAs($fac)->get("/repository/{$other->id}")->assertForbidden();
    }

    public function test_staff_sees_all_colleges(): void
    {
        $staff = $this->makeUser('t.staffscope@x.test', 'RPSU Staff');
        $this->makeResearch('T-SCOPE-CE-2', 'CE');
        $this->makeResearch('T-SCOPE-CIS-2', 'CIS');
        $res = $this->actingAs($staff)->get('/repository');
        $res->assertOk();
        $this->assertStringContainsString('T-SCOPE-CE-2', $res->getContent());
        $this->assertStringContainsString('T-SCOPE-CIS-2', $res->getContent());
    }

    public function test_facilitator_blocked_from_endorsements_and_reports(): void
    {
        $fac = $this->makeUser('t.facblock@x.test', 'Research & Publication Facilitator', 'CE');
        $this->actingAs($fac)->get('/endorsements')->assertForbidden();
        $this->actingAs($fac)->get('/reports')->assertForbidden();
        $endId = DB::table('endorsements')->value('id');
        $this->actingAs($fac)->post("/endorsements/{$endId}/status", ['status' => 'Under Processing'])->assertForbidden();
    }

    public function test_facilitator_cannot_create_research_for_other_college(): void
    {
        $fac = $this->makeUser('t.faccreate@x.test', 'Research & Publication Facilitator', 'CE');
        $ce = DB::table('colleges')->where('code', 'CE')->value('id');
        $cis = DB::table('colleges')->where('code', 'CIS')->value('id');
        $type = DB::table('research_types')->value('id');
        $status = DB::table('research_statuses')->value('id');

        $this->actingAs($fac)->post('/research', [
            'research_code' => 'T-FAC-OWN-1', 'title' => 'Own college',
            'research_type_id' => $type, 'research_status_id' => $status, 'college_id' => $ce,
        ])->assertRedirect();
        $this->assertDatabaseHas('researches', ['research_code' => 'T-FAC-OWN-1']);

        $this->actingAs($fac)->post('/research', [
            'research_code' => 'T-FAC-OTHER-1', 'title' => 'Other college',
            'research_type_id' => $type, 'research_status_id' => $status, 'college_id' => $cis,
        ])->assertForbidden();
        $this->assertDatabaseMissing('researches', ['research_code' => 'T-FAC-OTHER-1']);
    }

    public function test_researcher_cannot_view_others_endorsement(): void
    {
        $res = $this->makeUser('t.resview@x.test', 'Researcher');
        $endId = DB::table('endorsements')->where('researcher_id', '!=', $res->id)->value('id');
        $this->assertNotNull($endId);
        $this->actingAs($res)->get("/endorsements/{$endId}")->assertForbidden();
    }

    public function test_facilitator_cannot_download_other_college_file(): void
    {
        $fac = $this->makeUser('t.facdl@x.test', 'Research & Publication Facilitator', 'CE');
        $other = $this->makeResearch('T-SCOPE-CIS-9', 'CIS');
        $fileId = DB::table('research_files')->insertGetId([
            'research_id' => $other->id,
            'file_type_id' => DB::table('file_types')->value('id'),
            'original_name' => 'test.pdf', 'stored_name' => 'test.pdf',
            'storage_path' => 'research-files/missing.pdf',
            'access_level_id' => DB::table('access_levels')->value('id'),
            'version' => '1.0', 'created_at' => now(), 'updated_at' => now(),
        ]);
        // Out-of-scope file: 403 fires before the missing-file check
        $this->actingAs($fac)->get("/research-files/{$fileId}/download")->assertForbidden();
    }
}
