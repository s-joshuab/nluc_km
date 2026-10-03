<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreAccessRequest extends FormRequest {
    public function authorize(): bool { return (bool) $this->user(); }
    public function rules(): array {
        return ['research_file_id'=>'required|exists:research_files,id','reason'=>'required|string|max:2000'];
    }
}
