@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<div id="content-container" class="container">
        <div class="article-detail row" id="detail-content">
            <!-- 主内容 -->
            <div class="col-md-8 article-detail-main">
                <section class="es-section article-content">
                    <div class="article-metas">
                        <div class="pull-left">
                            <div class="date">
                                <div class="day">31</div>
                                <div class="month">07月</div>
                            </div>
                        </div>
                        <div class="metas-body">
                            <h2 class="title">
                               {{$data->art_title}}
                            </h2>
                        </div>
                    </div>
                    <div class="article-text">
                        {!! $data->art_content !!}
                    </div>
                    <div class="well">
                        <p>文章来源: <strong class="mll">教育考试院</strong></p>
                    </div>
                    <div class="article-tags">
                    </div>
                    <!--PC版-->
                    <div id="SOHUCS" sid="{{$data->art_id}}"></div>
                    <script charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/changyan.js" ></script>
                    <script type="text/javascript">
                        window.changyan.api.config({
                            appid: 'cytntqAwz',
                            conf: 'prod_d90938def7449a34850d7d8699e15d9e'
                        });
                    </script>
                </section>
            </div>

             <aside class="col-md-4 article-sidebar">
                	<!-- 热门资讯 -->
                	<div class="panel panel-default hot-article">
            	  		<div class="panel-heading">
            	        	<h3 class="panel-title"><i class="es-icon es-icon-whatshot"></i>热门资讯</h3>
            	  		</div>
            	  		<div class="panel-body">
            	            @foreach($article as $a)
                            <div class="media media-number">
                                <div class="media-left">
                                    <span class="num">{{$a->art_id}}</span>
                                </div>
                                <div class="media-body">
                                    <a class="link-dark" href="{{url('article/detail/'.$a->art_id)}}" title="{{str_limit($a->art_title,$limit=40,$end='...')}}">{{str_limit($a->art_title,$limit=35,$end='...')}}</a>
                                </div>
                            </div>
                            @endforeach
            	        </div>
            		</div>
              		<!-- 热门标签 -->
                	<div class="panel panel-default hot-tag">
            	    	<div class="panel-heading">
            	     		<h3 class="panel-title"><i class="es-icon es-icon-loyalty"></i>热门标签</h3>
            	    	</div>
            	    	<div class="panel-body">
                            @foreach($tag as $v)
                            <a class="btn-tag" href=""> {{$v->tag_name}}</a>
                            @endforeach
            	        </div>
              		</div>

              	<!-- 热门评论 -->
              	<div class="panel panel-default hot-comments">
                <div class="panel-heading">
                  <h3 class="panel-title">
                    <i class="es-icon es-icon-textsms"></i>热门评论
                  </h3>
                </div>
                <div class="panel-body">
            		<div class="media media-hot-comment">
            	        <div class="media-body">
            	          	<div class="pull-left">
            	                <a class=" js-user-card" href="" >
            	                	<img class="avatar-sm" src="picture/avatar.png">
            	  				</a>
            	          	</div>
            	            <div class="comments-info">
            		            <a class="link-dark " href="">世界</a>
            		            <span class="mhs">评论于</span>
            		            <a class="link-dark" href="">百MOOC大数据中心</a>
            	          	</div>
            	          	<div class="comments-content">趋势</div>
            	        </div>
                  	</div>
              	</div>
            	</div>
            	<!-- 推荐资讯 -->
            	<div class="panel panel-default recommend-article">
            	  	<div class="panel-heading">
            	    	<h3 class="panel-title">
            	      		<i class="es-icon es-icon-language"></i>推荐全部资讯
            	    	</h3>
            	  	</div>
            	  	<div class="panel-body">
            	        @foreach($new as $n)
                       <div class="media media-number">
                           <div class="media-left">
                               <span class="num">{{($n->art_id)}}</span>
                           </div>
                           <div class="media-body">
                               <a class="link-dark" href="{{url('article/detail/'.$n->art_id)}}" title="{{str_limit($n->art_title,$limit=40,$end='...')}}">{{str_limit($n->art_title,$limit=30,$end='...')}}</a>
                           </div>
                       </div>
                       @endforeach
            	 	</div>
            	</div>
            	</aside>

        </div>

    </div>
</body>
@endsection

