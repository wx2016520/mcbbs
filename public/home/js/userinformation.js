define(['utility'],function(_ut){
	var userinformation = {
		'init' : function(){
			this.userifo = $('#userInfo');
			if(!this.userifo.length) return;
			
			this.userifo.find('input[datatype=qq]').on('propertychange input',function(){
				$(this).val( $(this).val().replace(/\D+/ig,'') );
			});
			
			this.userifo.find('input[type=text]').blur(function(){
				var val = $.trim($(this).val()) ,type = $(this).attr('datatype') ,fn = null;
				if(type=='name'){ 
					fn = function(){ $('span#name').html(val) };
				}
				userinformation.type($(this).attr('datatype') ,val ,fn);
			});
			
			this.userifo.find('i.radio').click(function(){
				$(this).addClass('checked').siblings().removeClass('checked');
				userinformation.type('sex' ,$(this).attr('sex'));
			});
			
			this.userifo.find('input[readonly],i.san').parent().click(function(event){
				if(event.target.tagName.toLowerCase()=='p') return;
				var self = $(this).find('input');
				!$('.trades').is(":visible") ? $('.trades').show() && $(this).find('i.san').addClass('on') && $(".nano").nanoScroller({alwaysVisible: true}) && $('.trades').find('li').click(function(){ 																																	
					var val = $(this).html();
					var callback = function(){
						self.prop('value',val);
						$('.trades').hide();
					}
					userinformation.type('company' ,val ,callback);
				}) : $('.trades').hide() && $(this).find('i.san').removeClass('on');
			});
			
			if(document.getElementById('fileUpload')){ 
				document.getElementById('fileUpload').onchange = function(evt) {
					var maxRise = 2;
				    if (!window.FileReader) return;
				    var files = evt.target.files;
				    if(!files || files.length>0){
				    	if(this.files && this.files[0] && ((this.files[0].size || 0) > maxRise*1024*1024)){
				    		alert("图片体积过大，请重新上传！");
				    		return;
				    	}else{
				    		for (var i = 0, f; f = files[i]; i++) {
				    			var $split = (f.type).split("image/")[1];
						        if($split!="gif" && $split!="jpg" && $split!="jpeg" && $split!="png")
								{
									alert("图片格式有误！");
									return false;
								}else{
									if (!f.type.match('image.*')) {
							            continue;
							        }
									var reader = new FileReader();
							        reader.onload = (function(theFile) {
							            return function(e) {
							            	$('.picture').find('img')[0].src = e.target.result;
											$('.userIcon').find('img')[0].src = e.target.result;
							            	$('input#fileUpload').val(e.target.result);
							            };
							        })(f);
							       	 reader.readAsDataURL(f);
							       	 $(".upimg").text("上传成功！");
									 setTimeout(function(){ $(".upimg").text("上传头像"); },1000);
								}
						    }
							if($('#uploaduserimg').length>0){
								$('#uploaduserimg').submit();	
							}
				    	}
				    }
				};
			}
			
		},
		'type' : function(type ,val ,callback){
			var url = data = '';
			switch(type){
				case 'name':
					url =  '/profile/updateNickName';
					data = {"nickName":val};
					break;
				case 'sex':
					url =  '/profile/setting';
					data = {"gender":val};
					break;
				case 'company':
					url =  '/profile/setting';
					data = {"trade":val};
					break;
				case 'qq':
					url =  '/profile/setting';
					data = {"qq":val};
					break;
			}
			this.upmsg(url ,data, callback);
		},
		'upmsg' : function(url ,data ,callback){
			_ut.ajax(url ,'POST' ,data ,function(data){
				if(typeof callback=='function') callback();
			}); 
		}
	};
	return userinformation;
});