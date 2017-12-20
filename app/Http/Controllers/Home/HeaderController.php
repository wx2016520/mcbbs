<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\Navigation;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
class HeaderController extends CommonController
{
    //前台头部Controller
    public function index()
    {
	
        return view('home.index');
    }
    //前台头部导航Controller
    public function header()
    {
        //查询所有首页导航
        $data=Navigation::orderby('navigation_order','asc')->where('navigation_type','=','1')->get();
        return view('public.index_header',['data'=>$data]);
    }
}
