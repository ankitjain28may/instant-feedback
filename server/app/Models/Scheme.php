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


    public function tweets()
    {
        return $this->hasMany('App\Models\Tweet', 'scheme_id', 'id');
    }


    public static function getAllSchemes()
    {
        $hashtags = [];
        $schemes = Self::all(['hashtag'])->toArray();
        foreach ($schemes as $hashtag => $value) {
            array_push($hashtags, $value['hashtag']);
        }
        return $hashtags;
    }

    public static function getByHashtag($hashtag)
    {
        $data = Self::where('hashtag', $hashtag)->first();
        return $data;
    }

}
