<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use App\Models\Following;
use App\Models\Offer;
use App\Models\Tag;

class OfferController extends Controller
{

    public function show()
    {

        $offers = Offer::with('tags')->get();
        return OfferResource::collection($offers);
    }

    public function addjob(OfferRequest $request)
    {
        $offer = Offer::create($request->all());

        
        $tagsInput = $request->input('tags');
        $tagsArray = explode(' ', $tagsInput);

        foreach ($tagsArray as $tagName) {
            $tagName = ucfirst($tagName);
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $offer->tags()->attach($tag->id);
        }

        return new OfferResource($offer);
    }

    public function getoffer($id){
        $offer = Offer::find($id);
        return new OfferResource($offer);
    }

    public function followoffer($id) {
        $offer = Offer::find($id);

        if (!$offer) {
            return response()->json(['success' => false, 'message' => 'Offer not found'], 404);
        }

        $user = auth()->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
        }

        $userId = $user->id;

        $following = Following::where('user_id', $userId)
                            ->where('offer_id', $offer->id)
                            ->first();

        if ($following) {
            $following->delete();
            $offer->decrement('followers');
            $message = 'Unfollowed successfully';
        } else {
            Following::create([
                'user_id' => $userId,
                'offer_id' => $offer->id
            ]);
            $offer->increment('followers');
            $message = 'Followed successfully';
        }

        return response()->json(['success' => true, 'message' => $message]);
    }

    public function showfollowing() {

        $user = auth()->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
        }

        $userId = $user->id;

        $offers = Offer::whereIn('id', function($query) use ($userId) {
            $query->select('offer_id')
                  ->from('followings')
                  ->where('user_id', $userId);
        })->get();
    
        return OfferResource::collection($offers);
    }

    public function deleteoffer($id) {
        $offer = Offer::find($id);
        if (!$offer) {
            return response()->json(['success' => false, 'message' => 'Offer not found'], 404);
        }
        $offer->delete();
        return response()->json(['success' => true, 'message' => 'Offer deleted successfully']);
    }

    public function updateoffer($id){
        $offer = Offer::find($id);
        if (!$offer) {
            return response()->json(['success' => false, 'message' => 'Offer not found'], 404);
        }
        $offer->update(request()->all());
        return new OfferResource($offer);
    }

    public function showfromuser($id) {
        $offers = Offer::where('user_id', $id)->get();
        return OfferResource::collection($offers);
    }

    public function showfollowingfromuser($id) {

        $offers = Offer::whereIn('id', function($query) use ($id) {
            $query->select('offer_id')
                  ->from('followings')
                  ->where('user_id', $id);
        })->get();
        return OfferResource::collection($offers);
    }   
}
