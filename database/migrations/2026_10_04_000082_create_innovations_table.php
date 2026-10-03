<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('innovations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id')->nullable()->constrained('researches')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('innovation_type_id')->constrained('innovation_types');
            $table->foreignId('innovation_status_id')->constrained('innovation_statuses');
            $table->foreignId('college_id')->nullable()->constrained('colleges')->nullOnDelete();
            $table->foreignId('lead_innovator_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('development_date')->nullable();
            $table->foreignId('ip_status_id')->nullable()->constrained('ip_statuses')->nullOnDelete();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('research_id');
            $table->index('innovation_status_id');
            $table->index('college_id');
        });
    }
    public function down(): void { Schema::dropIfExists('innovations'); }
};
