<?php

namespace App\Http\Controllers;

use App\Models\User; // Importamos el modelo
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::all();
        $users = User::orderBy('id', 'desc')->paginate(20);

        return view('users.index',compact('users'));
        // dd($users->toArray());
    }
}
