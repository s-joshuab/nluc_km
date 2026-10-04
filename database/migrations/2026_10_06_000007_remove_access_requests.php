<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * File access no longer requires requests: any logged-in user
     * may view/download files. Access request tables are dropped.
     */
    public function up(): void
    {
        Schema::dropIfExists('access_requests');
        Schema::dropIfExists('access_request_statuses');
    }

    public function down(): void
    {
        // Access requests are intentionally not restored.
    }
};
