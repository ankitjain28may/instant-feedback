<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Scheme;
use App\Models\Tweet;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $schemes = Scheme::with('tweets')->get();
        foreach ($schemes as $key => $value) {
            $data[$value['hashtag']] = $schemes[$key];
        }
        return response()->json($data, 200);
    }
}
