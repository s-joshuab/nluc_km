<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreInnovationRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['research_id'=>'nullable|exists:researches,id','title'=>'required|string|max:500','description'=>'nullable|string',
        'innovation_type_id'=>'required|exists:innovation_types,id','innovation_status_id'=>'required|exists:innovation_statuses,id',
        'college_id'=>'nullable|exists:colleges,id','lead_innovator_id'=>'nullable|exists:users,id','development_date'=>'nullable|date',
        'ip_status_id'=>'nullable|exists:ip_statuses,id','remarks'=>'nullable|string'];
    }
}
