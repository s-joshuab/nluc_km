<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class User extends Authenticatable {
    use HasFactory, Notifiable;
    protected $fillable = ['first_name','middle_name','last_name','suffix','name','email','employee_number','password','college_id','is_active'];
    protected $hidden = ['password','remember_token'];
    protected function casts(): array {
        return ['email_verified_at'=>'datetime','password'=>'hashed','is_active'=>'boolean'];
    }
    public function college() { return $this->belongsTo(College::class); }
    public function roles() { return $this->belongsToMany(Role::class, 'user_roles'); }
    public function offices() { return $this->belongsToMany(Office::class, 'user_offices')->withPivot(['is_primary','assigned_from','assigned_until']); }
    public function userRoles() { return $this->hasMany(UserRole::class); }
    public function userOffices() { return $this->hasMany(UserOffice::class); }
    public function primaryOffice() { return $this->hasOne(UserOffice::class)->where('is_primary', true); }
    public function researches() { return $this->belongsToMany(Research::class, 'research_researcher')->withPivot('research_role_id')->withTimestamps(); }
    public function ledResearches() { return $this->hasMany(Research::class, 'lead_researcher_id'); }
    public function endorsements() { return $this->hasMany(Endorsement::class, 'researcher_id'); }
    public function appNotifications() { return $this->hasMany(AppNotification::class, 'user_id'); }
    public function activityLogs() { return $this->hasMany(ActivityLog::class); }
    public function bookmarks() { return $this->hasMany(Bookmark::class); }
    public function fullName(): string {
        $parts = array_filter([$this->first_name, $this->middle_name, $this->last_name, $this->suffix]);
        return $parts ? implode(' ', $parts) : ($this->name ?? $this->email);
    }
    public function hasRole(string $roleName): bool {
        return $this->roles()->where('name', $roleName)->exists();
    }
    public function hasAnyRole(array $names): bool {
        return $this->roles()->whereIn('name', $names)->exists();
    }
    public function inOffice(string $officeCode): bool {
        return $this->offices()->where('code', $officeCode)->exists();
    }
    public function inAnyOffice(array $codes): bool {
        return $this->offices()->whereIn('code', $codes)->exists();
    }
    public function isAdmin(): bool { return $this->hasRole('RPSU Administrator'); }
    public function isStaff(): bool { return $this->hasRole('RPSU Staff'); }
    /**
     * Facilitators are strictly scoped to their assigned college.
     * Broader roles (admin/staff) always win over the facilitator scope.
     */
    public function isScopedFacilitator(): bool {
        return $this->hasRole('Research & Publication Facilitator') && !$this->isAdmin() && !$this->isStaff();
    }
    public function scopeCollegeId(): ?int {
        return $this->isScopedFacilitator() ? $this->college_id : null;
    }
    /**
     * Pure researchers see only their own records — no global lists.
     * Broader roles always win over the researcher restriction.
     */
    public function isResearcherOnly(): bool {
        return $this->hasRole('Researcher') && !$this->isAdmin() && !$this->isStaff()
            && !$this->hasRole('Research & Publication Facilitator');
    }
    public function ownsResearch(int $researchId): bool {
        if ($this->isAdmin() || $this->isStaff()) return true;
        return $this->ledResearches()->where('researches.id', $researchId)->exists()
            || $this->researches()->where('researches.id', $researchId)->exists();
    }
}
