<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use TwitterStreamingApi;
use App\Models\Tweet;
use App\Models\Scheme;
use App\Events\TweetsStream;

class tweets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tweets:stream';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Stream the tweets for the hashtag named `feedback_gov`';

    protected $gender = ['male', 'female'];

    protected $location = ['Delhi', 'Bangalore', 'Mumbai'];
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        TwitterStreamingApi::publicStream()
        ->whenHears(Scheme::getAllHashtags(), function(array $tweet) {
            echo $tweet['user']['screen_name'] . " has tweeted\n";

            try {
                $schemes = Scheme::getAllSchemes();
                $text = $tweet['text'];
                if (isset($tweet['retweeted_status'])) {
                    $text = $tweet['retweeted_status']['text'];
                } else if (isset($tweet['quoted_status'])) {
                    $tweet['entities']['hashtags'] = $tweet['quoted_status']['entities']['hashtags'];
                }
                $data = json_decode(Tweet::analyzeComment($text, $tweet['user']['lang']), true);
                $genderize = json_decode(Tweet::getGender(explode(' ', $tweet['user']['name'])[0]), true);
                foreach ($tweet['entities']['hashtags'] as $key => $value) {
                    $tweet_data = [];
                    if (in_array(strtolower($value['text']), $schemes)) {
                        $scheme = Scheme::getByHashtag($value['text']);

                        $tweet_data = [
                            'tweet' => $text,
                            'hashtags' => strtolower($value['text']),
                            'scheme_id' => $scheme->id,
                            'sentiment_score' => $data['attributeScores']['TOXICITY']['summaryScore']['value'],
                            // 'location' => $tweet['place']['full_name'],
                            'location' => $this->location[array_rand($this->location)],
                            'gender' => (isset($genderize['gender'])) ? $genderize['gender'] : $this->gender[array_rand($this->gender)],
                        ];

                        Tweet::create($tweet_data);
                        if ($data['attributeScores']['TOXICITY']['summaryScore']['value'] < 0.4) {
                            $scheme->increment('positive_tweets');
                        } else {
                            $scheme->increment('negative_tweets');
                        }
                    broadcast(new TweetsStream($tweet_data, strtolower($value['text'])))->toOthers();
                    }
                }

            } catch (Exception $e) {
                var_dump($e);
            }

        })
        ->startListening();
    }
}
