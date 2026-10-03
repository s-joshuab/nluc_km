<?php
namespace App\Services;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class FileStorageService {
    public static function storeResearchFile(UploadedFile $file, string $researchCode): array {
        $dir = 'research-files/'.$researchCode;
        $stored = $file->hashName();
        $path = $file->storeAs($dir, $stored, 'local');
        return ['stored_name'=>$stored,'storage_path'=>$path,'mime_type'=>$file->getMimeType(),'file_size'=>$file->getSize(),'original_name'=>$file->getClientOriginalName()];
    }
    public static function storeGeneric(UploadedFile $file, string $dir): array {
        $stored = $file->hashName();
        $path = $file->storeAs($dir, $stored, 'local');
        return ['stored_name'=>$stored,'storage_path'=>$path,'mime_type'=>$file->getMimeType(),'file_size'=>$file->getSize(),'original_name'=>$file->getClientOriginalName()];
    }
}
