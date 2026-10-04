<?php
namespace App\Http\Controllers;
use App\Http\Requests\StoreResearchFileRequest;
use App\Models\Research;
use App\Models\ResearchFile;
use App\Services\ActivityLogService;
use App\Services\FileStorageService;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
class ResearchFileController extends Controller {
    public function store(StoreResearchFileRequest $req, Research $research) {
        $meta = FileStorageService::storeResearchFile($req->file('file'), $research->research_code);
        $f = ResearchFile::create(array_merge($req->only(['file_type_id','access_level_id','copyright_status_id','usage_permission_id','version','remarks']), $meta, ['research_id'=>$research->id,'uploaded_by'=>auth()->id()]));
        ActivityLogService::log('Uploaded file','research-files','ResearchFile',$f->id,$research->research_code.' / '.$f->original_name);
        return back()->with('success','File uploaded.');
    }
    public function destroy(ResearchFile $file) {
        $this->authorize('update', $file->research);
        $file->delete();
        ActivityLogService::log('Deleted file','research-files','ResearchFile',$file->id,$file->original_name);
        return back()->with('success','File archived.');
    }
    public function download(ResearchFile $file) {
        // Any logged-in user may view/download files (no access requests).
        // Guests are blocked by the auth middleware.
        ActivityLogService::log('Downloaded file','research-files','ResearchFile',$file->id,$file->original_name);
        if (!Storage::disk('local')->exists($file->storage_path)) abort(404, 'File missing on disk.');
        return Storage::disk('local')->download($file->storage_path, $file->original_name);
    }
}
