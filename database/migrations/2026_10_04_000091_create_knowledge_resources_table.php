<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('knowledge_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('resource_type_id')->constrained('resource_types');
            $table->foreignId('college_id')->nullable()->constrained('colleges')->nullOnDelete();
            $table->string('file_path')->nullable();
            $table->string('external_url')->nullable();
            $table->foreignId('access_level_id')->constrained('access_levels');
            $table->string('version')->default('1.0');
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('resource_type_id');
            $table->index('college_id');
            $table->index('access_level_id');
        });
    }
    public function down(): void { Schema::dropIfExists('knowledge_resources'); }
};
