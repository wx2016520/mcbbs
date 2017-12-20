<?php

namespace App\Http\Controllers\Admin;


use App\Http\Model\Banner;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\Validator;
class BannerController extends Controller
{
    //后台轮播Controller
    public function index()
    {
        //查询所有轮播
        $data = Banner::leftJoin('user','user.user_id','=','banner.banner_author')->orderBy('banner_time','desc')
            ->select('user_name','banner_id','banner_url','banner_time','banner_type','banner_remake','banner_click','banner_status','banner_open')->paginate(10);
        return view('admin.banner.index',['data'=>$data]);
    }
//    //后台轮播新增Controller
//    public function create()
//    {
//        //后台轮播新增
//        return view('admin.article.add');
//    }
//    //后台轮播新增保存Controller
//    public function store(Request $request)
//    {
//        //后台轮播新增保存
//        $this->validate($request,[
//            'art_title'=>'required|between:5,50',
//            'art_author'=>'required',
//            'art_content'=>'required',
//            'art_type'=>'required|regex:/^\d*$/',
//            'art_tag'=>'required',
//        ],[
//            'required'=>':attribute 必须填写！',
//            'between'=>':attribute 必须在5~50个字符之间！',
//        ]);
//        $input=Input::except('_token');
//        if(Article::create($input)){
//            return redirect('admin/article');
//        }else{
//            return back()->with("errors","添加操作失败");
//        }
//    }
//    //后台轮播编辑Controller
//    public function edit($id)
//    {
//        //后台轮播编辑
//        $data=Article::find($id);
//        return view('admin.article.edit',compact('data'));
//    }
//
//    //后台轮播更新Controller
//    public function update(Request $request,$id)
//    {
//        //后台轮播更新
//        $this->validate($request,[
//            'art_title'=>'required|between:5,50',
//            'art_author'=>'required',
//            'art_content'=>'required',
//            'art_type'=>'required|regex:/^\d*$/',
//            'art_tag'=>'required',
//        ],[
//            'required'=>':attribute 必须填写！',
//            'between'=>':attribute 必须在5~50个字符之间！',
//        ]);
//
//        $input=Input::except('_token','_method');
//        $row = Article::find($id);
//        if($input && $row) {
//            $row->art_title=$input['art_title'];
//            $row->art_author=$input['art_author'];
//            $row->art_content=$input['art_content'];
//            $row->art_type=$input['art_type'];
//            $row->art_tag=$input['art_tag'];
//            $row->art_img=$input['art_img'];
//            $row->art_org=$input['art_org'];
//            $row->art_thumb=$input['art_thumb'];
//            $row->art_open=$input['art_open'];
//            $row->art_status=$input['art_status'];
//            if($row->update()){
//                return redirect('admin/article');
//            }else{
//                return back()->with('errors','轮播修改失败，稍后再试！');
//            }
//        }
//    }
//    //后台轮播删除Controller
//    public function destroy($id)
//    {
//        $del = Article::where('art_id',$id)->delete();
//
//        if($del){
//            return ['flag'=>0,'msg'=>'数据删除成功！'];
//        }else{
//            return ['flag'=>1,'msg'=>'数据删除失败！'];
//        }
//    }
//    //后台轮播测试Controller
//    public function test()
//    {
//        return view('admin.error');
//    }

}
