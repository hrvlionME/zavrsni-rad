<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();


        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'description' => $data['description'],
            'password' => bcrypt($data['password']),
        ]);


        $tagsInput = $request->input('tags');
        $tagsArray = explode(' ', $tagsInput);

        foreach ($tagsArray as $tagName) {
            $tagName = ucfirst($tagName);
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $user->tags()->attach($tag->id);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
}
