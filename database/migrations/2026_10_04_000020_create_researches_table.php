<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('researches', function (Blueprint $table) {
            $table->id();
            $table->string('research_code')->unique();
            $table->string('title');
            $table->longText('abstract')->nullable();
            $table->text('keywords')->nullable();
            $table->foreignId('research_type_id')->constrained('research_types');
            $table->foreignId('research_status_id')->constrained('research_statuses');
            $table->foreignId('research_area_id')->nullable()->constrained('research_areas')->nullOnDelete();
            $table->foreignId('college_id')->nullable()->constrained('colleges')->nullOnDelete();
            $table->foreignId('lead_researcher_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('funding_source')->nullable();
            $table->decimal('funding_amount', 15, 2)->nullable();
            $table->string('sdg_alignment')->nullable();
            $table->foreignId('ip_status_id')->nullable()->constrained('ip_statuses')->nullOnDelete();
            $table->date('date_submitted')->nullable();
            $table->date('date_completed')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('research_code');
            $table->index('title');
            $table->index('college_id');
            $table->index('research_type_id');
            $table->index('research_status_id');
            $table->index('research_area_id');
            $table->index('lead_researcher_id');
        });
    }
    public function down(): void { Schema::dropIfExists('researches'); }
};
