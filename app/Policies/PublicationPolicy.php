<?php
namespace App\Policies;
use App\Models\Publication;
use App\Models\User;
class PublicationPolicy {
    public function viewAny(User $u): bool { return true; }
    public function manage(User $u): bool { return $u->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']); }
}
