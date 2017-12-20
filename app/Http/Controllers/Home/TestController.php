<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
require_once 'resources/org/tools/phpQuery/phpQuery.php';
class TestController extends CommonController
{
    //面试题测试方法Controller
    public function index()
    {
        $str="wwww.baidu.com";
        //1:字符串转数组
        $arr=str_split($str);
        $arr=explode(".",$str);
        //2:数组转字符串
        $array=Array('aaa','bbb','ccc1');
        $arr=implode('',$array);
        $arrs=join($array);
        //3:字符串截取
        $sub=substr($str,0,5);
        $str="假猪套天下第一";
        $subs=mb_substr($str,0,3);//按字数
        $subss=mb_strcut($str,0,3);//按字节
        //4:字符串替换 将linux php替换为Java
        $str="linux is very much php";
        $preg=preg_replace('/linux|php/','java',$str);
        //5:字符串查找  strpos strrpos preg_match preg_match_all
        $url="/web/a/b/index.php";
        $date=strpos($url,'/');//匹配第一个出现的下表
        $data=strrpos($url,'/');//匹配最后一个出现的下标
        //6:得到文件部分和目录部分
        $path=basename($url);
        $path=dirname($url);
        //7:将字符串中的p*p全部查找出来
        $str="pcp is pbp and pap";
        $data=preg_match_all('/p.p/',$str,$ms);
        //8:将08/26/2003 输出为2003/08/26
        $date="08/26/2003";
        $info =preg_replace('/(\d+)\/(\d+)\/(\d+)/','$3/$1/$2',$date);
        //9:截取文件路劲的各部位
        $url="http://localhost/a/b/indx.php";
        $data=pathinfo($url);
        $data=parse_url($url);
        //10:将每个单词的首字母大写
        $str="li_ning_nice";
        $strs=str_replace("_"," ",$str);
        $data=ucfirst($strs);//只有第一个大写
        $data=ucwords($strs);//所有单词第一个大写
        //11:统计数组里相同的元素
        $arr=array("中国","美国","英国","韩国","中国","中国","韩国","美国","中国","英国","美国");
        //dd(array_count_values($arr));
        //12:php冒泡排序
        $arr=array('5','3','4','6','8','2','7','1');
        for($v=0;$v<count($arr);$v++){
            for($i=count($arr)-1;$i>$v;$i--){
                if($arr[$i]<$arr[$i-1]){
                    $linshi=$arr[$i];
                    $arr[$i]=$arr[$i-1];
                    $arr[$i-1]=$linshi;
                }
            }
        }
        //13：网站抓取
        $data=[
            'title'=>array(),
            'content'=>array(),
            'type'=>array(),
            'time'=>array(),
            'view'=>array(),
            'author'=>array(),
        ];
        //\phpQuery::newDocumentFile('http://blog.csdn.net/');
        \phpQuery::newDocumentFile('http://blog.csdn.net/');
        $data = pq('div#')->html();
        dd ($data);
        foreach($data as $d)
        {
            echo pq($d)->find('h3 a')->text()."<br>";
        }
        //return view('home.test');
    }
}
