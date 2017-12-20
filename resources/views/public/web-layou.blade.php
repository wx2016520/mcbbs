<!DOCTYPE html>
<html>
<html lang="zh_CN" class="">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<title>首页</title>
	<meta name="keywords" content=""/>
	<meta name="description" content="线线教育网站。"/>
	<meta content="X_zpzaO_pchFH5LX4fu3g3qYY9NSmjFuh7EXltyrf70" name="csrf-token"/>
	<meta content="0" name="is-login"/>
	<meta content="0" name="is-open"/>
	<meta property="qc:admins" content="242073150776545370763757" />
	<link rel="icon" href="/files/system/favicon_1427251704.ico?version=8.0.29" type="image/x-icon"/>
	<link rel="shortcut icon" href="/files/system/favicon_1427251704.ico?version=8.0.29" type="image/x-icon" media="screen"/>
	<link rel="stylesheet" href="{{asset('/public/home/css/vendor.css')}}" />
	<link rel="stylesheet" href="{{asset('/public/home/css/app-bootstrap.css')}}" />
	<link rel="stylesheet" href="{{asset('/public/home/css/main.css')}}" />
	<link rel="stylesheet" href="{{asset('/public/home/css/active.css')}}" />
</head>
    @section('style')
    @show
</head>
<body>
<!--导航栏-->
<header class="es-header navbar">
  	<div class="navbar-header">
    	<a href="{{url('/')}}" class="navbar-brand">
            <img src="{{asset('/public/home/picture/154339b63acd679602.png')}}">
        </a>
  	</div>
    <nav class="collapse navbar-collapse">
        <ul class="nav navbar-nav clearfix hidden-xs " id="nav">
         <li class=""> <a href="{{url('/')}}" >首页 </a></li>
            <li class="nav-hover"><a href="" >最新动态<b class="caret"></b></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="{{url('article')}}">最新文章</a></li>
                    <li><a href="{{url('active')}}">最新活动</a></li>
                </ul>
            </li>
            <li class=""><a href="{{url('article')}}" >技术博文</a></li>
            <li class=""><a href="{{url('video')}}" >视频直播</a></li>
<!--            <li class=""><a href="" >会员</a></li>-->
            <li class="nav-more nav-hover">
            <a class="more"><i class="es-icon es-icon-morehoriz"></i></a>
            <ul class="dropdown-menu" role="menu">
                <li class="nav-hover"><a href="{{url('about')}}" >关于我们</a></li>
            </ul>
         </li>
    	</ul>
    	<div class="navbar-user  left ">
    	@if(session('user'))
            <ul class="nav user-nav">
                <li class="user-avatar-li nav-hover">
	          		<a href="javascript:;" class="dropdown-toggle">
	            		<img class="avatar-xs" src="{{asset('/public/home/picture/avatar.png')}}">
	          		</a>
	          		<ul class="dropdown-menu" role="menu">
			            <li role="presentation" class="dropdown-header">{{session('user.user_name')}}</li>
			            <li><a href="{{url('user-about')}}"><i class="es-icon es-icon-person"></i>个人主页</a></li>
			            <li><a href="{{url('setting')}}"><i class="es-icon es-icon-setting"></i>个人设置</a></li>
			            <li class="hidden-lg user-nav-li-my">
			              <a href=""><i class="es-icon es-icon-eventnote"></i>个人中心 </a>
			            </li>
			            <li class="hidden-lg"><a href=""><span class="pull-right num"></span><i class="es-icon es-icon-notificationson"></i>通知</a></li>
			            <li class="hidden-lg"><a href=""><span class="pull-right num"></span><i class="es-icon es-icon-mail"></i>私信</a></li>
			            <li class="mobile-switch js-switch-mobile visible-xs"><a href="javascript:;"></a></li>
			            <li class="user-nav-li-logout"><a href="{{url('loginout')}}"><i class="es-icon es-icon-power"></i>退出登录</a></li>
	          		</ul>
        		</li>
        		<li class="visible-lg"><a href="{{url('mytopic')}}">个人中心</a></li>
        		<li class="visible-lg nav-hover">
            		<a><i class="es-icon es-icon-mail"></i></a>
	          		<ul class="dropdown-menu" role="menu">
		            	<li>
		              		<a href=""><span class="pull-right num"></span><i class="es-icon es-icon-mail"></i>私信</a>
		            	</li>
	          		</ul>
        		</li>
        	</ul>
            @else
        	<ul class="nav user-nav">
                <li class="user-avatar-li nav-hover visible-xs">
                    <a href="javascript:;" class="dropdown-toggle">
                        <img class="avatar-xs" src="{{asset('/public/home/picture/avatar.png')}}">
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="user-nav-li-login">
                            <a href="{{url('login')}}">
                                <i class="es-icon es-icon-denglu"></i>登录
                            </a>
                        </li>
                        <li class="user-nav-li-register">
                            <a href="{{url('register')}}">
                                <i class="es-icon es-icon-zhuce"></i>注册
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="hidden-xs"><a href="{{url('login')}}">登录</a></li>
                <li class="hidden-xs"><a href="{{url('register')}}">注册</a></li>
            </ul>
            @endif
	        <form class="navbar-form navbar-right hidden-xs hidden-sm" action="" method="get">
		        <div class="form-group">
		          <input class="form-control js-search" value="" name="q" placeholder="搜索">
		          <button class="button es-icon es-icon-search"></button>
		        </div>
	      	</form>
    	</div>
  </nav>
