<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;
require_once 'resources/org/qqLogin/qqConnectAPI.php';
class LoginController extends Controller
{
    //前台登录Controller
    public function login()
    {
        //如果是input::all里有内容，说明是post提交
        if($input=Input::all()){
           $user_phone=$input['name_phone'];
           $password=$input['password'];
           //先判断是手机号/用户名是否存在
           $user=User::where(['user_name'=>$user_phone])->orwhere(['user_phone'=>$user_phone])->first();
           if($user !=null){
               //获取密码并解密
               $user_pwd =Crypt::decrypt($user->user_pwd);
               //判断密码是否正确
               if($user_pwd==$password){
                   //保存session
                   session(['user'=>$user]);
                   return redirect('');
               }else{
                   return back()->with('msg','密码错误！');
               }
           }else{
               return back()->with('msg','用户名或手机号不存在！');
           }

        }

        return view('home.login');
    }
    //前台退出登录Controller
    public function loginout()
    {
        session(['user'=>null]);
        return redirect('login');
    }
    //第三方登录QQ
    public function qqLogin()
    {
        //访问qq登录页面
        $oauth= new \Oauth();
        $oauth->qq_login();
    }
    //qq登陆信息处理
    public function qqcallback()
    {
        $oauth= new \Oauth();
        $accesstoken=$oauth->qq_callback();
        $openid=$oauth->get_openid();
        //判断该用户是否登陆过
        $user=User::where(['qq_openid'=>$openid])->first();
        //如果存在就取出该用户的数据
        if($user){
            //清空session
            session(['user'=>null]);
            //保存session
            session(['user'=>$user]);
        }else{
            setcookie("qq_accesstoken",$accesstoken,time()+84600);
            setcookie("qq_openid",$openid,time()+84600);
            $qc = new \QC($accesstoken,$openid);
            $arr = $qc->get_user_info();
            //将信息加入数组
            $info=array(
                'user_sex'=>$arr["gender"] == "男" ? '1' : '0',
                'user_name'=>$arr["nickname"],
                'login_type'=>"qq_login",
                'qq_openid'=>"$openid",
            );
            //将信息加入数据库
            User::create($info);
            //清空session
            session(['user'=>null]);
            //保存session
            session(['user'=>$info]);
        }

        //跳转到首页控制器
        return redirect("/"); 

    }
}
