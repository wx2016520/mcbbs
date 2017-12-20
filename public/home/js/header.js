$(function(){
	var viewHeight = (window.innerHeight) ? window.innerHeight : document.body.clientHeight;
	var oTop = $(".con-header").length ? $(".con-header").offset().top : false ;
	var hTop = !!$('.wqd-menu ').length;
	$(document).on('mouseenter wqd-menu','.wqd-menu',function(e){
		if(e.type === 'mouseenter'){
			$(this).addClass('menu-hover')
		}
	})
	$('.wqd-menu').on
	$(window).scroll(function (){
		var b = $(window).scrollTop() + $(window).height(); 
		var p = $(this).scrollTop(); 
		if(oTop){
			if ($(this).scrollTop() >= oTop) {
				$('.wqd-menu').addClass('wqd-menu-fix');
    			$(".con-header").addClass("con-header-fixed");
   	  	} else {
				$('.wqd-menu').removeClass('wqd-menu-fix');
    			$(".con-header").removeClass("con-header-fixed");
    	}
		}else if(hTop){
			if(p > viewHeight/5){
				if($('.wqd-menu-other').length){
					$('.wqd-menu').addClass('wqd-menu-fix');
				}else{
					$('.wqd-menu').addClass('wqd-menu-fix');
				}
			} 
			if(p < viewHeight/5){
				if($('.wqd-menu-other').length){
					$('.wqd-menu').removeClass('wqd-menu-fix');
				}else{
					$('.wqd-menu').removeClass('wqd-menu-fix');
				}
			}
		}
		//到下一屏，客服动画
		if(p > viewHeight/2){
			$('.wqd-help').addClass('wqd-help-top');
		}else{
			$('.wqd-help').removeClass('wqd-help-top');
		}		
	})
})