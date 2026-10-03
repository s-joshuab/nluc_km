<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('iec_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id')->nullable()->constrained('researches')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('iec_type_id')->constrained('iec_types');
            $table->foreignId('iec_status_id')->constrained('iec_statuses');
            $table->foreignId('college_id')->nullable()->constrained('colleges')->nullOnDelete();
            $table->string('target_audience')->nullable();
            $table->date('development_date')->nullable();
            $table->date('approval_date')->nullable();
            $table->date('release_date')->nullable();
            $table->string('file_path')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('research_id');
            $table->index('iec_status_id');
            $table->index('iec_type_id');
            $table->index('college_id');
        });
    }
    public function down(): void { Schema::dropIfExists('iec_materials'); }
};
