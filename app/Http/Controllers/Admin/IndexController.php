<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    //后台首页Controller
    public function index()
    {
        //判断session是否存在
        if(session('admin')){
            return view('admin.index');
        }else{
            return redirect('admin/login');
        }
    }
    //后台首页home页面Controller
    public function home()
    {
        return view('admin.home');
    }
}
