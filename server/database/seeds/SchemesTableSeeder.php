<?php

use Illuminate\Database\Seeder;
use App\Models\Scheme;

class SchemesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $schemes = [
            [
                'name' => 'Swachh Bharat mission',
                'gov_scheme_id' => 'swachhbharat',
                'description' => 'Swachh Bharat Abhiyan or Swachh Bharat Mission is a nation-wide campaign in India for the period 2014 to 2019 that aims to clean up the streets, roads and infrastructure of India\'s cities, towns, and rural areas. The campaign\'s official name is in Hindi and translates to "Clean India Mission"',
                'hashtag' => 'swachhbharat'
            ],
            [
                'name' => 'Make In India',
                'gov_scheme_id' => 'makeinindia',
                'description' => 'Make in India, a type of Swadeshi movement covering 25 sectors of the economy, was launched by the Government of India on 25 September 2014 to encourage companies to manufacture their products in India and enthuse with dedicated investments into manufacturing.',
                'hashtag' => 'makeinindia'
            ],
        ];
        foreach ($schemes as $key => $value) {
            Scheme::updateOrCreate($value);
        }
    }
}
