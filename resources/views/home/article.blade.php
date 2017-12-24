@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 资讯头部 -->
<div id="content-container" class="container">
    <div class="article-list-body row">
    <!-- list主内容-->
    <div class="col-md-8 article-list-main">
	<section class="es-section">
    <div class="article-list">
     @foreach($data as $v)
        <article class="article-item">
  			<div class="article-metas clearfix">
    			<div class="pull-left">
			        <div class="date">
				        <div class="day">21</div>
				        <div class="month">10月</div>
			        </div>
    			</div>
	    		<div class="metas-body">
			      	<p><a class="link-dark" href="">活动</a></p>
		      		<h2 class="title">
		        		<a class="link-dark" href="{{url('article/detail/'.$v->art_id)}}">{{str_limit($v->art_title,$limit=40,$end='...')}}</a>
		      		</h2>
	    		</div>
  			</div>
            @if($v->art_img)
		    <div class="media">
			    <div class="media-left">
			        <a href=""><img class="thumb-img"  src="{{$v->art_img}}" alt="百度"></a>
			    </div>
		    	<div class="media-body">{!! str_limit($v->art_content,$limit=270,$end='...') !!}</div>
		  	</div>
            @else
            <div class="content">{!! str_limit($v->art_content,$limit=270,$end='...') !!}</div>
            @endif
  		</article>
  		@endforeach
    </div>
    <nav class=" text-center">
        {!! $data->render() !!}
	</nav>
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

