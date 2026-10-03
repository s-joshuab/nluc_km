<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder {
    public function run(): void {
        $this->call([
            RoleSeeder::class,
            CollegeSeeder::class,
            OfficeSeeder::class,
            ResearchTypeSeeder::class,
            ResearchStatusSeeder::class,
            ResearchAreaSeeder::class,
            ResearchRoleSeeder::class,
            IpStatusSeeder::class,
            FileTypeSeeder::class,
            AccessLevelSeeder::class,
            CopyrightStatusSeeder::class,
            UsagePermissionSeeder::class,
            AccessRequestStatusSeeder::class,
            EndorsementTypeSeeder::class,
            WorkflowStageSeeder::class,
            WorkflowStatusSeeder::class,
            QrTransactionTypeSeeder::class,
            PublicationTypeSeeder::class,
            PublicationStatusSeeder::class,
            IecTypeSeeder::class,
            IecStatusSeeder::class,
            InnovationTypeSeeder::class,
            InnovationStatusSeeder::class,
            TechnologyStatusSeeder::class,
            CommercializationStatusSeeder::class,
            ResourceTypeSeeder::class,
            AdminUserSeeder::class,
            SampleDataSeeder::class,
        ]);
    }
}
