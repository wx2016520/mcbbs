<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
require_once 'resources/org/qqLogin/qqConnectAPI.php';
class IndexController extends CommonController
{
    //前台首页Controller
    public function index()
    {
        return view('home.index');

    }

}
