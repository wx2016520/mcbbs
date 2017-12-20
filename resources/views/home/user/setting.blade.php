@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 资讯头部 -->
<div id="content-container" class="container">
    <div class="row">
  	<div class="col-md-3">
    <div class="sidenav">
        <ul class="list-group">
          	<li class="list-group-heading">个人设置</li>
          	<li class="list-group-item active">
            	<a href=""><i class="glyphicon glyphicon-user"></i> 基础信息</a>
          	</li>
          	<li class="list-group-item ">
            	<a href=""><i class="glyphicon glyphicon-picture"></i> 头像设置</a>
          	</li>
        </ul>
   	</div>
    </div>
  	<div class="col-md-9">
    	<div class="panel panel-default panel-col">
	  	<div class="panel-heading">基础信息</div>
	  	<div class="panel-body">
			<form id="user-profile-form" class="form-horizontal" method="post">
				<div class="form-group">
					<label class="col-md-2 control-label" for="profile_truename">真实姓名</label>
					<div class="col-md-7 controls radios">
	              		<input type="text" id="profile_truename" name="profile[truename]" class="form-control" data-widget-cid="widget-1" data-explain="" value="">
	              		<div class="help-block" style="display:none;"></div>
            		</div>
            	</div>
				<div class="form-group">
					<label class="col-md-2 control-label">性别</label>
					<div class="col-md-7 controls radios">
						<div id="profile_gender">
							<input type="radio" id="profile_gender_0" name="profile[gender]" value="male" >
							<label for="profile_gender_0">男</label>
							<input type="radio" id="profile_gender_1" name="profile[gender]" value="female" >
							<label for="profile_gender_1">女</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="profile_mobile" class="col-md-2 control-label">手机号码</label>
					<div class="col-md-7 controls">
						<input type="text" id="profile_mobile" name="profile[mobile]" class="form-control" data-widget-cid="widget-5" data-explain="" value="">
						<div class="help-block" style="display:none"></div>
                    </div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">头衔</label>
					<div class="col-md-7 controls">
						<input type="text" id="profile_title" name="profile[title]" class="form-control" value="">
						<div class="help-block" style="display:none;"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">个人签名</label>
					<div class="col-md-7 controls">
						<textarea type="text" rows="4" maxlength="80" id="profile_signature" name="profile[signature]" class="form-control">防守打法发根深蒂固十多个是</textarea>
						<div class="help-block" style="display:none;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-7 col-md-offset-2">
						<button id="profile-save-btn" data-submiting-text="正在保存..." type="submit" class="btn btn-primary">保存</button>
					</div>
				</div>
			</form>
		</div>
	</div>
  	</div>
	</div>
</div>
</body>
@endsection

