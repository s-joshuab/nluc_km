<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreIecMaterialRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        return ['research_id'=>'nullable|exists:researches,id','title'=>'required|string|max:500','description'=>'nullable|string',
        'iec_type_id'=>'required|exists:iec_types,id','iec_status_id'=>'required|exists:iec_statuses,id','college_id'=>'nullable|exists:colleges,id',
        'target_audience'=>'nullable|string|max:255','development_date'=>'nullable|date','approval_date'=>'nullable|date','release_date'=>'nullable|date',
        'remarks'=>'nullable|string','file'=>'nullable|file|max:102400'];
    }
}
