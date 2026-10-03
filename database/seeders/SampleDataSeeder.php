<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Research;
use App\Models\Endorsement;
use App\Models\EndorsementStatusHistory;
use App\Models\EndorsementQrTransaction;
use App\Models\AppNotification;
use App\Models\ActivityLog;
class SampleDataSeeder extends Seeder {
    public function run(): void {
        $typeId = fn($n)=>DB::table('research_types')->where('name',$n)->value('id');
        $statusId = fn($n)=>DB::table('research_statuses')->where('name',$n)->value('id');
        $areaId = fn($n)=>DB::table('research_areas')->where('name',$n)->value('id');
        $ipId = fn($n)=>DB::table('ip_statuses')->where('name',$n)->value('id');
        $college = fn($c)=>DB::table('colleges')->where('code',$c)->value('id');
        $rrole = fn($n)=>DB::table('research_roles')->where('name',$n)->value('id');
        $admin = User::where('email','admin@nluc.dmmmsu.edu.ph')->first();
        $researcher = User::where('email','researcher@nluc.dmmmsu.edu.ph')->first();
        $fac = User::where('email','facilitator@nluc.dmmmsu.edu.ph')->first();
        if (!$researcher) return;
        $samples = [
            ['code'=>'NLUC-2024-001','title'=>'Smart Irrigation System for Rice Farms in La Union','college'=>'CABE','type'=>'Applied Research','status'=>'Ongoing','area'=>'Engineering','sdg'=>'SDG 2: Zero Hunger','funding'=>'DMMMSU GAA','amount'=>250000],
            ['code'=>'NLUC-2024-002','title'=>'Learning Analytics Dashboard for College of Information Systems','college'=>'CIS','type'=>'Institutional Research','status'=>'Completed','area'=>'ICT and Information Systems','sdg'=>'SDG 4: Quality Education','funding'=>'NLUC R&E Fund','amount'=>120000],
            ['code'=>'NLUC-2023-003','title'=>'Organic Fertilizer from Farm Waste: Agribusiness Viability','college'=>'CABM','type'=>'Applied Research','status'=>'Published','area'=>'Agriculture','sdg'=>'SDG 12: Responsible Consumption','funding'=>'DA Grant','amount'=>300000],
            ['code'=>'NLUC-2024-004','title'=>'Mangrove Rehabilitation in Bauang: Environmental Assessment','college'=>'CES','type'=>'Basic Research','status'=>'Ongoing','area'=>'Environment','sdg'=>'SDG 13: Climate Action','funding'=>'DENR Grant','amount'=>180000],
            ['code'=>'NLUC-2023-005','title'=>'Veterinary Health Practices Among Backyard Farmers','college'=>'CVM','type'=>'Applied Research','status'=>'Completed','area'=>'Agriculture','sdg'=>'SDG 3: Good Health','funding'=>'DMMMSU GAA','amount'=>95000],
        ];
        foreach ($samples as $s) {
            $r = Research::updateOrCreate(['research_code'=>$s['code']], [
                'title'=>$s['title'],'abstract'=>'Sample abstract for '.$s['title'].'. This record demonstrates the KM repository flow from creation to utilization.',
                'keywords'=>'NLUC, research, '.$s['college'],
                'research_type_id'=>$typeId($s['type']),'research_status_id'=>$statusId($s['status']),
                'research_area_id'=>$areaId($s['area']),'college_id'=>$college($s['college']),
                'lead_researcher_id'=>$researcher->id,'start_date'=>'2024-01-15','end_date'=>'2024-12-15',
                'funding_source'=>$s['funding'],'funding_amount'=>$s['amount'],'sdg_alignment'=>$s['sdg'],
                'ip_status_id'=>$ipId('Pending'),'date_submitted'=>'2024-01-20',
                'date_completed'=>$s['status']!=='Ongoing'?'2024-12-01':null,
                'remarks'=>'Seeded sample record.','created_by'=>$admin?->id,
            ]);
            DB::table('research_researcher')->updateOrInsert(['research_id'=>$r->id,'user_id'=>$researcher->id],['research_role_id'=>$rrole('Lead Researcher'),'created_at'=>now(),'updated_at'=>now()]);
            if ($fac) DB::table('research_researcher')->updateOrInsert(['research_id'=>$r->id,'user_id'=>$fac->id],['research_role_id'=>$rrole('Adviser'),'created_at'=>now(),'updated_at'=>now()]);
        }
        // Publications
        $pubType = DB::table('publication_types')->where('name','Journal Article')->value('id');
        $pubStatus = DB::table('publication_statuses')->where('name','Published')->value('id');
        $res = Research::where('research_code','NLUC-2023-003')->first();
        if ($res && $pubType && $pubStatus) {
            DB::table('publications')->updateOrInsert(['title'=>'Organic Fertilizer from Farm Waste (Journal Version)'],[
                'research_id'=>$res->id,'publication_type_id'=>$pubType,'publication_status_id'=>$pubStatus,
                'journal'=>'NLUC R&E Journal','publisher'=>'DMMMSU-NLUC RPSU','publication_date'=>'2024-06-01',
                'abstract'=>'Published version of agribusiness viability study.','keywords'=>'organic, fertilizer',
                'created_by'=>$admin?->id,'created_at'=>now(),'updated_at'=>now(),
            ]);
        }
        // IEC
        $iecType = DB::table('iec_types')->where('name','Brochure')->value('id');
        $iecStatus = DB::table('iec_statuses')->where('name','Released')->value('id');
        if ($res && $iecType && $iecStatus) {
            DB::table('iec_materials')->updateOrInsert(['title'=>'Organic Fertilizer Farmers Brochure'],[
                'research_id'=>$res->id,'description'=>'Farmer-friendly brochure.','iec_type_id'=>$iecType,'iec_status_id'=>$iecStatus,
                'college_id'=>$res->college_id,'target_audience'=>'Farmers','development_date'=>'2024-03-01','release_date'=>'2024-07-01',
                'created_by'=>$admin?->id,'created_at'=>now(),'updated_at'=>now(),
            ]);
        }
        // Innovation + Technology + Commercialization
        $innType = DB::table('innovation_types')->where('name','Prototype')->value('id');
        $innStatus = DB::table('innovation_statuses')->where('name','Prototype')->value('id');
        $techStatus = DB::table('technology_statuses')->where('name','Validated')->value('id');
        $commStatus = DB::table('commercialization_statuses')->where('name','For Commercialization')->value('id');
        $r1 = Research::where('research_code','NLUC-2024-001')->first();
        if ($r1 && $innType && $innStatus) {
            $innId = DB::table('innovations')->updateOrInsert(['title'=>'Low-Cost Soil Moisture Sensor Prototype'],[
                'research_id'=>$r1->id,'description'=>'Prototype sensor for smart irrigation.','innovation_type_id'=>$innType,
                'innovation_status_id'=>$innStatus,'college_id'=>$r1->college_id,'lead_innovator_id'=>$researcher->id,
                'development_date'=>'2024-05-01','ip_status_id'=>$ipId('Pending'),'created_by'=>$admin?->id,
                'created_at'=>now(),'updated_at'=>now(),
            ]);
            $inn = DB::table('innovations')->where('title','Low-Cost Soil Moisture Sensor Prototype')->first();
            if ($inn && $techStatus) {
                $techId = DB::table('technologies')->insertGetId(['innovation_id'=>$inn->id,'title'=>'Smart Irrigation Sensor Tech','description'=>'Field-ready sensor technology.','technology_status_id'=>$techStatus,'technology_readiness_level'=>'TRL 6','development_date'=>'2024-08-01','created_at'=>now(),'updated_at'=>now()]);
                if ($commStatus) DB::table('commercialization_records')->updateOrInsert(['technology_id'=>$techId],['status_id'=>$commStatus,'potential_partner'=>'La Union Agri Coop','industry'=>'Agriculture','date_started'=>'2024-09-01','remarks'=>'Seeded sample.','created_by'=>$admin?->id,'created_at'=>now(),'updated_at'=>now()]);
            }
        }
        // Knowledge resources
        $rt = DB::table('resource_types')->where('name','Templates')->value('id');
        $al = DB::table('access_levels')->where('name','Public')->value('id');
        if ($rt && $al) {
            DB::table('knowledge_resources')->updateOrInsert(['title'=>'RPSU Research Proposal Template'],[
                'description'=>'Official proposal template for NLUC researchers.','resource_type_id'=>$rt,
                'access_level_id'=>$al,'version'=>'2.0','uploaded_by'=>$admin?->id,'created_at'=>now(),'updated_at'=>now(),
            ]);
            DB::table('knowledge_resources')->updateOrInsert(['title'=>'Guide to Terminal Report Writing'],[
                'description'=>'Best practices guide.','resource_type_id'=>DB::table('resource_types')->where('name','Guidelines')->value('id'),
                'access_level_id'=>$al,'version'=>'1.0','uploaded_by'=>$admin?->id,'created_at'=>now(),'updated_at'=>now(),
            ]);
        }
        // Endorsement workflow samples demonstrating QR flow
        $etype = DB::table('endorsement_types')->where('name','Research Document Endorsement')->value('id');
        $stg = fn($c)=>DB::table('workflow_stages')->where('code',$c)->value('id');
        $sts = fn($n)=>DB::table('workflow_statuses')->where('name',$n)->value('id');
        $qrIn = DB::table('qr_transaction_types')->where('name','QR Received')->value('id');
        $qrOut = DB::table('qr_transaction_types')->where('name','QR Release')->value('id');
        // QR is manual at the records offices; RPSU staff encode the reference here.
        // Seeded QR rows use the RPSU Staff account as the encoder.
        $recorder = User::where('email','staff@nluc.dmmmsu.edu.ph')->first()
            ?? User::where('email','admin@nluc.dmmmsu.edu.ph')->first();
        $acadRecOffice = DB::table('offices')->where('code','ACAD-RECORDS')->value('id');
        $samples2 = [
            ['track'=>'NLUC-END-2024-0001','research_code'=>'NLUC-2024-002','stage'=>'STAGE-ACAD-REC','status'=>'QR Received','withQr'=>true],
            ['track'=>'NLUC-END-2024-0002','research_code'=>'NLUC-2024-001','stage'=>'STAGE-RPSU','status'=>'Under Processing','withQr'=>true],
            ['track'=>'NLUC-END-2024-0003','research_code'=>'NLUC-2023-005','stage'=>'STAGE-ACAD','status'=>'Endorsed / Submitted','withQr'=>false],
        ];
        foreach ($samples2 as $e) {
            $rr = Research::where('research_code',$e['research_code'])->first();
            if (!$rr) continue;
            $end = Endorsement::updateOrCreate(['tracking_number'=>$e['track']],[
                'research_id'=>$rr->id,'document_title'=>$rr->title,'researcher_id'=>$researcher->id,
                'endorsement_type_id'=>$etype,'current_stage_id'=>$stg($e['stage']),'current_status_id'=>$sts($e['status']),
                'date_submitted'=>now()->subDays(10)->toDateString(),'remarks'=>'Seeded endorsement.','created_by'=>$researcher->id,
            ]);
            EndorsementStatusHistory::updateOrCreate(['endorsement_id'=>$end->id,'new_status_id'=>$sts($e['status'])],[
                'previous_stage_id'=>null,'new_stage_id'=>$stg($e['stage']),'previous_status_id'=>null,
                'changed_by'=>$researcher->id,'changed_at'=>now()->subDays(10),'remarks'=>'Initial submission',
            ]);
            if ($e['withQr'] && $recorder && $qrIn) {
                EndorsementQrTransaction::updateOrCreate(['endorsement_id'=>$end->id,'transaction_type_id'=>$qrIn],[
                    'reference_number'=>'QR-RCV-'.substr($e['track'],-4),'transaction_date'=>now()->subDays(9)->toDateString(),
                    'transaction_time'=>now()->subDays(9)->format('H:i:s'),'performed_by'=>$recorder->id,
                    'office_id'=>$acadRecOffice,'remarks'=>'Seeded QR Received (encoded by RPSU staff)',
                ]);
            }
            ActivityLog::create(['user_id'=>$researcher->id,'action'=>'Created endorsement','module'=>'endorsements','record_type'=>'Endorsement','record_id'=>$end->id,'description'=>$e['track']]);
        }
    }
}
