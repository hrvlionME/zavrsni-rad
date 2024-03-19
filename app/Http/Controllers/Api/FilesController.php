<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    //
    public function store(FileRequest $request)
    {
        $user = User::findOrFail($request->user_id);
        $image = $request->file('avatar');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('/public', $filename);
        $user->avatar = $filename;
        $user->save();
        return new UserResource($user);
    }
}
