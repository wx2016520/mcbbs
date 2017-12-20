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
class SentenceController extends Controller
{
    //后台段子Controller
    public function index()
    {
        //查询所有段子
        $data = User::orderBy('user_id','desc')->paginate(5);
        return view('admin.sentence.index',['data'=>$data]);
    }


}
