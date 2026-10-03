<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('access_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_file_id')->constrained('research_files')->cascadeOnDelete();
            $table->foreignId('requested_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('status_id')->constrained('access_request_statuses');
            $table->text('reason')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->index('research_file_id');
            $table->index('requested_by');
            $table->index('status_id');
        });
    }
    public function down(): void { Schema::dropIfExists('access_requests'); }
};
