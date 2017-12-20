define(['utility'],function(_ut) {
	/*只有在登录页面执行*/
	if(!/authorize/g.test(location.href)){
		return;
	}
	var auth = new Vue({
		el:"#authorization",
		data:{
			isCheck:false,
			certifyLink: "http://kf.qq.com/faq/120911VrYVrA130805byM32u.html",
	        serviceNumberLink: "http://kf.qq.com/faq/120911VrYVrA130805byM32u.html",
	        noLink: "javascript:void(0);",
	        WXauthoriz: true,
	        modifyAuthoriz: true,
	        objWin: null,
	        authormessage:"",
	        emailSender:"",
	        isAgentSystem:isAgentSystem,//是否是代理商用户
	        smsAvaliableAmount:defaultInfo.smsAvaliableAmount,
	        emailAmount:defaultInfo.emailAmount,
	        opeType:null,
	        checkedphone:defaultInfo.phone,
	        checkedemail:defaultInfo.email,
	        checkedWX:defaultInfo.WX,
	        isAuthorized:!defaultInfo.isAuthorized,
	        authorizedInfo:"",
	        authorizedBuyInfo:"",
	        canshow:false,
	        isshow:false,
	        buyshow:false,
	        openshow:false,
	        closeshow:false,
	        tipShow:false,
	        wxshow:false,
	        onlyshow:false,
	        loginmessage:'',
	        buydata:[],
	        buymessagedata:{},//购买数据
	        wxdata:{},//微信支付数据
	        smsmessageinfo:[],
	        emailmessageinfo:[],//邮箱
	        smsshow:false,
	        emailshow:false,
	        notshow:false,//微信未授权弹窗
	        type:"",//购买类型
	        closemessage:"",//关闭信息
	        openmessage:"",/*获取点击的手机还是邮箱*/
	        event:"" /*获取点击的元素*/
		},
		methods:{
			authoriz: function authoriz(e) {
	            var $target = $(e.target);
	            if ($target.hasClass("WXauthoriz") || $target.hasClass("modifyAuthoriz")) {
	                if ($target.parent().hasClass('agentNoAuth') && $target.hasClass('WXauthoriz')) {
	                    return;
	                };
	                _ut.ajax('/authorize', "get", {}, function (data) {
	                    function isOpen(payUrl) {
	                        //目标页面
	                        if (auth.objWin == null || auth.objWin.closed) {
	                            auth.objWin = window.open(payUrl);
	                            /*auth.document.referrer = '111';*/
	                        } else {
	                            auth.objWin.location.replace(payUrl);
	                        }
	                    };
	                    isOpen(data.data);
	                }, '', true);
	                var times=0;
	                var timer = setInterval(function () {
	                	times++;
	                    _ut.ajax("/authorize/result", "get", {}, function (data) {
	                        if (data.status == 200) {
	                            clearInterval(timer);
	                            window.location.reload();
	                        };
	                    }, '', true);
	                	if(times>=30) clearInterval(timer);
	                }, 3000);
	            } else if ($target.hasClass("releaseAuthoriz")) {
	                _ut.modal("l", "", function () {
	                    var $normal = $(".normal");
	                    $normal.find(".title h3").text("解除绑定").end().find(".content p").text("您正在解除微信公众号的授权，是否继续？").end().find(".save").click(function () {
	                        _ut.ajax("/unauthorize", "post", {}, function (data) {
	                            _ut.saveTip(data, { succ: "解除成功", fail: "解除失败" }, function () {
	                                window.location.reload();
	                            });
	                        }, "", true);
	                    });
	                });
	            }
	        },
			authorTypeBuy:function (event) {
				this.event=$(event.target).attr("num");
				var num= parseInt($(event.target).attr("num"));
				var _this=this;
				_this.type=num==0?0:1;
				_this.openmessage=num==0?"短信":num==1?"邮件":"";
				this.closemessage=num==0?"手机":num==1?"邮箱":"微信";
				this.loginmessage=["使用手机注册登录","使用邮箱注册登录","使用微信登录"][num];
				val = {
					0:this.checkedphone ? 1 : 0,
					1:this.checkedemail ? 1 : 0,
					2:this.checkedWX ? 1 : 0,
					3:_this.authormessage,
					4:_this.emailSender
				}[num];
				var bl=[this.checkedphone,this.checkedemail,this.checkedWX][num];
				_this.authorizedInfo=(isAgentSystem&&num!=2)?"您当前"+_this.openmessage+"可用条数为0，将会影响您此功能正常使用，请联系网站制作者购买"+_this.openmessage+"。":"微信登录需要认证服务号授权，请授权";
				 //判断是否清除全部选中
				if(!this.checkedphone&&!this.checkedemail&&!this.checkedWX){
					switch (num) {
						case 0:
							this.checkedphone = true;
							break;
						case 1:
							this.checkedemail = true;
							break;
						case 2:
							this.checkedWX = true;
							break;
					}
					_this.onlyshow=true;
					return
				}
				_this.httpRequest("/authorize/loginSetting","post",{"opeType":num,"value":val},function(data){
					if(data.status==200){
						if(bl&&num!=2){
							if(!_this.isAgentSystem&&_this.smsAvaliableAmount<=0&&num==0){
								_this.openshow=true;
							}else if(_this.isAgentSystem&&num==0&&_this.smsAvaliableAmount<=0){
								_this.notshow=true;
							}else if(!_this.isAgentSystem&&_this.emailAmount<=0&&num==1){
								_this.openshow=true;
							}else if(_this.isAgentSystem&&num==1&&_this.emailAmount<=0){
								_this.notshow=true;
							}else{
								_ut.modal("h", "", function () {
				                    var $tip=$('.modalBox');
				                    $tip.find("dt").text("开启成功");
				                    setTimeout(function(){
				                    	$("#cboxOverlay,#colorbox").remove();
				                    },2000)
				                });
							}
						}
						else if(!bl&&(num==0||num==1)){
							_this.closeshow=true;
						}
						else{
							if(bl&&num==2){
								if(_this.isAuthorized==true){
									_this.notshow=true;
								}else{
									_ut.modal("h", "", function () {
					                    var $tip=$('.modalBox');
					                    $tip.find("dt").text("开启成功");
					                    setTimeout(function(){
					                    	$("#cboxOverlay,#colorbox").remove();
					                    },2000)
					                });
								}
							}
							else if(!bl&&num==2){
								_this.closeshow=true;
							}
						}

					}
				})
			},
			authorizedLogin:function(){//微信授权
				this.notshow=false;
				this.onlyshow=false;
				$(".authorizedLogin").click();
			},
			/*购买渲染*/
			openPhone:function(typeval){
				this.loginshow=false;
				this.openshow=false;
				var _this=this;
				var type=(_this.type==0)?"sms":"email";
				this.httpRequest("/get/"+type+"/spec","get","",function(data){
					if(data.status==200){
						var datas=JSON.parse(data.data);
						_this.buydata=datas.specList;
						_this.buyshow=true;
					}

				})
			},
			/*购买按钮*/
			opentype:function(e){
				var types=$(e.target).attr("buytype");
				var _this=this;
				_this.openmessage=types=="sms"?"短信":"邮件";
				_this.authorizedInfo=isAgentSystem?"请联系网站制作者购买验证"+_this.openmessage+"。":"微信登录需要认证服务号授权，请授权";
				if(_this.isAgentSystem){
					_this.notshow=true;
				}else{
					_this.httpRequest("/get/"+types+"/spec","get","",function(data){
					if(data.status==200){
						var datas=JSON.parse(data.data);
						_this.buydata=datas.specList;
						_this.buyshow=true;
					}

				})
				}
			},
			/*购买页面点击返回*/
			blackhtml:function(){
				this.buyshow=false;
			},
			//取消
			cancelfn:function(){
				this.openshow=false;
				this.isshow=false;
				this.onlyshow=false;
			},
			/*购买类型*/
			buymessage:function(){
				var _this=this;
				this.buyshow=false;
				var specId=$(".promptPopup ul").find("input:checked").parents("li").attr("id");
				this.httpRequest("/smspackage/"+specId+"/purchase/popup","get",{"specId":specId },function(data){
					if(data.status==200){
						_this.buymessagedata=data.data;
						_this.isshow=true;
					}
				})
			},
			/*关闭选中套餐*/
			closelogin:function(){
				this.closeshow=false;
			},
			/*点击关闭按钮*/
			closefn:function(){
				this.canshow=false;
		        this.isshow=false;
		        this.buyshow=false;
		        this.openshow=false;
		        this.closeshow=false;
		        this.wxshow=false;
		        this.smsshow=false;
		        this.emailshow=false;
		        this.notshow=false;
		        this.onlyshow=false;
			},
			/*购买套餐*/
			buyPackage:function(el){
				var that=this;
				var specId=$(".promptPopup ul").find("input:checked").parents("li").attr("id");
				this.httpRequest("/smspackage/"+specId+"/purchase","get",{"specId":specId },function(data){
					if(data.status==200){
						if($(".buysection .buybtn").attr("name")=="wxpay"){
							that.wxdata=data.data;
							that.isshow=false;
							$(".wxpaysection").find("#qrcode").html("").qrcode({ //生成二维码
	                            render: "table",
	                            width: 150,
	                            height: 150,
	                            text: data.data.wechatQRCodeUrl
	                        })
	                        that.wxshow=true;
	                        that.wxpaydone()
						}
						else{
							that.isshow=false;
							that.canshow=true;
						}
					}
				})
			},
			/*微信支付成功*/
			wxpaydone:function(){
				var _this=this;
				setInterval(function(){
					_this.httpRequest("/smspackage/puchase/is/suceess","get","",function(data){
						if(data.status==200){
							_this.canshow=true;
							_this.wxshow=false;
						}
					})
				},1000)
			},
			/*支付成功刷新页面*/
			buysuccess:function(){
				this.canshow=false;
				window.location.reload();
			},
			/*发送请求数据*/
			httpRequest:function(Url,type,rqusetdata,callback){
					$.ajax({
						url:Url,
						type:type,
						data:rqusetdata,
						success:function(data){
							 callback(data);
						}
					})
			}
		},
		ready:function(){
	       _ut.removeModal(".canlce,.modalClose,#cboxOverlay");
		}
	})
});