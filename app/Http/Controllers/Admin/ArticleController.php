<?php

namespace App\Http\Controllers\Admin;
use App\Http\Model\Article;
use App\Http\Model\ArticleTag;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use App\Http\Model\ArticleCategory;
use Illuminate\Support\Facades\Validator;
class ArticleController extends Controller
{
    //后台文章Controller
    public function index()
    {
        $input=Input::except('_token','page');
        if(!$input){
            $input=array("art_title"=>"");
        }
        //查询所有文章
        $data = Article::leftJoin('user','user.user_id','=','article.art_author')->
                         leftJoin('article_category','article_category.category_id','=','article.art_category')->
                         leftJoin('article_tag','article_tag.tag_id','=','article.art_tag')->orderBy('art_time','desc')
                         ->select('user_name','category_title','tag_name','art_id','art_img','art_time','art_content','art_view',
                         'art_title','art_reply','art_category')->where('art_title', 'like', '%' . $input['art_title']. '%')->paginate(10);
        return view('admin.article.index',['keywords'=>$input,'data'=>$data]);
    }
    //后台文章新增Controller
    public function create()
    {
        //查询分类
        $category = ArticleCategory::where('category_status', '=',1)->where('category_fid', '!=',0)->get(['category_id','category_title']);
        $tag = ArticleTag::where('tag_status', '=',1)->get(['tag_id','tag_name']);
        return view('admin.article.add',compact(['category','tag']));
    }
    //后台文章新增保存Controller
    public function store(Request $request)
    {
        //后台文章新增保存
        $this->validate($request,[
            'art_title'=>'required|between:5,50',
            'art_author'=>'required',
            'art_content'=>'required',
            'art_category'=>'required|regex:/^\d*$/',
            'art_tag'=>'required',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在5~50个字符之间！',
        ]);
        $input=Input::except('_token');
        if(Article::create($input)){
            return redirect('admin/article');
        }else{
            return back()->with("errors","添加操作失败");
        }
    }
    //后台文章编辑Controller
    public function edit($id)
    {
        //后台文章编辑
        $data=Article::find($id);
        //查询分类
        $category = ArticleCategory::where('category_status', '=',1)->where('category_fid', '!=',0)->get(['category_id','category_title']);
        $tag = ArticleTag::where('tag_status', '=',1)->get(['tag_id','tag_name']);
        return view('admin.article.edit',compact(['data','category','tag']));
    }

    //后台文章更新Controller
    public function update(Request $request,$id)
    {
        //后台文章更新
        $this->validate($request,[
            'art_title'=>'required|between:2,50',
            'art_author'=>'required',
            'art_content'=>'required',
            'art_category'=>'required|regex:/^\d*$/',
            'art_tag'=>'required',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~50个字符之间！',
        ]);

        $input=Input::except('_token','_method');
        $row = Article::find($id);
        if($input && $row) {
            $row->art_title=$input['art_title'];
            $row->art_author=$input['art_author'];
            $row->art_content=$input['art_content'];
            $row->art_category=$input['art_category'];
            $row->art_tag=$input['art_tag'];
            $row->art_img=$input['art_img'];
            $row->art_org=$input['art_org'];
            $row->art_thumb=$input['art_thumb'];
            $row->art_open=$input['art_open'];
            $row->art_status=$input['art_status'];
            if($row->update()){
                return redirect('admin/article');
            }else{
                return back()->with('errors','文章修改失败，稍后再试！');
            }
        }
    }
    //后台文章删除Controller
    public function destroy($id)
    {
        $del = Article::where('art_id',$id)->delete();

        if($del){
            return ['flag'=>0,'msg'=>'数据删除成功！'];
        }else{
            return ['flag'=>1,'msg'=>'数据删除失败！'];
        }
    }
    //后台文章测试Controller
    public function test()
    {
        return view('admin.error');
    }

}
