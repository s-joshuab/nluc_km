<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('endorsement_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('endorsement_id')->constrained('endorsements')->cascadeOnDelete();
            $table->string('original_name');
            $table->string('stored_name');
            $table->string('storage_path');
            $table->string('mime_type')->nullable();
            $table->bigInteger('file_size')->default(0);
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->index('endorsement_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('endorsement_documents');
    }
};
