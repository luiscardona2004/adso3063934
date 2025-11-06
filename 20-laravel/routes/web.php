<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return "this is a entry point: 👌";
    return view('welcome');
});


Route::get('hello', function(){
    return "<h1>hello folks, have a nice day ✅  </h1>";
});

Route::get('hello/{name}', function(){
    return "<h1>hello: ".request()->name."</h1>";
});

Route::get( 'show/pets',function(){
    $pets = App\Models\Pet::all();
    dd($pets->toArray());
});

Route::get( 'show/pets/{id}',function($id){
    $pets = App\Models\Pet::find($id);
    dd($pets->toArray());
});

Route::get('challenge', function() {
    $users = App\Models\User::take(20)->get();
    
    $html = '<table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="background: #f4f4f4;">
                <th>ID</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Age</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>';
    
    foreach($users as $user) {
        $age = \Carbon\Carbon::parse($user->birthdate)->age;
        $html .= "<tr>
            <td>{$user->id}</td>
            <td>{$user->fullname}</td>
            <td><img src='{$user->photo}' width='50' height='50'></td>
            <td>{$age}</td>
            <td>{$user->created_at->format('Y-m-d')}</td>
        </tr>";
    }
    
    $html .= '</tbody></table>';
    
    return $html;
});

//
Route::get('view/pets', function () {
    $pets = \App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});


