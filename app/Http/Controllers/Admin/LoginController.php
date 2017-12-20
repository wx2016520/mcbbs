<?php

namespace App\Http\Controllers\Admin;

use App\Http\Model\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;
require_once 'resources/org/code/Code.class.php';
class LoginController extends Controller
{
    //后台登录Controller
    public function login()
    {
        //如果是input::all里有内容，说明是post提交
        if($input=Input::all()){
            $user_phone=$input['user_name'];
            $password=$input['user_pwd'];
            $codes=$input['code'];
            //先判断是手机号/用户名是否存在
            $user=User::where(['user_name'=>$user_phone])->orwhere(['user_phone'=>$user_phone])->first();
            if($user !=null){
                //获取密码并解密
                $user_pwd =Crypt::decrypt($user->user_pwd);
                //判断密码是否正确
                if($user_pwd==$password){
                    //判断验证码是否正确
                    $code = new \Yzm();
                    if(strtolower($codes) != strtolower($code->get())){
                        return back()->with('msg', '验证码不错误！');
                    }else{
                        //保存session
                        session(['admin'=>$user]);
                        return redirect('admin/index');
                    }
                }else{
                    return back()->with('msg','密码错误！');
                }
            }else{
                return back()->with('msg','用户名或手机号不存在！');
            }

        }
        return view('admin.login');
    }
    //后台登录验证码Controller
    public function code()
    {
        $code=new \Yzm();
        return $code->make();
    }
    //后台退出登录Controller
    public function loginout()
    {
        session(['admin'=>null]);
        return redirect('admin/login');
    }
}
