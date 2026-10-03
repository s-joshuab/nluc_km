<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreResearchFileRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['file'=>'required|file|max:51200','file_type_id'=>'required|exists:file_types,id',
        'access_level_id'=>'required|exists:access_levels,id','copyright_status_id'=>'nullable|exists:copyright_statuses,id',
        'usage_permission_id'=>'nullable|exists:usage_permissions,id','version'=>'nullable|string|max:20','remarks'=>'nullable|string'];
    }
}
