<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->description,
            'description' => $this->description,
            'employer_id' => $this->user_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),  
        ];
    }
}
