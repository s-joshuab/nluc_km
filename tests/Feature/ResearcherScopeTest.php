<?php

namespace Tests\Feature;

use App\Models\Research;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ResearcherScopeTest extends TestCase
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

    private function makeResearch(string $code, ?int $leadId = null): Research
    {
        return Research::create([
            'research_code' => $code, 'title' => "Title $code",
            'research_type_id' => DB::table('research_types')->value('id'),
            'research_status_id' => DB::table('research_statuses')->value('id'),
            'college_id' => DB::table('colleges')->value('id'),
            'lead_researcher_id' => $leadId,
        ]);
    }

    public function test_researcher_blocked_from_global_lists_and_search(): void
    {
        $res = $this->makeUser('t.rscope@x.test', 'Researcher');
        foreach (['/repository','/knowledge-resources','/publications','/iec-materials','/innovations','/technologies','/commercialization','/search?q=test'] as $url) {
            $this->actingAs($res)->get($url)->assertForbidden();
        }
    }

    public function test_researcher_sees_only_own_research_detail(): void
    {
        $res = $this->makeUser('t.rown@x.test', 'Researcher');
        $own = $this->makeResearch('T-OWN-1', $res->id);
        $other = $this->makeResearch('T-OWN-2', null);
        $this->actingAs($res)->get("/repository/{$own->id}")->assertOk();
        $this->actingAs($res)->get("/repository/{$other->id}")->assertForbidden();
        // Own listing still works
        $this->actingAs($res)->get('/my-research')->assertOk();
    }

    public function test_researcher_downloads_only_own_files(): void
    {
        Storage::fake('local');
        $res = $this->makeUser('t.rdl@x.test', 'Researcher');
        $own = $this->makeResearch('T-OWNF-1', $res->id);
        $other = $this->makeResearch('T-OWNF-2', null);
        $mk = fn($r) => DB::table('research_files')->insertGetId([
            'research_id' => $r->id,
            'file_type_id' => DB::table('file_types')->value('id'),
            'original_name' => 'f.pdf', 'stored_name' => 'f.pdf',
            'storage_path' => "t/{$r->id}.pdf",
            'access_level_id' => DB::table('access_levels')->value('id'),
            'version' => '1.0', 'created_at' => now(), 'updated_at' => now(),
        ]);
        $ownFile = $mk($own);
        $otherFile = $mk($other);
        Storage::disk('local')->put("t/{$own->id}.pdf", 'data');
        Storage::disk('local')->put("t/{$other->id}.pdf", 'data');

        $this->actingAs($res)->get("/research-files/{$ownFile}/download")->assertOk();
        $this->actingAs($res)->get("/research-files/{$otherFile}/download")->assertForbidden();
    }

    public function test_staff_still_sees_global_lists(): void
    {
        $staff = $this->makeUser('t.rstaff@x.test', 'RPSU Staff');
        foreach (['/repository','/knowledge-resources','/publications','/search?q=test'] as $url) {
            $this->actingAs($staff)->get($url)->assertOk();
        }
    }

    public function test_researcher_dashboard_shows_only_own_research(): void
    {
        $res = $this->makeUser('t.rdash@x.test', 'Researcher');
        $own = $this->makeResearch('T-DASH-OWN-1', $res->id);
        $other = $this->makeResearch('T-DASH-OTHER-1', null);
        $page = $this->actingAs($res)->get('/dashboard')->assertOk();
        $this->assertStringContainsString('T-DASH-OWN-1', $page->getContent());
        $this->assertStringNotContainsString('T-DASH-OTHER-1', $page->getContent());
    }
}
