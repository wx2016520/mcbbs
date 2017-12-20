@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 首页轮播图 -->
<section class="es-poster swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide swiper-hidden" style="background: #22b962;">
			<div class="container">
				<a href=""><img class="img-responsive" src="{{asset('/public/home/picture/09461794aa4c602589.png')}}"></a>
			</div>
		</div>
		<div class="swiper-slide swiper-hidden" style="background: #d3d3d5;">
			<div>
				<a href=""><img class="img-responsive" src="{{asset('/public/home/picture/1703280a19cd464126.jpg')}}"></a>
			</div>
		</div>
		<div class="swiper-slide swiper-hidden" style="background: #ff9c00;">
			<div >
				<a href=""><img class="img-responsive" src="{{asset('/public/home/picture/14461796615c879584.png')}}"></a>
			</div>
		</div>
		<div class="swiper-slide swiper-hidden" style="background: #00b68c;">
			<div class="container">
			<a href=""><img class="img-responsive" src="{{asset('/public/home/picture/1148193af2a4778952.png')}}"></a>
			</div>
		</div>
	</div>
	<div class="swiper-pager"></div>
</section>
<!-- 博客列表 -->
<section class="course-list-section open-course-list-section " id="open-course-list-section">
	<div class="container">
		<div class="text-line">
  			<h5><span>博文列表</span><div class="line"></div></h5>
  		<div class="subtitle">好好学习，天天向上</div>
		</div>
		<div class="course-list">
	  		<div class="row">
	  		@foreach($new as $n)
	  			<div class="col-lg-3 col-md-4 col-xs-6">
	  				<div class="course-item">
	  					<div class="course-img">
							<a href="{{url('article/detail/'.$n->art_id)}}" target=""><img src="{{$n->art_img}}" alt="" class="img-responsive" ></a>
	  					</div>
	  					<div class="course-info">
							<div class="title">
								<a class="link-dark" href="{{url('article/detail/'.$n->art_id)}}" title="{{str_limit($n->art_title,$limit=40,$end='...')}}">{{str_limit($n->art_title,$limit=40,$end='...')}}</a>
							</div>
							<div class="metas clearfix">
							  <span class="num"><i class="es-icon es-icon-removeredeye"></i>19650</span>
							  <span class="comment"><i class="es-icon es-icon-textsms"></i>172</span>
							</div>
	  					</div>
					</div>
	  			</div>
	  			@endforeach
	  		</div>
		</div>
		<div class="section-more-btn">
			<a href="" class="btn btn-default btn-lg">更多博文 <i class="mrs-o es-icon es-icon-chevronright"></i></a>
		</div>
  	</div>
</section>
<!--精品图片-->
<section class="course-list-section " id="course-list-section">
	<div class="container">
    	<div class="text-line">
      		<h5><span>精品图片</span><div class="line"></div></h5>
      		<div class="subtitle">眼观天下美图</div>
    	</div>
    	<div class="course-filter" id="course-filter">
      		<ul class="nav nav-pills hidden-xs" role="tablist">
        		<li role="presentation" class="active  js-course-filter"><a href="javascript:;">全部图片</a></li>
                <li role="presentation" class=" js-course-filter"><a href="javascript:;">风景</a></li>
                <li role="presentation" class=" js-course-filter"><a href="javascript:;">人物</a></li>
            </ul>
	        <div class="btn-group visible-xs">
	        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"aria-expanded="false">全部图片 <span class="caret"></span></button>
	        	<ul class="dropdown-menu" role="menu">
	          		<li role="presentation" class="js-course-filter active "><a href="javascript:;">全部图片</a></li>
	                <li role="presentation" class="js-course-filter "><a href="javascript:;">风景</a></li>
	                <li role="presentation" class="js-course-filter "><a href="javascript:;">人物</a></li>
	            </ul>
	      	</div>
	        <div class="course-sort btn-group">
	        	<a href="javascript:;" class="btn btn-default js-course-filter">最新</a>
	        	<a href="javascript:;" class="btn btn-default js-course-filter"> 最热</a>
	        	<a href="javascript:;" class="btn btn-default  active js-course-filter">推荐 </a>
	        </div>
    	</div>
    	<div class="course-list">
      		<div class="row">
      		@foreach($new as $n)
                <div class="col-lg-3 col-md-4 col-xs-6">
	            	<div class="course-item">
		  				<div class="course-img">
		    				<a href="{{url('article/detail/'.$n->art_id)}}"><img src="{{$n->art_img}}" alt="" class="img-responsive"/></a>
		  				</div>
		  				<div class="course-info">
			   				<div class="title">
				      			<a class="link-dark" href="{{url('article/detail/'.$n->art_id)}}">{{str_limit($n->art_title,$limit=40,$end='...')}}</a>
			    			</div>
			    			<div class="metas clearfix">
				              	<span class="num"><i class="es-icon es-icon-people"></i>464</span>
				            	<span class="comment"><i class="es-icon es-icon-textsms"></i>7</span>
								<span class="course-price-widget">
				      				<span class="free"> 查看</span>
								</span>
			    			</div>
		  				</div>
					</div>
                </div>
                @endforeach
            </div>
    	</div>
	    <div class="section-more-btn">
	      <a href="" class="btn btn-default btn-lg">更多课程 <i class="mrs-o es-icon es-icon-chevronright"></i></a>
	    </div>
  	</div>
