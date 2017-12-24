<?php
namespace App\Http\Controllers\Admin;
use App\Http\Model\Navigation;
use App\Http\Model\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    //后台用户Controller
    public function index()
    {
        //查询所有用户
        $input=Input::except('_token','page');
        if(!$input){
            $input=array("user_name"=>"");
        }
        $data = User::orderBy('user_id','desc')->where('user_name', 'like', '%' . $input['user_name']. '%')->paginate(10);
        return view('admin.user.index',['keywords'=>$input,'data'=>$data]);
    }
    //后台用户新增Controller
    public function create()
    {
        return view('admin.user.add');
    }
    //后台用户新增保存Controller
    public function store(Request $request)
    {
        //后台用户新增保存
        $this->validate($request,[
            'user_name'=>'required|between:2,10',
            'user_phone'=>'required',
            'user_pwd'=>'required',
            'user_sex'=>'required',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~10个字符之间！',
        ]);
        $input=Input::except('_token');
        $input['user_pwd']=Crypt::encrypt($input['user_pwd']);
        if(User::create($input)){
            return redirect('admin/user');
        }else{
            return back()->with("errors","添加操作失败");
        }
    }
    //后台用户编辑Controller
    public function edit($id)
    {
        //后台用户编辑
        $data=User::find($id);
        $data['user_pwd'] = Crypt::decrypt($data['user_pwd']);
        return view('admin.user.edit',compact(['data']));
    }

    //后台用户更新Controller
    public function update(Request $request,$id)
    {
        //后台用户更新
        $this->validate($request,[
            'user_name'=>'required|between:2,10',
            'user_phone'=>'required',
            'user_pwd'=>'required',
            'user_sex'=>'required',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~10个字符之间！',
        ]);

        $input=Input::except('_token','_method');
        $row = User::find($id);
        if($input && $row) {
            $row->user_name=$input['user_name'];
            $row->user_phone=$input['user_phone'];
            $row->user_pwd=Crypt::encrypt($input['user_pwd']);
            $row->user_sex=$input['user_sex'];
            if($row->update()){
                return redirect('admin/user');
            }else{
                return back()->with('errors','用户修改失败，稍后再试！');
            }
        }
    }
    //后台用户删除Controller
    public function destroy($id)
    {
        $del = User::where('user_id',$id)->delete();

        if($del){
            return ['flag'=>0,'msg'=>'数据删除成功！'];
        }else{
            return ['flag'=>1,'msg'=>'数据删除失败！'];
        }
    }

}
