<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    //导航实体类
    protected $table='navigation';
    protected $primaryKey='navigation_id';
    protected $guarded=[];
    public $timestamps=false;
}
