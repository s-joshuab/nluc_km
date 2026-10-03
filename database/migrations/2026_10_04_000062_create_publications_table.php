<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id')->nullable()->constrained('researches')->nullOnDelete();
            $table->string('title');
            $table->foreignId('publication_type_id')->constrained('publication_types');
            $table->foreignId('publication_status_id')->constrained('publication_statuses');
            $table->string('journal')->nullable();
            $table->string('publisher')->nullable();
            $table->date('publication_date')->nullable();
            $table->string('doi')->nullable();
            $table->string('url')->nullable();
            $table->longText('abstract')->nullable();
            $table->text('keywords')->nullable();
            $table->string('file_path')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('research_id');
            $table->index('publication_status_id');
            $table->index('publication_type_id');
        });
    }
    public function down(): void { Schema::dropIfExists('publications'); }
};
