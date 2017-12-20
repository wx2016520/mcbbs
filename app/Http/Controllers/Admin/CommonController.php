<?php

namespace App\Http\Controllers\Admin;


use App\Http\Model\Article;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Intervention\Image\ImageManagerStatic as Image;
class CommonController extends Controller
{
    //图片上传
    public function upload()
    {

        $file = Input::file('Filedata');
        if($file -> isValid()){
            $entension = $file -> getClientOriginalExtension(); //上传文件的后缀.
            $pathd = 'uploadfile/images/' . date('Ymd'); //文件保存路径
            $newh = date('Ymd') . mt_rand(10000,99999).'.'.$entension;//文件名不加[org_,img_,thumb_等]

            $newName = 'org_'.$newh;
            $path = $file -> move(base_path().'/'.$pathd, $newName);

            if ($path) { //移动成功，返回路径
                $org_path = base_path().'/'.$pathd . '/' . $newName; //原始图的保存路径
                $db_org_path = $pathd . '/' . $newName; //原始图的保存路径[放入数据库的路径]


                $newName = 'img_' . $newh;
                $img_path = base_path().'/'.$pathd . '/' . $newName; //中等图的保存路径
                $db_img_path =  $pathd . '/' . $newName; //中等图的保存路径[放入数据库的路径]

                $newName = 'thumb_'.$newh;
                $thumb_path = base_path().'/'.$pathd . '/' . $newName; //缩略图的保存路径
                $db_thumb_path = $pathd . '/' . $newName; //缩略图的保存路径[放入数据库的路径]

                Image::make($org_path)->resize(null, 117, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })->save($img_path);//中等图的保存路径

                Image::make($org_path)->resize(null, 80, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })->save($thumb_path);//缩略图的保存路径


            }
        }

        return (
        [
            "org"=>$db_org_path,
            "img"=>$db_img_path,
            "thumb"=>$db_thumb_path
        ]
        );
    }
}
