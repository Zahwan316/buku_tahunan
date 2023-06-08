<?php

namespace App\Http\Controllers;

use App\Models\buku;
use App\Models\buku_content;
use App\Http\Requests\StorebukuRequest;
use App\Http\Requests\UpdatebukuRequest;
use Illuminate\Http\Request;

class BukuController extends Controller
{
   public function show_data(){
     $data = buku::get();

     $datas = $data->map(function($datam){
        $datam->img = asset("storage/".$datam->img);
        return $datam;
     });

     return response()->json([
        "Message" => "Data Berhasil Diambil",
        "data_buku" => $datas
     ]);
   }

   public function tambah_data(Request $request){
    $validate = $request->validate([
        "judul" => "required",
        "img" => "required",
        "slug" => "required",
    ]);

    //if($request->hasFile("img")){
        $img = $request->file("img");
        $imgname = $img->getClientOriginalName();
        $imgpath = $img->store("img","public");
        

        $imgdata = [
            "img" => $imgname
        ];
    //}

    $add = buku::insert([
        "judul" => $request->judul,
        "img" => $imgpath,
        "slug" => $request->slug,
        "kode_buku" => random_int(0,999999999)
        
    ]);

    if(!$validate){
        return response()->json([
            "message" => "Data gagal ditambahkan",
            
        ]);
    }

    return response()->json([
        "message" => "Data Berhasil Ditambahkan"
    ]);

   }

   public function edit_data(Request $request,$code){
        /* $validate = $request->validate([
            "img" => "required",
            "judul" => "required"
        ]);

        if(!$validate){
            return response()->json([
                "message" => "Data gagal ditambahkan"
            ]);
        } */

        $img = $request->file("img");
        $imgname = $img->getClientOriginalName();
        $imgpath = $img->store("img","public");

        $edit = buku::where("kode_buku",$code)->update([
            "img" => $imgpath,
            "judul" => $request->judul,
            "kode_buku" => $code
        ]);

        return response()->json([
            "message" => "Data berhasil diedit"
        ]);
   }

   public function get_img($code){
    $data = buku::where("kode_buku",$code)->get();

    $datas = $data->map(function($datam){
        $datam->img = asset("storage/".$datam->img);
        return $datam;
    });

    return response()->json([
        "message" => 'Data Berhasil img Diambil',
        "data_buku" => $datas,
    ]); 
   }

   public function search_data($judul){
        $data = buku::where("judul",$judul)->get();

        $datas = $data->map(function($datam){
            $datam->img = asset("storage/".$datam->img);
            return $datam;
        });

        return response()->json([
            "message" => 'Data Buku Berhasil Diambil',
            "data_buku" => $datas,
        ]); 
   }

   public function cover_data($slug){
        $data = buku::where("slug",$slug)->get();

        $datas = $data->map(function($datam){
            $datam->img = asset("storage/".$datam->img);
            return $datam;
        });

        return response()->json([
            "message" => 'Data Buku Berhasil Diambil',
            "data_buku" => $datas,
        ]); 
   }

   public function delete_data($code){
       $searchbook = buku::where("kode_buku",$code)->first();
       
       if($searchbook){
           $slug = $searchbook->slug;
           $deletecontent = buku_content::where("slug",$slug)->delete();
        }
        
        $delete = buku::where("kode_buku",$code)->delete();

         if(!$delete){
            return response()->json([
                "message" => "Data gagal dihapus",
               
            ]);
        }

        return response()->json([
            "message" => "Data berhasil dihapus",
           
        ]); 
   }

   
}
