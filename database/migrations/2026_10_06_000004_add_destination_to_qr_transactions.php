<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('endorsement_qr_transactions', function (Blueprint $table) {
            $table->string('destination')->nullable()->after('office_id');
        });
    }

    public function down(): void
    {
        Schema::table('endorsement_qr_transactions', function (Blueprint $table) {
            $table->dropColumn('destination');
        });
    }
};
