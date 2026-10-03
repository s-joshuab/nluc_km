<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreEndorsementRequest extends FormRequest {
    public function authorize(): bool { return (bool) $this->user(); }
    public function rules(): array {
        return ['tracking_number'=>'nullable|string|max:50|unique:endorsements,tracking_number','research_id'=>'nullable|exists:researches,id',
        'document_title'=>'required|string|max:500','endorsement_type_id'=>'required|exists:endorsement_types,id',
        'researcher_id'=>'nullable|exists:users,id','remarks'=>'nullable|string'];
    }
}
