<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>控制台</title>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/identify.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/layout.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/account.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/style.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/control_index.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/form.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{asset('/public/admin/css/layui.css')}}" />
    <link rel="stylesheet" href="{{asset('/public/admin/font/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="{{asset('/public/admin/css/pagination.css')}}">
    <script type="text/javascript" src="{{asset('/public/admin/js/jquery-1.7.2.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/admin/js/layer.js')}}"></script>
<!--    <script type="text/javascript" src="{{asset('/public/admin/js/select.js')}}"></script>-->
    <script type="text/javascript" src="{{asset('/public/admin/js/haidao.validate.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/admin/js/jquery.date_input.pack.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/admin/js/layui.js')}}"></script>
    <!--  tag标签  -->

</head>
<body>
<div class="view-topbar">
    <div class="topbar-console">
        <div class="tobar-head fl">
            <a href="JavaScript:void(0)" class="topbar-logo fl">
                <span><img src="{{asset('public/admin/img/logo.png')}}" width="20" height="20"/></span>
            </a>
            <a href="{{url('admin/index')}}" class="topbar-home-link topbar-btn text-center fl"><span>管理控制台</span></a>
        </div>
    </div>
    <div class="topbar-info">
        <ul class="fr">
            <li class="fl dropdown topbar-notice topbar-btn">
                <a href="JavaScript:void(0)" class="dropdown-toggle">
                    <span class="icon-notice"></span>
                    <span class="topbar-num have">5</span>
                    <!--have表示有消息，没有消息去掉have-->
                </a>
            </li>
            <!--<li class="fl topbar-info-item strong">
            <div class="dropdown">
                <a href="JavaScript:void(0)" class="dropdown-toggle topbar-btn">
                <span class="fl">工单服务</span>
                <span class="icon-arrow-down"></span>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="JavaScript:void(0)">我的工单</a></li>
                    <li><a href="JavaScript:void(0)">提交工单</a></li>
                </ul>
            </div>
            </li>
             -->
            <li class="fl topbar-info-item">
                <div class="dropdown">
                    <a href="{{url('')}}" class="topbar-btn">
                        <span class="fl text-normal">网站首页</span>
                        <!--<span class="icon-arrow-down"></span>-->
                    </a>
                    <!--<ul class="dropdown-menu">
                        <li><a href="JavaScript:void(0)">模板开发手册</a></li>
                        <li><a href="JavaScript:void(0)">某某数据字典</a></li>
                    </ul>-->
                </div>
            </li>
            <li class="fl topbar-info-item">
                <div class="dropdown">
                    <a href="JavaScript:void(0)" class="topbar-btn">
                        <span class="fl text-normal" style="min-width: 50px">
                              {{session('admin.user_name')}}
                        </span>
                        <span class="icon-arrow-down"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="{{url('admin/loginout')}}">退出登录</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>
<div class="view-body">
    <div class="view-sidebar">
        <div class="sidebar-content">
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：导航管理
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">导航管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/nav')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_author.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">导航列表</span>
                        </a>
                    </li>
<!--                    <li>-->
<!--                        <a href="{{url('admin/link')}}">-->
<!--                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_message.png')}}" width="16" height="16" /></b>-->
<!--                            <span class="text-normal">友情链接</span>-->
<!--                        </a>-->
<!--                    </li>-->
                </ul>
            </div>
            <!--
               作者：422300135@qq.com
               时间：2017-07-15
               描述：轮播图管理
           -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">轮播管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/banner')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">轮播列表</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：用户管理
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">用户管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/user')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">用户列表</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：文章管理
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">文章管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/article')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">文章列表</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('admin/article/category')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">分类列表</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('admin/article/tag')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">标签列表</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：语录管理
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">段子管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/sentence')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">段子列表</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：页面管理
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">页面管理</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/error')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">404页面</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--
                作者：422300135@qq.com
                时间：2017-07-15
                描述：系统设置
            -->
            <div class="sidebar-nav">
                <div class="sidebar-title">
                    <a href="JavaScript:void(0)">
                        <span class="icon"><b class="fl icon-arrow-down"></b></span>
                        <span class="text-normal">系统设置</span>
                    </a>
                </div>
                <ul class="sidebar-trans">
                    <li>
                        <a href="{{url('admin/nav')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">基本信息</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('admin/updatepwd')}}">
                            <b class="sidebar-icon"><img src="{{asset('/public/admin/img/icon_cost.png')}}" width="16" height="16" /></b>
                            <span class="text-normal">修改密码</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    @section('content')
    @show
    <script type="text/javascript">
        <!-- 显示tab切换-->
        $(".sidebar-title").live('click', function() {
            if ($(this).parent(".sidebar-nav").hasClass("sidebar-nav-fold")) {
                $(this).next().slideDown(200);
                $(this).parent(".sidebar-nav").removeClass("sidebar-nav-fold");
            } else {
                $(this).next().slideUp(200);
                $(this).parent(".sidebar-nav").addClass("sidebar-nav-fold");
            }
        });
        <!-- 显示checkbox选中-->
        $(".j_cbAll").click(function(){
            if($(".j_cbAll").is(':checked')){
                $("input[type='checkbox']").prop("checked",true);
            }else{
                $("input[type='checkbox']").prop("checked",false);
            }
        });
        //下拉
        $(".dropdown").live('click',function(e){
            if($(this).hasClass("open")){
                $(this).removeClass("open");
            }else{
                $(".dropdown").removeClass("open");
                $(this).addClass("open");
            }
            //e.stopPropagation();
        });
    </script>
</body>
</html>
