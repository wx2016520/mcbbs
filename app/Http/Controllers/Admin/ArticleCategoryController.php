<?php
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2017/12/24 0024
 * Time: 12:09
 */
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Model\ArticleCategory;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
class ArticleCategoryController extends Controller{
    public function index()
    {
        //查询所有分类
        $input=Input::except('_token','page');
        if(!$input){
            $input=array("category_title"=>"");
        }
        $data = ArticleCategory::leftJoin('user','user.user_id','=','article_category.category_author')->
            orderBy('category_time','desc')->select('user_name','category_id','category_time','category_title','category_status',
            'category_fid')->where('category_title', 'like', '%' . $input['category_title']. '%')->paginate(10);
        return view('admin.article.article_category_list',['keywords'=>$input,'data'=>$data]);
    }
    //后台文章分类新增Controller
    public function create()
    {
        $data = ArticleCategory::where('category_status', '=',1)->where('category_fid', '=',0)->get(['category_id','category_title']);
        //后台文章分类新增
        return view('admin.article.article_category_add',['data'=>$data]);
    }
    //后台文章分类新增保存Controller
    public function store(Request $request)
    {
        //后台文章分类新增保存
        $this->validate($request,[
            'category_title'=>'required|between:2,10',
            'category_author'=>'required',
            'category_fid'=>'required',
            'category_status'=>'required|regex:/^\d*$/',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~10个字符之间！',
        ]);
        $input=Input::except('_token');
        if(ArticleCategory::create($input)){
            return redirect('admin/article/category');
        }else{
            return back()->with("errors","添加操作失败");
        }
    }
    //后台文章分类编辑Controller
    public function edit($id)
    {
        //后台文章分类编辑
        $data=ArticleCategory::find($id);
        //查询分类
        $category = ArticleCategory::where('category_status', '=',1)->where('category_fid', '=',0)->get(['category_id','category_title']);
        return view('admin.article.article_category_edit',compact(['data','category']));
    }

    //后台文章分类更新Controller
    public function update(Request $request,$id)
    {
        //后台文章分类更新
        $this->validate($request,[
            'category_title'=>'required|between:2,10',
            'category_status'=>'required',
            'category_fid'=>'required',
            'category_status'=>'required|regex:/^\d*$/',
            'category_author'=>'required',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~10个字符之间！',
        ]);

        $input=Input::except('_token','_method');
        $row = ArticleCategory::find($id);
        if($input && $row) {
            $row->category_title=$input['category_title'];
            $row->category_status=$input['category_status'];
            $row->category_fid=$input['category_fid'];
            $row->category_status=$input['category_status'];
            $row->category_author=$input['category_author'];
            if($row->update()){
                return redirect('admin/article/category');
            }else{
                return back()->with('errors','文章分类修改失败，稍后再试！');
            }
        }
    }
    //后台文章分类删除Controller
    public function destroy($id)
    {
        $del = ArticleCategory::where('category_id',$id)->delete();

        if($del){
            return ['flag'=>0,'msg'=>'数据删除成功！'];
        }else{
            return ['flag'=>1,'msg'=>'数据删除失败！'];
        }
    }
}