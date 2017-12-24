<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class ArticleTag extends Model
{
    //文章标签实体类
    protected $table='article_tag';
    protected $primaryKey='tag_id';
    protected $guarded=[];
    public $timestamps=false;
}
