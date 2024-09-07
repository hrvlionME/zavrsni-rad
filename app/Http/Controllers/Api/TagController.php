<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Tag;
use App\Models\User;
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

    public function show(User $user)
    {
        //
        $tags = $user->tags;
        return response()->json(['tags' => $tags]);
    }

    public function getoffertags($id){

        $tags = Offer::find($id)->tags;
        return response()->json(['tags' => $tags]);
    }

    public function getusertags($id){
        $tags = User::find($id)->tags;
        return response()->json(['tags' => $tags]);
    }

}
