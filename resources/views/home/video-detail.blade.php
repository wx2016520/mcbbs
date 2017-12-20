@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<div id="content-container" class="container">
    <ol class="breadcrumb open-course-breadcrumb">
        <li><a href="/">首页</a></li>
        <li><a href="/open/course/explore">公开课</a></li>
        <li>如何搭建网校?（EduSoho网校系统介绍）</li>
    </ol>
    <div class="open-course-header">
        <div class="row">

            <div class="col-md-9 open-course-views" data-get-recommend-course-url="/open/course/2/ad-modal/recommend/course?num=3">
                <div class="watermarkEmbedded"></div>
                <div id="lesson-preview-iframe" class="lesson-content embed-responsive embed-responsive-16by9" style="display:none;"></div>
                <div id="lesson-preview-player" class="lesson-content embed-responsive embed-responsive-16by9" style="" data-balloon-player="1" data-watermark="//sca1dk-sb-qn.qiqiuyun.net/files/system/watermark_1399456601.png?version=8.1.0"><iframe class="embed-responsive-item" src="/open/course/2/lesson/6/player" name="viewerIframe" id="viewerIframe" width="100%" allowfullscreen="" webkitallowfullscreen="" height="100%" "="" style="border:0px;position:absolute; left:0; top:0;"></iframe></div>
                <div id="lesson-preview-swf-player" class="lesson-content embed-responsive embed-responsive-16by9" style="display:none;height:100%;"></div>

                <input type="hidden" id="firstLesson" data-url="/open/course/2/lesson/6/show">

                <div class="mask" style="display:none" id="media-error-dialog">
                    <div class="modal-dialog" style="width:230px;margin:22% auto;">
                        <div class="modal-content">

                            <div class="modal-body clearfix">
                                <i class="es-icon es-icon-info" style="font-size: 22px;"></i>
                                <span class="media-error">该课时资源文件被删除</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="mask modal fade" id="open-course-ad-modal" tabindex="-1" role="dialog" aria-labelledby="openCourseADModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 class="modal-title" id="open-course-ad-modal-title">课时学习完成</h4>
                            </div>
                            <div class="modal-body">
                                <div class="empty">如果喜欢课程内容，赶紧分享给好友吧</div>
                            </div>
                            <div class="modal-footer">
                                <div class="es-share top">
                                    <a href="javascript:;" class="btn-link color-gray prl js-player-replay"><i class="es-icon es-icon-refresh prs"></i>重播</a>
                                    <a href="" class="btn btn-lg share-btn dropdown-toggle mrm" data-toggle="dropdown">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 open-course-tab js-open-course-tab">
                <ul class="clearfix">
                    <li class="tab-header active"><i class="es-icon es-icon-staroutline prm"></i>推荐课程</li>
                </ul>
                <div id="content">
                    <ul id="recommand-tab">


                        <li class="tab-recommand clearfix">
                            <a href="/course/1" target="_blank" title="课程功能体验">
                                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2016/05-23/16152192ad87431075.jpg" alt="课程功能体验">
                            </a>
                            <div class="open-course-info">
                                <a class="title" href="/course/1" target="_blank" title="课程功能体验">课程功能体验</a>
                                <div class="num">5188人在学习</div>
                            </div>
                        </li>

                        <li class="tab-recommand clearfix">
                            <a href="/course/283" target="_blank" title="EduSoho直播教室演示">
                                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2016/05-23/1621040d8157208365.jpg" alt="EduSoho直播教室演示">
                            </a>
                            <div class="open-course-info">
                                <a class="title" href="/course/283" target="_blank" title="EduSoho直播教室演示">EduSoho直播教室演示</a>
                                <div class="num">5206人在学习</div>
                            </div>
                        </li>

                        <li class="tab-recommand clearfix">
                            <a href="/course/299" target="_blank" title="作业练习">
                                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2016/05-23/165023f5a529069209.jpg" alt="作业练习">
                            </a>
                            <div class="open-course-info">
                                <a class="title" href="/course/299" target="_blank" title="作业练习">作业练习</a>
                                <div class="num">1256人在学习</div>
                            </div>
                        </li>

                        <li class="tab-recommand clearfix">
                            <a href="/course/273" target="_blank" title="账户充值">
                                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2016/05-23/164844c11986685453.jpg" alt="账户充值">
                            </a>
                            <div class="open-course-info">
                                <a class="title" href="/course/273" target="_blank" title="账户充值">账户充值</a>
                                <div class="num">707人在学习</div>
                            </div>
                        </li>

                        <li class="tab-recommand clearfix">
                            <a href="/course/232" target="_blank" title="用户导入导出">
                                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2016/05-23/164814ead003704093.jpg" alt="用户导入导出">
                            </a>
                            <div class="open-course-info">
                                <a class="title" href="/course/232" target="_blank" title="用户导入导出">用户导入导出</a>
                                <div class="num">983人在学习</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="es-section open-course-detail clearfix">
        <div class="open-course-detail-main media hidden-sm hidden-xs">
            <div class="media-left">
                <img class="img-responsive" src="http://sca1dk-sb-qn.qiqiuyun.net/files/course/2016/08-12/174041940b89982417.jpg" alt="如何搭建网校?（EduSoho网校系统介绍）">
            </div>
            <div class="media-body">
                <div class="title">如何搭建网校?（EduSoho网校系统介绍）</div>
                <div class="metas">
                    <span><i class="es-icon es-icon-removeredeye mrs"></i>20114</span>
                    <span><i class="es-icon es-icon-textsms mrs"></i>177</span>
                </div>
            </div>
        </div>
        <div class="open-course-detail-operation">
            <div class="operation-list">
                <div class="operation-img operation-zan">
                    <a href="javascript:;" class="js-like-num" data-like-url="/open/course/2/like" data-cancel-like-url="/open/course/2/unlike"><i class="es-icon es-icon-thumbup"></i></a>
                </div>
                <span>138</span>
            </div>
            <div class="operation-list">
                <div class="operation-img  operation-share es-share top">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><i class="es-icon es-icon-share"></i></a>
                    <script src="https://hm.baidu.com/hm.js?81a080dc472dfaa6aba49ad8936049c1"></script><script>
                        if (typeof app === 'undefined') {
                            var app = {};
                        }

                        if (!app.lazyPool) {
                            app.lazyPool = [];
                        }

                        if(!app.lazyLoads){
                            app.lazyLoads = function() {
                                for (var index in app.lazyPool) {
                                    app.lazyPool[index]();
                                }
                                app.lazyLoad && app.lazyLoad();
                            }
                        }

                        var script = function (scripts, fn, target) {
                            if (!scripts.length) return;
                            target = !target ? document.getElementsByTagName('body')[0] : target;
                            (function callback(s) {
                                s = scripts.shift();
                                !scripts.length ? loadJs(s, fn, target) : loadJs(s, callback, target);
                            }());
                        }

                        var loadJs = function (path, fn, target) {
                            var elem = document.createElement('script'),
                                loaded;
                            elem.onload = elem.onerror = elem.onreadystatechange = function () {
                                if ((elem.readyState && !(/^c|loade/.test(elem.readyState))) || loaded) {
                                    return;
                                }
                                elem.onload = elem.onreadystatechange = null;
                                loaded = 1;
                                fn();
                            }
                            elem.async = 1;
                            elem.src = path;
                            target.appendChild(elem);
                        }

                        window.seajsBoot = function() {

                            if (typeof seajs !== 'undefined') {
                                app.lazyLoads();
                                return ;
                            }

                            app.debug =  false ;
                            app.jsPaths = {"common":"common","theme":"\/\/sca1dk-sb-qn.qiqiuyun.net\/themes\/jianmo\/js","oauthv2serverbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/oauthv2server\/js","customwebbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/customweb\/js","customadminbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/customadmin\/js","topxiawebbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/topxiaweb\/js","topxiaadminbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/topxiaadmin\/js","classroombundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/classroom\/js","materiallibbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/materiallib\/js","sensitivewordbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/sensitiveword\/js","permissionbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/permission\/js","orgbundle":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/org\/js","vipplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/vipplugin\/js","crmplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/crmplugin\/js","fileshareplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/fileshareplugin\/js","discountplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/discountplugin\/js","gracefulthemeplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/gracefulthemeplugin\/js","userimporterplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/userimporterplugin\/js","chargecoinplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/chargecoinplugin\/js","moneycardplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/moneycardplugin\/js","questionplusplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/questionplusplugin\/js","couponplugin":"\/\/sca1dk-sb-qn.qiqiuyun.net\/bundles\/couponplugin\/js"};

                            window.CKEDITOR_BASEPATH = app.basePath + '/assets/libs/ckeditor/4.6.7/';

                            app.arguments = {};

                            app.scripts = ["common\/share-dropdown.js"];
                            app.mainScript = '//sca1dk-sb-qn.qiqiuyun.net/bundles/topxiaweb/js/app-compatible.js?version=8.1.0';

                            var paths = [
                                "//sca1dk-sb-qn.qiqiuyun.net/assets/libs/seajs/seajs/2.2.1/sea.js?version=8.1.0",
                                "//sca1dk-sb-qn.qiqiuyun.net/assets/libs/seajs/seajs-style/1.0.2/seajs-style.js?version=8.1.0",
                                "//sca1dk-sb-qn.qiqiuyun.net/assets/libs/seajs/seajs-text/1.1.1/seajs-text.min.js?version=8.1.0",
                                "//sca1dk-sb-qn.qiqiuyun.net/assets/libs/seajs-global-config.js?version=8.1.0"
                            ];

                            script(paths, function() {
                                seajs.use(app.mainScript, function() {
                                    app.lazyLoads();
                                });
                            });
                        }

                    </script>


                    <div class="dropdown-menu  js-social-share-params" data-title="如何搭建网校?（EduSoho网校系统介绍）" data-summary="" data-message="我正在学习《如何搭建网校?（EduSoho网校系统介绍）》，收获巨大哦，一起来学习吧！" data-url="http://demo.edusoho.com/open/course/2" data-picture="http://sca1dk-sb-qn.qiqiuyun.net/files/course/2016/08-12/17404193fe3e605743.jpg">

                        <a href="javascript:;" class="js-social-share" data-cmd="weixin" title="分享到微信" data-share="weixin" data-qrcode-url="/common/qrcode?text=http%3A//demo.edusoho.com/open/course/2"><i class="es-icon es-icon-weixin"></i></a>
                        <a href="javascript:;" class="js-social-share" data-cmd="tsina" title="分享到新浪微博" data-share="weibo"><i class="es-icon es-icon-weibo"></i></a>
                        <a href="javascript:;" class="js-social-share" data-cmd="qq" title="分享到QQ好友" data-share="qq"><i class="es-icon es-icon-qq"></i></a>
                        <a href="javascript:;" class="js-social-share" data-cmd="qzone" title="分享到QQ空间" data-share="qzone"><i class="es-icon es-icon-qzone"></i></a>

                    </div>
                </div>
                分享
            </div>
            <div class="operation-list  no-border">
                <div class="operation-img operation-collection ">
                    <a href="javascript:;" class="js-favorite-num" data-cancel-favorite-url="/open/course/2/unfavorite" data-favorite-url="/open/course/2/favorite" data-login-url="/login/ajax"><i class="es-icon es-icon-bookmarkoutline"></i></a>
                </div>
                <span>收藏</span>
            </div>
            <div class="operation-list hidden-sm hidden-xs">
                <div class="operation-img  operation-code">
                    <a class="js-qrcode qrcode-popover top">
                        <i class="es-icon es-icon-phone1"></i>
                        <div class="qrcode-content">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAADoAQMAAADfZzo7AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABkUlEQVRYhe2Ywa2DQAxEjTjkSAlbCqXtlkYplMCRA8J/xl6i5KcBJoqloJVfOFi2x17Mfvbl5mEDfoud9uhn2I3pwUcdfCvu5+i+2pAuXYoQl2rjxv8cNq14pkubRtaaMYPtO6iNUYfIXdGnvQAnRNq77KNitWjXjWNa53aOO2vyU1WkaBp0AyGe4z+3JEUBrrOfOM2hhOwyqMfsshRJizllZbHeax7B35g6R1CFJhTvVYe4MJyaLMXR5ka6VHdSzxdkaa+6kSFCE7bCQJlUWWpsGvpX6yo3+M6mkqU4ltiC0GWoSZSmv2q7IIXDQr1LOCbuq4y3yVKmC7qRUkFZpIZv0vTSjdy9Y84yj7qUA2oJ9aNu7E+XydJ0dPHjja9iX2XL3ZgePNbcc3gDynnkwjRt4M6Q9+4aN7v37VqKplRzHiHeUIYhhm6Tpde3Ec+9OlbUx3ZNWEl6fRspeUuNmnzpMlXKSGe4odvtTPlTp+HIeONOYcI0ajIymGUYt+/3LtOiT92IeLnXxf4gTH/2xfYHW/yMV077l0QAAAAASUVORK5CYII=" alt="">
                            <span class="gray-darker text-center text-sm">扫二维码继续学习<br>二维码时效为半小时
</span>
                        </div>
                    </a>
                </div>
                二维码
            </div>
        </div>
    </div>

    <div class="open-course-detail row">
        <div class="col-md-9">
            <div class="es-section gray-darker editor-text">
                <p><span style="color: rgb(64, 64, 64); font-family: ROCK, 微软雅黑, helvetica, arial, sans-serif; font-size: 12px; line-height: 18px;">EduSoho是一套基于云计算技术的在线教育解决方案，能够满足教育机构、企业和个人的个性化在线教学需求。EduSoho涵盖了在线点播、在线考试、直播授课、在线问答等功能，针对大学、中小学、职业教育、企业内训等不同应用场景，EduSoho的各个行业版本也各有不同。</span></p>

            </div>

            <div class="es-section" id="open-course-comment">
                <div class="gray-darker pbl">评论(<span class="thread-post-num">177</span>)</div>
                <div class="empty">
                    你还没有登录，请先<a href="/login?goto=/open/course/2">登录</a>或<a href="/register?goto=/open/course/2">注册</a>！

                </div>

                <ul class="comment-list thread-pripost-list">
                    <li id="post-11021" data-user-id="15343" class="thread-post thread-post-11021 media media-comment user-id-15343">
                        <div class="media-left">
                            <a class="user-avatar js-user-card" href="/user/15343" data-card-url="/user/15343/card/show" data-user-id="15343">
                                <img class="avatar-sm" src="http://sca1dk-sb-qn.qiqiuyun.net/files/user/2016/08-11/115227b2bd56673566.jpg">

                            </a>

                        </div>

                        <div class="media-body">
                            <div class="metas title">
                                <a href="/user/15343" class="nickname">小张校长</a>
                                <span class="bullet">•</span>
                                <span class="color-gray">09-10 </span>
                            </div>
                            <div class="editor-text"><p>感觉挺好！</p>
                            </div>
                            <div class="comment-sns">
                                <div class="thread-post-interaction">
                                    <a href="javascript:;" class="js-post-up interaction color-gray" data-url="/thread/0/post/11021/up">
                                        <span class="glyphicon glyphicon-thumbs-up"></span> (<span class="post-up-num">0</span>)
                                    </a>
                                    <a href="javascript:;" class="js-reply interaction color-gray"><span class="glyphicon glyphicon-comment hide"></span>
                                        回复
                                        <span class="subposts-num-wrap hide">(<span class="subposts-num">0</span>)</span>
                                    </a>
                                </div>    </div>
                            <div class="thread-subpost-container subcomments clearfix hide">
                                <div class="thread-subpost-content">

                                    <ul class="media-list thread-post-list thread-subpost-list">
                                    </ul>

                                    <div class="text-center">

                                    </div>

                                </div>
                                <div class="thread-subpost-morebar clearfix hide">
                                    <span class="thread-subpost-moretext hide"><span class="color-gray">还有-5条回复，</span><a href="javascript:;" class="js-post-more">点击查看</a></span>
                                </div>

                                <div class="empty">
                                    你还没有登录，请先<a href="/login?goto=/open/course/2">登录</a>或<a href="/register?goto=/open/course/2">注册</a>！

                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <nav class="text-center">
                    <nav class=" text-center">
                        <ul class="pagination">
                            <li class="active"><a href="/open/course/2?page=1">1</a></li>
                            <li><a href="/open/course/2?page=10"><i class="cd-icon cd-icon-last-page"></i></a></li>
                        </ul>
                    </nav>
                </nav>
            </div>
        </div>

        <div class="col-md-3 hidden-sm hidden-xs">
            <div class="open-course-teacher panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        课程教师
                    </h3>
                </div>
                <div class="panel-body text-center">
                    <a class=" js-user-card" href="/user/2487" data-card-url="/user/2487/card/show" data-user-id="2487">
                        <img class="avatar-lg" src="http://sca1dk-sb-qn.qiqiuyun.net/files/default/2015/08-31/091007ff053e224145.jpg">
                    </a>
                    <h4 class="mtl">    <a class="link-dark " href="/user/2487">格洛咪</a>
                    </h4>
                    <p class="color-gray">EduSoho官方运营</p>
                    <div class="intro">
                        上不了厅堂下不了厨房码不了代码打不过流氓○|￣|_...
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
@endsection

