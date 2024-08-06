<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FollowingResource;
use App\Models\Following;
use Illuminate\Http\Request;

class FollowingController extends Controller
{
    //

    public function isfollowing($id)
    {
        $following = Following::where('user_id', auth()->user()->id)->where('offer_id', $id)->first();
        if ($following) {
            return response()->json(['success' => true, 'isfollowing' => true]);
        } else {
            return response()->json(['success' => true, 'isfollowing' => false]);
        }
    }
}
