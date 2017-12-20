<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
class SentenceController extends CommonController
{
    //前台头部Controller
    public function index()
    {
	
        return view('home.sentence');
    }

}
