<?php
namespace App\Http\Controllers;
use App\Models\Bookmark;
use Illuminate\Http\Request;
class BookmarkController extends Controller {
    public function toggle(Request $req) {
        $req->validate(['research_id'=>'required|exists:researches,id']);
        $b = Bookmark::where('user_id', auth()->id())->where('research_id', $req->research_id)->first();
        if ($b) { $b->delete(); return back()->with('success','Bookmark removed.'); }
        Bookmark::create(['user_id'=>auth()->id(),'research_id'=>$req->research_id]);
        return back()->with('success','Bookmarked.');
    }
}
