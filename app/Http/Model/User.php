<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //用户实体类
    protected $table='user';
    protected $primaryKey='user_id';
    protected $guarded=[];
    public $timestamps=false;
}
