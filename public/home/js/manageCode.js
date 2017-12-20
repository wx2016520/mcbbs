define(['utility','uploadFile'],function(_ut,_uf) {
	if(!/managedCode/.test(location.href))  return;
    var manageCode = {
		init: function(){
			var _t=this;
            $(".seachWarp").hide();
			_t.bindEvent();
			return _t;
		},
        /*html: <div class="device selectBox"> <ul class="select_top"> 
        <li class="pc"><i class="device_type"></i>PC</li><i class="up_down"></i> </ul> <ul class="select_bot">
        <li class="pc"><i class="device_type"></i>PC</li> <li class="phone"><i class="device_type"></i>手机</li> </ul> </div>
		*/
        dropDownSlect:function($top,$bot){
            $top.on("click",function(){
            	var $t=$(this),$bot=$t.siblings(".select_bot");
          	    $bot.toggleClass("show");
          	    $bot.hasClass("show")?$t.addClass("active"):$t.removeClass("active");
            });
            $bot.find("li").on("click",function(){
          	    var $t=$(this),html=$t.prop("outerHTML"),$top=$t.parent().siblings(".select_top");;
          	    $top.find("li").remove().end().append(html).removeClass("active");
          	    $t.removeClass("show");
            });
            $(document).on("click",function(e){
                if(!$(e.target).hasClass("select_top")&&!$(e.target).parents(".select_top").length) $bot.removeClass("show"),$top.removeClass("active");
            });
		},
        removeModal:function($close){
           	$(document).on("click",$close,function(e){
           	   $("#cboxOverlay,#colorbox").remove();
            });
        },
        titleSet:function(ele){
            $(document).on("blur",ele,function(){
                var val=$(this).val();
                val&&$(this).removeClass("err");
            })
        },
        handleCssData:function(data,type){
            if(type=="send"){
                var div=document.createElement("div");
                div.innerHTML=data; 
                var star=0,arr=div.childNodes,len=arr.length,str="";
                while(star<len){
                    if(arr[star].nodeType==3) {str+="<style>"+arr[star].data+"</style>"}
                    else {str+= arr[star].outerHTML}
                    star++;
               }
               return str; 
            }else if(type=="get"){
                var reg_1=/(<\s*link[^>]*\/*>)/g;
                if(reg_1.test(data)){
                     return data;
                }else{
                     return data.replace(/(<\s*\/*style[^>]*\>)/g,"")
                }
            }
        },
        //添加和编辑代码弹窗
        codeModal:function(eleStr){
        	var _t=this;
            $("body").on("click",eleStr,function(e){
            	var $tar=$(e.target);
				_ut.modal("code",'',function(){
					var $addCodeModal=$(".addCodeModal");
					_t.dropDownSlect($(".select_top"),$(".select_bot"));
					if($tar.hasClass("addCode")){//添加弹窗

					}else{//编辑弹窗
                        var itemid=$tar.parents("tr").attr("itemid");
                        $addCodeModal.attr("itemid",itemid).addClass("editCodeModal").find(".title h3").text("编辑代码");
                        var url="/managedCode/checkCode",json={userCodeId:$tar.parents("tr").attr("itemid")};
                        _ut.ajax(url,"post",json,function(data){
                            var device=$addCodeModal.find(".device .select_bot ."+data.data.terminalType).prop("outerHTML"),
                                type=$addCodeModal.find(".type .select_bot ."+data.data.userCodeType).prop("outerHTML");
		                    $addCodeModal.find(".device .select_top").find("li").remove().end().append(device).end()
                            .find(".type .select_top").find("li").remove().end().append(type).end()
                            .find("#codeTitle").val(data.data.title.replace(/&lt;/g,"<").replace(/&gt;/g,">")).end()
                            .find("textarea").eq(0).val(data.data.htmlData).end().end()
                            // .find("textarea").eq(1).val(handleCssdata(data.data.cssData)).end().end()
                            .find("textarea").eq(1).val(_t.handleCssData(data.data.cssData,"get")).end().end()
                            .find("textarea").eq(2).val(data.data.jsData).end();
		                });
					};
                    _t.saveCode($(".set a:eq(0)"));
				});
			});
        },
        //保存提示
        saveTip:function(json){
            if(json.data.status==200){//成功
                _ut.modal("h",'',function(){
                    $(".content dt").text(json.successText);
                });
                !json.url?window.location.reload():window.location.href=json.url
            };
            if(json.data.status!=200){//失败
                _ut.modal("i",'',function(){
                    $(".content dt").text(json.failText);
                });
                setTimeout(function(){$("#cboxOverlay,#colorbox").remove(); },2000);
            }
        },
        saveCode:function($save){
            var _t=this;
            $save.click(function(e){
                var url=!$(e.target).parents(".editCodeModal").length?"/managedCode/addCode":"/managedCode/updateCode",
                title=$("#codeTitle").val().replace(/(\<)()/g,"&lt;").replace(/(\>)()/g,"&gt;"),htmlData=$(".codeContent>ul li:eq(0) textarea").val(),
                cssData=$(".codeContent>ul li:eq(1) textarea").val(),
                jsData=$(".codeContent>ul li:eq(2) textarea").val(),
                pageNo=$(".pageCodeList .active a").text(),$t=$(this),
                json={
                    terminalType:$(".device .select_top li").attr("class"),
                    userCodeType:$(".type .select_top li").attr("class"),
                    htmlData:htmlData, cssData:_t.handleCssData(cssData,"send"), jsData:jsData, title:title,
                };
                if((title==""&&(htmlData==""&&cssData==""))||(title!=""&&(htmlData==""&&cssData==""))||(title==""&&(htmlData!=""||cssData!=""))) {
                    $("#codeTitle").addClass("err")
                    $(".total_error_tip").text("! 标题及代码不能为空").stop().fadeIn(200);
                    setTimeout(function(){$(".total_error_tip").text("! 标题及代码不能为空").stop().fadeOut(500);},1000);
                    return;   
                };
                if($t.parents(".editCodeModal").length) json.id=$(".editCodeModal").attr("itemid");
                if($(".error_tip").text()) return;
                _ut.ajax(url,"post",json,function(data){
                    $(".modalClose").trigger("click");
                    //添加跳转到首页，编辑跳转到本页
                    var turnUrl=$t.parents(".editCodeModal").length?"index.html?groupId="+groupId+"&pageNo="+pageNo:"index.html?groupId="+groupId;
                    _t.saveTip({
                        data:data,successText:"保存成功！",failText:"保存失败！",url:turnUrl
                    });
                });
            });
        },
        deleteCode:function(pageDel,modalDel){
        	var itemId,_t=this;
            $(document).off("click").on("click",pageDel,function(){
            	var  $t=$(this),title=$t.parent().siblings(".code_title").text();
            	itemId=$(this).parents("tr").attr("itemid");
           	    _ut.modal("j",'',function(){
				 	$(".middleTip").find("h3").text("删除提示").end().find(".content p").html("您正在删除<span class='red' style='font-weight:bold'>“"+title.replace(/&lt;/g,"<").replace(/&gt;/g,">")+"”</span>，删除后无法恢复，是否继续？")
                    .find(".red").text("“"+title+"”");
				});
            })
            .on("click",modalDel,function(){
                var url="/managedCode/deleteCode",pageNo=$(".pageCodeList .active a").text(),
                json={
                    userCodeId:itemId,
                };
                $(".modalClose").trigger("click");
                _ut.ajax(url,"post",json,function(data){
                    _t.saveTip({
                        data:data,successText:"删除成功！",failText:"删除失败！",url:"index.html?groupId="+groupId+"&pageNo="+pageNo
                    });
                });
			});
        },
        //输入代码切换
        inputCodeTab:function(navStr){
            $(document).on("click",navStr,function(){
                var $t=$(this),index=$t.index(),$addCodeModal=$(".addCodeModal");
                if($t.hasClass("disable")) return;
                $t.addClass("active").siblings().removeClass("active");
                $addCodeModal.find(".codeContent ul li").eq(index).addClass("active").siblings().removeClass("active")
            });
        },
        modalPreCode:function(preStr){
            var _t=this;
            $(document).on("click",preStr,function(){
                var $t=$(this),index=$t.index(),$addCodeModal=$(".addCodeModal"),
                $codeContentLi=$addCodeModal.find(".codeContent>ul li"),
                html=$codeContentLi.eq(0).find("textarea").val(),
                // css="<style>"+$codeContentLi.eq(1).find("textarea").val()+"</style>",
                css=$codeContentLi.eq(1).find("textarea").val(),
                newUrl="/previewCode.htm";
                localStorage.setItem("css",_t.handleCssData(css,"send"));
                localStorage.setItem("html",html);
                var newWindowObi=window.open(newUrl,$t.parents("[itemid]").attr("itemid"));
                // newWindowObi.onbeforeunload=function(){
                //     this.sessionStorage.setItem("css",_t.handleCssData(css,"send"));
                //     this.sessionStorage.setItem("html",html);
                // };
                // newWindowObi.onload=function(){
                //     this.document.getElementsByTagName("head")[0].innerHTML+=_t.handleCssData(css,"send");
                //     this.document.body.innerHTML+=html;
                // };
            });
        },
        pagePreCode:function(eleStr){
            $(document).on("click",eleStr,function(){    
               var $t=$(this),itemId=$t.parents("tr").attr("itemid");
               window.open("previewCode?userCodeId="+itemId);
            });
        },
        textareaCheck:function(textareaStr){
            $(document).on("input",textareaStr,function(){
                var $t=$(this),reg=/<[^<>]*((type=\s*["']\s*file)|(\s+on(\w+)\s*=\s*['"])|(script))[^<>]*>/gi,
                    $error=$t.siblings(".error_tip");
                reg.test($t.val())?$error.text('！请勿输入type="file"、script脚本、onclick等事件'):$error.text("");
            });
        },
        //渲染表格
        showDataList:function($ele,url ,data){
            _ut.ajax(url ,'GET' ,data,function(data){ 
                var tableHtml=[],$codeTable=$(".codeTable"),htmlData=data.data.data,pageEnd,pageStart,page="",curPageNo=data.data.pageNo,
                device_type={
                    "pc":"PC","phone":"手机","widget":"控件","header":"导航","banner":"通栏","footer":"页脚","page":"页面"
                },
                $prePage=$(".codePrevPage"),$nextPage=$(".codeNextPage"); 
                for(var i=0;i<htmlData.length;i++){
                    var trhtml="<tr  itemid='"+htmlData[i].id+"'> <td class='code_title codeName siteEllipsis'><span>"+htmlData[i].title+"</span></td>";
                        trhtml+="<td class='code_device device'><span>"+device_type[htmlData[i].terminalType]+"</span></td><td class='code_type type'><span>"+device_type[htmlData[i].userCodeType]+"</span></td>";
                        trhtml+="<td class='code_date date'><span>"+htmlData[i].createDate+"</span></td>";
                        trhtml+="<td class='code_oprate oprate'> <a href='javascript:;' class='preview codeIcon' title='预览'></a>";
                        trhtml+="<a href='javascript:;' class='edit codeIcon' title='编辑'></a> <a href='javascript:;' class='del codeIcon' title='删除'></a> </td> </tr>"
                    tableHtml.push(trhtml);
                };
                //处理页面
                $codeTable.find("tbody").html(tableHtml.join(""));
                //点击上下页判断
                if($ele){
                    var $curPage=$(".pagination .active"),pageLi=$ele.siblings().find("li");
                    pageLi.removeClass("active");
                    $ele.hasClass("codePrevPage")?$curPage.prev().addClass("active"):$curPage.next().addClass("active");
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
                    }
                    
                    for(i=pageStart;i<=pageEnd;i++){
                        if(curPageNo==i){
                            page += '<li class="active"><a href="javascript:;">'+i+'</a></li>';
                        }else{
                            page += '<li><a href="javascript:;">'+i+'</a></li>';
                        }
                    }
                    $('.codePaging').show().find('.pagination').html(page);
                };
                !data.data.hasNext ? $nextPage.hide() : $nextPage.show();
                !data.data.hasPre ? $prePage.hide() : $prePage.css('display','inline-block');
            });
        },
        pageTurn:function(eleStr){
            var _t=this; 
            $(document).on('click',eleStr,function(){
                var $t=$(this),curPageNo=$t.text(),asc=$(".tableHead .asc").length?"asc":"desc";
                $t.addClass("active").siblings().removeClass("active");
                _t.showDataList("","/managedCode/page", {"pageNo":curPageNo,"order":asc}); 
            });

            $(document).on('click','a.codeNextPage,a.codePrevPage',function(){
                var $t=$(this),curPageNo=$t.parents(".codePaging").find('li.active').text(),
                    spacePageNo=$t.hasClass('codeNextPage')?(parseInt(curPageNo)+1):(parseInt(curPageNo)-1),
                    curPageNo=$t.text(),asc=$(".tableHead .asc").length?"asc":"desc";
                _t.showDataList($t,"/managedCode/page",{"pageNo": spacePageNo,"order":asc} );
            });
        },
        orderByTime:function(eleStr){
            var _t=this;
            $(document).on('click',eleStr,function(){
                var $t=$(this),curPageNo=$(".codePaging").find('li.active').text();
                $t.toggleClass("asc");
                $t.hasClass("asc")?_t.showDataList("","/managedCode/page", {"pageNo":curPageNo,"order":"asc"}):_t.showDataList("","/managedCode/page", {"pageNo":curPageNo,"order":"desc"}); 
            });
        },
		bindEvent:function(){
			var _t=this;
			_t.codeModal(".addCode,.code_oprate .edit");
			_t.deleteCode(".code_oprate .del",".modalBox  .continue");
			_t.removeModal(".modalClose,#cboxOverlay,.modalBox .modalClose,.modalBox .cancle");
            _t.inputCodeTab(".codeContent .nav a");
            _t.modalPreCode(".set a:eq(1)");
            _t.textareaCheck(".codeContent li textarea");
            _t.pagePreCode(".codeTable .preview,.codeTable .code_title");
            _t.pageTurn(".managedCode .pageCodeList li");
            _t.orderByTime(".managedCode .tableHead .date");
            _t.titleSet("#codeTitle");
		}
	};
    return manageCode.init();
});