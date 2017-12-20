<?php

namespace App\Http\Controllers\Admin;


use App\Http\Model\Navigation;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\Validator;
class NavController extends Controller
{
    //后台导航Controller
    public function index()
    {
        //查询所有导航
        $input=Input::except('_token','page');
        if(!$input){
            $input=array("navigation_name"=>"","navigation_type"=>"");
        }
        $type=$input['navigation_type']!="0"?$input['navigation_type']:"";
        $data = Navigation::where('navigation_name', 'like', '%' . $input['navigation_name']. '%')->where('navigation_type', 'like', '%' . $type. '%')
           ->orderBy('navigation_order','asc')->orderBy('navigation_id','desc')->paginate(10);
        return view('admin.nav.index',['keywords'=>$input,'data'=>$data]);
    }
    //后台导航新增Controller
    public function create()
    {
        //新增导航
        return view('admin.nav.add');
    }
    //后台导航新增保存Controller
    public function store(Request $request)
    {
        //新增保存导航
        $this->validate($request,[
           'navigation_name'=>'required|between:2,5',
           'navigation_url'=>'required',
           'navigation_type'=>'required',
           'navigation_open'=>'required|regex:/^\d*$/',
           'navigation_window'=>'required|regex:/^\d*$/',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~5个字符之间！',
        ]);
        $input=Input::except('_token');
        if(Navigation::create($input)){
            return redirect('admin/nav');
        }else{
            return back()->with("errors","添加操作失败");
        }
    }
    //后台导航编辑Controller
    public function edit($id)
    {
        //编辑导航
        $data=Navigation::find($id);
        return view('admin.nav.edit',compact('data'));
    }
    //后台导航更新Controller
    public function update(Request $request,$id)
    {
        //更新导航
        $this->validate($request,[
            'navigation_name'=>'required|between:2,5',
            'navigation_url'=>'required',
            'navigation_type'=>'required',
            'navigation_open'=>'required|regex:/^\d*$/',
            'navigation_window'=>'required|regex:/^\d*$/',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~5个字符之间！',
        ]);

        $input=Input::except('_token','_method');
        $row = Navigation::find($id);
        if($input && $row) {
            $row->navigation_name=$input['navigation_name'];
            $row->navigation_url=$input['navigation_url'];
            $row->navigation_type=$input['navigation_type'];
            $row->navigation_fid=$input['navigation_fid'];
            $row->navigation_order=$input['navigation_order'];
            $row->navigation_open=$input['navigation_open'];
            $row->navigation_window=$input['navigation_window'];
            if($row->update()){
                return redirect('admin/nav');
            }else{
                return back()->with('errors','导航修改失败，稍后再试！');
            }
        }
    }
    public function destroy($id) //删除导航
    {
        $del = Navigation::where('navigation_id',$id)->delete();

        if($del){
            return ['flag'=>0,'msg'=>'数据删除成功！'];
        }else{
            return ['flag'=>1,'msg'=>'数据删除失败！'];
        }
    }

}
