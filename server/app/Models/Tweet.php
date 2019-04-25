<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class Tweet extends Model
{

    const BASE_URL = 'https://commentanalyzer.googleapis.com/v1alpha1';
    const GENDERIZE_URL = 'https://api.genderize.io/?name=';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tweet', 'hashtags', 'scheme_id', 'sentiment_score', 'location', 'gender',
    ];

    public static function analyzeComment($text, $lang)
    {
        $api_key = env('PERSPECTIVE_API_KEY');

        $data = [
            'comment' => [
                'text' => $text
            ],
            'languages' => [
                'en'
            ],
            'requestedAttributes' => [
                'TOXICITY' => [
                    'scoreType' => 'PROBABILITY'
                ],
            ],
        ];

        try {
            $client = new Client(); //GuzzleHttp\Client
            $result = $client->post(self::BASE_URL . '/comments:analyze?key=' . $api_key, [
                'json' => $data
            ]);
            return $result->getBody()->getContents();
        } catch (GuzzleException $e) {
            echo $e->getResponse()->getBody()->getContents();
            echo "\n";
        }
    }

    public static function getGender($first_name)
    {
        try {
            $client = new Client(); //GuzzleHttp\Client
            $result = $client->get(self::GENDERIZE_URL . $first_name);
            return $result->getBody()->getContents();
        } catch (GuzzleException $e) {
            echo $e->getResponse()->getBody()->getContents();
            echo "\n";
        }
    }

}
