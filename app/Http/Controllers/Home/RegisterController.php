<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;

class RegisterController extends Controller
{
    //前台注册Controller
    public function register(Request $request)
    {

        if($input=Input::except('_token','captcha')) {
            $this->validate($request,[
                'user_phone'=>'required|between:2,15',
                'user_pwd'=>'required',
            ],[
                'required'=>':attribute 必须填写！',
                'between'=>':attribute 必须在2~15个字符之间！',
            ]);
            $input['user_pwd']=Crypt::encrypt($input['user_pwd']);
            if(User::create($input)){
                return redirect('login');
            }else{
                return back()->with("errors","注册失败");
            }
        }
        return view('home.register');
    }
}