</section>
<!-- 推荐活动 -->
<section class="class-section ">
	<div class="container">
	  	<div class="text-line">
			<h5><span>推荐活动</span>
		  		<div class="line"></div>
			</h5>
			<div class="subtitle">欢乐齐分享</div>
	  	</div>
	  	<div class="recommend-class-list row">
	  	@foreach($new as $n)
		  	<div class="col-md-3 col-xs-6">
			 	<div class="class-item">
				  	<div class="class-img-wrap">
						<a class="class-img" href="{{url('article/detail/'.$n->art_id)}}">
					  	<img src="{{$n->art_img}}" alt="{{str_limit($n->art_title,$limit=40,$end='...')}}" class="img-responsive"/></a>
						<div class="mask">
					  		<a href="{{url('article/detail/'.$n->art_id)}}" class="btn btn-warning">立即参加</a>
					  	</div>
				  	</div>
				  	<h3><a class="link-dark" href="{{url('article/detail/'.$n->art_id)}}">{{str_limit($n->art_title,$limit=40,$end='...')}}</a></h3>
				  	<div class="metas">共<span>5</span>小时</div>
				</div>
		  	</div>
		  	@endforeach
	  	</div>
		<div class="section-more-btn">
			<a href="" class="btn btn-default btn-lg">更多活动<i class="mrs-o es-icon es-icon-chevronright"></i></a>
	  	</div>
	</div>
</section>
<!-- 中上部单图广告 -->
<section class="introduction-section hidden-xs hidden">
	<div class="container">
		<div class="row">
			<div class="col-xs-4 introduction-item"></div>
			<div class="col-xs-4 introduction-item"></div>
			<div class="col-xs-4 introduction-item"></div>
		</div>
	</div>
