<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{

    public function index()
    {
        // Traer adopciones con usuario y mascota (mucho más eficiente)
        $adoptions = Adoption::with(['user', 'pet'])
            ->orderBy('id', 'asc')
            ->paginate(20);

        return view('adoptions.index', compact('adoptions'));
    }

    public function show(Request $request)
    {
        $adoption = Adoption::find($request->id);
        return view('adoptions.show')->with('adoption',$adoption);
    }
}
