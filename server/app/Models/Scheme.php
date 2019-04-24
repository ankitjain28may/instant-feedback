<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scheme extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'gov_scheme_id', 'hashtag', 'positive_tweets', 'negative_tweets', 'sentiment_score',
    ];

}
