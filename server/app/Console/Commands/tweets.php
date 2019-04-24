<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use TwitterStreamingApi;

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
        ->whenHears('#feedback_gov', function(array $tweet) {
            echo "{$tweet['user']['screen_name']} tweeted {$tweet['text']}";
        })
        ->startListening();
    }
}
