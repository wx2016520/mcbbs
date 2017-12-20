<?php

namespace App\Http\Controllers\Home;

use App\Http\Model\Article;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
class ArticleController extends CommonController
{
    public function index()
    {
        //查询所有文章
        $data = Article::leftJoin('user','user.user_id','=','article.art_author')->where('art_open','=','1')->orderBy('art_time','desc')
            ->select('user_name','art_id','art_img','art_time','art_content','art_view','art_title','art_reply')->paginate(5);
        return view('home.article',['data'=>$data]);
   }

    public function show($id)
    {
        $data=Article::leftJoin('user','user_id','=','art_author')->find($id);
        return view('home.article_detail',['data'=>$data]);
   }
}
