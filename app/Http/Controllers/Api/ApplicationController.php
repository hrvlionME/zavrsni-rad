<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use App\Models\Offer;

class ApplicationController extends Controller
{
    //
    public function apply(ApplicationRequest $request){

        Application::create($request->all());
        $offer = Offer::find($request->input('offer_id'));
        $offer->increment('applications');
        return response()->json(['Application created successfully']);
    }

    public function show()
    {
        //
        $user = auth()->user();
        $offers = Offer::where('user_id', $user->id)->get();
        $applications = Application::whereIn('offer_id', $offers->pluck('id'))->get();
        return ApplicationResource::collection($applications);
    }

    public function delete($id){

        $application = Application::find($id);
        $application->delete();
        return response()->json(['Application deleted successfully']);
    }

    public function getapplication($id){
        $application = Application::find($id);

        if ($application) {
            $application->opened = true;
            $application->save();
        }

        return new ApplicationResource($application);
    }
}
