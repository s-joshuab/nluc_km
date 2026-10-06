<?php
namespace App\Policies;
use App\Models\Research;
use App\Models\User;
class ResearchPolicy {
    public function viewAny(User $u): bool { return true; }
    public function view(User $u, Research $r): bool { return true; }
    public function create(User $u): bool { return $u->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']); }
    public function update(User $u, Research $r): bool {
        if ($u->isAdmin() || $u->isStaff()) return true;
        if ($u->hasRole('Research & Publication Facilitator')) {
            return $u->college_id && (int)$r->college_id === (int)$u->college_id;
        }
        return false;
    }
    public function delete(User $u, Research $r): bool { return $u->isAdmin(); }
}
