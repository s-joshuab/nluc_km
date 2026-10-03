<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreKnowledgeResourceRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['title'=>'required|string|max:500','description'=>'nullable|string','resource_type_id'=>'required|exists:resource_types,id',
        'college_id'=>'nullable|exists:colleges,id','external_url'=>'nullable|string|max:500','access_level_id'=>'required|exists:access_levels,id',
        'version'=>'nullable|string|max:20','remarks'=>'nullable|string','file'=>'nullable|file|max:51200'];
    }
}
