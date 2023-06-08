<?php

use App\Http\Controllers\BukuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuContentController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post("/logout",[AuthController::class,"logout"]);
    
});

Route::post("/register",[AuthController::class,"register"]);
Route::post("/login",[AuthController::class,"login"]);

Route::prefix("buku")->group(function(){
    Route::get("/",[BukuController::class,"show_data"]);
    Route::get("/getcover/{slug}",[BukuController::class,"cover_data"]);
    Route::get("/getimg/{code}",[BukuController::class,"get_img"]);
    Route::get("/search/{judul}",[BukuController::class,"search_data"]);
    Route::post("/tambah",[BukuController::class,"tambah_data"]);
    Route::delete("/delete/{code}",[BukuController::class,"delete_data"]);
    Route::post("/edit/{code}",[BukuController::class,"edit_data"]);
    
});

Route::prefix("buku_content")->group(function(){
    Route::get("/{slug}",[BukuContentController::class,"show_data"]);
    Route::get("/getimg/{code}",[BukuContentController::class,"show_data_img"]);
    Route::post("/tambah",[BukuContentController::class,"tambah_data"]);
    Route::delete("/delete/{code}",[BukuContentController::class,"delete_data"]);
    Route::post("/edit/{code}",[BukuContentController::class,"edit_data"]); 
});

Route::prefix("comment")->group(function(){
    Route::get("/",[CommentController::class,"read_comment"]);
});
