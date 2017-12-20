// define(["utility"],function (utility) {
//
//     var set={},$siteSet=$(".conParWrap"),$body=$("body"),
//         pcDomain=$body.find(".sitePc").find(".hrefWarp a").attr("href"),
//         mDomain=$body.find(".siteWap").find(".hrefWarp a").attr("href"),
//
//         $selectBody=$(".selectBody"),$siteCtx=".wqdian.cn"/*/cn/g.test(urlPath)?".wqdian.cn":".wqdian.com"*/,
//         $bubbleRelatedSave,
//         urlpaths=/net/g.test(location.href)?"http://www.wqdian.net":"http://www.wqdian.com";
//
//
//     var reg = new RegExp("[\\u4E00-\\u9FFF]+");
//     function domain(domain) {
//         if (reg.test(domain)) {
//             var index = domain.match(reg).index;
//             var strH = domain.substring(0, index);
//             var strF = domain.substring(index);
//             return domain = strH + punycode.toASCII(strF);
//         }else{
//             return domain;
//         }
//     }
//     pcDomain=domain(pcDomain);
//     mDomain=domain(mDomain);
//
//     //初始化去除地标类名
//     $siteSet.find(".removeLogo .detail ul>li:eq(0) p").each(function(){
//         var t=$(this);
//         t.find("span").eq(2).addClass("blue");
//         !/white|black/g.test(t.attr("theme"))&&t.addClass("borderW");
//     });
//     //站点切换
//     set.siteShow=function(){
//         //站点展示
//         $(".siteList").click(function(){
//             var GroupId=GroupId||groupId;
//             $selectBody.parent().toggleClass("active");
//             $selectBody.find("ul [menuid='"+GroupId+"']").addClass("active");
//             $(".nano").nanoScroller({alwaysVisible: true});
//         });
//         //点击其他隐藏
//         $("body").click(function(e){
//             (!$(e.target).hasClass("siteList")&&!$(e.target).parents(".siteList").length)&&$selectBody.parent().removeClass("active");
//             (!$(e.target).hasClass("col4")&&!$(e.target).parents(".col4").length)&&$(".col4>div").removeClass("on");
//             (!$(e.target).hasClass("bubble")&&!$(e.target).parents(".styleChoseBox").length)&&$(".bubble").removeClass("on")
//             if($bubbleRelatedSave&&!$(e.target).parents(".styleChoseBox").length&&$bubbleRelatedSave.hasClass("using")&&!$(e.target).parents(".buySuc").length&&!$(e.target).parents(".delMarkModal").length){
//                 // $bubbleRelatedSave.click();
//                 set.saveBotMark($bubbleRelatedSave);
//                 $bubbleRelatedSave=null;
//             }
//         });
//     };
//     //通用设置()
//     set.commonInit=function(){
//         //显示IP地址
//         utility.ajax("/domain/allocateip?"+new Date().getTime(),"post",{"groupId":GroupId},function(data){
//             data.data[0]!=null&&$(".sitenavbox .mytip em").html('<i></i>'+data.data[0].split("_")[0]);
//             data.data[1]!=null&&$(".sitenavbox .myhip em").html('<i></i>'+data.data[1]);
//         });
//
//         //网站设置顶部导航
//         $siteSet.find(".topNav li").click(function() {
//             var t = $(this), tIdx = t.index();
//             t.addClass("on").siblings().removeClass("on");
//             $siteSet.find(".contentWrap,.newsTabCon>li").eq(tIdx).addClass("on").siblings().removeClass("on");
//             $(".newsTabCon>li").eq(tIdx).addClass("on").siblings().removeClass("on");
//         });
//         //弹窗关闭
//         $(document).on("click",".modalBox .modalClose,.modalBox .cancle",function() {
//             $.fn.colorbox.close();
//         });
//         //统计id
//         $body.find(".showBox .nav li").on("click",function(){
//             var t = $(this), tIdx = t.index();
//             t.addClass("on").siblings().removeClass("on");
//             t.parent().siblings(".detailCon").children("li").eq(tIdx).addClass("on").siblings().removeClass("on");
//         });
//         //站长统计id,统计代码id
//         $siteSet.find(".showBox .detailCon input").on("input",function(){
//             var t = $(this),val=t.val();
//             t.val(val.replace(/[^0-9a-zA-Z]*/g,""));
//         });
//         $siteSet.find(".buySuc").each(function(){
//             var $input=$(this).find("input:eq(1)");
//             if($input.val()=="") $input.val("http://");
//         }).end().find("[sutype='union']").each(function(){
//             var t=$(this);
//             if(t.attr("isbuy")=="true") t.siblings(".coinTips").hide(),t.siblings(".buySuc").show();
//         }).end().find(".closeSite .detail").each(function(){
//             var t=$(this);
//             if(t.find(".siteMessage").length) t.css("box-shadow","none");
//         });
//         return this;
//     };
//     set.ajax=function(Url,requestType,Data,callback){
//         $.ajax({
//             url: Url,
//             data: Data || {},
//             type: requestType || "GET",
//             dataType: "json",
//             async:false,
//             // contentType:"application/x-www-form-urlencoded; charset=utf-8",
//             success: function(data) {
//                 typeof callback == "function" && callback(data);
//             }
//         });
//     };
//     set.checkUrl=function($target,callback){
//         var urlFilter = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u4e00-\u9fa5])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
//         var urlOther = /^(https?|ftp):\/\/((((\w|-|\.|~)|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d)|(([a-z]|\d)(\w|-|\.|~)*([a-z]|\d)))\.)+(([a-z])|(([a-z])(\w|-|\.|~)*([a-z])))\.?)(:\d*)?)(\/(((\w|-|\.|~)|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~)|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~)|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~)|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
//         var $getVal, $setDomain, $domaintrue = false;
//         var t = $("#domain"),$getVal=t.val(),
//             $getError = $(".editDomain").length?t.parent().siblings(".errortips"):t.parent().find(".errortips"),
//             $getInputVal = (t.val()).replace(new RegExp("。","gi"),".");
//         t.val($getInputVal);
//         if(t.parent().hasClass("ourdomian")){
//             $getInputVal="http://"+$getInputVal+$siteCtx;
//         };
//         $use=$(".nowuse,.nouse",".modalBox");
//         if (!t.parent().hasClass("ourdomian")&&!/^http:\/\//gi.test($getInputVal)) {   // 判断是否以http开头
//             $getInputVal = "http://"+$getInputVal;
//         }
//         if($getInputVal == ""){
//             $getError.show().addClass('error').find("span").text("！域名不能为空");
//             return false;
//         }else if((!urlFilter.test($getInputVal)||!t.hasClass('domain'))&&t.val().length<=5){
//             $getError.show().addClass('error').find("span").text("自定义域名长度最小为6个字母或数字");
//             return false;
//         }else if ($getInputVal.match(new RegExp($siteCtx+ "$","i"))&&$(".user").length){
//             $getError.show().find("span").text("域名不能以 " + $siteCtx + " 结尾");
//             return false;
//         }else{
//             if($getInputVal){
//                 $setDomain = $getInputVal;
//                 var $url = "/domain/check", $data;
//                 if(!t.parents(".addDomain").length){//编辑域名
//                     $data = {domain:$getInputVal,
//                         id:$(".editDomain").attr("editid"),
//                         groupId:GroupId,
//                         displayMode:$(".editDomain").attr("platform")
//                     };
//                 }else{//添加域名
//                     $data = {domain:$getInputVal,
//                         groupId:GroupId,
//                         displayMode:function(){
//                             if($target[0].id=="domain"||/nowuse|nouse/.test($target.attr("class"))) return $(".modalBox .selected").index()==0?"pc":"phone";
//                             if($target[0].id=="") return $target.index()==0?"pc":"phone";
//                         }(),
//                     };
//                 };
//             }
//             if(t.val().length>=6){
//                 set.ajax($url,"get",$data,function(json){
//                     if(json.status == 200){
//                         $domaintrue = true;
//                         $getError.show().removeClass("error").find("span").text(json.msg).end().find("a").hide();
//                         typeof callback=="function"&&callback();
//                     }else{
//                         $domaintrue = false;
//                         // $(".ourdomian").length&&$getError.text(json.msg).css("color","#f00");
//                         $getError.show().addClass('error').find("span").text(json.msg).end().find("a").hide();
//                     }
//                 });
//             }
//         }
//     };
//     //ippv接口返回值
//     set.requestResult=function(name,urlParam,$ele){
//         var nores=[],res,outRes={};
//         function getPV(){
//             var result={},pcIpRes,pcPvRes,mIpRes,mPvRes,newArr=[];
//             result.device={};
//             set.ajax(url,"GET",{},function(data){
//                 if(typeof data["pc"]=="object") pcIpRes=data["pc"]["ipStatVO"]["result"],newArr.push(pcIpRes);
//                 if(typeof data["pc"]=="object") pcPvRes=data["pc"]["pvStatVO"]["result"],newArr.push(pcPvRes),result.device.pc=true;
//                 if(typeof data["phone"]=="object") mIpRes=data["phone"]["ipStatVO"]["result"],newArr.push(mIpRes);
//                 if(typeof data["phone"]=="object") mPvRes=data["phone"]["pvStatVO"]["result"],newArr.push(mPvRes),result.device.m=true;
//                 for(var x in newArr){
//                     result[x]={};result[x].match={};
//                     var pv=[],date=[];
//                     for(var y in newArr[x]){
//                         var dataDate=newArr[x][y]["day"].replace(newArr[x][y]["day"].slice(0,5),"");
//                         pv.push(newArr[x][y]["pv"]);date.push(dataDate);
//                         result[x].match[dataDate]=newArr[x][y]["pv"];
//                     };
//                     result[x]["pv"]=pv;result[x]["date"]=date;
//                 };
//             });
//             return result;
//         };
//         switch(name){
//             case "pvip":
//                 url="/api/site/groupStat?groupId="+GroupId+"&statType=monthDays";
//                 return getPV();
//                 break;
//         };
//     };
//     //分享
//     set.share=function(ele){
//         var $classify = ele.parent().attr("platform");
//         window._bd_share_config = {
//             common: {
//                 bdText: platform=='m'?phoneName:pcName ,
//                 bdDesc: platform=='m'?phoneshareText:pcshareText ,
//                 bdUrl:  platform=='m'?mDomain:pcDomain,
//                 bdPic:  platform=='m'?imgsever + '/' + phoneUsericon:imgsever + '/' + pcShareicon,
//                 onBeforeClick : function(cmd,config){
//                     config.bdText = platform=='m'?phoneName:pcName ;
//                     config.bdDesc = platform=='m'?phoneshareText:pcshareText ;
//                     config.bdUrl  = platform=='m'?mDomain:pcDomain;
//                     config.bdPic  = platform=='m'?imgsever + '/' + phoneUsericon:imgsever + '/' + pcShareicon;
//                     return config;
//                 }
//             },
//             share: [{
//                 "bdSize": 16
//             }]
//         };
//         //加载百度分享插件
//         $("head").find("[src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion="+ ~(-new Date() / 36e5)+"']").remove();
//         with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
//     };
//     //弹窗
//     set.modal=function(html,openFun,comFun,closeFun){
//         $.colorbox({
//             transition: "none",
//             opacity: 0.5,
//             html:html,
//             fixed: true,
//             closeButton: false,
//             onOpen: function() {
//                 window.scroll_top = $(document).scrollTop();
//                 typeof openFun=="function"&&openFun();
//             },
//             onComplete: function() {
//                 typeof comFun=="function"&&comFun();
//             },
//             onClosed: function() {
//                 typeof closeFun=="function"&&closeFun();
//                 // set.backInitBottom();
//                 $(".changeStyle").removeClass("changeStyle");
//                 $(".detail .normal").removeClass("bottomMark");
//             }
//         });
//     };
//     set.getString= function(str,maxlength,ellipsis){
//         var realLength = 0, strLen = str.length, charCode ,s="",getStr="",ellipsis=ellipsis==""?"":"...";
//         for (var i = 0; i < strLen; i++) {
//             charCode = str.charCodeAt(i);
//             if (charCode >= 0 && charCode <= 128) realLength ++;
//             if(charCode>128)  realLength += 2;
//             s += str.charAt(i);
//             if (realLength >= maxlength&&getStr=="") {getStr=s+ellipsis;}
//         }
//         return {
//             realLength:realLength,//返回真实字节长度,测试用
//             getStr:getStr==""?s:getStr  //返回截取字符串
//         };
//     }
//     //我的站点首页
//     set.mySite=function(){
//         if($(".siteContainer>.sideNav .menuList>li:eq(0)").hasClass("active")){//只在我的站点界面执行
//             var $rightCont=$(".rightCont"),$pcSiteState=$rightCont.find(".sitePc [state]")
//             $mSiteState=$rightCont.find(".siteWap [state]");
//             //网站状态
//             set.state=function(){
//                 /open|update/.test($pcSiteState.attr("state"))&&$pcSiteState.find(".btnOpen").hide();
//                 /close/.test($pcSiteState.attr("state"))&&$pcSiteState.find(".btnOpen").show();
//                 /open|update/.test($mSiteState.attr("state"))&&$mSiteState.find(".btnOpen").hide();
//                 /close/.test($mSiteState.attr("state"))&&$mSiteState.find(".btnOpen").show();
//                 $body.find(".btnOpen").click(function(){
//                     var t=$(this);
//                     var url="/common/site/enable",json={};
//                     json["siteId"]=t.parents(".sitePc").length?pcUserSiteId:phoneUserSiteId;
//                     set.ajax(url,"post",json,function(data){
//                         // t.hide();t.parents(".siteMessage").find(".siteMark [state]").attr("state","open").text("已开启").end()
//                         // .find(".messageCont").attr("state","open");
//                         if(data.status==200){
//                             window.location.reload();
//                         }
//                         else if(data.status==500){
//                             $(".showAlert").show();
//                             /*setTimeout(function(){
//                              $(".showAlert").hide();
//                              },2000)*/
//                             $(".showAlert").on("click",function(e){
//                                 if($(e.target).hasClass("showAlert")){
//                                     $(".showAlert").hide();
//                                 }
//                             })
//                         }
//                         /* window.location.reload();*/
//                     });
//                 });
//             }();
//             //分享
//             set.shareEvent=function(){
//                 var bdhtml = '<div class="bdsharebuttonbox" data-tag="share_1" style="position:absolute;bottom:0;right:0;display:none;"><a class="bds_sqq" data-cmd="sqq"></a><a class="bds_weixin" data-cmd="weixin" href="#"></a><a class="bds_tsina" data-cmd="tsina"></a><a class="bds_baidu" data-cmd="baidu"></a><a class="bds_renren" data-cmd="renren"></a><a class="bds_qzone" data-cmd="qzone"></a><a class="bds_tqq" data-cmd="tqq"></a><a class="bds_tieba" data-cmd="tieba"></a><a class="bds_count" data-cmd="count"></a></div>';
//                 $body.append(bdhtml)
//                     .find(".shareBtn").on("click",function(){
//                         var t=$(this)
//                         t.siblings(".shareList").is(":visible")?t.siblings(".shareList").hide():t.siblings(".shareList").show();
//                     }).end()
//                     .find('.shareList li').on('click', function(e) {
//                         var t=$(this),$stype = $(this).attr("stype");
//                         window.platform=t.parent().attr("platform")=="m"?"m":"pc";
//                         set.share(t);
//                         switch($stype){
//                             case "qq":
//                                 $('a.bds_sqq')[0].click();
//                                 break;
//                             case "xl":
//                                 $('a.bds_tsina')[0].click();
//                                 break;
//                         }
//                     }).end()
//                     .find(".qrcodeWarp .qrcode").each(function(){
//                         var t=$(this);
//                         t.qrcode({
//                             render: "canvas", //table方式
//                             width: 100, //宽度
//                             height:100, //高度
//                             text:t.parents(".sitePc").length?pcDomain:mDomain,
//                         });
//                     });
//             }();
//             //pv统计折线图
//             var pvip= set.requestResult("pvip"),pcip,pcpv,mip,mpv,Max,series,convertDate;
//             var getMax=function(arr){
//                 return Max=Math.max.apply(null, arr);
//             };
//             //只存在一个
//             if(pvip.device.pc||pvip.device.m){
//                 if(pvip.device.pc&&!pvip.device.m){//pc
//                     pcip=pvip[0].pv,pcpv=pvip[1].pv,date=pvip[0]["date"];
//                     mip=[],mpv=[];
//                     getMax([getMax(pcip),getMax(pcpv)]);
//                     series=[{"name": '电脑PV', "data": pcpv, "color": '#59c4ff'},
//                         {"name": '电脑IP', "data": pcip, "color": '#59c4ff', "lineWidth": 2,
//                         }];
//                 }else if(pvip.device.m&&!pvip.device.pc){//手机
//                     pcip=[],pcpv=[];
//                     mip=pvip[0].pv,mpv=pvip[1].pv,date=pvip[0]["date"];
//                     getMax([getMax(mip),getMax(mpv)]);
//                     series=[{"name": '手机PV', "data": mpv, "color": '#9de476'},
//                         {"name": '手机IP', "data": mip, "color": '#9de476', "lineWidth": 2,
//                         }];
//                 } else if(pvip.device.pc&&pvip.device.m){//两个都存在
//                     pcip=pvip[0].pv,pcpv=pvip[1].pv,
//                         mip=pvip[2].pv,mpv=pvip[3].pv,
//                         date=pvip[0]["date"].length>pvip[2]["date"].length?pvip[0]["date"]:pvip[2]["date"],
//                         //对应pv
//                         matchPv=function(res){
//                             if(!res.pv) return [];
//                             var arr=[];
//                             for(var i=0;i<date.length;i++){
//                                 res.match[date[i]]==null?arr.push(null):arr.push(res.match[date[i]]);
//                             } ;
//                             return arr;
//                         },
//                         pcip=matchPv(pvip[0]), pcpv=matchPv(pvip[1]),
//                         mip=matchPv(pvip[2]), mpv=matchPv(pvip[3]),
//                         pcipMAx=Math.max.apply(null, pcip),pcpvMAx=Math.max.apply(null, pcpv),
//                         mipMAx=Math.max.apply(null, mip),mpvMAx=Math.max.apply(null, mpv),
//                         Max=Math.max.apply(null, [pcipMAx,pcpvMAx,mipMAx,mpvMAx]);
//                     series= [
//                         {"name": '电脑PV', "data": pcpv, "color": '#59c4ff'},
//                         {"name": '电脑IP', "data": pcip, "color": '#59c4ff', lineWidth: 2, },
//                         {"name": '手机PV', "data": mpv, "color": '#9de476'},
//                         {"name": '手机IP', "data": mip, "color": '#9de476', lineWidth: 2, }
//                     ];
//                 };
//                 //转换日期
//                 convertDate=function(){
//                     var newDateArr=[];
//                     for(var x in date){
//                         var newDate=date[x].replace(/(0)([1-9])/g,"$2").replace("-",".")
//                         newDateArr.push(newDate);
//                     };
//                     return newDateArr;
//                 }();
//                 formMax=Max>100?Math.ceil(Max/100)*100:100 ;
//             };
//             $rightCont.find('.statistics').highcharts({
//                 chart: {renderTo: 'line', type: 'line', marginLeft: 50, },
//                 title: {
//                     useHTML:true,
//                     text: '<p class="chartTitle"><i class="siteBgIcon"></i>整体趋势<span>（只统计最近30天的PV数据）</span></p>',
//                     align: 'left',
//                     margin: 20
//                 },
//                 xAxis: {
//                     categories: convertDate,
//                     lineWidth: 0,
//                     tickLength: 0
//                 },
//                 yAxis: {
//                     title: {
//                         text: null
//                     },
//                     // categories: [0, 20, 40, 60, 80, 100],
//                     gridLineColor: '#dcdcdc',
//                     gridLineDashStyle: 'Dash',
//                     tickInterval:formMax/5,
//                     min:0,
//                     max:formMax
//                 },
//                 tooltip: {
//                     backgroundColor: '#fff',
//                     borderColor: '#dcdcdc',
//                     borderRadius: 4,
//                     shadow: false,
//                     animation: true,
//                     shared: true,
//                     useHTML: true,
//                     crosshairs: [{            // 设置准星线样式
//                         width: 1,
//                         color: '#e0e0e0'
//                     }],
//                     pointFormat: '<table style="line-height:26px;width:180px;background-color:#fff;font-size:12px;color:#666;"><tr><td >&nbsp;&nbsp;{series.name}: </td>' +
//                     '<td style="text-align: right">{point.y} &nbsp;&nbsp;</td></tr></table>',
//                     formatter: function() {
//                         var date = new Date,
//                             dayArr = this.points.length>1 ? this.points[0].x.split(".") : this.x.split("."),
//                             html = "";
//                         html += '<h5 class="tooltipTime">'+date.getFullYear()+'年'+dayArr[0]+'月'+dayArr[1]+'日统计数据</h5>';
//                         //解决奇数图例的时候不显示折线的问题
//                         for(var i=0;i<this.points.length;i++){
//                             if(this.points[i].series.name.indexOf("电脑")>=0){
//                                 html += '<p class="dataPc">'+ this.points[i].series.name+'：<span>'+this.points[i].y+'</span></p>';
//                             }else{
//                                 html += '<p class="dataPhone">'+ this.points[i].series.name+'：<span>'+this.points[i].y+'</span></p>';
//                             };
//                         };
//                         return html;
//                     }
//                 },
//                 legend: {
//                     floating: true,
//                     itemStyle: {color: '#999','font-weight':'400'},
//                     itemHoverStyle: {color:'#999'},
//                     layout: "horizontal",
//                     verticalAlign: 'top',
//                     align: "right",
//                     x: -20,
//                     y: 10,
//                 },
//                 plotOptions: {
//                     series: {
//                         events: {
//                             legendItemClick: function(e) {
//                                 var index = this.index,
//                                     bool = false,
//                                     series = this.chart.series;
//                                 for(var i=0;i<series.length;i++){
//                                     if(i!=index && series[i].visible){
//                                         bool = true;
//                                     }
//                                 }
//                                 return bool;
//                             }
//                         },
//                         marker: {
//                             symbol :"circle",
//                             lineColor:null,
//                             lineWidth:1,
//                             radius: 5 ,
//                             fillColor:"#fff"         /*数据点颜色*/
//                         }
//                     }
//                 },
//                 series: series,
//                 credits:{
//                     enabled:false // 禁用版权信息
//                 }
//             });
//         };
//         return this;
//     };
//     //网站设置
//     set.siteSet=function(){
//         var siteSetCon={};
//         //if(!$("span:contains('网站设置')").parents(".menuLi").hasClass("active")) return;
//         //联合底标输入框显示
//         if(pcBottomMark=="union") $siteSet.find(".PCshowBox .buySuc").show().siblings(".coinTips").hide();
//         if(phoneBottomMark=="union") $siteSet.find(".MshowBox .buySuc").show().siblings(".coinTips").hide();
//         //保存提示
//         function saveTip(data,text,successFun,failFun){
//             set.ajax("/js/mysiteV3/app/modal.json","get",{},function(modal){
//                 if(data.status==200){
//                     set.modal(modal.h,'',function(){
//                         $(".content dt").text(text.succ);
//                     });
//                     typeof successFun=="function"&&successFun();
//                 }else if(data.status!=200){
//                     set.modal(modal.i,'',function(){
//                         $(".content dt").text(text.fail);
//                     });
//                     typeof failFun=="function"&&failFun();
//                 };
//                 setTimeout(function(){$("#cboxOverlay,#colorbox").remove(); },2000);
//             });
//         };
//         //域名管理
//         siteSetCon.Domian=function(){
//             //域名操作下拉框
//             $siteSet.on("click",".urlshowbox .col4>div,.dropdownBox",function() {
//                 var t = $(this), tIdx = t.index();
//                 t.toggleClass("on").parents("tr").siblings().find(".col4>div").removeClass("on");
//             })
//                 //添加域名
//                 .on("click.pup",".adddomain",function(){
//                     if(!!freeVersion&&isAgentDemoAccount!="true"){
//                         var html="<div class='Pupsection'></div><div class='pupAlert'><ul class='listAlert'><li class='desc'>想要添加更多域名?</li><li class='buybtn'><a href='"+urlpaths
//                             +"/pricingpackage.html' target='_blank'>购买更高版本</a></li></ul></div>"
//                         $(html).appendTo($('body'));
//                         $(".Pupsection,.pupAlert").show();
//                         return;
//                     }
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         set.modal(data.a,"",function(){
//                             utility.ajax("/domain/allocateip?"+new Date().getTime(),"post",{"groupId":GroupId},function(data){
//                                 var ipType = $(".sitenav .sitenavbox span.mytip").text().substring(0,2);
//                                 $(".sitenavbox .mytip").is(":visible")?(data.data[0]!=null&&$(".addDomain .myipbox").find(".myip").text(data.data[0].split("_")[0]).siblings().text(ipType)):$(".addDomain .myipbox").hide();
//                                 $(".sitenavbox .myhip").is(":visible")?$(".addDomain .myotheripbox").find(".myotherip").text(data.data[1]):$(".addDomain .myotheripbox").hide();
//                             });
//                             pcUserSiteId==""&&$(".platform").eq(1).addClass("selected").siblings(".platform").addClass("disable").removeClass("selected").next().addClass("disable");
//                             phoneUserSiteId==""&&$(".platform").eq(0).addClass("selected").siblings(".platform").addClass("disable").removeClass("selected").next().addClass("disable");
//                             isAgentUser&&$("body").find(".modalBox .desc a").hide();
//                         });
//                     });
//                 })
//                 //关闭域名
//                 .on("click",".domainSet .status",function(){
//                     var t=$(this);
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         set.modal(data.l,"",function(){
//                             var text=t.find("[statu]").attr("statu")=="on"?"关闭":"开启";
//                             $(".modalBox").addClass("closeDomain")
//                                 .attr({"status":t.find("[statu]").attr("statu"),
//                                     "editid":t.attr("editid"),"domain":t.attr("domain"),
//                                     "platform":t.attr("platform")}).find(".title h3").text("提示").end()
//                                 .find(".content").html("<p>您正在"+text+"域名，是否继续?</p>").end()
//                                 .find(".set p span:eq(0)").text("确定");
//                         });
//                     });
//                     //编辑域名
//                 }).on("click",".domainSet [urltype]",function(){
//                     var t=$(this),domain=t.attr("domain"),platform=t.attr("platform"),
//                         dominance=t.parents(".col4").siblings(".col3").text();
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         var fun="";
//                         set.modal(data.k,fun,function(){
//                             utility.ajax("/domain/allocateip?"+new Date().getTime(),"post",{"groupId":GroupId},function(data){
//                                 data.data[0]&&$(".modalBox .myip").text(data.data[0].split("_")[0]);
//                                 $(".modalBox .myotherip").text(data.data[1]);
//                             });
//                             $(".modalBox").find(".title h3").text("编辑域名")
//                                 .end().find("#domain").val(domain)
//                                 .end().find(".dropdownBox span.color3").text($.trim(dominance));
//                             $(".sitenet").text(sitenet);
//                             $(".modalBox").attr({"platform":t.attr("platform"),"editid":t.attr("editid")});
//                             isAgentUser&&$(".modalBox").find(".myparsing").hide();
//                             //站内域名
//                             var reg=new RegExp(sitenet,"g");
//                             if(reg.test(domain)){
//                                 $(".user").remove();
//                                 $(".ourdomian #domain").val(domain.replace(reg,"").replace(/http:\/\//g,""));
//                             }
//                             //自己的域名
//                             else{
//                                 $(".ourdomian").remove();
//                             };
//                             //默认url 不可选择
//                             if(dominance.indexOf("默认")>=0){
//                                 $(".modalBox ").find(".dropdownBox,.platform").addClass("disable").end()
//                                     .find(".nouse").hide().end().find(".ourdomian").siblings().hide();
//                             }
//                             if(dominance.indexOf("默认")==-1&&$(".ourdomian").length){
//                                 $(".modalBox ")
//                                     .find(".platform").addClass("disable").end().find(".ourdomian").siblings().hide();
//                             }
//                             if(platform=="pc") {
//                                 $(".modalBox .platform").eq(0).addClass("selected").siblings().removeClass("selected");
//                                 $(".sitenavbox .myhip").is(":visible")?$(".myotheripbox").show():$(".myotheripbox").hide();
//                                 $(".sitenavbox .mytip").is(":visible")?$(".myipbox").show():$(".myipbox").hide();
//                             }
//                             if(platform=="phone") {
//                                 $(".modalBox .platform").eq(1).addClass("selected").siblings().removeClass("selected");
//                                 $(".sitenavbox .myhip").is(":visible")?$(".myotheripbox").show():$(".myotheripbox").hide();
//                                 $(".sitenavbox .mytip").is(":visible")?$(".myipbox").show():$(".myipbox").hide();
//                             }
//                         });
//                     });
//                 })
//                 //删除域名
//                 .on("click",".deleteDomain",function(){
//                     var url="/domain/delete",t=$(this),
//                         json={
//                             "siteId":t.attr("platform")=="phone"?phoneUserSiteId:pcUserSiteId,
//                             "domain":t.attr("domain")
//                         };
//                     utility.ajax(url,"post",json,function(){
//                         window.location.reload();
//                     });
//                 })
//                 //领取金币domain/checkIP
//                 .on("click",".col6 a",function(){
//                     var url="/domain/getReward",t=$(this),
//                         json={
//                             "siteId":t.attr("platform")=="phone"?phoneUserSiteId:pcUserSiteId,
//                             "domain":t.attr("domain")
//                         };
//                     utility.ajax(url,"get",json,function(data){
//                         data.status==200&&window.location.reload();
//                         data.status!=200&&t.addClass("fail").text("领取失败");
//                     });
//                 })
//                 //验证解析
//                 .on("click",".col5 .msgBind",function(){
//                     var url="/domain/checkIP",t=$(this),
//                         json={
//                             "siteId":t.attr("platform")=="phone"?phoneUserSiteId:pcUserSiteId,
//                             "domain":t.attr("domain")
//                         };
//                     utility.ajax(url,"get",json,function(data){
//                         window.location.reload();
//                     });
//                 })
//                 .on("click",".col3_1",function(){
//                     var t=$(this),url="/domain/default",platform=t.attr("platform"),$curChecked,
//                         json={"siteId":t.attr("platform")=="phone"?phoneUserSiteId:pcUserSiteId,"domain":t.attr("domain")};
//                     if(t.find("span").hasClass("fail"))  return;
//                     $(".col3_1").each(function(){
//                         var t=$(this);
//                         if(t.attr("platform")!=platform&&t.find("span").hasClass("checked")) $curChecked=t.parent();
//                         if(t.attr("platform")==platform&&t.find("span").hasClass("checked"))  t.find("span").removeClass("checked");
//                     });
//                     if(!$curChecked||($curChecked.length&&$curChecked.find(".col3_1").attr("platform")!="phone"))
//                     {
//                         $curChecked&&$curChecked.length&&$curChecked/*.prependTo(".urlshowbox tbody")*/.find(".col3").text("默认URL");
//                         t.find("span").addClass("checked").end().parent()/*.prependTo(".urlshowbox tbody")*/.find(".col3").text("默认URL");
//                     }else if($curChecked.length&&$curChecked.find(".col3_1").attr("platform")=="phone")
//                     {
//                         t.find("span").addClass("checked").end().parent()/*.insertAfter($curChecked)*/.find(".col3").text("默认URL");
//                     }
//                     $curChecked&&$curChecked.length&&$siteSet.find("tbody tr").eq(2).find(".col3").text("显性URL");
//                     utility.ajax(url,"post",json,function(data){
//                         window.location.reload();
//                     });
//                 });
//             //添加域名失去焦点
//             $(document).on("blur",".modalBox #domain",function(e){
//                 set.checkUrl($(e.target));
//             })
//                 .on("input",".addDomain #domain,.user #domain",function(){
//                     var t=$(this),$val=t.val();
//                     if($val.match(/^http:\/\//gi) == null){t.val("http://"+$val.substring(6))};
//                 })
//                 .on("input",".ourdomian  #domain",function(){
//                     var $val=$(this).val();
//                     if (/[^a-zA-Z0-9]/g.test($val)) {
//                         $(this).val($val.replace(/[^a-zA-Z0-9]/g,""));
//                     }
//                 })
//                 //绑定切换pc 手机
//                 .on("click",".modalBox .platform",function(e){
//                     var t=$(this);
//                     // if(t.parents(".editDomain").length){};
//                     var url="/domain/checkEnds",
//                         $modalBox=t.parents(".modalBox"),
//                         json={
//                             "id": $(".editDomain").attr("platform")=="pc"?pcUserSiteId:phoneUserSiteId
//                             ,"domain":$("#domain").val(),"groupId":GroupId,"displayMode":$(".modalBox .platform").not(".selected").index()==0?"pc":"phone"
//                         };
//                     if(t.hasClass("disable")) return;
//                     if($(".ourdomian").length){
//                         var error="系统提供的域名不能切换";
//                         t.siblings(".error").text(error);
//                     }else if($(".user").length){
//                         utility.ajax(url,"post",json,function(data){
//                             if(data.status!=200){
//                                 var device=t.parents(".modalBox").attr("platform")=="pc"?"手机端":"PC端",
//                                     $error;
//                                 if(pcUserSiteId=="") $error="PC端不存在不能切换";
//                                 if(phoneUserSiteId=="") $error="手机端不存在不能切换";
//                                 if(phoneUserSiteId&&pcUserSiteId)$error=device+"已存在相同域名不能切换";
//                                 t.siblings(".error").text($error);
//                             }else{
//                                 t.addClass("selected").siblings().removeClass("selected");
//                             };
//                         });
//                     }else{
//                         set.checkUrl($(e.target),function(){
//                             t.addClass("selected").siblings().removeClass("selected");
//                         });
//                     };
//                 }).on("click",".dropdownBox",function(){
//                     var t=$(this);if(t.hasClass("disable")) return;t.toggleClass("on");
//                 }).on("click",".modalBox *",function(e){
//                     if($(e.target).hasClass("dropdownBox")||$(e.target).hasClass("dropdownBox")) return;
//                     //点击其他隐藏
//                     $(".dropdownBox").removeClass("on");
//                 }).on("click",".dropdownBox>ul>li",function(){
//                     var t=$(this),tIdx=t.index();
//                     t.parent().siblings(".color3").text(t.text());
//                 }).on("click",".domain .set span",function(e){//取消 站不适用 立即使用
//                     var t=$(this),tIdx=t.index(),addDomainurl="/domain/addDomain", activeStatus="on",
//                         editDomainurl="/domain/editDomain",platform=$(".modalBox .chose .selected").index()==0?"pc":"phone",
//                         domainStatus=function(){
//                             var $status=$(".modalBox .dropdownBox span").eq(0),status;
//                             if($status.text().indexOf("默认")>=0) status="defaultD";
//                             if($status.text().indexOf("显性")>=0) status="show";
//                             if($status.text().indexOf("隐性")>=0) status="hide";
//                             return status;
//                         },
//                         editDomainVal=$(".editDomain .ourdomian").length?"http://"+$("#domain").val()+sitenet:$("#domain").val(),
//                         addDomainData={
//                             "domainStatus":domainStatus(),
//                             "groupId":GroupId,"domain":$("#domain").val(),
//                             "activeStatus":"on","displayMode":platform,
//                         },
//                         editDomainData={
//                             "id":$(".modalBox").attr("editid"),"domain":editDomainVal,
//                             "siteId":platform=="pc"?pcUserSiteId:phoneUserSiteId,"groupId":GroupId,
//                             "domainStatus":domainStatus(),"activeStatus":"on",
//                             "displayMode":platform
//                         } ;
//                     switch(tIdx){
//                         case 0://立即使用
//                             set.checkUrl($(e.target),function(){
//                                 var urlHref=/net/g.test(location.href)?"http://www.wqdian.net":"http://www.wqdian.com";
//                                 if(t.parents(".addDomain").length) utility.ajax(addDomainurl,"post",addDomainData,function(data){
//                                     if (data.status != 200) {
//                                         if (data.msg == "mall") {
//                                             if(isAgentUser=="true"&&isAgentDemoAccount!="true"){
//                                                 $(".errortips").addClass('error').find("span").text("可添加顶级域名数量达到上限")
//                                             }
//                                             else if(isAgentUser=="true"&&isAgentDemoAccount=="true"){
//                                                 $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                             }
//                                             else {
//                                                 $(".errortips").addClass('error').find("span").text("域名数量超出版本限制");
//                                             }
//                                         } else {
//                                             if (isAgentUser=="true"&&isAgentDemoAccount!="true") {
//                                                 $(".errortips").addClass("error").find("span").text("可添加顶级域名数量达到上限");
//                                             }
//                                             else if(isAgentUser=="true"&&isAgentDemoAccount=="true"){
//                                                 $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                             }
//                                             else {
//                                                 $(".errortips").addClass("error").find("span").text("域名数量超出版本限制，添加更多域名，").end().find("a").show().text("购买更高版本").attr("href", urlHref + "/pricingpackage.html")
//                                             }
//                                         }
//                                     }
//                                     if(data.status==200){
//                                         if(isAgentDemoAccount=="true"&&isAgentUser=="true"){
//                                             $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                         }
//                                         else if(isAgentDemoAccount!="true"&&isAgentDemoAccount=="true"){
//                                             window.location.reload()
//                                         }
//                                         else{
//                                             window.location.reload()
//                                         }
//                                     }
//                                 });
//                                 if(t.parents(".editDomain").length) utility.ajax(editDomainurl,"post",editDomainData,function(data){
//                                     if (data.status != 200) {
//                                         if (data.msg == "mall") {
//                                             if(isAgentUser=="true"&&isAgentDemoAccount!="true"){
//                                                 $(".errortips").addClass('error').find("span").text("可添加顶级域名数量达到上限")
//                                             }
//                                             else if(isAgentUser=="true"&&isAgentDemoAccount=="true"){
//                                                 $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                             }
//                                             else{
//                                                 $(".errortips").addClass('error').find("span").text("域名数量超出版本限制");
//                                             }
//                                         } else {
//                                             if(isAgentUser=="true"&&isAgentDemoAccount!="true"){
//                                                 $(".errortips").addClass("error").find("span").text("可添加顶级域名数量达到上限");
//                                             }
//                                             else if(isAgentUser=="true"&&isAgentDemoAccount=="true"){
//                                                 $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                             }
//                                             else {
//                                                 $(".errortips").addClass("error").find("span").text("域名数量超出版本限制，添加更多域名，").end().find("a").show().text("购买更高版本").attr("href", urlHref + "/pricingpackage.html")
//                                             }
//                                         }
//                                     }
//                                     if(data.status==200){
//                                         if(isAgentDemoAccount=="true"&&isAgentUser=="true"){
//                                             $(".errortips").addClass('error').find("span").text("演示账号不能添加域名");
//                                         }
//                                         else if(isAgentDemoAccount!="true"&&isAgentDemoAccount=="true"){
//                                             window.location.reload()
//                                         }
//                                         else{
//                                             window.location.reload()
//                                         }
//                                     }
//                                     // data.status!=200&&$(".errortips").text(data.msg).css("color","rgb(255, 0, 0)");
//                                 });
//                             });
//                             break;
//                         case 1://暂不使用
//                             set.checkUrl($(e.target),function(){
//                                 var urlHref=/net/g.test(location.href)?"http://www.wqdian.net":"http://www.wqdian.com";
//                                 addDomainData.activeStatus="off";editDomainData.activeStatus="off";
//                                 if(t.parents(".addDomain").length) utility.ajax(addDomainurl,"post",addDomainData,function(data){
//                                     data.status==200&&window.location.reload();
//                                     if(data.status!=200){
//                                         data.msg=="mall"?$(".errortips").addClass('error').find("span").text("域名数量超出版本限制"):$(".errortips").addClass("error").find("span").text("域名数量超出版本限制，添加更多域名，").end().find("a").show().text("购买更高版本").attr("href",urlHref+"/pricingpackage.html")
//                                     }
//                                 });
//                                 if(t.parents(".editDomain").length) utility.ajax(editDomainurl,"post",editDomainData,function(data){
//                                     data.status==200&&window.location.reload();
//                                     if(data.status!=200){
//                                         data.msg=="mall"?$(".errortips").addClass('error').find("span").text("域名数量超出版本限制"):$(".errortips").addClass("error").find("span").text("域名数量超出版本限制，添加更多域名，").end().find("a").show().text("购买更高版本").attr("href",urlHref+"/pricingpackage.html")
//                                     }
//                                 });
//                             });
//                             break;
//                         case 2://取消
//                             break;
//                     };
//                 }).on("click",".closeDomain .save",function(){
//                     var t=$(this),$closeDomain=$(".closeDomain"),
//                         status=$closeDomain.attr("status"),
//                         url="/domain/"+(status=="on"?"disable":"enable"),
//                         json={
//                             "siteId":$closeDomain.attr("platform")=="phone"?phoneUserSiteId:pcUserSiteId,
//                             "domain":$closeDomain.attr("domain")
//                         };
//                     utility.ajax(url,"post",json,function(data){
//                         $(".modalBox .content p").text(data.msg);
//                         data.status==200&&window.location.reload();
//                         setTimeout(function(){$("#cboxOverlay,#colorbox").remove(); },2000);
//                     });
//                 }).on("click.pup",".Pupsection",function(){
//                     $("body").find(".Pupsection").remove().end().find(".pupAlert").remove();
//                 })
//                 //点击确定按钮
//                 .on("click.done",".pupAlert .buybtn a",function(e){
//                     if($(this).attr("href")=="javascript:void(0)"){
//                         $("body").find(".Pupsection,.pupAlert").hide();
//                     }
//                 })
//             return this;
//         };
//         //站长工具
//         siteSetCon.admTools=function(){
//             //获取网站接口
//             utility.ajax("/setting/getbaiduid?groupId="+GroupId,"get",{},function(data){
//                 var pcid=data.data.pcCode.baiduCode,mid=data.data.phoneCode.baiduCode;
//                 $siteSet.find(".siter .PCshowBox .detailCon input").val(pcid);
//                 $siteSet.find(".siter .MshowBox  .detailCon input").val(mid);
//             });
//             $siteSet.find(".siter .save").on("click",function(){
//                 var pcid= $siteSet.find(".siter .PCshowBox .detailCon input").val(),
//                     mid= $siteSet.find(".siter .MshowBox .detailCon input").val(),
//                     json={
//                         "groupId":GroupId,"pcBaiduCode":pcUserSiteId==""?"":pcid,"phoneBaiduCode":phoneUserSiteId==""?"":mid
//                     };
//                 utility.ajax("/setting/updatbaiduid","post",json,function(data){
//                     saveTip(data,{"succ":"添加成功","fail":"添加失败"});
//                 });
//             });
//             return this;
//         };
//         //统计代码
//         siteSetCon.statsCode=function(){
//             var $pcLi=$siteSet.find(".siteCount .PCshowBox .detailCon>li"),
//                 $mLi=$siteSet.find(".siteCount .MshowBox .detailCon>li");
//             //获取网站接口
//             utility.ajax("/setting/statcode?groupId="+GroupId,"get",{},function(data){
//                 var nores={"baidu":"","la51":"","cnzz":""},
//                     pcRes=data.data.pcStatCode?data.data.pcStatCode.codeItems:nores,
//                     mRes=data.data.phoneStatCode?data.data.phoneStatCode.codeItems:nores;
//                 $pcLi.eq(0).find("input").val(pcRes.baidu);
//                 $pcLi.eq(1).find("input").val(pcRes.la51);
//                 $pcLi.eq(2).find("input").val(pcRes.cnzz);
//                 $mLi.eq(0).find("input").val(mRes.baidu);
//                 $mLi.eq(1).find("input").val(mRes.la51);
//                 $mLi.eq(2).find("input").val(mRes.cnzz);
//             });
//             //发送
//             $siteSet.find(".siteCount .save").on("click",function(){
//                 json={
//                     "groupId":GroupId,"pcBaiduCode":pcUserSiteId==""?"":$pcLi.eq(0).find("input").val(),
//                     "pc51LaCode":pcUserSiteId==""?"":$pcLi.eq(1).find("input").val(),
//                     "pcCnzzCode":pcUserSiteId==""?"":$pcLi.eq(2).find("input").val(),
//                     "phoneBaiduCode":phoneUserSiteId==""?"":$mLi.eq(0).find("input").val(),
//                     "phone51LaCode":phoneUserSiteId==""?"":$mLi.eq(1).find("input").val(),"phoneCnzzCode":phoneUserSiteId==""?"":$mLi.eq(2).find("input").val(),
//                 };
//                 utility.ajax("/setting/editstatcode","post",json,function(data){
//                     saveTip(data,{"succ":"添加成功","fail":"添加失败"});
//                 });
//             });
//             return this;
//         };
//         //去除底标
//         siteSetCon.removeMark=function(){
//             set.isAlreadSet=false;
//             // param:ele 使用按钮jq对象
//             set.saveBotMark=function(ele){
//                 ele.attr("class","using blue normal").parents(".detail").find(".using").not(ele).attr("class","use blue old normal").text("使用");
//                 var url="/bottom/nameandflag",$pc=$siteSet.find(".removeLogo .PCshowBox"),
//                     $m=$siteSet.find(".removeLogo .MshowBox"),$pcSutype=$pc.find(".using"),
//                     $mSutype=$m.find(".using"),
//                     json={
//                         "supportTypePc":pcUserSiteId==""?"":$pcSutype.attr("sutype"),
//                         "companyNamePc":$pcSutype.attr("sutype")=="union"?$pc.find(".buySuc input:eq(0)").val():" ",
//                         "linkPc":$pcSutype.attr("sutype")=="union"?$pc.find(".buySuc input:eq(1)").val():" ",
//                         "themePc":pcUserSiteId==""?"":$pcSutype.siblings(".bottomStyle").attr("theme"),
//                         "siteIdPc":pcUserSiteId,
//                         "supportTypePhone":phoneUserSiteId==""?"":$mSutype.attr("sutype"),
//                         "companyNamePhone":$mSutype.attr("sutype")=="union"?$m.find(".buySuc input:eq(0)").val():"",
//                         "linkPhone":$mSutype.attr("sutype")=="union"?$m.find(".buySuc input:eq(1)").val():"",
//                         "themePhone":phoneUserSiteId==""?"":$mSutype.siblings(".bottomStyle").attr("theme"),
//                         "siteIdPhone":phoneUserSiteId,
//                     };
//                 ele.parents(".PCshowBox").length?set.afterPCTheme=ele.siblings("[theme]").attr("theme"):set.afterMTheme=ele.siblings("[theme]").attr("theme");
//                 if(ele.parents(".PCshowBox").length&&set.afterPCTheme==set.nowPCTheme&&ele.attr("sutype")!="remove") return;
//                 if(ele.parents(".MshowBox").length&&set.afterMTheme==set.nowMTheme&&ele.attr("sutype")!="remove") return;
//                 utility.ajax(url,"post",json,function(data){
//                     saveTip(data,{"succ":"保存成功","fail":"保存失败"},function(){
//                         ele.text("使用中").parents(".detail").find("p[theme]").not(ele.siblings("[theme]")).attr("theme","black").end().find(".old").removeClass("old");
//                     },function(){
//                         ele.attr("class","use blue normal").parents(".detail").find(".old").attr("class","using blue normal").text("使用中");
//                     });
//                 });
//             };
//             //新版更改
//             $siteSet.on("click",".styleChoseBox>a",function(){
//                 var t=$(this);
//                 $bubble=$(this).siblings(".bubble");
//                 $(".bubble").not($bubble).removeClass("on");
//                 $bubble.toggleClass("on");
//                 $bubbleRelatedSave=$(this).parent().siblings(".normal");
//                 $(this).parents(".PCshowBox").length?set.nowPCTheme=t.parent().siblings("[theme]").attr("theme"):set.nowMTheme=t.parent().siblings("[theme]").attr("theme");
//             })
//                 .on("click",".removeLogo .normal",function(e){
//                     e.stopPropagation();
//                     var t=$(this),idx=t.parent().index(),siteId=t.parents(".PCshowBox").length?pcUserSiteId:phoneUserSiteId,
//                         price=idx==0?"400":"100",type=idx==0?"remove":"union",
//                         siteId=t.parents(".PCshowBox").length?pcUserSiteId:phoneUserSiteId;
//                     $(".detail .bottomMark").removeClass("bottomMark");
//                     t.addClass('bottomMark');
//                     if(t.hasClass("using")) return;
//                     //未购买
//                     if(t.hasClass("buy")){
//                         var html="<div class='Pupsection'></div><div class='pupAlert'><ul class='listAlert'><li class='desc'>想要网站页面不再显示微企点底标?</li><li class='buybtn'><a href='"+urlpaths
//                             +"/pricingpackage.html' target='_blank'>购买更高版本</a></li></ul></div>"
//                         $(html).appendTo($('body'));
//                         $(".Pupsection,.pupAlert").show();
//                     }
//                     //已购买
//                     else if(!t.hasClass("buy")){
//                         set.saveBotMark(t);
//                     }
//                 })
//             //更换
//             $siteSet.on("click",".removeLogo .chose",function(){
//                 var t=$(this);
//                 t.siblings(".pcStyle,.lianhe,.mstyle").addClass("changeStyle");
//                 var $changeStyle=$siteSet.find(".changeStyle"),
//                 //兼容以前主题
//                     str="black plum white pink blue palevioletred green redob orange darkblue aliceblue greenyellow";
//                 set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                     (t.parents(".PCshowBox").length&&t.parent().index()==0)&&set.modal(data.b);
//                     (t.parents(".PCshowBox").length&&t.parent().index()==1)&&set.modal(data.c);
//                     (t.parents(".MshowBox").length&&t.parent().index()==0)&&set.modal(data.d);
//                     (t.parents(".MshowBox").length&&t.parent().index()==1)&&set.modal(data.e);
//                     var theme=str.split(/\s+/);
//                     for(var x in theme){
//                         $(".styleBox p").eq(x).attr("theme",theme[x]);
//                     };
//                 });
//                 $(".modalBox .styleBox p[theme='"+$changeStyle.attr("theme")+"']").addClass("on").siblings().removeClass("on");
//             })
//                 //样式选择
//                 .on("click",".removeLogo .choice",function(){
//                     var t=$(this);$(".bottomMark").removeClass("bottomMark");t.addClass("bottomMark");
//                     t.removeClass("unslect").addClass("slected").parent().siblings().find(".choice").removeClass("slected").addClass("unslect");
//                     if((t.hasClass("slected")&&t.attr("isbuy")=="true")||t.attr("sutype")=="normal") {
//                         $(".removeLogo .save").trigger("click");
//                         return;
//                     };
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         (t.parent().index()==1)&&set.modal(data.f);
//                         (t.parent().index()==2)&&set.modal(data.g);
//                     });
//                 })
//
//             //选取样式
//             $(document).on("click",".styleChoseBox  .bubble a",function(){
//                 var t=$(this),theme=t.attr("theme");
//                 t.parents("li").find("p[theme]").attr("theme",theme);
//             })
//                 .on("click",".delMarkModal .oparate a",function(){//购买
//                     var t=$(this),url="/bottom/buy",$delMarkModal=$(".delMarkModal"),
//                         json={
//                             "siteId":$delMarkModal.attr("siteId"),
//                             "type":$delMarkModal.attr("type"),
//                         },
//                         $bottomMark=$(".bottomMark");
//                     if(t.parent().hasClass("fail")) return;
//                     utility.ajax(url,"post",json,function(data){
//                         var res=data;
//                         saveTip(res,{"succ":"支付成功","fail":"支付失败"},function(){
//                             $bottomMark.attr("class","use blue normal").text("使用");
//                             $bottomMark.attr("sutype")=="union"&&$bottomMark.siblings(".bottomStyle").before('<p class="buySuc"> <input type="text" value="" placeholder="输入公司/品牌名称"> <input type="text" value="http://" placeholder="http://"> </p>');
//                             $siteSet.find(".topShow .left:eq(0) .yellow").text(res.data.goldBalance).end().find(".topShow .left:eq(1) .yellow").text(res.data.coinBalance);
//                         },function(){
//
//                         });
//                     });
//                 });
//             return this;
//         };
//         //关闭网站
//         siteSetCon.siteClose=function(){
//             //双击可编辑(设置blur是为了解决jq事件分发bug)
//             function edit(ele,callback,blur){
//                 ele.attr("contenteditable","true").css({"overflow": "hidden","white-space": "nowrap"}).focus().blur(function(){ele.removeAttr("contenteditable");typeof callback=="function"&&blur==0&&callback();blur=1});
//             };
//             //点击保存
//             $siteSet.on("click",".closeSite .save",function(){
//                 var t=$(this),$pcClose=$siteSet.find(".pcClose"),$mClose=$siteSet.find(".mClose");
//                 var url="/setting/site/disable",json={};
//                 if(t.hasClass("closed")) return;
//                 json["groupId"]=GroupId;json["title"]=$.trim(t.siblings(".detail").find(".closetitle").html());
//                 json["content"]=$.trim(t.parents(".mClose").length?t.siblings(".detail").find(".closecon").html():content());
//                 json["disableStyle"]=t.siblings(".detail").attr("closestyle")?t.siblings(".detail").attr("closestyle"):"";
//                 json["displayMode"]=t.parents(".pcClose").length?"pc":"phone";
//                 json["content"]=json["content"].replace(/<[^<]*>/gi,"");
//                 function content(){
//                     var arr=[];
//                     t.siblings(".detail").find(".closecon").each(function(){
//                         arr.push($(this).html());
//                     });
//                     return arr.join("$");
//                 };
//                 set.ajax(url,"post",json,function(data){
//                     saveTip(data,{"succ":"网站已关闭","fail":"网站关闭失败"});
//                     if(data.status==200) $("."+t.attr("platform")).find(".siteMark>[state]").attr("state","closed").text("已关闭").end()
//                         .find(".messageCont").attr("state","closed"),t.addClass("closed");
//                 })
//             });
//             //双击编辑
//             $(document).on('dblclick',".closeSite .editCon", function() {
//                 var name = $.trim($(this).text()),
//                     _this = $(this),
//                     $input=$(this).find('input');
//                 if ($input.length) {
//                     $input.val()==""?$input.val($input.attr("placeholder")):$input.val($input.val());
//                     return;
//                     // _this.html(html);
//                 } else {
//                     _this.html('<input type="text" value="' + name + '" class="mod_t_name" style="display:inline-block;height:35px;line-height:35px;width:100%;border: 0px;overflow:hidden;background-color:rgba(0,0,0,0);outline:none;"/>');
//                 };
//                 _this.find('input.mod_t_name').focus().on('blur', function() {
//                     // var newname = $(this).val(),getStr=set.getString(newname,80);
//                     // if(getStr.realLength>80) $(this).val(getStr.getStr);
//                     _this.html($(this).val());
//                 }).on("input",function(){
//                     var newname = $(this).val() ,getStr=set.getString(newname,64);
//                     if(getStr.realLength>67) $(this).val(getStr.getStr);
//                 });
//             })
//                 .on("click",".coloeChose .round",function(){//关闭网站选择颜色
//                     var t=$(this),tIdx=t.index()-1,$i=t.find("i");
//                     $siteSet.find(".detail").attr("closestyle","style"+tIdx);
//                     t.addClass("on").siblings().removeClass("on");
//                 }).on('input blur',".buySuc input",function(e){
//                     var t=$(this);
//                     if(e.type=="input"){
//                         if(t.index()==1){
//                             if(t.val()=="") t.val("http://");
//                         }else if(t.index()==0){//修改公司名称
//                             var val=t.val();
//                             t.parent().next().find("i").text(val);
//                         }
//
//                     }else{
//                         if(t.parent().siblings(".using").length){
//                             $bubbleRelatedSave=t.parent().siblings(".using");
//                         }
//                     }
//                 });
//             return this;
//         };
//         //删除网站
//         siteSetCon.delteSite=function(){
//             //点击删除
//             $siteSet.on("click",".delSiteBtn",function(){
//                 var t=$(this);
//                 if(!!isAgentUser&&$(".delSiteBtn").length==1){
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         set.modal(data.m);
//                         $(".middleTip").attr("siteId",t.attr("siteId"));
//                     });
//                 }
//                 else{
//                     set.ajax("/js/mysiteV3/app/modal.json","get",{},function(data){
//                         set.modal(data.j);
//                         var text=t.parents(".PCshowBox").length?"PC端":"手机端";
//                         $(".middleTip").attr("siteId",t.attr("siteId")).find(".content p").html("您正在删除<span class='red'>"+text+"</span>网站，删除后不可恢复，是否继续？");
//                     });
//                 }
//             });
//             //中间提示框
//             $(document).off(".siteSetModal").on("click.siteSetModal",".middleTip .continue",function(){
//                 var t=$(this),url="/common/site/delete";
//                 utility.ajax(url,"post",{editId:t.parents(".middleTip").attr("siteId")},function(data){
//                     if($(".delSiteBtn").length==2){
//                         data.status==200 && window.location.reload();
//                         $siteSet.find(".topNav ul>li").eq(5).trigger("click");
//                     }else{
//                         if(data.status==200) {
//                             window.location.href=(/admin/g.test(location.host+location.pathname)?location.href:urlPath);
//                         }
//                         else if(data.status==500){
//                             if(/done/.test(t.attr("class"))){
//                                 $("#cboxOverlay,#colorbox").remove();
//                             }
//                         }
//                     };
//                 });
//             });
//             return this;
//         };
//         siteSetCon.Domian().admTools().statsCode().removeMark().siteClose().delteSite();
//         return this;
//     };
//     set.robotsInit = function(){
//         var $copyText = $('.copyText').val();
//
//         $body.on('focus','.robots-textarea',function(){
//             $(this).hasClass('discontent') && clearContent($(this));
//         })
//
//             .on('blur','.robots-textarea',function(){
//                 judgeContent($(this));
//             })
//
//             .on('click','.three-tab',function(){
//                 if($(this).closest(".showBox").find("textarea").hasClass('discontent')){
//                     return
//                 }
//                 sendContentXHR($(this));
//             })
//
//             .on('click','.close-robots',function(){
//                 updateOrclose($(this));
//             })
//
//             .on('click','.update-robots',function(){
//                 if($(this).closest(".showBox").find("textarea").hasClass('discontent')){
//                     return
//                 }
//                 updateOrclose($(this),$(this).attr('data-type'));
//             })
//
//         function clearContent($_){
//             $_.val('').removeClass('discontent');
//         }
//
//         function judgeContent($_){
//             $.trim($_.val()) === '' && $_.val($copyText).addClass('discontent');
//         }
//
//         function sendContentXHR($_){
//             var data = {};
//             data.groupId     = $_.attr('data-group');
//             data.displayMode = $_.attr('data-type');
//             data.content     = $('.' + data.displayMode + '-area').hasClass('discontent') ? '' : $('.' + data.displayMode + '-area').val();
//             $.ajax({
//                 type:'POST',
//                 data:data,
//                 url:'/robots/create',
//                 dataType:"json"
//             })
//                 .done(function(data){
//                     saveTip(data,{"succ":"开启成功","fail":"开启失败"},function(){window.location.reload();});
//                 })
//         }
//
//         function updateOrclose($_,_type){
//             var data = {},_url = '';
//             data.id     = $_.attr('data-id');
//             _url    = '/robots/' + data.id + '/close';
//             if(_type){
//                 data.content = $('.' + _type + '-area').hasClass('discontent') ? '' : $('.' + _type + '-area').val();
//                 _url    = '/robots/' + data.id + '/update';
//             }
//             $.ajax({
//                 type:'POST',
//                 data:data,
//                 url:_url,
//                 dataType:"json"
//             })
//                 .done(function(data){
//                     _type ? saveTip(data,{"succ":"保存成功","fail":"保存失败"}) : saveTip(data,{"succ":"关闭成功","fail":"关闭失败"},function(){window.location.reload();});
//                 })
//         }
//
//         function saveTip(data,text,successFun,failFun){
//             set.ajax("/js/mysiteV3/app/modal.json","get",{},function(modal){
//                 if(data.status==200){
//                     set.modal(modal.h,'',function(){
//                         $(".content dt").text(text.succ);
//                     });
//                     setTimeout(function(){$("#cboxOverlay,#colorbox").remove();typeof successFun=="function"&&successFun(); },2000);
//                 }else if(data.status!=200){
//                     set.modal(modal.i,'',function(){
//                         $(".content dt").text(text.fail);
//                     });
//                     setTimeout(function(){$("#cboxOverlay,#colorbox").remove();typeof failFun=="function"&&failFun(); },2000);
//                 };
//
//             });
//         };
//     };
//     //执行
//     set.init=function(){
//         set.commonInit().mySite().siteSet();
//         //update by daimingru 增加robots相关功能
//         set.robotsInit();
//     };
//     /网站设置|我的站点|去除底标/.test($(".sideNav li.active span").text())&&set.siteShow();
//     return set;
// });
