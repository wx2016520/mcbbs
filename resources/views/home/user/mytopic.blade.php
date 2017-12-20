@extends('public.web-layou')
@section('content')
<body class="es-main-default es-nav-default homepage has-app">
<!-- 资讯头部 -->
<div id="content-container" class="container">
    <div class="alert alert-warning alert-dismissable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <strong>您还没有头像</strong>。拥有一个独有的头像，老师和同学们能更容易关注到你哦～～ <a href="" class="alert-link" target="_blank">点击设置</a>
 	</div>
 	<div class="row row-3-9 my-layout">
    <div class="col-md-3">
      	<div class="sidenav">
	        <ul class="list-group">
	          <li class="list-group-heading">我的学习</li>
	          <li class="list-group-item"><a href="">我的话题</a></li>
	          <li class="list-group-item active "><a href="">我的小组</a></li>
	        </ul>
      	</div>
    </div>
    <div class="col-md-9">
    	<div class="panel panel-default panel-col">
  		<div class="panel-heading">我的小组</div>
  		<div class="panel-body">
  		<div class="row">
        <div class="col-md-12">
			<ul class="nav nav-pills">
		      	<li  class="active"><a href="">小组主页</a></li>
		      	<li ><a href="">加入的小组</a></li>
		      	<li ><a href="">发起的话题</a></li>
		      	<li ><a href="">回复的话题</a></li>
		       	<li ><a href="">收藏的话题</a></li>
		    </ul>
            <div class="page-header">
                <h4> 我加入的小组<a class="badge pull-right" href="" style="background-color:#3cb373;">2</a></h4>
            </div>
			<div class="row">
                <div class="media media-group col-md-3 col-sm-4">
	          		<div class="media-left">
	            		<a href="" title="EduSoho后院">
	              			<img class="avatar-square-md" src="{{asset('/public/home/picture/172533d6fbf5121921.png')}}" alt="LOL">
	            		</a>
	          		</div>
	          		<div class="media-body">
	            		<div class="title">
	              			<a class="link-dark" href="/group/4" title="">lol官网</a>
	            		</div>
		            	<div class="metas">
			              	<span><i class="es-icon es-icon-people"></i>142</span>
			              	<span><i class="es-icon es-icon-textsms"></i>7</span>
		            	</div>
	          		</div>
        		</div>
            </div>
    	</div>
        <div class="col-md-12">
			<div class="page-header">
                <h4>发起的话题<a class="badge pull-right" href="" style="background-color:#3cb373;">2</a></h4>
            </div>
			<ul class="media-list thread-list">
              	<li class="media">
      				<div class="media-left">
	        			<span class="reply-num">
	         				<strong> 1 </strong> 回复
	        			</span>
      				</div>
      				<div class="media-body pts">
        			<div class="media-heading">
         				<a class="title gray-darker" href="">初来乍到</a>
                  	</div>
        			<div class="metas">
             		 	<a class="userImg js-user-card" href="">
                        	<img class="avatar-xxs" src="{{asset('/public/home/picture/avatar.png')}}">
  						</a>
              			<a class="link-dark pls" href="">超坏小男人ve</a>
  						发起了话题
          				<span class="divider">•</span>
          				4分钟前
                    	<span class="divider">•</span>
          				<a class="gray-darker" href="" title="给ES提建议" >给ES提建议</a>
                                <span class="divider">•</span>
            			最后回复     <a class="link-dark link-muted" href="">超坏小男人ve</a>

            			<span class="divider">•</span>
            			3分钟前
                  	</div>
      				</div>
    			</li>
			</ul>
		</div>
        <div class="col-md-12">
			<div class="page-header">
                <h4>回复的话题<a class="badge pull-right" href="" style="background-color:#3cb373;">1</a></h4>
            </div>
              	<ul class="media-list thread-list">
              	<li class="media">
		      		<div class="media-left">
				        <span class="reply-num">
				         	<strong> 1 </strong> 回复
				        </span>
				    </div>
			      	<div class="media-body pts">
			        <div class="media-heading">
			         	<a class="title gray-darker" href="">初来乍到</a>
			        </div>
			        <div class="metas">
			            <a class="userImg js-user-card" href="">
			                <img class="avatar-xxs" src="{{asset('/public/home/picture/avatar.png')}}">
			  			</a>
			  			<a class="link-dark pls" href="">超坏小男人ve</a>
			  			发起了话题
			          	<span class="divider">•</span>
			          	4分钟前
			            <span class="divider">•</span>
			          	<a class="gray-darker" href="" title="给ES提建议" >给ES提建议</a>
			            <span class="divider">•</span>
			            	最后回复     <a class="link-dark link-muted" href="">超坏小男人ve</a>
			            <span class="divider">•</span>
			            3分钟前
			        </div>
			      	</div>
    			</li>
  			</ul>
        </div>
		<div class="col-md-12">
            <div class="page-header">
                <h4>收藏的话题<a class="badge pull-right" href="" style="background-color:#3cb373;">0</a></h4>
            </div>
          	<ul class="media-list thread-list">
  				<li class="empty">暂无话题</li>
			</ul>
        </div>
    	</div>
      	</div>
		</div>
    	</div>
  	</div>
</div>
</body>
@endsection

