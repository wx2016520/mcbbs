<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class ArticleCategory extends Model
{
//文章分类实体类
protected $table='article_category';
protected $primaryKey='category_id';
protected $guarded=[];
public $timestamps=false;
}
