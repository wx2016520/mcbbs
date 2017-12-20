<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link href="{{asset('/public/admin/css/H-ui.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('/public/admin/css/H-ui.login.css')}}" rel="stylesheet" type="text/css" />
    <title>后台登录</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
</head>
<body>
<input type="hidden" id="TenantId" name="TenantId" value="" />
<div class="header"></div>
<div class="loginWraper">
    <div id="loginform" class="loginBox">
        <form class="form form-horizontal" action="{{url('admin/login')}}" method="post">
            {{csrf_field()}}
            @if(session('msg'))
                <center><p style="color:red">{{session('msg')}}</p></center>
            @endif
            <div class="row cl">
                <label class="form-label col-3"></label>
                <div class="formControls col-8">
                    <input id="" name="user_name" type="text" placeholder="账户" class="input-text size-L">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label col-3"></label>
                <div class="formControls col-8">
                    <input id="" name="user_pwd" type="password" placeholder="密码" class="input-text size-L">
                </div>
            </div>
            <div class="row cl">
                <div class="formControls col-8 col-offset-3">
                    <input class="input-text size-L" type="text" placeholder="验证码" name="code" style="width:150px;">
                    <a id="kanbuq" href="javascript:;"><img src="{{url('admin/code')}}" onclick="this.src='{{url('admin/code?')}}'+Math.random()" alt="" style="cursor:pointer;"> 看不清，换一张</a> </div>
            </div>
            <div class="row">
                <div class="formControls col-8 col-offset-3">
                    <label for="online">
                        <input type="checkbox" name="online" id="online" value="">
                        使我保持登录状态</label>
                </div>
            </div>
            <div class="row">
                <div class="formControls col-8 col-offset-3">
                    <input name="" type="submit" class="btn btn-success radius size-L" value="&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;">
                    <input name="" type="reset" class="btn btn-default radius size-L" value="&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;">
                </div>
            </div>
        </form>
    </div>
</div>
<div class="footer">Copyright 你的公司名称 by 王草草</div>
<script type="text/javascript" src="{{asset('/public/admin/js/jquery-1.7.2.min.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/admin/js/H-ui.js')}}"></script>

</body>
</html>