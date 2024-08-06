<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(FileRequest $request)
    {
        $user = User::findOrFail($request->user_id);
        $image = $request->file('image');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('/public', $filename);
        $user->image = $filename;
        $user->save();
        return new UserResource($user);
    }
}
