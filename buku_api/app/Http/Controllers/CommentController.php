<?php

namespace App\Http\Controllers;

use App\Models\comment;
use App\Http\Requests\StorecommentRequest;
use App\Http\Requests\UpdatecommentRequest;

class CommentController extends Controller
{
   public function read_comment(){
        $data = comment::get();

        return response()->json([
            'Message' => "Data berhasil dipanggil",
            "data_komen" => $data
        ]);
   }
}
