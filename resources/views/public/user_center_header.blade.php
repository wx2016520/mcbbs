<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>个人中心</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="icon" href="" type="image/x-icon" />
<!--    <link href="{{asset('/public/home/css/colorbox.css')}}" rel="stylesheet" type="text/css">-->
<!--    <link href="{{asset('/public/home/css/nanoscroller.css')}}" rel="stylesheet" type="text/css">-->
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/base.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/editor.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/wqdMysite.css')}}">
<!--    <link rel="stylesheet" href="{{asset('/public/home/css/header-footer1.css')}}">-->
    <link rel="stylesheet" href="{{asset('/public/home/css/siteSet.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/header.css')}}" />
    <script type="text/javascript" src="{{asset('/public/home/js/jquery-1.11.2.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/home/js/jquery.nanoscroller.js')}}"></script>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/siteHome.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/website.css')}}">
    <script type="text/javascript" src="{{asset('/public/home/js/jquery-1.11.2.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/home/js/jquery.colorbox-min.js')}}"></script>
    <script src="{{asset('/public/home/js/Coursel.js')}}"></script>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/home/css/info.css')}}">
    @section('style')
    @show
</head>
<body>
<div class="wqd-menu wqd-menu-other">
    <div class="wqd-view">
        <a href="{{url('')}}" class="wqd-logo-a">
            <img class="wqd-logo" src="{{asset('/public/home/picture/wqd-logo.png')}}" />
            <img class="wqd-logo-blue" src="{{asset('/public/home/picture/wqd-logo-blue.png')}}" />
        </a>
        <ul class="wqd-remenu">
            @foreach($nav as $v)
            <li class="">
                <a href="{{$v->navigation_url}}">{{$v->navigation_name}}</a>
            </li>
            @endforeach
<!--            <li class="">-->
<!--                <a href="{{url('')}}">首页</a>-->
<!--            </li>-->
<!--            <li class="on">-->
<!--                <a href="javascript:void(0)">网站模板</a>-->
<!--            </li>-->
<!--            <li class="">-->
<!--                <a href="javascript:void(0)">用户案例</a>-->
<!--            </li>-->
<!--            <li class="pricebox ">-->
<!--                <i class="iconbg"></i>-->
<!--                <a href="javascript:void(0)">产品套餐</a>-->
<!--            </li>-->
<!--            <li class="">-->
<!--                <a href="javascript:void(0)">代理加盟</a>-->
<!--            </li>-->
<!--            <li>-->
<!--                <a href="javascript:void(0)" >网站定制</a>-->
<!--            </li>-->
<!--            <li>-->
<!--                <a href="javascript:void(0)">使用指南</a>-->
<!--            </li>-->

        </ul>
        <ul class="wqd-site">
            @if(session('user'))
            <li class="login-kli">
                <a href="{{url('mysite')}}" class="wqd-mysite">个人中心</a>
                <div class="login-user">
                    <div class="login-img">
                        <img src="{{asset('/public/home/picture/head.jpg')}}">
                    </div>
                    <div class="login-box">
                        <ul class="login-list">
                            <li class="login-first"><i class="nwqd nwqd-login-user"></i>
                                15086600537</li>
                            <li><a href="{{url('setting')}}"><i class="nwqd nwqd-login-set"></i>账号设置</a></li>
                            <li><a href="{{url('loginout')}}"><i class="nwqd nwqd-login-outer"></i>退出登录</a></li>
                        </ul>
                    </div>
                </div>
            </li>
            @else
            <li class="site-li"><a href="{{url('register')}}" class="wqd-login">注册</a></li>
            <li class="site-li"><a href="{{url('login')}}" class="wqd-register">登录</a></li>
            @endif
        </ul>
    </div>
</div>
@section('content')
@show
<script type="text/javascript" src="{{asset('/public/home/js/highcharts.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/jquery.nanoscroller.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/jquery.qrcode.min.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/punycode.min.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/require.js')}}" data-main="{{asset('/public/home/js/main.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/wqdProgress.js')}}"></script>
</body>
</html>
