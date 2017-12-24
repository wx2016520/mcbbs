<?php
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2017/12/24 0024
 * Time: 12:09
 */
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Model\ArticleTag;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
class ArticleTagController extends Controller{
    public function index()
    {
        //查询所有标签
        $input=Input::except('_token','page');
        if(!$input){
            $input=array("tag_name"=>"");
        }
        $data = ArticleTag::leftJoin('user','user.user_id','=','article_tag.tag_author')->
            orderBy('tag_time','desc')->select('user_name','tag_id','tag_time','tag_name','tag_status')->
            where('tag_name', 'like', '%' . $input['tag_name']. '%')->paginate(10);
        return view('admin.article.article_tag_list',['keywords'=>$input,'data'=>$data]);
    }
    //后台文章标签新增Controller
    public function create()
    {
        return view('admin.article.article_tag_add');
    }
    //后台文章标签新增保存Controller
    public function store(Request $request)
    {
        //后台文章标签新增保存
        $this->validate($request,[
            'tag_name'=>'required|between:2,5',
            'tag_author'=>'required',
            'tag_status'=>'required|regex:/^\d*$/',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在2~5个字符之间！',
        ]);
        $input=Input::except('_token');
        if(ArticleTag::create($input)){
            return redirect('admin/article/tag');
        }else{
            return back()->with("errors","添加操作失败");
        }
    }
    //后台文章标签编辑Controller
    public function edit($id)
    {
        //后台文章标签编辑
        $data=ArticleTag::find($id);
        return view('admin.article.article_tag_edit',compact(['data']));
    }

    //后台文章标签更新Controller
    public function update(Request $request,$id)
    {
        //后台文章标签更新
        $this->validate($request,[
            'tag_name'=>'required|between:2,5',
            'tag_author'=>'required',
            'tag_status'=>'required|regex:/^\d*$/',
        ],[
            'required'=>':attribute 必须填写！',
            'between'=>':attribute 必须在5~50个字符之间！',
        ]);

        $input=Input::except('_token','_method');
        $row = ArticleTag::find($id);
        if($input && $row) {
            $row->tag_name=$input['tag_name'];
            $row->tag_author=$input['tag_author'];
            $row->tag_status=$input['tag_status'];
            if($row->update()){
                return redirect('admin/article/tag');
            }else{
                return back()->with('errors','文章标签修改失败，稍后再试！');
            }
        }
    }
    //后台文章标签删除Controller
    public function destroy($id)
    {
        $del = ArticleTag::where('tag_id',$id)->delete();

        if($del){
            return ['flag'=>0,'msg'=>'数据删除成功！'];
        }else{
            return ['flag'=>1,'msg'=>'数据删除失败！'];
        }
    }
}