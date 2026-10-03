<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreTechnologyRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['innovation_id'=>'required|exists:innovations,id','title'=>'required|string|max:500','description'=>'nullable|string',
        'technology_status_id'=>'required|exists:technology_statuses,id','technology_readiness_level'=>'nullable|string|max:50',
        'ip_reference'=>'nullable|string|max:255','development_date'=>'nullable|date','remarks'=>'nullable|string'];
    }
}
