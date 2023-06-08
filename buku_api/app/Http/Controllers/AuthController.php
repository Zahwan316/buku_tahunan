<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request){
        $validate = $request->validate([
            "username" => "required",
            "password" => "required|min:8",
            "email" => "required|email",
            "confirmPass" => 'required'
        ]);

        if(!$validate){
            return response()->json([
                "message" => "Registrasi Gagal"
            ]);
        }

        $user = User::insert([
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "confirmPass" => $request->confirmPass,
            "email" => $request->email,
            "role" => "user"
        ]);

        return response()->json([
            "message" => "Registrasi Berhasil"
        ]);

    }

    public function login(Request $request){
        $validate = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8"
        ]);

        $user = User::where("email",$request->email)->first();
    
        if(!$user || !Hash::check($request->password,$user->password)){
            throw ValidationException::withMessages([
                "email" => "Credentials Invalid",
                "message" => "Email atau password salah"
            ]);
        }

        $token = $user->createToken("authToken")->plainTextToken;

        
        return response()->json([
            "username" => $user->username,
            "token" => $token,
            "role" => $user->role,
            "message" => "Login Berhasil"
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "Log out"
        ],200);
    }
}
