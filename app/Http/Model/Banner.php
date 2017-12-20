<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    //文章实体类
    protected $table='banner';
    protected $primaryKey='banner_id';
    protected $guarded=[];
    public $timestamps=false;
}
