<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\Article;
use App\Http\Model\Navigation;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
class CommonController extends Controller
{
    public function __construct()
    {
//        //站长推荐的hot 6篇文章
//        $click = Article::orderBy('art_view','desc')->take(5)->get(['art_id','art_title','art_content']);
//
//        //最新发布的new 8篇文章
//        $new= Article::orderBy('pub_time','desc')->take(8)->get(['art_id','art_title']);
        /*获取点击率最高的6篇文章*/
        $article=Article::orderBy('art_view','desc')->take(5)->get(['art_id','art_title','art_img']);
        /*获取最新发布的6篇文章*/
        $new=Article::where('art_img','!=','')->orderBy('art_time','desc')->take(8)->get(['art_id','art_title','art_img']);
        /*获取评论最多的6篇文章*/
        $reply=Article::orderBy('art_reply','desc')->take(5)->get(['art_id','art_title']);
         /*查询首页一级导航*/
        $fnav = Navigation::where('navigation_type','=','1')->where('navigation_open','=','1')->where('navigation_fid','=','0')
            ->orderBy('navigation_order','asc')->take(10)->get(['navigation_id','navigation_name','navigation_url','navigation_fid','navigation_order','navigation_url','navigation_window','navigation_open']);
        /*查询首页二级导航*/
        $snav = Navigation::where('navigation_type','=','1')->where('navigation_open','=','1')->where('navigation_fid','!=','0')
            ->orderBy('navigation_order','asc')->take(10)->get(['navigation_id','navigation_name','navigation_url','navigation_fid','navigation_order','navigation_url','navigation_window','navigation_open']);
        View::share(compact('fnav','snav','article','new','reply'));
    }

    public function debug($val,$dump=false,$exit=true)
    {
        //自动获取调试函数的名称$func
        if($dump){
            $func='var_dump()';
        }else{
            $func=(is_array($val) || is_object($val))? 'print_r' : 'printf';
         }
         //输出到html
        heard("Content-type:texl/html;chartser=utf-8");
        echo '<pre> debug output<hr/>';
        $func($val);
        echo '<pre>';
        if($exit) $exit;

    }

}
