@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 注册 -->
<div id="content-container" class="container">
    <div class="es-section login-section">
		<div class="logon-tab clearfix">
			<a href="{{url('login')}}">登录帐号</a>
			<a class="active">注册帐号</a>
		</div>
		<div class="login-main">
			<form id="register-form" method="post" action="{{url('register')}}">
			  {{csrf_field()}}
              @if(count($errors)>0)
              <div class="alert alert-danger">
                  @if(is_object($errors) )
                  @foreach($errors->all() as $error)
                  <p>{{$error}}</p>
                  @endforeach
                  @else
                  <p>{{$errors}}</p>
                  @endif
              </div>
              @endif
				<div class="form-group mbl">
					<label class="control-label required" for="register_emailOrmobile">手机/邮箱</label>
					<div class="controls">
						<input type="text" id="register_emailOrMobile" name="user_phone"  class="form-control input-lg" data-url="/register/email_or_mobile/check" placeholder="填写你常用的邮箱或手机号码作为登录帐号">
						<p class="help-block"></p>
					</div>
				</div>
				<div class="form-group mbl">
					<label class="control-label required" for="register_password">密码</label>
					<div class="controls">
						<input type="password" id="register_password" name="user_pwd" required="required" class="form-control input-lg" placeholder="5-20位英文、数字、符号，区分大小写">
						<p class="help-block"></p>
					</div>
				</div>
				<div class="form-group mbl js-captcha">
					<label class="control-label required" for="captcha_code">验证码</label>
					<div class="controls row">
						<div class = "col-xs-7">
							<input type="text" class="form-control input-lg" id="captcha_code" names="captcha" maxlength="5" placeholder="验证码"  >
							<p class="help-block"></p>
						</div>
						<div class="col-xs-5">
						    <img src="{{url('admin/code')}}" onclick="this.src='{{url('admin/code?')}}'+Math.random()"  id="getcode_num" title="看不清，点击换一张" style="cursor:pointer;height:40px;width:100%">
						</div>
					</div>
				</div>
				<div class="form-group mbl hidden email_mobile_msg">
					<label class="control-label required" for="sms_code">短信验证码</label>
					<div class="controls row" >
						<div class = "col-xs-7" >
							<input type="number" class="form-control input-lg" id="sms_code" names="sms_code" placeholder="填写你的短信验证码" data-url="/edu_cloud/sms_check/sms_registration">
							<p class="help-block"> </p>
						</div>
						<div class="col-xs-5">
							<a href="#modal" data-toggle="modal" class="btn btn-default btn-lg js-sms-send disabled" data-url="/register/captcha/modal" data-sms-url="/edu_cloud/sms_send">
								<span id="js-time-left"></span>
								<span id="js-fetch-btn-text">短信验证</span>
							</a>
						</div>
					</div>
				</div>
				<div class="form-group hidden mbl">
					<label class="control-label hidden required" for="invite_code">邀请码<span class="color-success">（选填）</span></label>
					<div class="controls">
						<input type="text" names="invite_code" class="form-control input-lg invitecode" data-url="/register/invitecode/check" placeholder="如果您有邀请码，请填写您的邀请码">
					</div>
				</div>
				<div class="form-group mbl">
					<div class="controls">
						<label>
							<input type="checkbox" id="user_terms" checked="checked" names="userterms"> 我已阅读并同意<a href="/userterms" target="_blank">《服务协议》</a>
						</label>
					</div>
				</div>
				<div class="form-group mbl">
					<div class="controls">
						<button type="submit" id="register-btn" data-submiting-text="正在提交..." class="btn btn-primary btn-lg btn-block">注册</button>
					</div>
				</div>
				<input type="hidden" names="captcha_enabled" value="1" />
			</form>
			<div class="social-login">
	            <span>
		      		<a href="/login/bind/weibo?_target_path=http%3A//demo.edusoho.com/&amp;inviteCode=" class="social-icon social-weibo">
		      			<i class="es-icon es-icon-weibo"></i>
		    		</a>
				    <a href="/login/bind/qq?_target_path=http%3A//demo.edusoho.com/&amp;inviteCode=" class="social-icon social-qq">
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

