<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
class ActiveController extends CommonController
{
    public function index()
    {

        return view('home.active');
   }
    public function detail()
    {

        return view('home.active-detail');
   }
}
