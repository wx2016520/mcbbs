@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 登陆 -->
<div id="content-container" class="container">
    <div class="es-section login-section">
    <div class="logon-tab clearfix">
       	<a class="active">登录帐号</a>
       	<a href="{{url('register')}}">注册帐号</a>
    </div>
    <div class="login-main">
      	<form id="login-form" class="form-vertical" method="post" action="{{url('login')}}">
      	        {{csrf_field()}}
                @if(session('msg'))
                <div class="alert alert-danger">{{session('msg')}}</div>
                @endif
        	<div class="form-group mbl">
          		<label class="control-label" for="login_username">帐号</label>
          		<div class="controls">
            		<input class="form-control input-lg" id="login_username" type="text" name="name_phone" value="" required placeholder='邮箱/手机/用户名'/>
            		<div class="help-block"></div>
          		</div>
        	</div>
	        <div class="form-group mbl">
	          	<label class="control-label" for="login_password">密码</label>
	          	<div class="controls">
	            	<input class="form-control input-lg" id="login_password" type="password" name="password" required placeholder='密码'/>
	          	</div>
	        </div>
        	<div class="form-group mbl">
	          	<div class="controls">
	            	<input type="checkbox" name="_remember_me" checked="checked"> 记住密码
	          	</div>
        	</div>
	        <div class="form-group mbl">
	        <input type="submit" class="btn btn-primary btn-lg btn-block js-btn-login" value="登陆">

	        </div>
	        <input type="hidden" name="_target_path" value="">
	        <input type="hidden" name="_csrf_token" value="bGGpIs9tLacd5r08dPyjwQffdeIPQY0H4ZjCFZmrWeo">
      	</form>
      	<div class="mbl">
	        <a class="link-primary" href="/password/reset">找回密码</a>
		        <span class="color-gray mhs">|</span>
		        <span class="color-gray">还没有注册帐号？</span>
	        <a class="link-primary" href="{{url('login')}}">立即注册</a>
      	</div>
		<div class="social-login">
	        <span>
		      	<a href="/login/bind/weibo?_target_path=http%3A//demo.edusoho.com/&amp;inviteCode=" class="social-icon social-weibo">
		      		<i class="es-icon es-icon-weibo"></i>
		    	</a>
		      	<a href="{{url('qqlogin')}}" class="social-icon social-qq">
		      		<i class="es-icon es-icon-qq"></i>
		    	</a>
		      	<a href="/login/bind/weixinweb?_target_path=http%3A//demo.edusoho.com/&amp;inviteCode=" class="social-icon social-weixin">
		      		<i class="es-icon es-icon-weixin"></i>
		    	</a>
	        </span>
            <div class="line"></div>
        </div>
    </div>
	</div>
</div>
</body>
@endsection

