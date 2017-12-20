@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<div class="es-banner">
    <div class="container">
        <div class="title">
            视频列表
        </div>
        <div class="more">
<!--            <a class="btn btn-primary btn-lg" href="/course/explore">-->
<!--                查看课程-->
<!--            </a>-->
<!--            <a class="btn btn-primary btn-lg" href="/classroom/explore">-->
<!--                查看班级-->
<!--            </a>-->
        </div>
    </div>
</div>
<div id="content-container" class="container">
    <div class="open-course-list">
        <div class="row course-list es-open-course-list">
            <div class="col-md-4 col-xs-6">
                <div class="course-item">
                    <div class="course-img">
                        <a href="{{url('video/detail')}}" target="_blank">
                            <img src="http://sca1dk-sb-qn.qiqiuyun.net/files/course/2016/08-12/17404194054a872154.jpg" alt="" class="img-responsive">
                        </a>
                    </div>
                    <div class="course-info clearfix">
                        <div class="title">
                            <a class="link-dark" href="/open/course/2" target="_blank" title="">
                                如何免费看直播
                            </a>
                        </div>
                        <div class="metas pull-right">
                            <span class="num"><i class="es-icon es-icon-removeredeye"></i>20112</span>
                            <span class="comment"><i class="es-icon es-icon-textsms"></i>177</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-4 col-xs-6">
                <div class="course-item">
                    <div class="course-img">
                        <a href="{{url('video/detail')}}" target="_blank">
                            <img src="http://sca1dk-sb-qn.qiqiuyun.net/files/course/2016/08-12/174105112f9e931558.jpg" alt="" class="img-responsive">
                        </a>
                    </div>
                    <div class="course-info clearfix">
                        <div class="title">
                            <a class="link-dark" href="/open/course/3" target="_blank" title="">
                                如何免费获取优酷会员
                            </a>
                        </div>
                        <div class="metas pull-right">
                            <span class="num"><i class="es-icon es-icon-removeredeye"></i>11985</span>
                            <span class="comment"><i class="es-icon es-icon-textsms"></i>100</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
@endsection

