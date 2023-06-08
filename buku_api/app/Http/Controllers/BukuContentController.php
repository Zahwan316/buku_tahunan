<?php

namespace App\Http\Controllers;

use App\Models\buku_content;
use App\Http\Requests\Storebuku_contentRequest;
use App\Http\Requests\Updatebuku_contentRequest;
use Illuminate\Http\Request;
class BukuContentController extends Controller
{
    public function show_data($slug){
        $data = buku_content::where("slug",$slug)->get();


        $datas = $data->map(function($datam){
            $datam->img = asset("storage/".$datam->img);
            return $datam;
        });

        return response()->json([
            "message" => 'Data Berhasil Diambil',
            "data_buku" => $datas,
        ]);
    }

    public function show_data_img($code){
        $data = buku_content::where("code_content",$code)->get();


        $datas = $data->map(function($datam){
            $datam->img = asset("storage/".$datam->img);
            return $datam;
        });

        return response()->json([
            "message" => 'Data Berhasil img Diambil',
            "data_buku" => $datas,
        ]);
    }   

    public function tambah_data(Request $request){
        $validate = $request->validate([
            "img" => "required",
            "slug" => "required"
        ]);

        if(!$validate){
            return response()->json([
                "message" => "Data gagal ditambahkan"
            ]);
        }

        $img = $request->file("img");
        $imgname = $img->getClientOriginalName();
        $imgpath = $img->store("img","public");

        $data = buku_content::insert([
            "img" => $imgpath,
            "slug" => $request->slug,
            "code_content" => random_int(0,9999999999)
            
        ]);

        return response()->json([
            "message" => "Data berhasil ditambahkan"
        ]);
    }
    public function edit_data(Request $request,$code){
        $validate = $request->validate([
            "img" => "required",
            "slug" => "required",
        ]);

        if(!$validate){
            return response()->json([
                "message" => "Data gagal di edit"
            ]);
        }

        $img = $request->file("img");
        $imgname = $img->getClientOriginalName();
        $imgpath = $img->store("img","public");

        $edit = buku_content::where("code_content",$code)->update([
            "img" => $imgpath,
            "slug" => $request->slug,
            "code_content" => $code 

        ]);


        return response()->json([
            "message" => "Data berhasil di edit"
        ]);
        
    }

    public function delete_data($code){
        $delete = buku_content::where("code_content",$code)->delete();

        if(!$delete){
            return response()->json([
                "message" => "Data gagal dihapus"
            ]);
        }

        return response()->json([
            "message" => "Data berhasil dihapus"
        ]);
    }
}
