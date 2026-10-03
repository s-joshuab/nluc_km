<?php
namespace App\Policies;
use App\Models\Endorsement;
use App\Models\User;
class EndorsementPolicy {
    public function viewAny(User $u): bool { return true; }
    public function view(User $u, Endorsement $e): bool {
        if ($u->isAdmin() || $u->hasAnyRole(['RPSU Staff','Research & Publication Facilitator'])) return true;
        if ($u->canDoQrReceived() || $u->canDoQrRelease()) return true;
        return $e->researcher_id === $u->id;
    }
    public function create(User $u): bool { return true; }
    public function update(User $u, Endorsement $e): bool { return $u->isAdmin() || $u->hasAnyRole(['RPSU Staff','Research & Publication Facilitator']); }
    public function qrReceived(User $u): bool { return $u->canDoQrReceived(); }
    public function qrRelease(User $u): bool { return $u->canDoQrRelease(); }
}
