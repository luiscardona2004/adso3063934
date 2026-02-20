<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{

    // LISTAR
    public function index()
    {
        return response()->json([
            'message' => 'Pets list retrieved successfully 🐶',
            'data' => Pet::all()
        ], 200);
    }

    // CREAR
    public function store(Request $request)
{
    $validated = $request->validate([
        'name'        => 'required|string',
        'kind'        => 'required|string',
        'weight'      => 'required|numeric',
        'age'         => 'required|numeric',
        'breed'       => 'required|string',
        'location'    => 'required|string',
        'description' => 'required|string',
        'image'       => 'required|image|mimes:jpg,jpeg,png|max:2048'
    ]);

    // Guardar imagen en storage/app/public/pets
    $imagePath = $request->file('image')->store('pets', 'public');

    $pet = Pet::create([
        'name'        => $validated['name'],
        'kind'        => $validated['kind'],
        'weight'      => $validated['weight'],
        'age'         => $validated['age'],
        'breed'       => $validated['breed'],
        'location'    => $validated['location'],
        'description' => $validated['description'],
        'image'       => $imagePath
    ]);

    return response()->json([
        'message' => 'Pet created successfully 🐾',
        'data' => $pet
    ], 201);
}


    // MOSTRAR
    public function show($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found ❌'
            ], 404);
        }

        return response()->json([
            'message' => 'Pet retrieved successfully 🐕',
            'data' => $pet
        ], 200);
    }

    // ACTUALIZAR
    public function update(Request $request, $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found ❌'
            ], 404);
        }

        $validated = $request->validate([
            'name'        => 'sometimes|string',
            'kind'        => 'sometimes|string',
            'weight'      => 'sometimes|numeric',
            'age'         => 'sometimes|numeric',
            'breed'       => 'sometimes|string',
            'location'    => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);

        $pet->update($validated);

        return response()->json([
            'message' => 'Pet updated successfully ✏️',
            'data' => $pet
        ], 200);
    }

    // ELIMINAR
    public function destroy($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found ❌'
            ], 404);
        }

        $pet->delete();

        return response()->json([
            'message' => 'Pet deleted successfully 🗑️'
        ], 200);
    }
}
