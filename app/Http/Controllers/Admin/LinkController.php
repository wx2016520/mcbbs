<?php

namespace App\Http\Controllers\Admin;


use App\Http\Model\Navigation;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\Validator;
class LinkController extends Controller
{
    //后台友情链接Controller
    public function index()
    {
        //查询所有链接
        //$data = Navigation::orderBy('navigation_order','asc')->orderBy('navigation_id','desc')->paginate(5);
        return view('admin.link.index');
    }


}