</section>
<!-- 最新动态 -->
<section class="dynamic-section ">
	<div class="container">
	    <div class="text-line gray">
	        <h5><span>最新动态</span><div class="line"></div></h5>
	        <div class="subtitle">尽观天下事</div>
	    </div>
	    <div class="dynamic-section-main row">
	    	<!--热门资讯-->
	        <div class="col-md-6">
	        	<div class="panel panel-default index-group">
			        <div class="panel-heading">
				        <a href="" class="more"><i class="es-icon es-icon-morehoriz"></i></a>
				        <h3 class="panel-title"><i class="es-icon es-icon-whatshot pull-left"></i>热门资讯</h3>
			        </div>
		          	<div class="panel-body row">
			            <div class="media-group-list">
				            <div class="media media-group col-md-6 col-sm-4">
				                <div class="media-left">
				                    <a href=""><img src="{{asset('/public/home/picture/group.png')}}" alt="给" class="avatar-square-md"/></a>
				                </div>
				                <div class="media-body">
				                    <div class="title">
				                    	<a class="link-dark" href="">给ES提建议</a>
				                    </div>
				                    <div class="metas">
				                      <span><i class="es-icon es-icon-people"></i>29</span>
				                      <span><i class="es-icon es-icon-textsms"></i>0</span>
				                    </div>
				                </div>
				            </div>
			            </div>
		          	</div>
	        	</div>
	      	</div>
	      	<!--最新全部资讯-->
			<div class="col-md-6">
	        	<div class="panel panel-default index-article">
		          	<div class="panel-heading">
			            <h3 class="panel-title">最新全部资讯
			              <a class="more" href=""><i class="es-icon es-icon-morehoriz"></i></a>
			            </h3>
		          	</div>
		          	<div class="panel-body clearfix">
		                <ul class="index-recommend-aricle clearfix">
		                	<li class="">
			                    <a href="">
			                        <img src="{{asset('/public/home/picture/article_banner_1.jpg')}}" alt="" class="img-responsive"/>
			                    	<div class="image-overlay"></div>
			                    	<div class="title">阔知受邀</div>
			                  	</a>
		                	</li>
		                </ul>
		                <ul class="index-new-article ">
		                    <li class=" clearfix"><i class="es-icon es-icon-dot color-primary mrs"></i>
		                    	<a class="link-dark" href="" title=""> 阔知教育科技盛会</a> <span class="date">11-07</span></li>
		                </ul>
		          	</div>
	        	</div>
	      	</div>
	      	<!--网友评价-->
	        <div class="col-md-6">
	        	<div class="panel panel-default index-evaluate">
		          	<div class="panel-heading">
		            	<h3 class="panel-title">网友评价</h3>
		          	</div>
		          	<div class="panel-body">
		                <div class="media-left">
		                    <a class=" js-user-card" href=""><img class="avatar-sm" src="{{asset('/public/home/picture/143406ee050b998830.jpg')}}"></a>
		                </div>
		                <div class="media-body">
			                <div class="title text-sm">
			                    <a class="link-dark link-dark" href="">荣峰</a>
			                    <span class="score">
						            <i class="es-icon es-icon-star color-warning"></i>
			      				</span>发布于<a class="link-dark" href="">《EduSoho视频介...》</a>
			                </div>
			                <div class="content gray-darker">dgfsdgsdfgsdfg</div>
			                <span class="date">20天前</span>
		              	</div>
		            </div>
	        	</div>
	    	</div>
	    	<!-- 网友动态 -->
	        <div class="col-md-6">
	        	<div class="panel panel-default index-dynamic">
	          		<div class="panel-heading">
	            		<h3 class="panel-title">网友动态</h3>
	          		</div>
	          		<div class="panel-body">
	            		<div class="media media-dynamic">
	                		<div class="media-left">
		                      	<a class=" js-user-card" href="">
		                        	<img class="avatar-sm" src="{{asset('/public/home/picture/1711131ca531441862.jpg')}}">
		  						</a>
	                		</div>
	                		<div class="media-body">
		                  		<div class="title">
		                        	<a class="link-dark " href="/user/24271">天堂鱼</a>
		                  		</div>
		                  		<div class="content">加入学习</div>
		                  		<span class="date">1小时前</span>
	                		</div>
	              		</div>
	            	</div>
	        	</div>
	        </div>
	    </div>
    </div>
</section>
<!--推荐朋友-->
<section class="recommend-teacher ">
    <div class="container">
        <div class="text-line">
	        <h5><span>推荐朋友</span><div class="line"></div></h5>
	        <div class="subtitle">莫愁前路无知己</div>
        </div>
      	<div class="row">
      	@foreach($new as $n)
            <div class="col-md-3 col-xs-6">
	            <div class="teacher-item">
		  			<div class="teacher-top">
		    			<a class="teacher-img" href="{{url('article/detail/'.$n->art_id)}}">
		      				<img class="avatar-lg" src="{{$n->art_img}}" alt="">
		    			</a>
		    			<h3 class="title">
		      				<a class="link-dark" href="{{url('article/detail/'.$n->art_id)}}">{{str_limit($n->art_title,$limit=20,$end='...')}}</a>
		    			</h3>
		    			<div class="position">
		              		{{str_limit($n->art_title,$limit=20,$end='...')}}
		          		</div>
		  			</div>
		  			<div class="teacher-bottom">
					    <div class="about">
			                {{str_limit($n->art_title,$limit=40,$end='...')}}
			          	</div>
			    		<div class="metas">
			            	<a class="btn btn-primary btn-sm follow-btn" href="javascript:;">关注</a>
			        		<a class="btn btn-default btn-sm unfollow-btn" href="javascript:;" style="display:none;" >已关注</a>
			        		<a class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal" data-backdrop="static"  >私信</a>
			          	</div>
		  			</div>
				</div>
            </div>
            @endforeach
        </div>
        <div class="section-more-btn">
	        <a href="" class="btn btn-default btn-lg">
	          更多朋友 <i class="mrs-o es-icon es-icon-chevronright"></i>
	        </a>
        </div>
    </div>
</section>
<!-- 底部单图广告 -->
<section class="feature-banner hidden" style="background: #e2133a">
	<a href="">
		<img class="img-responsive" src="{{asset('/public/home/picture/block_picture_1497249951.jpg')}}" alt="图片１的描述">
	</a>
</section>
<!--友情链接-->
<div class="es-friend-link">
  <div class="container">
    <div class="title">友情链接：</div>
    <ul>
        <li><a class="link-dark text-sm" href="" target="_blank">博客</a></li>
        <li><a class="link-dark text-sm" href="" target="_blank">百度</a></li>
    </ul>
  </div>
</div>
</body>
@endsection

