<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('endorsement_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('endorsement_id')->constrained('endorsements')->cascadeOnDelete();
            $table->foreignId('previous_stage_id')->nullable()->constrained('workflow_stages')->nullOnDelete();
            $table->foreignId('new_stage_id')->constrained('workflow_stages');
            $table->foreignId('previous_status_id')->nullable()->constrained('workflow_statuses')->nullOnDelete();
            $table->foreignId('new_status_id')->constrained('workflow_statuses');
            $table->foreignId('changed_by')->constrained('users');
            $table->timestamp('changed_at')->useCurrent();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->index('endorsement_id');
        });
    }
    public function down(): void { Schema::dropIfExists('endorsement_status_histories'); }
};
