<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FilesController;
use App\Http\Controllers\Api\FollowingController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user', function (Request $request) {
    return $request->user();
});
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/addoffer', [OfferController::class, 'addjob']);
    Route::post('/followoffer/{id}', [OfferController::class, 'followoffer']);
    Route::get('/showfollowingoffers', [OfferController::class, 'showfollowing']);
    Route::get('/isfollowing/{id}', [FollowingController::class, 'isfollowing']);
    Route::delete('/offer/{id}', [OfferController::class, 'deleteoffer']);
    Route::patch('/offer/{id}', [OfferController::class, 'updateoffer']);
    Route::patch('/user/{id}', [AuthController::class, 'updateuser']);
    Route::post('/offer/{id}/apply', [ApplicationController::class, 'apply']);
    Route::get('/applications', [ApplicationController::class, 'show']);
    Route::delete('/application/{id}', [ApplicationController::class, 'delete']);
    Route::get('/application/{id}', [ApplicationController::class, 'getapplication']);
    Route::get('/user/{id}', [AuthController::class, 'getuser']);
    Route::get('/getuseroffers/{id}', [OfferController::class, 'showfromuser']);
    Route::get('/getfollowingoffers/{id}', [OfferController::class, 'showfollowingfromuser']);
    Route::delete('/user/{id}', [AuthController::class, 'deleteuser']);
});

Route::get('/usertags/{user}', [TagController::class, 'show']);
Route::get('/offers', [OfferController::class, 'show']);
Route::get('/users', [AuthController::class, 'show']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/uploadavatar', [FilesController::class, 'store']);
Route::get('/offer/{id}', [OfferController::class, 'getoffer']);
Route::get('/getoffertags/{id}', [TagController::class, 'getoffertags']);
Route::get('/getusertags/{id}', [TagController::class, 'getusertags']);

Route::get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);
    if (!file_exists($path)) {
        abort(404);
    }
    return response()->file($path);
});