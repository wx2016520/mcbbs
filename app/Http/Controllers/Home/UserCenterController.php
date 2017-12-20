<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserCenterController extends CommonController
{
    //个人主页-用户介绍Controller
    public function about()
    {

        return view('home.user.about-user');
    }
    //个人主页-用户关注Controller
    public function following()
    {

        return view('home.user.user-following');
    }
    //个人中心-我的话题Controller
    public function mytopic()
    {

        return view('home.user.mytopic');
    }
    //个人设置Controller
    public function setting()
    {

        return view('home.user.setting');
    }
    //用户中心-账号设置Controller
    public function settings()
    {
        $user_id=session('user.user_id');
        $userinfo=User::where('user_id','=',$user_id)->first(['user_id','user_phone','user_name','user_sex','user_signature','user_pwd']);
        return view('home.user.setting',['userinfo'=>$userinfo]);
    }

}
