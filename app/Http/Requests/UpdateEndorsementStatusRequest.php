<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class UpdateEndorsementStatusRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff']) ?? false; }
    public function rules(): array {
        return ['status'=>'required|string|in:Received by RPSU,Under Processing,For Review,For Release,Forwarded / Endorsed to RECI,Completed / Closed','remarks'=>'nullable|string','action_taken'=>'nullable|string|max:2000'];
    }
}
