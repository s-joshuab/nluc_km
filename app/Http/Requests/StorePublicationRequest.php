<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StorePublicationRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['research_id'=>'nullable|exists:researches,id','title'=>'required|string|max:500','publication_type_id'=>'required|exists:publication_types,id',
        'publication_status_id'=>'required|exists:publication_statuses,id','journal'=>'nullable|string|max:255','publisher'=>'nullable|string|max:255',
        'publication_date'=>'nullable|date','doi'=>'nullable|string|max:255','url'=>'nullable|string|max:500','abstract'=>'nullable|string','keywords'=>'nullable|string','remarks'=>'nullable|string','file'=>'nullable|file|max:51200'];
    }
}
