<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use App\Models\Offer;
use App\Models\Tag;

class OfferController extends Controller
{

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
}
