@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<div class="es-banner">
    <div class="container">
        <div class="title">
            <i class="es-icon es-icon-viewcomfy"></i>
            活动列表
        </div>
    </div>
</div>
<div id="content-container" class="container">
    <div class="es-activeList">
        <div class="row">
            <div class="col-md-8">
                <ul class="panel panel-default activeList-tab clearfix">
                    <li class="active"><a href="">最新</a></li>
                    <li><a href="">即将开始</a></li>
                </ul>
                <div class="panel panel-default activeList-item">
                    <div class="panel-body">
                        <div class="activeList-list clearfix">
                            <div class="activeList-img">
                                <a href="{{url('active/detail')}}">
                                    <img src="{{asset('/public/home/picture/active1.jpg')}}" class="img-responsive">
                                    <span class="tag">
                                        <span class="tag-active"></span>
                                    </span>
                                    <div class="mask">主办方：广西广播电视大学</div>
                                </a>
                            </div>
                            <div class="activeList-body">
                                <div class="title mbm">
                                    <span class="label mrs label-primary">免费  </span>
                                    <a class="link-dark" href="">“最美都市阳台菜园”摄影大赛</a>
                                </div>
                                <span class="es-qrcode-right">
                                  <span class="es-qrcode top">
                                    <i class="es-icon es-icon-qrcode"></i>
                                    <span class="qrcode-popover">
                                      <img src="" alt=""><br>
                                      扫二维码分享活动
                                    </span>
                                  </span>
                                </span>
                                <p>报名时间: 2017-05-09<span class="pls text-sm"></span></p>
                                <p>地址: 南宁市东宝路1-1号远程教育大厦</p>
                                <div class="metas">
                                    <i class="es-act es-act-mg-group prs"></i>已报名：<span class="gray-darker">36</span>
                                    <i class="es-act es-act-liulan pll prs"></i>浏览：<span class="gray-darker">1340</span>
                                </div>
                            </div>
                        </div>
                        <div class="activeList-list clearfix">
                            <div class="activeList-img">
                                <a href="{{url('active/detail')}}">
                                    <img src="{{asset('/public/home/picture/active2.jpg')}}" class="img-responsive">
                                    <span class="tag">
                                    <span class="tag-active"></span>
                                    </span>
                                    <div class="mask">主办方：广西广播电视大学社区教育学院</div>
                                </a>
                            </div>
                            <div class="activeList-body">
                                <div class="title mbm">
                                    <span class="label mrs label-primary">免费  </span>
                                    <a class="link-dark" href="/activity/6/show">新竹都市菜园首期采收活动</a>
                                </div>
                                <span class="es-qrcode-right">
                                  <span class="es-qrcode top" data-url="/activity/6/qrcode">
                                    <i class="es-icon es-icon-qrcode"></i>
                                    <span class="qrcode-popover">
                                      <img src="" alt=""><br>
                                      扫二维码分享活动
                                    </span>
                                  </span>
                                </span>
                                <p>报名时间: 2016-05-11<span class="pls text-sm"></span></p>
                                <p>地址: 南宁市青秀区新竹街道新竹社区</p>
                                <div class="metas">
                                    <i class="es-act es-act-mg-group prs"></i>已报名：<span class="gray-darker">0</span>
                                    <i class="es-act es-act-liulan pll prs"></i>浏览：<span class="gray-darker">149</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">最近七天热门活动</h3>
                    </div>
                    <div class="panel-body">
                        <div class="empty">暂无热门活动</div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">历史热门活动</h3>
                    </div>
                    <div class="panel-body">
                        <ul class="activeList-hot">
                            <li class="clearfix">
                                <a href="">“最美都市阳台菜园”摄影大赛</a>
                                <span class="pull-right">36人</span>
                            </li>
                        </ul>
                        <ul class="activeList-hot">
                            <li class="clearfix">
                                <a href="">社区教育免费体验课来啦！</a>
                                <span class="pull-right">19人</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
@endsection

