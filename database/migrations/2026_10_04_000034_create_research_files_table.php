<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('research_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id')->constrained('researches')->cascadeOnDelete();
            $table->foreignId('file_type_id')->constrained('file_types');
            $table->string('original_name');
            $table->string('stored_name');
            $table->string('storage_path');
            $table->string('mime_type')->nullable();
            $table->bigInteger('file_size')->default(0);
            $table->foreignId('access_level_id')->constrained('access_levels');
            $table->foreignId('copyright_status_id')->nullable()->constrained('copyright_statuses')->nullOnDelete();
            $table->foreignId('usage_permission_id')->nullable()->constrained('usage_permissions')->nullOnDelete();
            $table->string('version')->default('1.0');
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('research_id');
            $table->index('file_type_id');
            $table->index('access_level_id');
        });
    }
    public function down(): void { Schema::dropIfExists('research_files'); }
};
