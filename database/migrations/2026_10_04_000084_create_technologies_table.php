<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('innovation_id')->constrained('innovations')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('technology_status_id')->constrained('technology_statuses');
            $table->string('technology_readiness_level')->nullable();
            $table->string('ip_reference')->nullable();
            $table->date('development_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->index('innovation_id');
            $table->index('technology_status_id');
        });
    }
    public function down(): void { Schema::dropIfExists('technologies'); }
};
