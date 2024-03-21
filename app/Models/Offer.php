<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];
    use HasFactory;

    public function tags()
    {
        return $this->belongsToMany(Tag::class, "user_tag");
    }
}
