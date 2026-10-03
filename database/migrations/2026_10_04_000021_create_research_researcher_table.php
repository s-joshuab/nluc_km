<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('research_researcher', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id')->constrained('researches')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('research_role_id')->constrained('research_roles');
            $table->timestamps();
            $table->unique(['research_id','user_id']);
            $table->index('research_id');
            $table->index('user_id');
        });
    }
    public function down(): void { Schema::dropIfExists('research_researcher'); }
};
