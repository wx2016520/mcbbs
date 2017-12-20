<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\Navigation;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
class VideoController extends CommonController
{
    //前台头部Controller
    public function index()
    {
	
        return view('home.video');
    }
    //前台头部Controller
    public function detail()
    {

        return view('home.video-detail');
    }

}
