@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<div id="content-container" class="container">
    <div class="es-activedetail" data-widget-cid="widget-0">
        <div class="panel panel-default active-header clearfix">

            <div class="active-img">
                <img src="{{asset('/public/home/picture/active1.jpg')}}" class="img-responsive">
            </div>
            <div class="active-info">
                <div class="title mbm">
                    <span class="label mrs label-primary">免费  </span>
                    <a class="link-dark" href="/activity/9/show">社区教育免费体验课来啦！</a>
                </div>
                <div class="metas mbl">
                    <i class="es-act es-act-mg-group prs"></i>已报名：<span class="text-primary prs">19</span>(
                    限额<span class="text-warning">400</span>人)
                    <i class="es-act es-act-liulan pll prs"></i>浏览：<span class="gray-darker">734</span>
                </div>
                <p>时间：2016-06-27 11:00 - 2016-07-04 18:00</p>
                <p>地址： 东宝路1-1号广西广播电视大学培训学院105室  </p>
                <p>主办方：广西广播电视大学培训学院</p>
            </div>

            <div class="active-operation clearfix">
                <div class="operation pull-right">
                </div>
                <div class="metas">
                    <a href="javascript:;" disabled="" class="btn btn-default mtm">活动已结束</a>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <div id="js-navbar-sider" class="es-navbar-sider  hidden-sm hidden-xs">
                <ul class="es-navbar-detail nav nav-pills affix-top" data-spy="affix" data-offset-top="250">
                    <li class="mbm active"><a href="#js-active-details">活动<br>详情</a></li>
                    <li class="mbm"><a href="#js-active-member">最新<br>成员</a></li>
                    <li class="mbm"><a href="#js-active-results">活动<br>成果</a></li>
                    <li class="mbm"><a href="#js-recommend-course">推荐<br>课程</a></li>
                    <li class="mbm"><a href="#js-active-discuss">活动<br>讨论</a></li>
                </ul>
            </div>
            <div class="es-navbar-content">
                <div id="js-active-details" class="panel panel-default active-details-content">
                    <div class="panel-heading">活动详情</div>
                    <div class="panel-body ">
                        <p>&nbsp; 为了让广大社区居民有机会了解新开设班级的学习课程，我们诚意邀请一批有经验的老师为大家上免费的体验课，机会难得，欢迎大家踊跃报名。具体安排如下：</p>

                        <p>（1）刘志礼老师 成人（隶书）班，7月6日19:30-21:00 1602室，请自带笔、墨、纸<br>
                            （2） 黄英放老师&nbsp;亲子（铅笔、钢笔或水性笔）班，7月6日19:30-21:00 901室，请自带笔、纸，适合6岁以上儿童，需家长陪练<br>
                            （3）卢杰老师&nbsp;成人声乐基础班，7月5日19:30-21:00 202室。<br>
                        <p>以上班级报名后请在活动讨论区留言注明所报班级。&nbsp;</p>

                        <p><br>
                            咨询热线：0771—5712082 &nbsp;&nbsp;&nbsp;&nbsp;陆老师：18070929985</p>

                    </div>
                </div>
                <div id="js-active-member" class="panel panel-default">
                    <div class="panel-heading">最新成员</div>
                    <div class="panel-body">
                        <a href="">
                        </a><a class=" js-user-card" href="/user/7" data-card-url="/user/7/card/show" data-user-id="7">
                            <img class="avatar-sm" src="/files/default/2016/01-13/1525200ed488933598.png">
                        </a>
                    </div>
                </div>
                <div id="js-active-results" class="panel panel-default">
                    <div class="panel-heading clearfix">活动成果
                    </div>
                    <div class="panel-body active-results-list">
                        <div class="row">
                            <div class="empty">暂无成果</div>
                        </div>
                    </div>
                </div>
                <div id="js-recommend-course" class="panel panel-default">
                    <div class="panel-heading">推荐课程</div>
                    <div class="panel-body course-list">
                        <div class="row">
                        </div>
                    </div>
                </div>
                <div id="js-active-discuss" class="panel panel-default active-results-discuss">
                    <div class="panel-heading clearfix">活动讨论
                    </div>
                    <div class="activity-thread-pagination"><div class="panel-body">
                            <ul class="nav nav-pills nav-pills-sm">
                                <li class="active js-thread-type"><a data-target="#thread-pane" data-type="all" href="javascript:;">全部</a></li>

                                <li class="js-thread-type"><a data-target="#thread-pane" data-type="elite" href="javascript:;">精华</a></li>

                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">
                                        <span>排序：</span>
                                        最后回复
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu hidden-xs js-thread-sort">
                                        <li><a class="js-nav" href="javascript:;" data-sort="posted">最后回复</a></li>
                                        <li><a href="javascript:;" data-sort="created">最新发帖</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="topic-list">
                           <div class="media topic-item">
                                <div class="media-left media-middle">
                                    <a class="pull-left js-user-card" href="/user/230" data-card-url="/user/230/card/show" data-user-id="230">
                                        <img class="avatar-sm" src="/assets/img/default/avatar.png">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <div class="title">
                                        <i class="es-icon es-icon-chatcircle color-info" data-toggle="tooltip" data-placement="top" title="话题"></i>
                                        <a href="">报名彩妆造型基础班
                                        </a>

                                    </div>
                                    <div class="metas text-sm">
                                        <a href="/user/230" class="color-gray">红粉菲菲79824</a>
                                        <span>发起了话题</span>
                                        •
                                        <span>最后回复 <a class="link-dark link-muted" href="">yjie812181</a></span>

                                        • <span>2016-06-30</span>
                                    </div>
                                </div>
                                <div class="media-data hidden-xs">
                                    <span>1<br>回复</span>
                                    <span>36<br>浏览</span>
                                </div>
                            </div>
                        </div>
                        <nav class=" text-center">
                            <ul class="pagination">
                                <li class="active" data-page="1"><a href="javascript:;">1</a></li>
                                <li data-page="2"><a href="javascript:;">2</a></li>
                                <li data-page="2"><a href="javascript:;"><i class="es-icon es-icon-chevronright"></i></a></li>
                                <li data-page="2"><a href="javascript:;">尾页</a></li>
                            </ul>
                        </nav>
                    </div>
                    <input type="hidden" id="js-thread-render" data-type="all" data-sort="posted" data-url="/activity/9/threads/render">
                </div>
            </div>
        </div>
        <input id="js-pay-status" value="" type="hidden">
<!--        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--            <div class="modal-dialog ">-->
<!--                <div class="modal-content">-->
<!--                    <div class="modal-header">-->
<!--                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>-->
<!--                        <h4 class="modal-title">  活动公告-->
<!--                        </h4>-->
<!--                    </div>-->
<!--                    <div class="modal-body">  恭喜，报名成功!-->
<!--                    </div>-->
<!--                    <div class="modal-footer">  <button class="btn btn-primary" data-dismiss="modal">关闭</button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>

</div>
</body>
@endsection

