<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{   
    protected $fillable = [
        'name'
    ];
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, "user_tag");
    }
}
