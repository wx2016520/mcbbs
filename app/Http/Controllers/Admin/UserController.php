<?php

namespace App\Http\Controllers\Admin;


use App\Http\Model\Navigation;
use App\Http\Model\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    //后台用户Controller
    public function index()
    {
        //查询所有用户
        $data = User::orderBy('user_id','desc')->paginate(5);
        return view('admin.user.index',['data'=>$data]);
    }


}
