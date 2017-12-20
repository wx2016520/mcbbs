define(["utility"],function (utility) {
    if(!/security/.test(location.href))  return;
	var security={
	  	init:function(){
	  	 	var _t=this;
	  	 	_t.commonInput($("#pasnewpwd,#newPwdTwo,#loginId"));
	  	 	_t.modifyPassword().bindEmail().checkEmail().modifyEmail().bindPhone().checkPhone().modifyPhone();
	  	 	return _t;
	  	},
	  	commonBlur:function(reg,$input,failText,sucFun){
		   var $error=$input.siblings(".errorMsg");
	       if(!reg.test($input.val())&&$input.val()!="") $error.removeClass("success").text(failText);
	       if($input.val()=="") $error.removeClass("success").text($input.attr("none"));
		   if(reg.test($input.val())) typeof sucFun=="function"&&sucFun();
		},
		commonInput:function($input){
            $input.on("input",function(){
				var t=$(this);
				if(t.attr("type")=="phone") t.val(t.val().replace(/\D/g,""));
				// t.val(t.val().replace(/\W/g,""));
			});
		},
		//点击获取验证码checkFun(验证前的一系列判断),$captcha(验证码元素)
		/*getCaptcha:function(checkFun,paramJson){
			paramJson.$captcha.off("click").on("click",function(){
				if((typeof checkFun=="function"&&!checkFun())||$(this).hasClass("disable")) return;
				var loginId=$("#loginId").val().replace(/\s*//*g,"");
				paramJson.sendData.loginId=loginId;
				paramJson.sendData.capImgCode=$("#imgCheckCode").val();
				if($(".selectfn").length) paramJson.sendData.loginIdType=/^\d+$/.test(loginId)?"phone":"email";
				if($(".selectfn").length) paramJson.sendData.actionType=/^\d+$/.test(loginId)?"updatePhone":"updateEmail";
				utility.getPhoneCode(paramJson.$img,paramJson.$captcha,paramJson.$erroElm,paramJson.sendData);
			});
		}, */
		chekEmail:function($email){
			var _t=this;
			$email.blur(function(){
				var $isEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
				$t=$(this),$error=$t.siblings(".errorMsg");
				if($email.siblings().hasClass("fn")){
					return;
				}
	            _t.commonBlur($isEmail,$t,"！ 请输入正确的邮箱地址",function(){
	            	var json={
	            		loginId:$t.val(),loginIdType:"email"
	            	};
	            	utility.ajax("/member/check/loginId","post",json,function(data){
                        data.status==200?($error.addClass("success"),codeCheck=1):$error.removeClass("success");
                        $error.text(data.msg);
	            	});
	            });
			});
		},
		checkPhoneNumber:function($phone){
			var _t=this;
			$phone.blur(function(){
				var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
				$t=$(this),$error=$t.siblings(".errorMsg");
				_t.commonBlur(mobile,$t,"！ 请填写正确的手机号码",function(){
					var json={
	            		loginId:$t.val(),loginIdType:"phone"
	            	};
	            	utility.ajax("/member/check/loginId","post",json,function(data){
                        data.status==200?($error.addClass("success"),codeCheck=1):$error.removeClass("success");
                        $error.text(data.msg);
	            	});
				});
			});
		},
		//下拉选择
		dropDownSlect:function($top,$bot){
            $top.on("click",function(){
          	    $bot.toggleClass("show");
          	    $bot.hasClass("show")?$(this).addClass("on"):$(this).removeClass("on");
            });
            $bot.find("li").on("click",function(){
          	    var $t=$(this);
          	    $top.val($t.text()).removeClass("on").parent().find(".errorMsg").text("");
          	    $bot.removeClass("show");
            });
            $(document).on("click",function(e){
                if(!$(e.target).hasClass("selectfn")) $bot.removeClass("show"),$top.removeClass("on");
            });
		},
		//修改密码
	  	modifyPassword:function(){
	  		var _t=this,$pwdFrom=$("#pwdFrom");
            if(!$pwdFrom.length) return _t;
            //检测旧密码
			$("#oldPass").blur(function(){
				var $obj = $(this);
				$.ajax({
					type:"get",
					url:"/security/password/check",
					dataType:"json",
					data:{password:$obj.val()},
					async:true,
					success:function(json){
						if(json.status == 200){
							$obj.parent().find(".error-msg").addClass("success").text(json.msg.messages[0]);
							$checkPwdTrue = true;
						}else{
							$obj.parent().find(".error-msg").removeClass("success").text(json.msg[0].messages[0]);
							$checkPwdTrue = false;
						}
					},error:function(){
						alert(json.msg);
					}
				});
			});
			//新密码
			var $window = $("#window");
			$("#pasnewpwd").focus(function(){$window.show();}).keyup(function(){
				var $this = $(this),
				    $thisLength = $this.val().length;
				if($thisLength > 5 && $thisLength < 21){
					$window.find("p").eq(0).find("span").html('<i class="fa fa-check bg-green"></i>');
					$window.find("p").eq(1).find("span").html('<i class="fa fa-check bg-green"></i>');
				}else{
					$window.find("p").eq(0).find("span").html('<i class="fa fa-times bg-red"></i>');
					$window.find("p").eq(1).find("span").html('<i class="fa fa-times bg-red"></i>');
				}
			});
			$("#pasnewpwd").blur(function(){
				var t=$(this),$error=t.parent().find(".error-msg"),val=t.val();
				(val.length<6||val.length>20)? $error.text("! 新密码长度不正确"):$error.text("");
				if(val=="") $error.text("! 请输入新密码");
				$window.hide();
			});
			//验证密码
			$("#newPwdTwo").blur(function(){
				var t=$(this),$error=t.parent().find(".error-msg"),$pasnewpwd=$("#pasnewpwd");
				t.val()!=$pasnewpwd.val()?$error.text("! 您两次输入的新密码不一致"):$error.text("");
				if($pasnewpwd.val()!=""&&t.val()=="") $error.text("! 请再次输入新密码");
			});
			//提交
			utility.conmmonSubmit($("#pwdFrom a.next"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#pwdFrom"));
			return _t;
	  	},
	  	//绑定邮箱
	  	bindEmail:function(){
	  		var _t=this,codeCheck=0,$upEmailFrom=$("#upEmailFrom");
	  		if(!$upEmailFrom.length) return _t;
			_t.chekEmail($("#loginId"));
            /*_t.getCaptcha(function(){
            	if(!$("#loginId").siblings(".errorMsg").hasClass("success")&&$("#loginId").val()!="") {
					$(".loginEmail .errorMsg").text("请先输入正确的邮箱地址！");
					return false;
				};
				return 1;
            },{
            	$img:$(".imgCheck img"),$captcha:$(".meilCheck .getcode"),$erroElm:$(".imgCheck .errorMsg"),
            	sendData:{
            		loginIdType:"email", actionType:"bindEmail"
            	}
            });*/
			utility.conmmonSubmit($("#upEmailFrom .bindEmail"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#upEmailFrom"));
			return _t;
	  	},
	  	//验证邮箱
	  	checkEmail:function(){
	  		var _t=this,$checkEmailForm=$("#checkEmailForm");
	  		if(!$checkEmailForm.length) return _t;
	  		 /*_t.getCaptcha("",{
            	$img:$checkEmailForm.find(".imgCheck img"),$captcha:$checkEmailForm.find(".getcode"),
            	$erroElm:$(".imgCheck .errorMsg"),
            	sendData:{
            		loginIdType:"email", actionType:"checkEmail"
            	}
            });*/
	  		utility.conmmonSubmit($checkEmailForm.find("a.next"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$checkEmailForm);
	  		return _t;
	  	},
	  	//修改邮箱
	  	modifyEmail:function(){
            var _t=this,$modEmailStep_1=$(".modEmailStep_1"),$modEmailStep_2=$(".modEmailStep_2"),$loginId=$("#loginId");
            if(!$modEmailStep_1.length&&!$modEmailStep_2.length) return _t;
            //点击验证提示
            var captchaTip=function($ele){
            	return function(){
	            	var codeCheck=true;
	            	if($ele.find(".selectfn").val()=="") $ele.find(".selectWay .errorMsg").text("请先选择验证方式！"),codeCheck=false;
	            	if($ele.find("#imgCheckCode").val()=="") $ele.find(".imgCheck .errorMsg").text(""),codeCheck=false;
					return codeCheck;
            	}; 
            };
            /*_t.getCaptcha(captchaTip($modEmailStep_1),{
            	$img:$(".imgyz img"),$captcha:$(".modEmailStep_1 .getcode"),$erroElm:$(".imgCheck .errorMsg"),sendData:{}
            });  
            _t.getCaptcha(captchaTip($modEmailStep_2),{
            	$img:$(".imgyz img"),$captcha:$(".modEmailStep_2 .getcode"),$erroElm:$(".imgCheck .errorMsg"),sendData:{
            		loginIdType:"email",actionType:"updateEmail"
            	}*/
            _t.dropDownSlect($(".modEmailStep_1 .selectfn"),$(".modEmailStep_1 .fn"));
            //验证身份提交
			utility.conmmonSubmit($("#modEmailStep_1 a.modEmailStep_1"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#modEmailStep_1"));
			//修改提交
			utility.conmmonSubmit($("#modEmailStep_2 a.modEmailStep_2"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#modEmailStep_1"));
			_t.chekEmail($loginId);
            return _t;
	  	},
	  	//绑定手机
	  	bindPhone:function(){
            var _t=this,$bindPhonePfrom=$("#bindPhonePfrom"),$phone=$bindPhonePfrom.find("#loginId");
            if(!$bindPhonePfrom.length) return _t;
            var captchaTip=function($ele){
            	return function(){
	            	var codeCheck=true;
	            	if($ele.find(".selectfn").val()=="") $ele.find(".selectWay .errorMsg").text("请先输入电话号码！"),codeCheck=false;
	            	if($ele.find("#imgCheckCode").val()=="") $ele.find(".imgCheck .errorMsg").text(""),codeCheck=false;
					return codeCheck;
            	}; 
            };
            _t.checkPhoneNumber($phone);
           /* _t.getCaptcha(captchaTip($bindPhonePfrom),{
            	$img:$(".imgCheck img"),$captcha:$(".getcode",$bindPhonePfrom),$erroElm:$(".imgCheck .errorMsg"),
            	sendData:{
            		loginIdType:"phone", actionType:"bindPhone"
            	}
            }); */
            utility.conmmonSubmit($("a.next",$bindPhonePfrom),function(ele){
                   return ele.siblings(".errorMsg");
	            },$bindPhonePfrom);
            return _t;
	  	},
	  	//验证手机
	  	checkPhone:function(){
            var _t=this,$checkPhonePfrom=$("#checkPhonePfrom");
            if(!$checkPhonePfrom.length) return _t;
            /*_t.getCaptcha("",{
            	$img:$checkPhonePfrom.find(".imgCheck img"),$captcha:$checkPhonePfrom.find(".getcode"),
            	$erroElm:$(".imgCheck .errorMsg"),
            	sendData:{
            		loginIdType:"phone", actionType:"checkPhone"
            	}
            });*/
			utility.conmmonSubmit($checkPhonePfrom.find("a.next"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$checkPhonePfrom);
			return _t;
	  	},
	  	//修改手机
	  	modifyPhone:function(){
            var _t=this,$modPhoneStep_1=$(".modPhoneStep_1"),$modPhoneStep_2=$(".modPhoneStep_2"),loginId=$("#loginId").val();
            if(!$modPhoneStep_1.length&&!$modPhoneStep_2.length) return _t;
	  		//点击验证提示
            var captchaTip=function($ele){
            	return function(){
	            	var codeCheck=true;
	            	if($ele.find(".selectfn").val()=="") $ele.find(".selectWay .errorMsg").text("请先选择验证方式！"),codeCheck=false;
	            	if($ele.find("#imgCheckCode").val()=="") $ele.find(".imgCheck .errorMsg").text(""),codeCheck=false;
					return codeCheck;
            	}; 
            };
           /* _t.getCaptcha(captchaTip($modPhoneStep_1),{
            	$img:$(".imgyz img"),$captcha:$(".getcode",$modPhoneStep_1),$erroElm:$(".imgCheck .errorMsg"),sendData:{}
            });*/  
            $modPhoneStep_2.length&&_t.checkPhoneNumber($("#loginId",$modPhoneStep_2));
            /*_t.getCaptcha(captchaTip($modPhoneStep_2),{
            	$img:$(".imgyz img"),$captcha:$(".getcode",$modPhoneStep_2),$erroElm:$(".imgCheck .errorMsg"),sendData:{
                    loginIdType:"phone",actionType:"updatePhone"
            	}
            });*/
            _t.dropDownSlect($(".selectfn",$modPhoneStep_1),$(".fn",$modPhoneStep_1));
            //验证身份提交
			utility.conmmonSubmit($(".modPhoneStep_1 a.next"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#modPhoneStep_1"));
			//修改提交
			utility.conmmonSubmit($(".modPhoneStep_2 a.next"),function(ele){
                   return ele.siblings(".errorMsg");
	            },$("#modPhoneStep_2"));
	  	},
	};
	return security.init();
});