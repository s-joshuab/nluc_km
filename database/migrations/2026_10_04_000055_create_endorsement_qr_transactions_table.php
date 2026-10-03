<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('endorsement_qr_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('endorsement_id')->constrained('endorsements')->cascadeOnDelete();
            $table->foreignId('transaction_type_id')->constrained('qr_transaction_types');
            $table->string('reference_number');
            $table->date('transaction_date');
            $table->time('transaction_time')->nullable();
            $table->foreignId('performed_by')->constrained('users');
            $table->foreignId('office_id')->constrained('offices');
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->index('endorsement_id');
            $table->index('transaction_type_id');
            $table->index('performed_by');
            $table->index('office_id');
        });
    }
    public function down(): void { Schema::dropIfExists('endorsement_qr_transactions'); }
};
