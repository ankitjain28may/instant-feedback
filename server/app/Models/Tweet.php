<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tweet', 'hashtags', 'scheme_id', 'sentiment_score', 'location', 'gender',
    ];
}
