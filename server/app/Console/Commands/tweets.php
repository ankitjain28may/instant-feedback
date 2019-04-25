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
            // echo $tweet['user']['screen_name'] . " has tweeted " . $tweet['text'] . "\n";
            //
            echo json_encode($tweet);
            try {
                $schemes = Scheme::getAllSchemes();
                $text = $tweet['text'];
                $hashtags = array_merge([], Tweet::getHashtags($tweet['entities']['hashtags']));

                if (isset($tweet['extended_tweet'])) {
                    $hashtags = array_merge($hashtags, Tweet::getHashtags($tweet['extended_tweet']['entities']['hashtags']));
                }

                if (isset($tweet['retweeted_status'])) {
                    $text = $tweet['retweeted_status']['text'];
                    $hashtags = array_merge($hashtags, Tweet::getHashtags($tweet['retweeted_status']['entities']['hashtags']));
                    if (isset($tweet['retweeted_status']['extended_tweet'])) {
                        $hashtags = array_merge($hashtags, Tweet::getHashtags($tweet['retweeted_status']['extended_tweet']['entities']['hashtags']));
                    }

                }

                if (isset($tweet['quoted_status'])) {
                    $hashtags = array_merge($hashtags, Tweet::getHashtags($tweet['quoted_status']['entities']['hashtags']));
                    if (isset($tweet['quoted_status']['extended_tweet'])) {
                        $hashtags = array_merge($hashtags, Tweet::getHashtags($tweet['quoted_status']['extended_tweet']['entities']['hashtags']));
                    }
                }

                $hashtags = array_unique($hashtags);

                $data = json_decode(Tweet::analyzeComment($text, $tweet['user']['lang']), true);
                $genderize = json_decode(Tweet::getGender(explode(' ', $tweet['user']['name'])[0]), true);
                foreach ($hashtags as $key => $value) {
                    $tweet_data = [];
                    if (in_array($value, $schemes)) {
                        $scheme = Scheme::getByHashtag($value);

                        $tweet_data = [
                            'tweet' => $text,
                            'hashtags' => $value,
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
                    broadcast(new TweetsStream($tweet_data, $value))->toOthers();
                    }
                }

            } catch (Exception $e) {
                var_dump($e);
            }

        })
        ->startListening();
    }
}
