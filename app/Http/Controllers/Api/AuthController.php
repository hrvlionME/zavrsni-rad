<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();


        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
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

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function show()
    {
        $users = User::with('tags')->get();
        return UserResource::collection($users);
    }

    public function getuser($id){
        $user = User::with('tags')->find($id);
        return new UserResource($user);
    }

    public function deleteuser($id){
        $user = User::find($id);
        $user->delete();
        return response('', 204);
    }

    public function updateuser($id){
        $user = User::find($id);
        $user->update(request()->all());
        return new UserResource($user);
    }
}
