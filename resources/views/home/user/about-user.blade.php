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
	    <div class="name">@</div>
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
    	<li class="active"><a href="">个人介绍</a></li>
	    <li ><a href="{{url('user-following')}}">关注 / 粉丝</a></li>
  	</ul>
    <div class="editor-text">
	    <p>实打实是否发光时代根深蒂固是否广东省是</p>
    </div>
</div>
</body>
@endsection

