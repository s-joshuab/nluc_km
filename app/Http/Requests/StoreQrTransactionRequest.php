<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StoreQrTransactionRequest extends FormRequest {
    public function authorize(): bool { return (bool) $this->user(); }
    public function rules(): array {
        return ['reference_number'=>'required|string|max:100','transaction_date'=>'nullable|date','transaction_time'=>'nullable','office_id'=>'nullable|exists:offices,id','remarks'=>'nullable|string'];
    }
}
