<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name')->nullable()->after('id');
                $table->string('middle_name')->nullable()->after('first_name');
                $table->string('last_name')->nullable()->after('middle_name');
                $table->string('suffix')->nullable()->after('last_name');
                $table->string('employee_number')->nullable()->unique()->after('email');
                $table->foreignId('college_id')->nullable()->after('employee_number')->constrained('colleges')->nullOnDelete();
                $table->boolean('is_active')->default(true)->after('college_id');
            }
        });
    }
    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('college_id');
            $table->dropColumn(['first_name','middle_name','last_name','suffix','employee_number','is_active']);
        });
    }
};
