@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 资讯头部 -->
<div class="user-center-header" data-sharpness="40">
  	<div class="container clearfix">
    <div class="user-avatar">
      	<div class="avatar-wrap">
        	<img class="avatar-lg" src="{{asset('/public/home/picture/avatar.png')}}">
        </div>
	    <div class="name">超坏小男人ve</div>
      	<div class="position">
        	<span class="mrm">暂无头衔</span>
        </div>
      	<div class="mates">
        	<span class="mrm">0</span>粉丝<span class="mlm mrm">｜</span><span class="mrm">0</span>关注
      	</div>
    </div>
    <div class="user-about hidden-sm hidden-xs">
      <div class="user-about-content">防守打法发根深蒂固十多个是 </div>
    </div>
  	</div>
  	<div class="mask"></div>
</div>
<div id="content-container" class="container">
    <ul class="nav nav-tabs clearfix">
    	<li ><a href="{{url('user-about')}}">个人介绍</a></li>
	    <li class="active"><a href="">关注 / 粉丝</a></li>
  	</ul>
    <ul class="nav nav-pills mbl">
        <li class="active"><a href="">关注</a></li>
        <li ><a href="">粉丝</a></li>
    </ul>
    <div class="row">
        <div class="col-md-3">
            <div class="teacher-item">
                <div class="teacher-top">
                    <a class="teacher-img" href="">
                        <img class="avatar-lg" src="{{asset('/public/home/picture/meinv.jpg')}}" alt="">
                    </a>
                    <h3 class="title">
                        <a class="link-dark" href="">苍老师</a>
                    </h3>
                    <div class="position">主播</div>
                </div>
                <div class="teacher-bottom">
                    <div class="about">美女主播可惜已人老珠黄...</div>
                    <div class="metas">
                        <a class="btn btn-primary btn-sm follow-btn" href="javascript:;" data-url=""  style="display:none;" data-loggedin="1">关注</a>
                        <a class="btn btn-default btn-sm unfollow-btn" href="javascript:;" data-url="" >已关注</a>
                        <a class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal" data-backdrop="static"  data-url="">私信</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
@endsection

