<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //文章实体类
    protected $table='article';
    protected $primaryKey='art_id';
    protected $guarded=[];
    public $timestamps=false;
}
