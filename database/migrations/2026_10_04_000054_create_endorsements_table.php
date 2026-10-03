<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('endorsements', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique();
            $table->foreignId('research_id')->nullable()->constrained('researches')->nullOnDelete();
            $table->string('document_title');
            $table->foreignId('researcher_id')->constrained('users');
            $table->foreignId('endorsement_type_id')->constrained('endorsement_types');
            $table->foreignId('current_stage_id')->constrained('workflow_stages');
            $table->foreignId('current_status_id')->constrained('workflow_statuses');
            $table->date('date_submitted')->nullable();
            $table->date('date_received')->nullable();
            $table->date('date_forwarded')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index('tracking_number');
            $table->index('research_id');
            $table->index('current_stage_id');
            $table->index('current_status_id');
            $table->index('researcher_id');
        });
    }
    public function down(): void { Schema::dropIfExists('endorsements'); }
};
