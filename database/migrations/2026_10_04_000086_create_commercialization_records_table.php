<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('commercialization_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('technology_id')->constrained('technologies')->cascadeOnDelete();
            $table->foreignId('status_id')->constrained('commercialization_statuses');
            $table->string('potential_partner')->nullable();
            $table->string('industry')->nullable();
            $table->string('agreement_reference')->nullable();
            $table->text('license_information')->nullable();
            $table->date('date_started')->nullable();
            $table->date('date_commercialized')->nullable();
            $table->decimal('revenue_value', 15, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index('technology_id');
            $table->index('status_id');
        });
    }
    public function down(): void { Schema::dropIfExists('commercialization_records'); }
};
