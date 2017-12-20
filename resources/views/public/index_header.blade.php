<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>首页</title>
    <meta name="keywords" content=""/>
    <meta name="description" content="" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta property="qc:admins" content="233322167467141166375" />
    <link rel="icon" href="JavaScript:void(0)" type="image/x-icon" />
    <link rel="icon" href="JavaScript:void(0)" type="image/x-icon" />
    <link rel="stylesheet" href="{{asset('/public/home/css/base.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/animate.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/header.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/footer.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/public.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/home/css/pagination.css')}}">
    <script type="text/javascript" src="{{asset('/public/home/js/jquery-1.11.2.min.js')}}" ></script>
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
                                {{session('user.user_phone')}}</li>
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
<div class="wqd-footer">
    <div class="footer-box">
        <div class="footer-news">
            <h6>最新动态</h6>
            <ul>
                <li>
                    <span>·</span>
                    <a title='测试' href='JavaScript:void(0)'
                       target='_blank'>
                        测试</a>
                </li>
            </ul>
        </div>
        <div class="footer-pull">
            <h6>关于我们</h6>
            <a href="JavaScript:void(0)" target="_blank">关于我们</a>

        </div>
        <div class="footer-pull">
            <h6>官网论坛</h6>
            <a href="JavaScript:void(0)" target="_blank" >新手指南</a>
            <a href="JavaScript:void(0)" target="_blank" >高级教程</a>

        </div>
        <div class="footer-pull">
            <h6>建站百科</h6>
            <a href="JavaScript:void(0)" target="_blank" >建站经验</a>

        </div>
        <div class="footer-pull footer-pull-more">
            <h6>建站专题</h6>
            <a href="JavaScript:void(0)" target="_blank" >网站建设</a>

            <a href="JavaScript:void(0)" target="_blank">企业建站</a>
            <a href="JavaScript:void(0)" target="_blank">SEO推广</a>
        </div>
        <div class="footer-pull">
            <h6>相关链接</h6>
            <a href="JavaScript:void(0)" target="_blank">测试</a>
            <a href="https://www.bobcoder.cc/" target="_blank">Bob的博客</a>
        </div>
        <div class="footer-about">
            <a class="wqd-btn-blue footer-btn" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=800180019&site=qq&menu=yes">客服QQ : 422300135</a>
            <p>客服电话：18181866440</p>
            <p>客服邮箱：wxwcc.com</p>
            <p>周一至周五 9:00-18:00</p>
        </div>
    </div>
</div>
<div class="footer-img">
    <p>Copyright&nbsp;&copy;&nbsp;2017-2018 wxwcc.xin All Rights Reserved 王草草版权所有
        <a href="JavaScript:void(0)" target="_blank" >蜀ICP备17025496号-1</a>
        蜀ICP备17025496号 <span id="kx_verify"></span>
        <a  key ="5832c14cefbfb014cd5697a5"  logo_size="83x30"  logo_type="business"  href="JavaScript:void(0)" id="safe">
        <script src="{{asset('/public/home/js/aq_auth.js')}}"></script></a></p>
</div>
<div class="wqd-help">
    <div class="wqd-help-box">
        <div class="wqd-help-icon">
            <div class="animated-circles js-animated-circles">
                <div class="circle c-1"></div>
                <div class="circle c-2"></div>
                <div class="circle c-3"></div>
            </div>
            <div class="wqd-kficon">
                <img src="{{asset('/public/home/picture/wqd-help.png')}}" alt="">
            </div>
        </div>
        <div class="wqd-information-box">
            <div class="wqd-information">
                <a href="JavaScript:void(0)" target="_blank">
                    <img src="{{asset('/public/home/picture/wqd-information.jpg')}}" alt="" />
                </a>
                <a href="http://wpa.qq.com/msgrd?v=3&uin=800180019&site=qq&menu=yes" target="_blank" class="help-btn">客服QQ : 422300135</a>
                <div class="help-phone">
                    客服电话 : 18181866440
                </div>
                <div class="help-url">
                    <img src="{{asset('/public/home/picture/wqd-url.png')}}" alt="" />
                    <p class="help-url-p">扫描关注微信公众号</p>
                    <p>周一至周五 9:00~18:00</p>
                    <p>非工作时间，请您QQ留言，我们会及时回复</p>
                </div>
            </div>
        </div>
        <div class="wqd-goTop" onclick="$('body,html').animate({scrollTop:0},500);">
            <em></em>
            <div class="goTop-title">
                返回顶部
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{asset('/public/home/js/header.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/index.js')}}"></script>
<script type="text/javascript" src="{{asset('/public/home/js/animate.js')}}"></script>

</body>
</html>
