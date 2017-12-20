define(['utility'],function(_ut){
    if(!/account|balance/.test(location.pathname)) return;
	var balance = {
        $balance:$(".balance"),
        $doc:$(document),
        $process:$(".process"),
        userPhone:0,
        loopCheck:0,
        getQrcodeTxet:'',
        orderNo:0,
        coin:$(".balance").find("nav a:eq(0)").hasClass("on")?"gold":"coin",//区分金币 企点币
        ajax :function(Url,requestType,Data,callback,obj,asyncType){
            var request=$.ajax({
                url: Url,
                data: Data || {},
                type: requestType || "GET",
                dataType: "json",
                async:asyncType||false,
                success: function(data) {
                    typeof callback == "function" && callback(data,obj);
                },
                complete:function(){
                    request=null; 
                }
            });
        },
        payLink:function(str){
            return str?"/account/rechargePay?money="+str:"javascript:void(0);";
        },
        creatQrcode:function(ele){
            var t=this;
            t.ajax("/account/weixinpay?orderNo="+t.orderNo+"&money="+money,"get",{},function(data){
                t.getQrcodeTxet=data.data;  
				$(".WXpay").find(".red").text($(".red.money").text()).end().find('.qrcode').qrcode({
					render: "canvas", //table方式 
					width: 136, //宽度 
					height:136, //高度 
					text:t.getQrcodeTxet
                 });
            },'',true);
        },
        setGetcodeBtnClass:function(){
            var newClass='';
            if(!$(".checkAccount.fail").length&&!$(".checkMoney.fail").length&&$(".checkAccount input").val()&&$(".checkMoney input").val()&&!_ut.getSession("userChargeId"+userId)){
                newClass= "getcode";
            }else{
                newClass= "getcode disable";
            }
            $(".getcode").attr("class",newClass);
        },
		init:function(){
            var t=this,amount=$(".amount").val();
            // // 充值功能受限
            // $(".accountShow .right a:eq(0)").attr("href","javascript:void(0);").addClass("charge");
            $(".accountShow .right a:eq(0)").attr("href","/account/goldRecharge").addClass("charge");
            //回退又前进时
            $(".passMoney").attr("href",t.payLink(amount));
            t.bindEvent();
            /rechargePay/.test(location.pathname)&&t.$process.find(".erweimaWrap a").eq(0).trigger("click");
            return this;
		},
	    bindEvent:function(){
	    	var t=this;
	    	_ut.removeModal(".modalClose,#cboxOverlay",function(){
                clearInterval(t.loopCheck);
            });
	    	//发票，提现
            //
		    t.$balance.find(".bill,.embody,.charge").click(function(e){
                var t=$(this),idx=t.index(),
                    titleObj={"charge":"充值","bill":"发票","embody":"提现"};
                if(t.attr("href").indexOf("javascript")==-1) return;
			   	_ut.modal('chargeNormal','',function(){
			   		var $chargeNormal=$(".chargeNormal"),title,content;
	                $chargeNormal.find("a").attr({"href":"http://bbs.wqdian.com/thread-1265-1-1.html","target":"_blank"});
                    title=titleObj[t.attr("class")];
					$chargeNormal.find(".title h3").text(title+"提示").end()
	                .find(".content p:eq(0)").text("目前"+title+"功能仅支持线下，如您需要"+title+"，请联系客服。");
                    t.hasClass("charge")&&$chargeNormal.find("a").hide();
                    // if(t.hasClass("charge")){
                    //     $chargeNormal.find(".content").append("<p>QQ：31579781</p>")
                    // };
			   	});
		    }).end()
		    //转账
		    .find(".transfer").click(function(){
		    	t.ajax("/account/transfer","post",{},function(data){
		    		 t.userPhone=data.data.phone;
                     if(data.status==200){
				    	_ut.modal('transfer','',function(){
				    	    var $chargeNormal=$(".chargeNormal");
                            var countDownNum=_ut.getSession("userChargeId"+userId),
                            getCodeText=!countDownNum?"获取验证码":countDownNum+"秒后重新发送";
                            t.setGetcodeBtnClass();
                            countDownNum&&_ut.count($(".getcode"),"",countDownNum);
                            $chargeNormal.find("[logintype]").text(getCodeText).end();
                            //金币转账
				    	    if(t.coin=="gold"){
                                $chargeNormal.find("h3").text("金币转账").end()
                                .find(".userPhone").text(t.userPhone).end()
                                .find(".balance").text(data.data.goldBalance);
                                // .find("span:contains('金币余额')").
				    	    }
				    	    //企点币转账
				    	    else{
                                $chargeNormal.find("h3").text("企点币转账").end()
                                .find(".balance").text(data.data.coinBalance).end()
                                .find("span:contains('金币')").text("企点币余额：");
				    	    };
					   	});
                     }else{
                        _ut.modal('chargeNormal','',function(){
				    	    var $chargeNormal=$(".chargeNormal");
			    	    	$chargeNormal.find("h3").text("提示").end()
			    	    	.find('.content').css("padding-right","30px").html("<p style='text-align:center'>您的账号安全信息尚未完善，绑定手机号码后才可转账。 </p><a href='/security.html'>立即绑定</a>");
					   	});
                     }
		    	},"",true);
		    }).end()
            //翻页
            .find(".newsPaging").click(function(e){
            	var $target=$(e.target),nCurPageNo,coinType=t.coin=="gold"?"gold":"funds",pageUrl; 
            	$target.parents(".pagination").length&&$target.parent().addClass("active").siblings().removeClass("active");
            	nCurPageNo=parseInt($(".pagination .active").text(),10);
                if($target.hasClass("nextPage")){
                	pageUrl="/account/"+coinType+"?pageNo="+(nCurPageNo+1);
                }else if($target.hasClass("prevPage")){
                    pageUrl="/account/"+coinType+"?pageNo="+(nCurPageNo-1);
                }else{
                	pageUrl="/account/"+coinType+"?pageNo="+nCurPageNo;
                }
                window.location.href=pageUrl;
                return false;
            });
            //二维码选择支付方式
		    t.$process.find(".erweimaWrap a").click(function(){
		    	var $t=$(this),href;
		    	$t.addClass("on").siblings().removeClass("on");
                _ut.ajax("/account/orderNo","post",{},function(data){
                    t.orderNo=data.data;
                    href=$t.index()==0?"/account/alipay?orderNo="+t.orderNo+"&money="+money:"javascript:void(0)";
                    $(".next.pay").attr({"href":href}).removeAttr("target");
                    if($t.index()==0) $(".next.pay").attr({"target":"_blank"});
                },'',true)
		    }).end()
            //点击支付
		    .find(".pay.next").click(function(){			  
		    	$(".erweimaWrap .on").index()==1&&_ut.modal('WXpay','',function(){
		    		t.creatQrcode();	
			   	});
                
                t.loopCheck=setInterval(function(){
                    t.ajax("/account/payresult","post",{orderNo:t.orderNo,fee:money},function(data){
                        if(data.status==500) return;
                        else{
                            // var isSuccess=data.status==200?true:false;
                            var resUrl=data.status==200?"/account/coin/chargeDone.html?orderNo="+t.orderNo+"&fee="+money:"/account/coin/chargeFail.html";
                            window.location.href=resUrl;
                            // t.ajax("/account/paydone","post",{orderNo:orderNo,fee:money,isSuccess:isSuccess},'',true);
                        }
                    });
                },1000)
		    }).end()
		    //金额输入
		    t.$doc.on("input",".amount,.transferMoney",function(){
		    	var $t=$(this),allowVal=$t.val().replace(/\D|^0+/g,""),setClass,href;
		    	$t.val(allowVal);
		    	if($t.parents(".checkMoney").length){
			    	setClass=parseInt(allowVal,10)>parseInt(balanceCoin,10)?"fail":"";
			    	$t.parents(".checkMoney").attr("class","checkMoney checkNoraml "+setClass);
		    	}else{
			    	$(".passMoney").attr("href",t.payLink(allowVal));
		    	};
		    })
            .on("blur",".transferMoney",function(){
                t.setGetcodeBtnClass();
            })
		    //获取验证码
		    .on("click",".getcode",function(){
		    	var $t=$(this),$chargeNormal=$(".chargeNormal");
                if($t.hasClass("disable")) return;
		    	t.ajax("/captcha/phone/send2","post",{phone:t.userPhone},function(data){
                    if(data.status==200){
				    	$chargeNormal.find(".getcode").addClass("disable").text("60秒后重新发送").end()
				    	.find(".check p").attr("class","grey").text("验证短信将发送到："+t.userPhone+"，请注意查收");
                    	_ut.count($t,"","");
                    }else{
                         $chargeNormal.find(".check p").attr("class","red").text(data.msg).end().find(".getcode").addClass("disable");
                    };
		    	});
		    })
		    //确认转账
		    .on("click",".transfer .more",function(){
		    	var sendData={};
                function checkVal(){
                    var hasVal=1;
                    for(var i in arguments){
                        if($.trim(arguments[i].val())===""){
                            arguments[i].parent().addClass("fail");
                            hasVal=0;
                        }
                    }       
                    return hasVal;
                }
		    	if($(".checkAccount.fail").length||$(".checkMoney.fail").length) return;
                if(!checkVal($(".checkMoney input"),$(".checkAccount input"))) return;
                sendData={
                    inAccount:$.trim($(".checkAccount input").val()),
                    number:parseInt($(".checkMoney input").val(),10),
                    validateCode:$.trim($(".check input").val()),
                    thing:t.coin
                };
                t.ajax("/account/transferTo","post",sendData,function(data){
                	var $chargeNormal=$(".chargeNormal");
                    if(data.status==200){
                        $(".modalClose").trigger("click");
                        _ut.modal("h",'',function(){
                            $(".modalBox.sucss dt").text("转账成功！");
                        });
                        setTimeout(function(){window.location.reload()},1500);
                    }else if(data.msg=="验证码错误") {
                    	$chargeNormal.find(".check input").css("border","1px solid #ff0000").end()
                    	.find(".check p").attr("class","red").text("验证码输入错误，请重新获取");
                    	setTimeout(function(){
                    		$chargeNormal.find(".check input").css("border","1px solid #dcdcdc").end()
                    	    .find(".check p").text("");
                    	},2000);
                    }else{
                       $(".modalClose").trigger("click");
                        _ut.modal("i",'',function(){
                            $(".modalBox.fail dt").text("转账失败！");
                            setTimeout(function(){$("#cboxOverlay").trigger("click");},1500);
                        }); 
                    };
                },'',true);
		    })
            //账号验证
            .on("blur",".checkAccount input",function(){
            	var $t=$(this),val=$.trim($t.val()),isAllowed=true;
            	isAllowed=/(^1[3|5|7|8](\d+){8}$)|(^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$)/.test(val);
                if(!val||!isAllowed) {
                    $t.parent().attr("class","checkAccount checkNoraml fail").end().siblings("p").text("请输入正确账号");
                    return;
                };
                t.ajax("/account/validateUser","post",{account:val},function(data){
                    var setClass=data.status==200?"success":"fail";
                    $t.parent().attr("class","checkAccount checkNoraml "+setClass);
                    t.setGetcodeBtnClass();
                    data.status==500?$t.siblings("p").text(data.msg):$t.siblings("p").text("");
                },'',true);
            });
            //推出销毁session
            $(".login-box a:contains('退出')").click(function(){
                _ut.removeSession("userChargeId");
            });
	    },
	};
	return balance.init();
});