<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class UpdateResearchRequest extends FormRequest {
    public function authorize(): bool { return $this->user()?->hasAnyRole(['RPSU Administrator','RPSU Staff','Research & Publication Facilitator']) ?? false; }
    public function rules(): array {
        $id = $this->route('research')?->id ?? $this->route('research');
        return ['research_code'=>"required|string|max:50|unique:researches,research_code,{$id}",'title'=>'required|string|max:500',
        'abstract'=>'nullable|string','keywords'=>'nullable|string','research_type_id'=>'required|exists:research_types,id',
        'research_status_id'=>'required|exists:research_statuses,id','research_area_id'=>'nullable|exists:research_areas,id',
        'college_id'=>'nullable|exists:colleges,id','lead_researcher_id'=>'nullable|exists:users,id',
        'start_date'=>'nullable|date','end_date'=>'nullable|date|after_or_equal:start_date',
        'funding_source'=>'nullable|string|max:255','funding_amount'=>'nullable|numeric|min:0',
        'sdg_alignment'=>'nullable|string|max:255','ip_status_id'=>'nullable|exists:ip_statuses,id',
        'date_submitted'=>'nullable|date','date_completed'=>'nullable|date','remarks'=>'nullable|string'];
    }
}
