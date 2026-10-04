<?php

namespace App\Http\Controllers;

use App\Models\IecMaterial;
use App\Models\Innovation;
use App\Models\Publication;
use App\Models\Research;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Base research query for PUBLIC pages.
     * Metadata + abstract only. Never includes files, funding,
     * remarks, or any user contact info.
     */
    private function baseQuery()
    {
        return Research::with([
            'type:id,name',
            'status:id,name',
            'college:id,code,name',
            'leadResearcher:id,first_name,last_name',
            'team.user:id,first_name,last_name',
            'team.role:id,name',
        ])->select([
            'id', 'research_code', 'title', 'abstract', 'keywords',
            'research_type_id', 'research_status_id', 'college_id',
            'lead_researcher_id', 'start_date', 'end_date',
            'sdg_alignment', 'date_submitted', 'date_completed',
        ]);
    }

    private function researcherIds()
    {
        $team = DB::table('research_researcher')->distinct()->pluck('user_id');
        $lead = Research::whereNotNull('lead_researcher_id')->distinct()->pluck('lead_researcher_id');
        return $team->merge($lead)->unique()->values();
    }

    public function landing()
    {
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        $stats = [
            'researches' => Research::count(),
            'publications' => Publication::count(),
            'innovations' => Innovation::count(),
            'researchers' => $this->researcherIds()->count(),
            'colleges' => DB::table('colleges')->where('is_active', true)->count(),
        ];

        $recent = $this->baseQuery()->orderByDesc('id')->limit(6)->get();

        $pubs = Publication::with(['type:id,name', 'status:id,name', 'research:id,research_code,title'])
            ->select(['id', 'research_id', 'title', 'publication_type_id', 'publication_status_id', 'journal', 'publisher', 'publication_date', 'doi'])
            ->orderByDesc('id')->limit(4)->get();

        $top = User::select(['id', 'first_name', 'last_name', 'college_id'])
            ->with('college:id,code,name')
            ->withCount('researches')
            ->whereIn('id', $this->researcherIds())
            ->orderByDesc('researches_count')->limit(6)->get();

        $ips = Innovation::with(['type:id,name', 'ipStatus:id,name', 'college:id,code,name'])
            ->select(['id', 'research_id', 'title', 'innovation_type_id', 'college_id', 'ip_status_id', 'development_date'])
            ->orderByDesc('id')->limit(4)->get();

        $copyrights = DB::table('research_files as f')
            ->join('copyright_statuses as c', 'c.id', '=', 'f.copyright_status_id')
            ->select('c.name', DB::raw('COUNT(f.id) as total'))
            ->whereNull('f.deleted_at')
            ->groupBy('c.name')->orderByDesc('total')->get();

        $colleges = DB::table('colleges as c')
            ->leftJoin('researches as r', function ($j) {
                $j->on('r.college_id', '=', 'c.id')->whereNull('r.deleted_at');
            })
            ->select('c.id', 'c.code', 'c.name', DB::raw('COUNT(r.id) as total'))
            ->where('c.is_active', true)
            ->groupBy('c.id', 'c.code', 'c.name')->orderBy('c.name')->get();

        return Inertia::render('Public/Landing', [
            'stats' => $stats,
            'recent' => $recent,
            'pubs' => $pubs,
            'topResearchers' => $top,
            'ipHighlights' => $ips,
            'copyrights' => $copyrights,
            'colleges' => $colleges,
        ]);
    }

    public function catalog(Request $req)
    {
        // Logged-in users get the full internal view (files + downloads)
        if (auth()->check()) {
            return redirect()->route('repository.index');
        }
        $q = $this->baseQuery()->orderByDesc('id');
        if ($s = $req->get('search')) {
            $q->where(function ($qq) use ($s) {
                $qq->where('title', 'like', "%$s%")
                    ->orWhere('research_code', 'like', "%$s%")
                    ->orWhere('keywords', 'like', "%$s%")
                    ->orWhere('abstract', 'like', "%$s%");
            });
        }
        if ($v = $req->get('college_id')) {
            $q->where('college_id', $v);
        }
        if ($v = $req->get('research_type_id')) {
            $q->where('research_type_id', $v);
        }
        if ($v = $req->get('year')) {
            $q->whereYear('date_submitted', $v);
        }

        $years = Research::selectRaw('DISTINCT YEAR(date_submitted) as y')
            ->whereNotNull('date_submitted')
            ->orderByDesc('y')->pluck('y');

        return Inertia::render('Public/Catalog', [
            'rows' => $q->paginate(12)->withQueryString(),
            'filters' => $req->only(['search', 'college_id', 'research_type_id', 'year']),
            'types' => DB::table('research_types')->orderBy('name')->get(),
            'colleges' => DB::table('colleges')->where('is_active', true)->orderBy('name')->get(),
            'years' => $years,
        ]);
    }

    public function show(Research $research)
    {
        // Logged-in users get the full internal view (files + downloads)
        if (auth()->check()) {
            return redirect()->route('repository.show', $research->id);
        }
        $item = $this->baseQuery()->findOrFail($research->id);

        $pubs = Publication::with(['type:id,name', 'status:id,name'])
            ->select(['id', 'research_id', 'title', 'publication_type_id', 'publication_status_id', 'journal', 'publisher', 'publication_date', 'doi', 'url'])
            ->where('research_id', $item->id)->get();

        $iec = IecMaterial::with(['type:id,name', 'status:id,name'])
            ->select(['id', 'research_id', 'title', 'description', 'iec_type_id', 'iec_status_id'])
            ->where('research_id', $item->id)->get();

        $inn = Innovation::with(['type:id,name', 'ipStatus:id,name'])
            ->select(['id', 'research_id', 'title', 'innovation_type_id', 'ip_status_id', 'development_date'])
            ->where('research_id', $item->id)->get();

        return Inertia::render('Public/ResearchShow', [
            'item' => $item,
            'pubs' => $pubs,
            'iec' => $iec,
            'innovations' => $inn,
        ]);
    }

    public function researchers(Request $req)
    {
        $ids = $this->researcherIds();
        $q = User::select(['id', 'first_name', 'last_name', 'college_id'])
            ->with('college:id,code,name')
            ->withCount('researches')
            ->whereIn('id', $ids);
        if ($s = $req->get('search')) {
            $q->where(function ($qq) use ($s) {
                $qq->where('first_name', 'like', "%$s%")->orWhere('last_name', 'like', "%$s%");
            });
        }
        if ($v = $req->get('college_id')) {
            $q->where('college_id', $v);
        }
        return Inertia::render('Public/Researchers', [
            'rows' => $q->orderByDesc('researches_count')->paginate(12)->withQueryString(),
            'filters' => $req->only(['search', 'college_id']),
            'colleges' => DB::table('colleges')->where('is_active', true)->orderBy('name')->get(),
        ]);
    }

    public function researcherShow(User $user)
    {
        if (!$this->researcherIds()->contains($user->id)) {
            abort(404);
        }
        $user->load('college:id,code,name');
        $rows = $this->baseQuery()
            ->where(function ($q) use ($user) {
                $q->where('lead_researcher_id', $user->id)
                    ->orWhereHas('team', function ($qq) use ($user) {
                        $qq->where('user_id', $user->id);
                    });
            })
            ->orderByDesc('id')->get();

        return Inertia::render('Public/ResearcherShow', [
            'profile' => $user->only(['id', 'first_name', 'last_name', 'college']),
            'rows' => $rows,
        ]);
    }

    public function publications(Request $req)
    {
        $q = Publication::with(['type:id,name', 'status:id,name', 'research:id,research_code,title'])
            ->select(['id', 'research_id', 'title', 'publication_type_id', 'publication_status_id', 'journal', 'publisher', 'publication_date', 'doi', 'url', 'abstract'])
            ->orderByDesc('id');
        if ($s = $req->get('search')) {
            $q->where(function ($qq) use ($s) {
                $qq->where('title', 'like', "%$s%")->orWhere('journal', 'like', "%$s%");
            });
        }
        return Inertia::render('Public/Publications', [
            'rows' => $q->paginate(12)->withQueryString(),
            'filters' => $req->only(['search']),
        ]);
    }

    public function ipRights()
    {
        $rows = Innovation::with(['type:id,name', 'ipStatus:id,name', 'college:id,code,name'])
            ->select(['id', 'research_id', 'title', 'description', 'innovation_type_id', 'college_id', 'ip_status_id', 'development_date'])
            ->orderByDesc('id')->paginate(12);

        $summary = [
            'total' => Innovation::count(),
            'protected' => Innovation::whereHas('ipStatus', function ($q) {
                $q->whereIn('name', ['Protected', 'Copyrighted']);
            })->count(),
            'technologies' => DB::table('technologies')->count(),
        ];

        $copyrights = DB::table('research_files as f')
            ->join('copyright_statuses as c', 'c.id', '=', 'f.copyright_status_id')
            ->select('c.name', 'c.description', DB::raw('COUNT(f.id) as total'))
            ->whereNull('f.deleted_at')
            ->groupBy('c.name', 'c.description')->orderByDesc('total')->get();

        return Inertia::render('Public/IpRights', [
            'rows' => $rows,
            'summary' => $summary,
            'copyrights' => $copyrights,
        ]);
    }
}
