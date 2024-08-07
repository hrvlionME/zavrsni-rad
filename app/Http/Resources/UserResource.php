<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'description' => $this->description,
            'role' => $this->role,
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'avatar' => $this->avatar,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),  
          ];
    }
}
