// $(function() {
// 	var loginCheck = {},
// 		flag = 1; //flag==0则验证不通过
// 	var regTel = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/; //手机
// 	var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/; //邮箱
// 	var operaType = $("#login-regis").attr("operaType");
// 	// 登录账户判断
// 	loginCheck.account = function(obj) {
// 		var mes = "";
// 		if (($.trim(obj.val()) != "") && !regTel.test($.trim(obj.val())) && !regEmail.test($.trim(obj.val()))) {
// 			flag = 0;
// 			obj.siblings(".error_mess").html("请输入正确格式的手机号/用户名");
// 		} else if ($.trim(obj.val()) == "") {
// 			obj.siblings(".error_mess").html("账号不能为空");
// 		} else {
// 			flag = 1;
// 			obj.siblings(".error_mess").html("");
// 		}
// 	}
//
// 	// 点击眼睛图片显示密码 mousedown显示密码 mouseup还原
// 	$(document).on("mousedown", ".loginSection .eye", function() {
// 		$("input[name='password']").attr("type", "text");
// 		$(document).on("mouseup", ".loginSection .eye", function() {
// 			$("input[name='password']").attr("type", "password");
// 		})
// 	})
//
// 	// 登录注册提交前校验
// 	$("#login-regis").validate({
// 		onkeyup : false,
// 		submitHandler : function(form) {
// 			if (flag != 0) { //验证通过 可开始调登录注册接口
// 				if (operaType == "login") { // 2.新版登录接口
// 					$.ajax({
// 						url : form.action,
// 						type : "POST",
// 						data : {
// 							"name_phone" : form.name_phone.value,
// 							"password" : form.password.value
// 						}
// 					})
// 						.done(function(data) {
// 							if (data.status == 200) {
// 								console.log(data.data.url);
// 								location.href = data.data.url;
// 							} else if (data.status == 500) {
// 								$(form).find(".error_mess:eq(1)").text(data.msg);
// 							}
// 						})
// 						.fail(function(data) {});
// 				}
// 			}
// 		},
// 		rules : {
// 			loginId : {
// 				required : true
// 			},
// 			password : {
// 				required : true,
// 				rangelength : [ 6, 20 ]
// 			}
// 		},
// 		messages : {
// 			loginId : {
// 				required : "! 请输入常用手机号/用户名"
// 			},
// 			password : {
// 				required : "! 请输入密码",
// 				rangelength : "! 密码长度不正确"
// 			}
// 		},
// 		errorPlacement : function(error, element) {
// 			$(".warning").empty();
// 			element.siblings(".error_mess").empty();
// 			error.appendTo(element.siblings(".error_mess"));
// 		}
// 	});
//
//
// 	// 点击登录/注册按钮开始调接口
//     $("#loginBtn").on("click",function(){ //$("#loginBtn,#regisBtn").on("click",function(){
// 		$("#login-regis").submit();
// 	})
//     // 点击登录/注册按钮开始调接口
//     $("#regisBtn").on("click", function() { //$("#loginBtn,#regisBtn").on("click",function(){
//         $("#login-regis").submit();
//     })
//
// 	//极验
// 	var handlerPopup = function(captchaObj) {
// 		// 成功的回调
// 		captchaObj.onSuccess(function() {
// 			var validate = captchaObj.getValidate(),
// 				obj = {};
// 			$.ajax({
// 				url : "/geet/validate.html", // 进行二次验证
// 				type : "post",
// 				dataType : "json",
// 				data : {
// 					username : $('#username1').val(),
// 					password : $('#password1').val(),
// 					geetest_challenge : validate.geetest_challenge,
// 					geetest_validate : validate.geetest_validate,
// 					geetest_seccode : validate.geetest_seccode
// 				},
// 				success : function(data) {
// 					if (data && (data.status === "success")) {
// 						var timer = setTimeout(function() {
// 							$("#login-regis").submit();
// 						}, 1000)
// 					}
// 				}
// 			});
// 		});
// 		$("#loginBtn").click(function() {
// 			captchaObj.show();
// 		});
// 		$("#login-regis input").keydown(function(event) {
// 			if (event.keyCode == 13) {
// 				if ($(this).is("#password")) {
// 					captchaObj.show();
// 				} else {
// 					$(this).parent().next().find("input").focus();
// 				}
// 			}
// 		})
// 		// 将验证码加到id为captcha的元素里
// 		captchaObj.appendTo("#popup-captcha");
// 	};
//
//
// 	// $.ajax({
// 	// 	// 获取id，challenge，success（是否启用failback）
// 	// 	url : "register.html?t=" + (new Date()).getTime(),
// 	// 	// 加随机数防止缓存
// 	// 	type : "get",
// 	// 	dataType : "json",
// 	// 	success : function(data) {
// 	// 		initGeetest({
// 	// 			gt : data.gt,
// 	// 			challenge : data.challenge,
// 	// 			product : "popup",
// 	// 			offline : !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
// 	// 		},
// 	// 			handlerPopup);
// 	// 	}
// 	// });
//})
$("#loginBtn").click(function () {
    //获取用户名/手机号
    $name_phone=$("#loginId").val().trim();
    $password=$("#password").val().trim();
    if($name_phone==null || $name_phone==""){
        $("#loginId").focus();
        $("#loginId").siblings(".error_mess").html("! 用户名/手机号不能为空");
         return;
    }
    if($password==null || $password==""){
        $("#password").focus();
        $("#password").siblings(".error_mess").html("! 密码不能为空");
         return;
    }

    $("#login-regis").submit();
})