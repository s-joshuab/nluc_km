<?php

use App\Http\Controllers\AccessRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CommercializationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EndorsementController;
use App\Http\Controllers\IecMaterialController;
use App\Http\Controllers\InnovationController;
use App\Http\Controllers\KnowledgeResourceController;
use App\Http\Controllers\LookupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\QrController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\ResearchFileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TechnologyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Public landing / showcase — no login required, metadata + abstracts only
Route::get('/', [PublicController::class, 'landing'])->name('home');
Route::get('/catalog', [PublicController::class, 'catalog'])->name('catalog.index');
Route::get('/catalog/{research}', [PublicController::class, 'show'])->name('catalog.show');
Route::get('/researchers', [PublicController::class, 'researchers'])->name('public.researchers');
Route::get('/researchers/{user}', [PublicController::class, 'researcherShow'])->name('public.researchers.show');
Route::get('/showcase/publications', [PublicController::class, 'publications'])->name('public.publications');
Route::get('/showcase/ip-rights', [PublicController::class, 'ipRights'])->name('public.iprights');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Repository + Research
    Route::get('/repository', [ResearchController::class, 'repository'])->name('repository.index');
    Route::get('/repository/{research}', [ResearchController::class, 'show'])->name('repository.show');
    Route::get('/my-research', [ResearchController::class, 'myResearch'])->name('research.mine');

    Route::middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator')->group(function () {
        Route::get('/research', [ResearchController::class, 'index'])->name('research.index');
        Route::get('/research/create', [ResearchController::class, 'create'])->name('research.create');
        Route::post('/research', [ResearchController::class, 'store'])->name('research.store');
        Route::get('/research/{research}/edit', [ResearchController::class, 'edit'])->name('research.edit');
        Route::put('/research/{research}', [ResearchController::class, 'update'])->name('research.update');
        Route::delete('/research/{research}', [ResearchController::class, 'destroy'])->name('research.destroy');
        Route::post('/research/{research}/files', [ResearchFileController::class, 'store'])->name('research.files.store');
        Route::delete('/research-files/{file}', [ResearchFileController::class, 'destroy'])->name('research.files.destroy');
    });
    Route::get('/research/{research}', [ResearchController::class, 'show'])->name('research.show');
    Route::get('/research-files/{file}/download', [ResearchFileController::class, 'download'])->name('research.files.download');

    // Bookmarks
    Route::post('/bookmarks/toggle', [BookmarkController::class, 'toggle'])->name('bookmarks.toggle');

    // Access requests
    Route::get('/access-requests', [AccessRequestController::class, 'index'])->name('access-requests.index');
    Route::post('/access-requests', [AccessRequestController::class, 'store'])->name('access-requests.store');
    Route::post('/access-requests/{accessRequest}/cancel', [AccessRequestController::class, 'cancel'])->name('access-requests.cancel');
    Route::post('/access-requests/{accessRequest}/decide', [AccessRequestController::class, 'decide'])->name('access-requests.decide')->middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator');

    // Endorsements + transactions
    Route::get('/endorsements', [EndorsementController::class, 'index'])->name('endorsements.index');
    Route::get('/endorsements/create', [EndorsementController::class, 'create'])->name('endorsements.create');
    Route::post('/endorsements', [EndorsementController::class, 'store'])->name('endorsements.store');
    Route::get('/endorsements/{endorsement}', [EndorsementController::class, 'show'])->name('endorsements.show');
    Route::post('/endorsements/{endorsement}/status', [EndorsementController::class, 'updateStatus'])->name('endorsements.status')->middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator');
    Route::get('/my-transactions', [EndorsementController::class, 'myTransactions'])->name('transactions.mine');
    Route::get('/my-transactions/{endorsement}', [EndorsementController::class, 'myShow'])->name('transactions.show');

    // QR queues — viewing allowed for relevant staff, store actions strictly validated
    Route::get('/qr-received', [QrController::class, 'receivedQueue'])->name('qr.received.queue');
    Route::post('/qr-received/{endorsement}', [QrController::class, 'storeReceived'])->name('qr.received.store');
    Route::get('/qr-release', [QrController::class, 'releaseQueue'])->name('qr.release.queue');
    Route::post('/qr-release/{endorsement}', [QrController::class, 'storeRelease'])->name('qr.release.store');

    // Publication & IEC
    Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
    Route::get('/iec-materials', [IecMaterialController::class, 'index'])->name('iec.index');
    Route::middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator')->group(function () {
        Route::get('/publications/create', [PublicationController::class, 'create'])->name('publications.create');
        Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');
        Route::get('/publications/{publication}/edit', [PublicationController::class, 'edit'])->name('publications.edit');
        Route::put('/publications/{publication}', [PublicationController::class, 'update'])->name('publications.update');
        Route::delete('/publications/{publication}', [PublicationController::class, 'destroy'])->name('publications.destroy');
        Route::get('/iec-materials/create', [IecMaterialController::class, 'create'])->name('iec.create');
        Route::post('/iec-materials', [IecMaterialController::class, 'store'])->name('iec.store');
        Route::get('/iec-materials/{iecMaterial}/edit', [IecMaterialController::class, 'edit'])->name('iec.edit');
        Route::put('/iec-materials/{iecMaterial}', [IecMaterialController::class, 'update'])->name('iec.update');
        Route::delete('/iec-materials/{iecMaterial}', [IecMaterialController::class, 'destroy'])->name('iec.destroy');
    });

    // Innovation / Technology / Commercialization
    Route::get('/innovations', [InnovationController::class, 'index'])->name('innovations.index');
    Route::get('/innovations/{innovation}', [InnovationController::class, 'show'])->name('innovations.show');
    Route::get('/technologies', [TechnologyController::class, 'index'])->name('technologies.index');
    Route::get('/commercialization', [CommercializationController::class, 'index'])->name('commercialization.index');
    Route::middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator')->group(function () {
        Route::get('/innovations-create', [InnovationController::class, 'create'])->name('innovations.create');
        Route::post('/innovations', [InnovationController::class, 'store'])->name('innovations.store');
        Route::get('/innovations/{innovation}/edit', [InnovationController::class, 'edit'])->name('innovations.edit');
        Route::put('/innovations/{innovation}', [InnovationController::class, 'update'])->name('innovations.update');
        Route::delete('/innovations/{innovation}', [InnovationController::class, 'destroy'])->name('innovations.destroy');
        Route::get('/technologies/create', [TechnologyController::class, 'create'])->name('technologies.create');
        Route::post('/technologies', [TechnologyController::class, 'store'])->name('technologies.store');
        Route::get('/technologies/{technology}/edit', [TechnologyController::class, 'edit'])->name('technologies.edit');
        Route::put('/technologies/{technology}', [TechnologyController::class, 'update'])->name('technologies.update');
        Route::delete('/technologies/{technology}', [TechnologyController::class, 'destroy'])->name('technologies.destroy');
        Route::get('/commercialization/create', [CommercializationController::class, 'create'])->name('commercialization.create');
        Route::post('/commercialization', [CommercializationController::class, 'store'])->name('commercialization.store');
        Route::get('/commercialization/{commercialization}/edit', [CommercializationController::class, 'edit'])->name('commercialization.edit');
        Route::put('/commercialization/{commercialization}', [CommercializationController::class, 'update'])->name('commercialization.update');
        Route::delete('/commercialization/{commercialization}', [CommercializationController::class, 'destroy'])->name('commercialization.destroy');
    });

    // Knowledge resources
    Route::get('/knowledge-resources', [KnowledgeResourceController::class, 'index'])->name('knowledge-resources.index');
    Route::middleware('role:RPSU Administrator,RPSU Staff,Research & Publication Facilitator')->group(function () {
        Route::get('/knowledge-resources/create', [KnowledgeResourceController::class, 'create'])->name('knowledge-resources.create');
        Route::post('/knowledge-resources', [KnowledgeResourceController::class, 'store'])->name('knowledge-resources.store');
        Route::get('/knowledge-resources/{knowledgeResource}/edit', [KnowledgeResourceController::class, 'edit'])->name('knowledge-resources.edit');
        Route::put('/knowledge-resources/{knowledgeResource}', [KnowledgeResourceController::class, 'update'])->name('knowledge-resources.update');
        Route::delete('/knowledge-resources/{knowledgeResource}', [KnowledgeResourceController::class, 'destroy'])->name('knowledge-resources.destroy');
    });

    // Search + notifications
    Route::get('/search', [SearchController::class, 'global'])->name('search');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'read'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'readAll'])->name('notifications.readAll');

    // Reports
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/research', [ReportController::class, 'research'])->name('research');
        Route::get('/publications', [ReportController::class, 'publications'])->name('publications');
        Route::get('/iec', [ReportController::class, 'iec'])->name('iec');
        Route::get('/innovations', [ReportController::class, 'innovations'])->name('innovations');
        Route::get('/commercialization', [ReportController::class, 'commercialization'])->name('commercialization');
        Route::get('/endorsements', [ReportController::class, 'endorsements'])->name('endorsements');
    });

    // Admin
    Route::middleware('role:RPSU Administrator')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('/roles', [LookupController::class, 'roles'])->name('roles.index');
        Route::post('/roles', [LookupController::class, 'storeRole'])->name('roles.store');
        Route::get('/offices', [LookupController::class, 'offices'])->name('offices.index');
        Route::post('/offices', [LookupController::class, 'storeOffice'])->name('offices.store');
        Route::post('/offices/{id}/toggle', [LookupController::class, 'toggleOffice'])->name('offices.toggle');
        Route::get('/colleges', [LookupController::class, 'colleges'])->name('colleges.index');
        Route::post('/colleges', [LookupController::class, 'storeCollege'])->name('colleges.store');
        Route::post('/colleges/{id}/toggle', [LookupController::class, 'toggleCollege'])->name('colleges.toggle');
    });
});
