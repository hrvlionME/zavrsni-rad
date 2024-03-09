<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'tags' => 'required|string',
        ]);

        $tagNames = explode(' ', $request->input('tags'));

        foreach ($tagNames as $tagName) {
            Tag::create([
                'name' => $tagName,
            ]);
        }

        return response()->json(['message' => 'Tags created successfully'], 201);
    }
}
