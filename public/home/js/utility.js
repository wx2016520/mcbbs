define(function () {
    var utility = {};

    utility.ajax = function(Url,requestType,Data,callback,obj,asyncType){
        $.ajax({
            url: Url,
            data: Data || {},
            type: requestType || "GET",
            dataType: "json",
            async:asyncType||false,
            success: function(data) {
                typeof callback == "function" && callback(data,obj);
            },
            complete: function(XHR, TS) { XHR = null }
        });
    }

    utility.ajaxJson = function(Url,requestType,Data,callback,obj){
        $.ajax({
            url: Url,
            data: Data || {},
            contentType:"application/json",
            type: requestType || "GET",
            dataType: "json",
            async:false,
            success: function(data) { 
                typeof callback == "function" && callback(data,obj);
            }
        });
    }
	
	utility.setSession = function(name,val){
		if(!sessionStorage) return;
		sessionStorage.setItem(name,val);
	}
	
	utility.getSession = function(name){
		if(!sessionStorage) return;
		return sessionStorage.getItem(name);
	}
	
	utility.removeSession = function(name){
		sessionStorage.removeItem(name);
	}
	
	utility.refreshImgCode = function(elm){
		elm.click(function(){
			$(this).attr('src',$(this).attr('src')+'?'+new Date().getTime())
		});
		return this;
	}
	
	utility.getStringLength = function(str ,maxlength){
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return maxlength >= realLength ? true : false;
    } 
	
	/*	
		imgElm 验证码图片jquery
		elm 点击jquery元素 需要倒计时
		erroElm  错误信息显示的元素jquery对象
		data 传过来的参数
	*/
	utility.getPhoneCode = function(imgElm ,elm ,errorElm, data){  
		this.ajax('/member/captcha/send' ,'POST' ,data ,function(data){
			data.status==200 ? errorElm.css('opacity',0) && utility.count(elm ,false) : errorElm.html(data.msg).css('opacity',1) && imgElm.click();
		});
	}   
	
	utility.count = function(elm ,logintype ,msg){
		var time = !msg ? 60 : this.getSession('userId'+logintype+userId);
		var a = setInterval(function(){
			if(time>1){
				elm.addClass('disable').html(--time+'秒后重新发送');
				utility.setSession('userId'+logintype+userId,time);
			}else{
				elm.html('获取验证码').removeClass('disable');
				utility.removeSession('userId'+logintype+userId);
				clearInterval(a);
			}
		},1000);
	}
	
	utility.upfile = function(url ,fromdata ,fn){     
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: fromdata,
            processData: false,
            contentType: false
        }).done(function(res){
            if(res.status==200){
                typeof fn == "function" && fn(res);
            }else{
                alert(res.msg)
            }
        }).fail(function(res){
            alert('上传图片失败，请检查图片大小');
        });
    }
    utility.upLoadFile=function (obj) {
        $(document).on("change",obj.ele,function (evt) {
            if (!window.FileReader) return;
            var files = evt.target.files,_=evt.target;
            if (!files || files.length > 0) {
                if (_.files && _.files[0] && ((_.files[0].size || 0) > obj.maxSize)) {
                    alert(obj.overSizeTip);
                    _.value = "";
                    return;
                } else {
                    for (var i = 0, f; f = files[i]; i++) {
                        var $split = (f.type).split("image/")[1];
                        if (!obj.reg.test($split)) {
                            alert(obj.wrongFormatTxt);
                            _.value = "";
                            return false;
                        } else {
                            var reader = new FileReader();
                            reader.onload = (function(theFile) {
                                return function(e) {
                                    $.isFunction(obj.callBack)&&obj.callBack(e,_);
                                };
                            })(f);
                            reader.readAsDataURL(f);
                        }
                    }
                }
            }
        })
        // obj.ele.onchange = function(evt) {
        //     if (!window.FileReader) return;
        //     var files = evt.target.files,_=this;
        //     if (!files || files.length > 0) {
        //         if (_.files && _.files[0] && ((_.files[0].size || 0) > obj.maxSize)) {
        //             alert(obj.overSizeTip);
        //             _.value = "";
        //             return;
        //         } else {
        //             for (var i = 0, f; f = files[i]; i++) {
        //                 var $split = (f.type).split("image/")[1];
        //                 if (!obj.reg.test($split)) {
        //                     alert(obj.wrongFormatTxt);
        //                     _.value = "";
        //                     return false;
        //                 } else {
        //                     var reader = new FileReader();
        //                     reader.onload = (function(theFile) {
        //                         return function(e) {
        //                             $.isFunction(obj.callBack)&&obj.callBack(e,_);
        //                         };
        //                     })(f);
        //                     reader.readAsDataURL(f);
        //                 }
        //             }
        //         }
        //     }
        // };
    }
	
	//公共提交(非表单submit)
  	utility.conmmonSubmit=function($submit,$errorFun,$form){
        $submit.click(function(){
			var $input=$("input[none]");
            var submit=true,form=$form[0],$input=$("input[none]");
	        $input.each(function(){
	        	var t=$(this),$error=typeof $errorFun=="function"&&$errorFun(t);
	        	if(t.val()=="") $error.text(t.attr("none")),submit=false;
	        	if($error.text()!=""&&!$error.hasClass("success")&&$error.css("opacity")!=0) submit=false;
	        });
	        if(submit) form.submit();
		});
  	}
    utility.removeModal=function($close,fnCall){
        $close=$close||".modalClose,#cboxOverlay";
       	$(document).on("click.closeModal",$close,function(e){
            var $t=$(this);
       	   $("#cboxOverlay,#colorbox").remove();
           typeof fnCall=="function" &&fnCall($t);
        });
    };
    /*
      param:modalCon为弹窗建 ，openFun,comFun,closeFun为三个回调函数。
            jsonUrl为json请求地址
    */
	utility.modal=function(modalCon,openFun,comFun,closeFun,jsonUrl){
        function callColorBox(html){
            $.colorbox({
                transition: "none",
                opacity: 0.5,
                html:html,
                fixed: true,
                closeButton: false,
                onOpen: function() {
                    typeof openFun=="function"&&openFun();
                },
                onComplete: function() {
                    typeof comFun=="function"&&comFun();
                },
                onClosed: function() {
                    typeof closeFun=="function"&&closeFun();
                }
            });
        };
        if(window.modalJson) {
            callColorBox(modalJson[modalCon]);
        }else{
            utility.ajax((jsonUrl||"/js/mysiteV3/app/modal.json"),"get",{},function(data){
                if(sessionStorage){
                    sessionStorage.setItem("modalJson",JSON.stringify(data));
                    window.modalJson=JSON.parse(sessionStorage.getItem("modalJson"));
                }
                callColorBox(data[modalCon]);
            },'',true);
        };
    };
    //点击上下页及页数
    utility.pageTurn=function(eleStr,url,sendData,showDataFun){
        var _t=this; 
        $(document).on('click',eleStr,function(e){
            var $t=$(this),curPageNo=$t.text(),asc=$(".tableHead .desc").length?"desc":"asc",
            categoryId=$("#categoryBox p.on").attr("categoryId"), fileType=$(".filcatlist .listhd").attr("filetype");
            $t.addClass("active").siblings().removeClass("active");
            _t.showDataList("",url, $.extend({pageNo:curPageNo,categoryId:categoryId,fileType:fileType},sendData),showDataFun,e);
        });
        $(document).on('click','a.nextPage,a.prevPage',function(e){
            var $t=$(this),curPageNo=$t.parents(".newsPaging").find('li.active').text(),
                spacePageNo=$t.hasClass('nextPage')?(parseInt(curPageNo)+1):(parseInt(curPageNo)-1),
                asc=$(".tableHead .asc").length?"asc":"desc",
                categoryId=$("#categoryBox p.on").attr("categoryId"), fileType=$(".filcatlist .listhd").attr("filetype");
            _t.showDataList($t,url, $.extend({pageNo:spacePageNo,categoryId:categoryId,fileType:fileType},sendData),showDataFun,e);
        });
    };
    //渲染数据并重新拍页
    utility.showDataList=function($ele,url,data,showDataFun,event){
    	var _t=this;
        _t.ajax(url ,'GET' ,data,function(data){ 
            var tableHtml=[],$codeTable=$(".codeTable"),htmlData=data.data.data,pageEnd,pageStart,page="",curPageNo=data.data.pageNo,
            $prePage=$(".prevPage"),$nextPage=$(".nextPage");
            typeof showDataFun=="function"&&showDataFun(data,$(event.target));
            //点击上下页判断
            if($ele){
                var $curPage=$(".pagination .active"),pageLi=$ele.siblings().find("li");
                pageLi.removeClass("active");
                $ele.hasClass("prevPage")?$curPage.prev().addClass("active"):$curPage.next().addClass("active");
                if(parseInt(curPageNo)>5 && data.data.totalPages > 5){
                    if(parseInt(curPageNo)+2 <= data.data.totalPages){
                        pageStart = parseInt(curPageNo) - 2;
                        pageEnd = parseInt(curPageNo) + 2;
                    }else{
                        pageEnd = data.data.totalPages; 
                        pageStart = pageEnd - 5;
                    }
                }else{
                    pageStart = 1;
                    pageEnd = data.data.totalPages > parseInt(curPageNo) ? data.data.totalPages > 5 ? 5 : data.data.totalPages : data.data.totalPages;
                };
                for(i=pageStart;i<=pageEnd;i++){
                    if(curPageNo==i){
                        page += '<li class="active"><a href="javascript:;">'+i+'</a></li>';
                    }else{
                        page += '<li><a href="javascript:;">'+i+'</a></li>';
                    }
                }
                $('.newsPaging').show().find('.pagination').html(page);
            };
            data.data.totalCount==0?$(".nodata").show():$(".nodata").hide();
            !data.data.hasNext ? $nextPage.hide() : $nextPage.show();
            !data.data.hasPre ? $prePage.hide() : $prePage.css('display','inline-block');
        });
    };
    utility.saveTip=function(data,text,successFun,failFun){
            if(data.status==200){
                utility.modal('h','',function(){
                    $(".content dt").text(text.succ);
                });
                typeof successFun=="function"&&successFun();
            }else if(data.status!=200){
                utility.modal('i','',function(){
                    $(".content dt").text(text.fail);
                });
                typeof failFun=="function"&&failFun();
            };
            setTimeout(function(){$("#cboxOverlay,#colorbox").remove(); },2000);
        
    };
    utility.checkVal =function(type,$ele,obj){
        var reg={
            "phone":/^1[8|3|5|7][\d]{9}$/,
            "email":/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g,
            "QQ":/^[1-9][\d]{5,12}$/,
            "postcode":/^[1-9][\d]{5}$/,
            "fixedLine":/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
            // "http":/^http(s)?:\/\//,
            // "http":/^((http://)|(https://))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(/)/,
            // "http":/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            "http":/^([hH][tT][tT][pP]([sS]?)|ftp):\/\/(\S+\.)+\S{2,}$/
        },
        errorTips={
            "phone":"您输入的手机格式不正确",
            "email":"您输入的邮箱格式不正确",
            "QQ":"您输入的QQ格式不正确",
            "postcode":"您输入的邮编格式不正确",
            "fixedLine":"您输入的固话格式不正确",
            "http":"您输入的域名格式不正确",
        }
        if(!reg[type].test($ele.val())&&$ele.val()){
            typeof obj.failFun=="function"&&obj.failFun($ele,errorTips);
        }else{
            typeof obj.succFun=="function"&&obj.succFun($ele);
        }
    };
    /*
    购买功能弹窗
    param:obj结构形式
    {
        planInterface:{//后台输出信息验证接口
            url:"/member/buy/planBuyMemberFun",type:"get",sendData:{}
        },
        buyInterface:{//购买接口
            url:"/member/buy/buyMemberFun",type:"get",sendData:{}
        },
        funName:"网站会员管理功能",//功能名称,
        callBack:function(){
        },
        payCall:{
            succ:function(){},
            fail:function(){}
        }
    }
    */
    utility.payMOdal=function(obj){
        utility.ajax(obj.planInterface.url,obj.planInterface.type,obj.planInterface.sendData,function(data){
            utility.modal("delBotMark","",function(){
                var $delMarkModal=$(".delMarkModal"),res=data.data,
                    redClass=res.flag==true?"":"red",
                    txtGold=res.flag==true?res.consumeGold:"余额不足",
                    oparateClass=res.flag==true?"":"fail",
                    linkTxtSet=res.flag==true?"支付":"立即充值",
                    linkUrl=res.flag==true?"javascript:void(0);":"/account/goldRecharge";
                typeof obj.callBack=="function"&&obj.callBack(data);
                $delMarkModal
                .find(".title .yellow b").text(res.price).end()
                .find(".title .yellow i").text("币/年").end()
                .find(".coinShow li:eq(0) .right").text(txtGold).addClass(redClass).end()
                .find(".coinShow li:eq(1) .right").text(res.consumeCoin).end()
                .find(".buyDetail  li:eq(0) .right").text(obj.funName).end()
                .find(".buyDetail  li:eq(2) .right").text(res.CreateTime).end()
                .find(".buyDetail  li:eq(3) .right").text(res.GoldBalance).end()
                .find(".buyDetail  li:eq(4) .right").text(res.CoinBalance).end()
                .find(".oparate").addClass(oparateClass).end()
                .find(".oparate a").text(linkTxtSet).attr("href",linkUrl).click(function(){
                    if(!res.flag) return;
                    utility.ajax(obj.buyInterface.url,obj.buyInterface.type,obj.buyInterface.sendData,function(data){
                         utility.saveTip(data,{succ:"购买成功！",fail:"购买失败！"},function(){
                             typeof obj.payCall.succ=="function"&&obj.payCall.succ();
                         },function(){
                             typeof obj.payCall.fail=="function"&&obj.payCall.fail();
                         });
                    },true);
                });
            });
        },true);
    };
    /*
        顶部网站下拉展示
    */
    utility.siteShow=function(){
        var $selectBody=$(".selectBody");
        //站点展示
        $(".siteList").click(function(){
            var GroupId=GroupId||groupId;
            $selectBody.parent().toggleClass("active");
            $selectBody.find("ul [menuid='"+GroupId+"']").addClass("active");
            $(".nano").nanoScroller({alwaysVisible: true});
        });
        //点击其他隐藏
        $("body").click(function(e){
            (!$(e.target).hasClass("siteList")&&!$(e.target).parents(".siteList").length)&&$selectBody.parent().removeClass("active");
        });
    }
    /**
     * @param    {object}  data     
     *  {
            // tab切换
            tab:{
               proxy:0,
               ele:"li",
               event:{
                   "click":function(){
                   },
               }
            },
        }
     */
    utility.bindEvents=function(data){
        $.each(data,function(k,v){
            var ele=v.ele,
                isProxy=v.proxy,
                isUnbind=v.isNnbind;
            $.each(v.event,function(k,v){
                if(isUnbind){
                    (isProxy&&ele!="document")?$(document).off(k).on(k,ele,v):$(ele).off(k).on(k,v);
                }else{
                    (isProxy&&ele!="document")?$(document).on(k,ele,v):$(ele).on(k,v);
                };
            });
        });
    };
    // val为复制内容
    utility.copyToClipboard=function (val) {
              // 创建元素用于复制
              var aux = document.createElement("input");
              // 设置元素内容
              aux.setAttribute("value", val);
              // 将元素插入页面进行调用
              document.body.appendChild(aux);
              // 复制内容
              aux.select();
              // 将内容复制到剪贴板
              document.execCommand("copy");
              // 删除创建元素
              document.body.removeChild(aux);
              alert("复制成功");
            };
    utility.overFlowHidden=function($son,$par) {
            var sonH = $son.outerHeight();
            var parH = $par.outerHeight();
            while (sonH > parH) {
                    $son.text($son.text().replace(/(\s)*([a-zA-Z0-9]|\W)(\.\.\.)?$/, "..."));
                    sonH = $son.outerHeight();
                    parH = $par.outerHeight();
                }
        };
    return utility;
});