</header>
@section('content')
@show
<!-- 底部链接 -->
<div class="es-footer-link">
	<div class="container">
		<div class="row">
			<div class="col-md-8 footer-main clearfix">
				<div class="link-item ">
					<h3>我是新手</h3>
					<ul>
						<li><a href="" target="_blank">如何注册</a></li>
					</ul>
				</div>
				<div class="link-item ">
					<h3>我是大神</h3>
					<ul>
						<li><a href="">发布文章</a></li>
					</ul>
				</div>
				<div class="link-item ">
					<h3>我是管理员</h3>
					<ul>
						<li><a href="">系统设置</a></li>
					</ul>
				</div>
				<div class="link-item hidden-xs">
					<h3>特权专区</h3>
					<ul>
						<li><a href="">会员专区</a></li>
					</ul>
				</div>
				<div class="link-item hidden-xs">
					<h3>关于我们</h3>
					<ul>
						<li><a href="">加入我们</a></li>
					</ul>
				</div>
			</div>
			<div class="col-md-4 footer-logo hidden-sm hidden-xs">
				<a class="" href=""><img src="{{asset('/public/home/picture/bottom_logo.png')}}" alt="建议图片大小为233*64"></a>
				<div class="footer-sns">
					<a href=""><i class="es-icon es-icon-weibo"></i></a>
					<a class="qrcode-popover top">
						<i class="es-icon es-icon-weixin"></i>
						<div class="qrcode-content">
							<img src="{{asset('/public/home/picture/weixin.png')}}" alt="">
						</div>
					</a>
					<a class="qrcode-popover top">
						<i class="es-icon es-icon-apple"></i>
						<div class="qrcode-content">
							<img src="{{asset('/public/home/picture/apple.png')}}" alt="">
						</div>
					</a>
					<a class="qrcode-popover top">
						<i class="es-icon es-icon-android"></i>
						<div class="qrcode-content">
							<img src="{{asset('/public/home/picture/android.png')}}" alt="">
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- footer -->
<footer class="es-footer">
	<div class="copyright">
		<div class="container">
			Powered by <a href="">wcc v1.0.0.0</a>
			©2014-2017 <a class="mlm" href="" target="_blank">王草草</a>
		</div>
	</div>
</footer>
</div>
<script>
  if (typeof app === 'undefined') {
      var app = {};
  }
</script>
<script type="text/javascript" src="{{asset('/public/home/js/translator.min.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/vendor.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/common.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/main.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/echo-js.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/index.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/perfect-scrollbar.js')}}"></script>


</body>
</html>
