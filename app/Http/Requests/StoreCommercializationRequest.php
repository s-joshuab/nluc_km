<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreCommercializationRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['technology_id'=>'required|exists:technologies,id','status_id'=>'required|exists:commercialization_statuses,id',
        'potential_partner'=>'nullable|string|max:255','industry'=>'nullable|string|max:255','agreement_reference'=>'nullable|string|max:255',
        'license_information'=>'nullable|string','date_started'=>'nullable|date','date_commercialized'=>'nullable|date',
        'revenue_value'=>'nullable|numeric|min:0','remarks'=>'nullable|string'];
    }
}
