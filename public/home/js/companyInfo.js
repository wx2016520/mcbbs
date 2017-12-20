define(["siteSet"],function (siteSet) {
  if(!/[company|setting]$/.test(location.href))  return;
  var companyInfo={
  	init:function(){
	   var t=this;
	   t.upImg().bindEvent();
	   return t;
	 },
	ajax:function(type,url,sendData,sunFun,failFun){
		$.ajax({
			type:type,
			url:url,
			dataType:"json",
			data:sendData,  
			success:function(data){
				typeof sunFun=="function"&&sunFun(data);
			},
			error:function(data){
				typeof failFun=="function"&&failFun(data);
			}
		});	
	},
	upImg:function(){
	  // 图片上传
		var iconupload =$("#iconupload")[0];
		if($('#companyUploadBtn').length){
			$('#companyUploadBtn')[0].onchange = function(evt) { 
			// 如果浏览器不支持FileReader，则不处理  
				var maxRise = 2;
			    if (!window.FileReader) return;
			    var files = evt.target.files;
			    if(!files || files.length>0){
			    	if(this.files && this.files[0] && ((this.files[0].size || 0) > maxRise*1024*1024)){
						this.value = "";
			    		$("#filError").text("图片体积过大，请重新上传！").css("color","#ff6a6a");
			    		return false;
			    	}else{
			    		for (var i = 0, f; f = files[i]; i++) {
			    			var $split = (f.type).split("image/")[1];
					        if($split!="gif" && $split!="jpg" && $split!="jpeg" && $split!="png" && $split!="bmp")
							{
								$("#filError").text("图片格式有误！").css("color","#ff6a6a");
								return false;
							}else{
								if (!f.type.match('image.*')) { 
						            continue;  
						        }
								var reader = new FileReader();  
						        reader.onload = (function(theFile) { 				        	
						            return function(e) { 
						                document.getElementById('previewImage').src = e.target.result; 
						                $("#profile span.photosh>img").attr("src",e.target.result);
						            };  
						        })(f);  
						       	 reader.readAsDataURL(f); 
						       	 $("#filError").text("上传成功！").css("color","#30d18b");
						       	 $(".uploadFileEmpty p.error-msg").empty();
							}
					    }
			    		if(iconupload&&iconupload.length>0){
			    			iconupload.submit();	
			    		}
			    	}
			    }
			}
		}
		return this;
	},
	commonBlur:function(reg,ele,failText,sucText){
	   $error=ele.parent().siblings(".error-msg")
       if(!reg.test(ele.val())&&ele.val()) $error.removeClass("success").text(failText);
       if(!ele.val()) $error.text("");
	   if(reg.test(ele.val())) $error.text(sucText);
	},
	inputLimit:function($input){
       $input.each(function(){
       	   var t=$(this);
       	   t.on("input",function(){
       	   	   var val = $(this).val() ,len=$(this).attr("len"),getStr=siteSet.getString(val,len,"");
               if(getStr.realLength>len) $(this).val(getStr.getStr);
       	   });
       });
	},
	bindEvent:function(){
		var isreNo = $("#companyForm").find(".pic-tit span em").html() != "" ? true : false;
		var isUrl = false,t=this;
		t.inputLimit($("li.normal .param"));
		$("#registeredNo").blur(function(){
			var $obj = $(this),
				$regisNo = ($obj.val()).replace("<>","▽"),
				$error=$obj.parent().siblings(".error-msg"),
				param = {registeredNo:$regisNo};
			if($obj.val() == "") $error.removeClass("success").text("请输入企业/机构证件号");
			if($obj.val() != ""){
				var $url = "/company/registeredNo/check";
                t.ajax("get",$url,param,function(data){
					if(data.status == 200){
						isreNo = true;
						$error.addClass("success").text(data.msg); 
					}else{
						$error.text(data.msg); 
					}
                },function(){
					alert("系统出错了");
                });
			}
		});
		//检索网址
		$("#siteUrl").blur(function(){
			var $obj = $(this),
				$siteUrl = ($obj.val()).replace("<>","▽"),
				$error=$obj.parent().siblings(".error-msg"),
				param = {siteUrl:$siteUrl};
			if($websitLine.test($siteUrl)){
				var $url = "/company/siteUrl/check";
				t.ajax("get",$url,param,function(data){
					if(data.status == 200){
						isreNo = true;
						$error.addClass("success").text(data.msg); 
					}else{
						$error.text(data.msg); 
					}
				},function(){
						alert("系统出错了");
				});
			}else{
               $error.removeClass("success").text("！ 请填写正确的网址");
			};
		});
		function checkTrue(){
			if(isreNo==false){
				$("#registeredNo").focus();
				return false;
			}
			if(isUrl==false){
				$("#siteUrl").focus();
				return false;
			}
		}
		$(".uploadFile span.error-msg").empty();
		$("#websiteName,#icp,#companyName,#userName").blur(function(){
			$(this).val(($(this).val()).replace("<>","▽"));
		});
		var $websitLine = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		/*企业信息*/
		function _change(obj) {
		    var $text = obj.value;   // 获取input的值
		    var $getVal = $text.substring(6);
		    if ($text.match(/^http:\/\//gi) == null) {   // 判断是否以http开头
		        obj.value = "http://"+$getVal; 
		    }	
		}
		$("#siteUrl").blur(function(){
			_change(this);
		});
		$("#siteUrl").keyup(function(){
			_change(this);
		});
		//邮箱
		$("#email").blur(function(){
			var $isEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			$t=$(this);
            t.commonBlur($isEmail,$t,"！ 请输入正确的邮箱地址","");
		});
		$("#phoneCheck").blur(function(){
			var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
			$t=$(this);
			t.commonBlur(mobile,$t,"！ 请填写正确的手机号码","");
		});
	    $(document).on("click",".companyInfoSave a",function(){
		   var submit=true,$param=$(".companyInfo .normal input"); 
           $param.each(function(){
              var t=$(this),$error=t.parent().siblings(".error-msg");
              if((/^http:\/\/$|^\s*$/.test(t.val()))&&$error.attr("none")) $error.removeClass("success").text($error.attr("none")),submit=false;
              if(($error.text()!=""&&!$error.hasClass("success"))) submit=false;
            });
            if(submit){
	           	var  form=$("#companyForm")[0],tipHtml="${SUCCESS_MSG}"?"<div class='tipModal success'><i></i><span>信息保存成功</span></div>":"<div class='tipModal fail'><i></i><span>信息保存失败</span></div>";
	           	$.colorbox({
	                transition: "none",
	                opacity: 0.5,
	                html:tipHtml,
	                fixed: true,
	                closeButton: false,
	                onOpen: function() {},
	                onComplete: function() {
	                    setTimeout(function(){
                            $("#cboxOverlay,#colorbox").remove();
	                    },1500);
	                },
	                onClosed: function() {}
	            });
	            form.submit();
	            $(".error-msg").each(function(){
	            	$(this).text("");
	            });
	            // window.location.href=;
            };
		});
		$("#websiteName,#icp,#companyName,#userName").blur(function(){
			var $t=$(this),$error=$t.parent().siblings(".error-msg");
			$t.val(($t.val()).replace("<>","▽"));
			if(!/^\s*$/.test($t.val())) $error.text("");
		});
		$(".ask").hover(function(){
           var $t=$(this),$tip=$t.parent().siblings(".tips"),$tipHei=$tip.outerHeight();
           $tip.show().css("top",20-($tipHei-20)*0.5);
		},function(){
           var $t=$(this),$tip=$t.parent().siblings(".tips");
           $tip.hide(); 
		});
    },
  };
  return companyInfo.init();;
});