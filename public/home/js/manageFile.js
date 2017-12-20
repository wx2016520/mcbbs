define(['utility','uploadFile'],function(_ut,_uf) {
	if(!/managedFile/.test(location.href))  return;
	var selectNode=[],manageFile=null,TIME=[]
        manageFile = {
		$filetab : $('.listBox'),
		$filepic : $('ul.filepic'),
		$rightCont:$('.rightCont'),
		$listset:$(".listset"),
		// "selectNode" : [],
		"init" : function(){//初始化执行
			var _t = this;
			_t.userSpaceCheck();
			/*_t.$listset.find("p.right").show().find("span").each(function(index, el) {
				$(this).text(bytesToSize($(this).attr("capacity")));
			});*/
		    _uf.uploadFile({ele:$("#fileUpload"),url:"/manageFile/uploadFile"});
			_t.bingEvent();
		},
		'userSpaceCheck':function(){
			var _t= this;
			_t.defaultRenewal=false;
            _ut.ajax("/account/buy/popupSelectCapacityInfo","get",{},function(data){
            	var currentTime=data.data.currentTime,useIndate=data.data.useIndate;
            	// param:time格式2016-06-05
            	_t.getTimeStamp=function(time){
                     return new Date(time).getTime();
            	};
            	_t.spaceCheckOptions={
                    innerOneMonth:false,
                    expired:false,
                    expiredUploadClick:false,
                    spaceTipModal:function(){
                    	_t.defaultRenewal=true;
	                    _ut.modal("chargeNormal","",function(){
	                		var $chargeNormal=$(".chargeNormal"),conTxt;
	                        if(_t.spaceCheckOptions.innerOneMonth){
	                        	conTxt="您购买的存储空间"+data.data.capacity+"G有效期至"+data.data.useIndate+"，为了不影响您的网站使用，请您尽快续费";
	                        }else if(_t.spaceCheckOptions.expired){
	                        	conTxt="您购买的存储空间"+data.data.capacity+"G已到期，暂时无法使用，请您尽快续费";
	                        }
	                        $chargeNormal
	                        .find(".title h3").text("提示").end()
	                        .find(".content").html("<p>"+conTxt+"</p><a href='#'></a>").end()
	                        .find(".content a").text("立即续费").on("click",function(){
	                        	_t.$listset.find(".expanded b").trigger("click");
	                        });
			            });
                    },
            	};
                // 免费
                if(data.data.useIndate=="") return;
                // 差一月到期
                if((_t.getTimeStamp(useIndate)-_t.getTimeStamp(currentTime))/(1000*60*60*24)<=30){
	                _t.spaceCheckOptions.innerOneMonth=true;
                }
                // 已经过期
                if(_t.getTimeStamp(currentTime)-_t.getTimeStamp(useIndate)>=0){
	                _t.spaceCheckOptions.expired=true; 
	                $("#fileUpload").remove();
	            	_t.$listset.find(".fileupload").on("click",function(){
	            		_t.spaceCheckOptions.spaceTipModal();
	            	});
                }
                (_t.spaceCheckOptions.innerOneMonth||_t.spaceCheckOptions.expired)&&_t.spaceCheckOptions.spaceTipModal();
            },true);
		},
		'bingEvent':function(){
			var _t = this;
			_t.$rightCont.find('.listhd').click(function(){//文件类型切换
				var hd = $(this) ,bd = $('.listbd');
				bd.find('li').off().on('click',function(){
					var f = $(this).prop('class')|| 'icon';
					hd.find('i.icon').removeClass().addClass('icon').addClass(f);
					hd.find('span').text($(this).text());
				});
			});
			_t.$rightCont.find('.model li').click(function(e){//列表和缩略图切换
				$(this).addClass('on').siblings().removeClass("on");
				$(this).index() ? $('.filepic').show().siblings('.listBox').hide() : $('.listBox').show().siblings('.filepic').hide();
			    setTimeout(function(){$('.nano').nanoScroller({alwaysVisible: false}); },0);
			});
			_t.$rightCont.on("click",".filepic li",function(e){	//缩略图单项点击选中
				e.target.tagName.toLowerCase()=='em' ? _t.removeFile() : $(this).hasClass('on') ? $(this).removeClass('on') : $(this).addClass('on');
			    _t.addData($(this));
			});
			_t.$rightCont.on("mouseover mouseout",".typeRemove",function(e){
				var $t=$(this);
				e.type=="mouseover"?$t.parent().css("border","1px solid #dcdcdc"):$t.parent().removeAttr("style");
			});
			_t.$filetab.on("click",'td i.icon',	function(){//单行先选中效果
				var tr = $(this).closest('tr'),$thumbnailLi=_t.$filepic.find("li[fileid='"+tr.attr("fileid")+"']");
				tr.toggleClass("on");
				tr.hasClass("on")?$thumbnailLi.addClass("on"):$thumbnailLi.removeClass("on");
				_t.addData(tr);
			});
            _t.$rightCont.find(".fileft .left em").off("click").click(function(){ //全选
            	var $t=$(this); $t.toggleClass("on"); _t.addData($t);
            });
            _t.removeUploadfiles("li .cancleBtn");
			//重命名
			_t.rename(".category p,.filetab .edit");
		    _t.dropDownSlect(".listhd",".listbd");//文件类型下拉框
		    _t.dropDownSlect(".selectType",".movePicType .picTypeBox");//移动图片文件
			_t.removeFile();//文件删除
			_t.addRemoveCategroy(".typeRemove",".category .add");
			_t.extendArry();
			//关闭弹窗
			_t.removeModal(".modalClose,#cboxOverlay");
			_t.selectFlileType(".listbd li");
			_t.totalReupload(".totalUpload");
			_t.extendSpace();
		    //点击翻页
            _ut.pageTurn(".newsPaging .pageList li","/managedFile/page",{pageSize:32,orderBy:""},_uf.showData);
		},
		'removeUploadfiles':function(eleStr){
			var _t=this;
            $("body").on("click",eleStr,function(){
            	var $par=$(this).parent(),$modal=$(".fileUploadModal"),realCapacity,change;
                totalUpload.myCapacity-=Number($par.attr("size"));
                delete totalUpload.totaljqXHR[Number($par.attr("id"))];
                realCapacity=$modal.find(".usedCapacity").attr("realCapacity");
                changeCapacity=Number(realCapacity)-Number($par.attr("size"));
                $modal.find(".usedCapacity").attr("realCapacity",changeCapacity).text(bytesToSize(changeCapacity));
                $par.remove();
                var totalLen=$(".uploadAction").length;
                totalUpload.activeCapacity<totalUpload.myCapacity&&$(".serverInfo .left").text("共"+totalLen+"个文件");
                $('.nano').nanoScroller({alwaysVisible: false});
                _uf.initProcessNum();
                if($modal.attr("notAutoUpload")&&totalUpload.activeCapacity>=totalUpload.myCapacity){
                	$modal.find(".usedCapacity").removeClass("red");
                    $modal.find(".set p i").text("文件上传中，请勿关闭窗口，窗口关闭上传将会中断！").end()
                    .find(".totalUpload").removeClass("disable").end()
                    .find(".uploadProcess li").not(".error,.wrongFormat").each(function(){
                    	var $t=$(this);
                    	if($t.find(".uploadAction").hasClass("success")) return;
                    	$t.find(".progressBar").show(200).end().find(".tips").hide(200);
                    });
                    $(".uploadProcess").children().length==0&&$(".totalUpload").addClass("disable")
					$(".serverInfo .left").html("<span>已完成<i class='uploading'>0</i>/<i class='uploadTotal'>"+totalLen+"</i></span><span class='uploadFail red'>（<i>0</i>个失败）</span>");
                };
            });
		},
		'totalReupload':function(eleStr){
			$(document).on("click",eleStr,function(){
				if($(this).hasClass("disable")) return;
				if(totalUpload.activeCapacity>totalUpload.myCapacity){
					$("#fileUpload").fileupload('option', 'autoUpload', true);
	                for(var i in totalUpload.totaljqXHR){
	                	if($("#"+i).hasClass("wrongFormat")) continue ;
	                    totalUpload.totaljqXHR[i].submit();
	                };
				};
				$(this).addClass("disable");
			});
		},
		'moveFilesToCategroy':function($ele){
			var $t=$ele,categoryId=!$t.attr("categoryId")?"0":$t.attr("categoryId"),_t=this;
			if(!$("[fileid].on").length)  return;
			_ut.ajax("/manageFile/moveFileCategory","post",{fileIds:selectNode.join(","),categoryId:categoryId},function(data){
                var json=sendData={pageSize:32,orderBy:""};
                if(data.status==200){
                	// var newCategory=!$t.attr("categoryId")?".all":"[categoryId='"+categoryId+"']";
                	// $(".category .categoryBox "+newCategory).click();
                    _uf.goToPage($t,$(".pagination .active").text(),json,"");
                };    
           	});
		},
		'addRemoveCategroy':function(removeEle,addEle){
			$(document).on("click",removeEle,function(e){
           	   var $t=$(this),json={id:$t.attr("categoryId")},categoryId=$t.parent().attr("categoryId"),
           	       index=$t.parent().index(),_t=this,$category=$(".category");
           	   e.stopPropagation();
           	   if($t.parent().hasClass("all")) return;
           	   if($t.parent().hasClass("on")) $t.parent().siblings(".all").trigger("click");
           	   $t.parents(".category").find(".add").show().end().end().parent().remove();
           	   $category.find(".categoryBox").children().eq(6).css("display","inline-block");
           	   $category.find(".categoryBox").children().length>=8?$category.find(".add").hide():$category.find(".add").show();
           	   $('.movePicType .categoryBox li').eq(index).remove();
           	   _ut.ajax("/manageFile/deleteUserFileCategory","post",{id:categoryId},function(data){});
            });
            $(addEle).click(function(){
           	   var $t=$(this),$category=$t.parent().find("span");
               _ut.ajax("/manageFile/addUserFileCategory","get",{userFileType:$(".listhd").attr("filetype"),name:"新分类"},function(data){
                   var categoryId=data.data.id,addHtml=$t.siblings(".edit").hasClass("on")?"<p categoryId='"+categoryId+"' class='editModel'><span>新分类</span><i class='typeRemove'></i></p>":"<p categoryId='"+categoryId+"'><span>新分类</span><i class='typeRemove'></i></p>";
           	       $('.movePicType .categoryBox').append("<li categoryId='"+categoryId+"'>新分类</li>");
           	       if($category.length>=6) $t.hide();
           	        $t.siblings(".categoryBox").append(addHtml).find("p").last().trigger("dblclick");
           	   });
            });
		},
		'rename':function(editStr){
            var TimeFn = null,_t=this;
            function renameFun(e,$ele){
                if($(e.target).hasClass("mod_t_name"))  return;
	                var _this=$ele.parents(".category").length?$ele.addClass("editModel").find("span"):$ele.parents("tr").find("td:eq(0) .fileName"),
	                    name = $.trim(_this.text()), $input=_this.find('input');
	                if(_this.parents(".category").length&&_this.parent().hasClass("all")) return ;
	                !_this.parents(".category").length&&_this.siblings(".fileType").hide();
	                if ($input.length) {
	                    $input.val()==""?$input.val($input.attr("placeholder")):$input.val($input.val());
	                    return;
	                } else {
	                	var maxLength=$ele.parents(".category").length?8:32;
	                    _this.html('<input type="text"  class="mod_t_name" maxLength="'+maxLength+'" placeholder="新分类"/> ').find("input").val(name);
	                };
	                _this.find('input.mod_t_name').focus().on('blur keydown', function(e) {
	                    var newname = !$(this).val()?"新分类":$(this).val();
	                	if(e.type=="blur"||e.keyCode==13){
		                    _this.text(newname).find("input").remove();
		                    if(_this.parents(".category").length){
			                    var categoryId=_this.parent().attr("categoryId");
			                    setTimeout(function(){_this.parent().removeClass("editModel")},100);
			                    $('.movePicType .categoryBox li').eq(_this.parent().index()).text(newname);
			                    _ut.ajax("/manageFile/editUserFileCategory","post",{userFileType:"pic",name:newname,id:categoryId},function(){
			                        
			                    });
		                    }else{
			                    _this.siblings(".fileType").show();
		                    	var sendData={
		                    		id:_this.parents("tr").attr("fileid"),name:newname+"."+_this.parent().next().find(".fileType").text().toLowerCase()
		                    	};
		                    	_ut.ajax("/managedFile/update","post",sendData,function(){});
		                    };
	                	};
	                }).on("input",function(){});
            };
			$(document).on('click',editStr,function(e) {
				var $t=$(this);
				clearTimeout(TimeFn);
				if(!$(e.target).is("span")&&!$(e.target).is("a")&&!$(e.target).is("p")) return; 
				TimeFn = setTimeout(function() {
					if($t.parent().is("div")){
						var categoryId=$t.attr("categoryId"),
						sendData={pageSize:32,orderBy:""};
						if($t.hasClass("editModel"))  return;
						$t.addClass("on").siblings().removeClass("on");
						$('.fileft em.on').removeClass("on");
						selectNode=[];
						_uf.goToPage($t,1,sendData,e);
						return;
					};
					renameFun(e,$t);
                }, 170);
            }).on("dblclick",editStr,function(e){
            	var $t=$(this);
                clearTimeout(TimeFn);
                if($t.parent().is("td")||$t.hasClass("all")) return;
                renameFun(e,$t);
            });
		},
		'extendArry':function(){
			Array.prototype.indexOf = function(val) {
	            for (var i = 0; i < this.length; i++) {
	                if (this[i] == val) return i;
	            }
	            return -1;
	        };
	        Array.prototype.remove = function(val) {
	            var index = this.indexOf(val);
	            if (index > -1) {
	                this.splice(index, 1);
	            };
	        };
		},
		'addData':function($ele){
			var _t = this,$allBtn=$('.fileft').find('em'),pageSize=_t.$filetab.find("tbody tr").length;
            $ele.hasClass("on")?selectNode.push($ele.attr("fileid")):selectNode.remove($ele.attr("fileid")); 
            if($ele.parents(".fileft").length){
                selectNode=[];
                $ele.hasClass("on")&&_t.$filetab.find("tbody tr").each(function(){
                	var $t=$(this);
                	selectNode.push($t.attr("fileid"));
                })&&$("[fileid]").addClass("on");
                !$ele.hasClass("on")&&$("[fileid]").removeClass("on");
            };
            $("[fileid]").removeClass("on");
            $.each(selectNode,function(i,j){
                $("[fileid='"+j+"']").addClass("on");
            });
            if($(".nodata").is(":hidden"))selectNode.length==pageSize?$allBtn.addClass('on'):$allBtn.removeClass('on');
		},
		'selectFlileType':function(eleStr){
			var _t=this;
			$(document).on("click",eleStr,function(e){
				var $t=$(this),userFileType=$t.hasClass("allFiles")?"":$t.attr("fileType"),pageType;
				$t.parents(".listbd").siblings(".listhd").attr("fileType",userFileType);
	            !$t.hasClass("allFiles")?$(".category").stop().show(200):$(".category").stop().hide(200);
                pageType=$(".model li.on").index()==0?"text":"pic";
	            window.location.href="/managedFile/index.html?groupId="+groupId+"&fileType="+userFileType+"&pageType="+pageType;
           	});
		},
		'dropDownSlect':function(top,bot){
			var _t=this;
            $(top).on("click",function(){
            	var $t=$(this),$bot=$t.siblings(bot);
          	    $bot.toggleClass("show");
          	    $bot.hasClass("show")?$t.addClass("active"):$t.removeClass("active");
          	    $('.nano').nanoScroller({alwaysVisible: false});
            });
            $(bot).on("click","li",function(){
          	    var $t=$(this),html=$t.prop("outerHTML"),$top=$t.parent().siblings(top);;
          	    $t.removeClass("show");
          	    if($t.parents(".movePicType").length) _t.moveFilesToCategroy($t);
          	    if(!$t.parents(".movePicType").length){
	          	    $top.find("li").remove().end().append(html).removeClass("active");
          	    };
            });
            $(document).on("click",function(e){
                if(!$(e.target).hasClass(top.replace(".",""))&&!$(e.target).parents(top).length) $(bot).removeClass("show"),$(top).removeClass("active");
            });
		},
        'removeModal':function($close){
           	$(document).on("click",$close,function(e){
                if(!totalUpload) return;
           	    for(var i in totalUpload.totaljqXHR){
                   totalUpload.totaljqXHR[i].abort();
           	    };
           	    if($(".fileUploadModal").attr("notautoupload")) window.location.reload();
           	    $("#cboxOverlay,#colorbox").remove();
            });
        },
		'removeFile' : function(){
			var _t=this;
			$(document).off(".removeFile").on("click.removeFile",".fileft .left .s1,.delete,.filepic p em",function(){
				var $t=$(this),ids=$t.parents(".fileft").length?selectNode:$t.parents("[fileid]").attr("fileid").split();
				if($t.is("em")||$t.hasClass("delete")) $t.parents("[fileid]").remove();
				if(!ids.length) return;
				var sendData={ids:ids };
			    _ut.ajax("/managedFile/delete","post",sendData,function(data){
			        var json=sendData={pageSize:32,orderBy:""};
                    if(data.status==200){
                    	_uf.updateCapacity(data.data.usedCapacity,data.data.totalCapacity);
                    	selectNode=[];_t.$rightCont.find(".fileft .left em").removeClass("on");
                        _uf.goToPage($t,$(".pagination .active").text(),json,"");
                        time2=new Date().getTime();
                    };
			    },"",true);
			});
		},
		// 扩容及购买(一)：有降级(到上次有效期后才能降级) 月份差(补足升级后的未到上次购买有效期的差额)
		// 'extendSpace':function(){
  //           var t=this,sumMoney=100,$extendModal,$money,numYear,numSpace,limitDate,sendData,defaultSpace,
  //               isSelectSpace,numLastSpace,curDate={},useIndate={},$service
  //               options={
  //               	isFirst:true,//是否第一次购买
  //               	isOnlyExtendSpace:false,//只扩容
  //               	isExtendYear:false,//只续年费
  //               	isDowngradeSpace:false,//降级
  //               	minSpace:5,//最小空间容量
  //               	stepSpace:5,//每次增加值
  //               	isFirstNanoHeight:30,
  //               	stepYear:1,
  //               	serviceText:"容量变更"
  //               };
  //           function countTotalMoney(){
  //           	var cost,
  //           	    // param:date1,date2格式为2016-06-02
  //           	    differMonth=function(date1,date2){
		// 				var year1 =  date1.substr(0,4);
		// 				var year2 =  date2.substr(0,4);
		// 				var month1 = date1.substr(5,2);
		// 				var month2 = date2.substr(5,2);
		// 				var len=(year2-year1)*12+(month2-month1);
		// 				return len;
  //           	    }(curDate.fullTime,useIndate.fullTime);
  //           	var validYear={};//生效日期
  //           	validYear.startYear=options.isDowngradeSpace?useIndate.fullTime:curDate.fullTime;
  //           	validYear.endYear=(useIndate.year+numYear)+useIndate.rest;
  //           	if(options.isFirst) validYear.endYear=(curDate.year+numYear)+curDate.rest;
  //           	if(options.isDowngradeSpace||options.isFirst){
	 //                cost=(numSpace)*numYear*100/5;
  //           	}else {
  //           		cost=(numSpace)*numYear*100/5+(differMonth)*(numSpace-options.defaultSpace)*100/(5*12);
  //           	}
  //           	((cost==0||numSpace==options.defaultSpace)&&$service.text()==options.serviceText)?$extendModal.find("dd a").addClass("disable"):$extendModal.find("dd a").removeClass("disable");
  //               $money.text(parseInt(cost,10)+"币");
  //               $extendModal.find(".numSpace").text(numSpace).end()
	 //    		.find(".afterChange .right .blue:eq(0)").text(validYear.startYear).end()
	 //    		.find(".afterChange .right .blue:eq(1)").text(validYear.endYear);
  //           }
  //           //点击扩容
  //           t.$listset.find(".expanded b ").click(function(){
  //           	_ut.ajax("/account/buy/popupSelectCapacityInfo","get",{},function(data){
  //           		// data={"status":200,"data":{  "currentTime":"2017-5-22","startUseIndate":"2016-09-09","useIndate":"2018-09-09","useYear":1,"capacity":20},"msg":"点击扩容按钮,弹出层数据"};
	 //            	_ut.modal('extend','',function(){
	 //            		isSelectSpace=false;
	 //            		$extendModal=$(".extendModal");
	 //            		$money=$extendModal.find("dt span .money");
	 //            		$limitDate=$extendModal.find(".limitDate");
	 //            		$service=$extendModal.find(".selectServiceType>p span");
	 //            		options.defaultSpace=data.data.capacity;//初始存储空间
	 //            		curDate.fullTime=data.data.currentTime;
	 //            		curDate.year=parseInt(curDate.fullTime.substr(0,4),10);
	 //            		curDate.rest=curDate.fullTime.substr(4,10);
	 //            		useIndate.fullTime=data.data.useIndate;//初始有效年份
	 //            		useIndate.year=parseInt(useIndate.fullTime.substr(0,4),10);//初始年份
	 //            		useIndate.rest=useIndate.fullTime.substr(4,10);
	 //            		// $extendModal.find(".limitDate").text(defaultDate);
	 //            		numYear=options.isFirst?1:0;//默认购买一年
	 //            		numSpace=parseInt(options.defaultSpace,10);
	 //            		// 是否第一次购买
	 //            		options.isFirst=data.data.useIndate==""?true:false;
	 //            		if(options.isFirst){
	 //            			$extendModal.find(".notFirst").remove().end()
	 //            			.find(".nano:eq(0)").height(options.isFirstNanoHeight).end()
	 //            			.find(".now .left b").text("200MB").end()
	 //            			.find(".now .right").text("有效期限  不限").end()
	 //            			.find(".reduce").addClass("disable");
	 //            		}else{
	 //            			$extendModal.find(".now .left b").text(options.defaultSpace+"G").end()
	 //            			.find(".now .right").text("有限期限  "+data.data.startUseIndate+"至"+useIndate.fullTime);
	 //            		}
	 //            		// 是否第一次购买
	 //            		$extendModal.find(".numSpace").text(numSpace).end()
	 //            		.find(".selectYear>p span").text(!options.isFirst?"至当前有效期":"1年").end()
	 //            		.find(".afterChange .right .blue:eq(0)").text(curDate.fullTime).end()
	 //            		.find(".afterChange .right .blue:eq(1)").text((curDate.year+numYear)+curDate.fullTime.substr(4,10));
	 //            		countTotalMoney();//默认是1年
	 //            	});
  //           	});
  //           });
  //           //点击年限
  //           $(document).on("click",".extendModal .selectBox p",function(){
  //               var t=$(this);
  //               t.siblings(".nano").toggleClass("on");
  //               t.siblings(".nano").hasClass("on")&&$('.nano').nanoScroller({alwaysVisible: true});
  //           })
  //           //年限及服务类型选择
  //           .on("click",".extendModal .nano-content li",function(){
  //           	var t=$(this),txt=t.text(),idx=t.index();
  //           	t.parents(".nano").siblings("p").find("span").text(txt);
  //           	if(t.parents(".selectYear").length) {
	 //            	numYear=parseInt(txt,10);
	 //            	if(t.hasClass("toValidPeriod")) numYear=0;	
  //           	}else if(t.parents(".selectServiceType").length){
  //                   $extendModal.find(".selectSpace p i").css("display","inline-block").end()
  //                   .find(".toValidPeriod").show();
  //                   if(idx==1) {
  //                   	$extendModal.find(".selectSpace p i,.toValidPeriod").hide().end()
  //                   	.find('.selectYear>p span').text("1年");
  //                   }
  //           	};
  //           	t.parents(".nano").removeClass("on");
  //           	countTotalMoney();
  //           })
  //           //空间选择
  //           .on("click",".extendModal .selectSpace p i",function(){
  //           	var t=$(this),idx=t.index(),
  //           	    numMoney=parseInt($money.text(),10),numReduceAdd;
  //           	numSpace=parseInt(t.siblings("span").text(),10);
  //           	if(idx==0){
  //                   if(numSpace==options.minSpace){
  //                   	return;
  //                   }
  //                   else{
  //                   	numSpace-=options.stepSpace;
  //                   	numSpace==options.minSpace&&$extendModal.find(".reduce").addClass("disable");
  //                   	if(numSpace<options.defaultSpace) options.isDowngradeSpace=true;
  //                   }
  //           	}else{
  //           		$extendModal.find(".reduce").removeClass("disable");
  //           		numSpace+=options.stepSpace;
  //           		if(numSpace>options.defaultSpace) options.isDowngradeSpace=false;
  //           		isSelectSpace=true;
  //           	}
  //           	//非第一次
  //           	if(!options.isFirst&&$service.text()==options.serviceText&&numSpace==options.defaultSpace) $extendModal.find("dd a").addClass("disable");
  //           	t.siblings("span").find("b").text(numSpace);//存储空间
  //           	$extendModal.find(".limitSpace").text(numSpace+"G")
  //           	countTotalMoney();
  //           })
  //           //点击购买
  //           .on("click",".extendModal  dd a",function(){
  //           	var sumMoney=parseInt($extendModal.find(".money").text()),
  //           	    useInDate=$extendModal.find(".limitDate").text();
  //           	    serviceText=$extendModal.find(".afterChange .right").text();
  //           	if($(this).hasClass("disable")) return;
  //           	sendData={
  //           		useYear:numYear,
  //           		capacity:numSpace,
  //           		price:sumMoney,
  //           		useInDate:options.isFirst?((curDate.year+numYear)+curDate.rest):useIndate.year+numYear+useIndate.rest,
  //           	};
  //           	_ut.ajax("/account/buy/planBuyCapacity","post",sendData,function(data){
	 //                _ut.modal("delBotMark",'',function(){
	 //                	var $delMarkModal=$(".delMarkModal");
	 //                	$delMarkModal
	 //                	.find(".oparate a").text("支付").end()
	 //                	.find(".title .yellow b").text(sumMoney).end()
	 //                	.find(".coinShow li:eq(0) .right").text(data.data.consumeGold).end()
	 //                	.find(".coinShow li:eq(1) .right").text(data.data.consumeCoin).end()
	 //                	.find(".buyDetail li:eq(0) .right").text("储存空间"+numSpace+"G("+serviceText+")").end()
	 //                	.find(".buyDetail li:eq(2) .right").text(data.data.CreateTime).end()
	 //                	.find(".buyDetail li:eq(3) .right").text(data.data.GoldBalance).end()
	 //                	.find(".buyDetail li:eq(4) .right").text(data.data.CoinBalance).end();
	 //            		if(data.status==10054){
	 //            			$delMarkModal
	 //            			.find(".coinShow li:eq(0) .right").addClass("red").end()
	 //            			.find(".oparate").addClass("fail").find("a").text("立即充值").attr("href","/account/goldRecharge");
	 //            		};
	 //                });
  //           	},'',true);
  //           })
  //           //点击弹窗隐藏年限选择
  //           .on("click",".extendModal",function(e){
  //           	var $target=$(e.target);
  //           	!$target.hasClass("selectBox")&&!$target.parents(".selectBox").length&&$(".nano").removeClass("on");
  //           })
  //           //支付
  //           .on("click",".delMarkModal .oparate a",function(){
  //           	if($(this).hasClass("disable")||$(this).parent().hasClass("fail")) return;
  //           	_ut.ajax("/account/buy/buyCapacity","post",sendData,function(data){
  //                   _ut.saveTip(data,{"succ":"支付成功","fail":"支付失败"},function(){
  //                   	var $processBar=$(".space .processBar span"),nowUseCapacity=$(".usedCapacity").attr("used");
  //                   	t.$rightCont
  //                   	.find(".space .totalCapacity").text(parseInt(bytesToSize(data.data.totalCapacity),10)+"GB").end()
  //                   	.find(".space .date .useIndate").text(data.data.useIndate).end();
  //                   	// $processBar.css("width",(nowUseCapacity/data.data.totalCapacity)*100+"%");
  //                   	memorySpace(nowUseCapacity,data.data.totalCapacity);
  //                   });
  //           	},'',true);
  //           	$(this).addClass("disable");
  //           });
		// }
		// 扩容及购买(二):①按年计算，不足年 按0计算 ②不许降级 
		'extendSpace':function(){
            var _t=this,sumMoney=100,$extendModal,$money,numYear,numSpace,limitDate,sendData,defaultSpace,
                isSelectSpace,numLastSpace,curDate={},useIndate={},$service,
                options={
                	isFirst:true,//是否第一次购买
                	isOnlyExtendSpace:false,//只扩容
                	isExtendYear:false,//只续年费
                	isDowngradeSpace:false,//降级
                	minSpace:5,//最小空间容量
                	stepSpace:5,//每次增加值
                	isFirstNanoHeight:30,
                	stepYear:1,
                	serviceText:"容量变更",
                	countTotalMoney:function(){
		            	var cost,
		            	    // param:date1,date2格式为2016-06-02
		            	    differYear=function(date1,date2){
								var year1 =  date1.substr(0,4), year2 =  date2.substr(0,4),
								    month1 = date1.substr(5,2), month2 = date2.substr(5,2),
								    date1=  date1.substr(8,2), date2=  date2.substr(8,2),
								    differDate=function(){
									   if(month1==month2){
									      return date2-date1>0?0.1:0;
									   }else{
									      return 0;
									   };
									}(),
								    len=(year2-year1)*12+(month2-month1);
								return (options.isFirst||numSpace==options.defaultSpace)?0:Math.ceil(len/12+differDate);
		            	    }(curDate.fullTime,useIndate.fullTime);
		            	var validYear={};//生效日期
		            	validYear.startYear=options.isDowngradeSpace?useIndate.fullTime:curDate.fullTime;
		            	validYear.endYear=(useIndate.year+numYear)+useIndate.rest;
		            	if(options.isFirst) validYear.endYear=(curDate.year+numYear)+curDate.rest;
		            	cost=numSpace*numYear*100/5+(numSpace-options.defaultSpace)*differYear*100/5;
		            	if((!options.isFirst&&$extendModal.find(".selectServiceType>p span").text()==options.serviceText&&numSpace==options.defaultSpace)||cost==0){
		            		$extendModal.find("dd a").addClass("disable");
		            	}else{
		            		$extendModal.find("dd a").removeClass("disable");
		            	}
		            	// (cost==0&&numSpace==options.defaultSpace&&numYear==0)?$extendModal.find("dd a").addClass("disable"):$extendModal.find("dd a").removeClass("disable");
		                $money.text(parseInt(cost,10)+"币");
		                $extendModal.find(".numSpace").text(numSpace).end()
			    		.find(".afterChange .right .blue:eq(0)").text("  "+validYear.startYear).end()
			    		.find(".afterChange .right .blue:eq(1)").text(validYear.endYear);
                	},
                	isSwitchServiceType:false,
                };
            //点击扩容
            _t.$listset.find(".expanded b ").click(function(){
            	var url=/.net/g.test(urlPath)?"http://www.wqdian.net":"http://www.wqdian.com",
            	str="<div class='Pupsection'></div><div class='pupAlert'><ul class='listAlert'><li class='desc'>想要更多存储空间?</li><li class='buybtn'><a href='"+url+"/pricingpackage.html' target='_blank'>购买更高版本</a></li></ul></div>"
            	$("body").append($(str)).end().find(".Pupsection,.pupAlert").show();

            	/*_ut.ajax("/account/buy/popupSelectCapacityInfo","get",{},function(data){
            		// data={"status":200,"data":{  "currentTime":"2017-5-22","startUseIndate":"2016-09-09","useIndate":"2018-09-09","useYear":1,"capacity":20},"msg":"点击扩容按钮,弹出层数据"};
	            	_ut.modal('extend','',function(){
	            		isSelectSpace=false;
	            		$extendModal=$(".extendModal");
	            		$money=$extendModal.find("dt span .money");
	            		$limitDate=$extendModal.find(".limitDate");
	            		$service=$extendModal.find(".selectServiceType>p span");
	            		// 是否第一次购买
	            		options.isFirst=data.data.useIndate==""?true:false;
	            		numYear=options.isFirst?1:0;//默认购买一年
	            		options.defaultSpace=data.data.capacity;//初始存储空间
	            		numSpace=parseInt(options.defaultSpace,10);
	            		// numSpace==options.minSpace&&$extendModal.find(".reduce").addClass("disable");
	            		curDate.fullTime=data.data.currentTime;
	            		curDate.year=parseInt(curDate.fullTime.substr(0,4),10);
	            		curDate.rest=curDate.fullTime.substr(4,10);
	            		useIndate.fullTime=options.isFirst?(curDate.year+numYear)+curDate.fullTime.substr(4,10):data.data.useIndate;//初始有效年份
	            		useIndate.year=parseInt(useIndate.fullTime.substr(0,4),10);//初始年份
	            		useIndate.rest=useIndate.fullTime.substr(4,10);
	            		// $extendModal.find(".limitDate").text(defaultDate);
	            		// 是否第一次购买
	            		if(options.isFirst){
	            			$extendModal.find(".notFirst").remove().end()
	            			.find(".nano:eq(0)").height(options.isFirstNanoHeight).end()
	            			.find(".now .left b").text("200MB").end()
	            			.find(".now .right").text("有效期限  不限").end()
	            			.find(".reduce").addClass("disable");
	            		}else{
	            			$extendModal.find(".now .left b").text(options.defaultSpace+"G").end()
	            			.find(".now .right").text("有限期限  "+data.data.startUseIndate+"至"+useIndate.fullTime);
	            		}
	            		$extendModal.find(".numSpace").text(numSpace).end()
	            		.find(".selectYear>p span").text(!options.isFirst?"至当前有效期":"1年").end()
	            		.find(".afterChange .left .limitSpace").text(options.defaultSpace+"G").end()
	            		.find(".afterChange .right .blue:eq(0)").text(curDate.fullTime).end()
	            		.find(".afterChange .right .blue:eq(1)").text(useIndate.fullTime).end()
	            		.find(".reduce").addClass("disable");
	            		options.countTotalMoney();//默认是1年
	            		_t.defaultRenewal&&$extendModal.find(".selectServiceType .notFirst").trigger("click");
	            	});
            	});*/
            });
            //点击年限
            $(document).on("click",".extendModal .selectBox p",function(){
                var t=$(this);
                options.nowServiceTypeTxt=$extendModal.find(".selectServiceType>p span").text();
                t.siblings(".nano").toggleClass("on");
                t.siblings(".nano").hasClass("on")&&$('.nano').nanoScroller({alwaysVisible: true});
            })
            //点击弹框隐藏
            .on("click.expansion",".Pupsection",function(){
            	$("body").find(".Pupsection").remove().end().find(".pupAlert").remove();
            })
            //年限及服务类型选择
            .on("click",".extendModal .nano-content li",function(e){
            	e.stopPropagation();
            	var t=$(this),txt=t.text(),idx=t.index(),limitYearTxtArr=["至当前有效期","1年"];
            	t.parents(".nano").siblings("p").find("span").text(txt);
            	options.changeServiceTypeTxt=txt;
            	if(t.parents(".selectYear").length) {
	            	numYear=parseInt(txt,10);
	            	if(t.hasClass("toValidPeriod")) numYear=0;	
	            	
            	}else if(t.parents(".selectServiceType").length){
            		// 不是第一次购买的时候，显示加减 至当前
                    if(!options.isFirst)
                    {
                    	$extendModal.find(".selectSpace p i").css("display","inline-block").end()
	                    .find(".toValidPeriod").show();
                    };
                    if(options.changeServiceTypeTxt!=options.nowServiceTypeTxt){
	                    numSpace=options.defaultSpace;
	                    if(idx==0) {
	                        numYear=0;
	                        if(!options.isFirst) limitYearTxt=limitYearTxtArr[0];
	                        $extendModal.find(".reduce").addClass("disable");
	                    }else{
	                    	numYear=1;
	                    	$extendModal.find(".selectSpace p i,.toValidPeriod").hide().end()
	                    	.find('.selectYear>p span').text("1年").end()
	                        .find(".limitSpace").text(numSpace+"G");
	                    	limitYearTxt=limitYearTxtArr[1];
	                    };
	                    $extendModal.find(".selectYear>p span").text(limitYearTxt);
                    }
            	};
            	options.isSwitchServiceType=true;
            	t.parents(".nano").removeClass("on");
            	options.countTotalMoney();
            })
            //空间选择
            .on("click",".extendModal .selectSpace p i",function(){
            	var t=$(this),idx=t.index(),
            	    numMoney=parseInt($money.text(),10),numReduceAdd;
            	numSpace=parseInt(t.siblings("span").text(),10);
            	if(idx==0){
                    if(numSpace==options.defaultSpace){
                    	return;
                    }
                    else{
                    	numSpace-=options.stepSpace;
                    	numSpace==options.defaultSpace&&$extendModal.find(".reduce").addClass("disable");
                    	// if(numSpace<options.defaultSpace) options.isDowngradeSpace=true;
                    }
            	}else{
            		$extendModal.find(".reduce").removeClass("disable");
            		numSpace+=options.stepSpace;
            		// if(numSpace>options.defaultSpace) options.isDowngradeSpace=false;
            		isSelectSpace=true;
            	}
            	//非第一次
            	if(!options.isFirst&&$service.text()==options.serviceText&&numSpace==options.defaultSpace) $extendModal.find("dd a").addClass("disable");
            	t.siblings("span").find("b").text(numSpace);//存储空间
            	$extendModal.find(".limitSpace").text(numSpace+"G")
            	options.countTotalMoney();
            })
            //点击购买
            .on("click",".extendModal  dd a",function(){
            	var sumMoney=parseInt($extendModal.find(".money").text()),
            	    useInDate=$extendModal.find(".limitDate").text();
            	    serviceText=$extendModal.find(".afterChange .right").text();
            	if($(this).hasClass("disable")) return;
            	sendData={
            		useYear:numYear,
            		capacity:numSpace,
            		price:sumMoney,
            		useInDate:options.isFirst?((curDate.year+numYear)+curDate.rest):useIndate.year+numYear+useIndate.rest,
            	};
            	_ut.ajax("/account/buy/planBuyCapacity","post",sendData,function(data){
	                _ut.modal("delBotMark",'',function(){
	                	var $delMarkModal=$(".delMarkModal");
	                	$delMarkModal
	                	.find(".oparate a").text("支付").end()
	                	.find(".title .yellow b").text(sumMoney).end()
	                	.find(".coinShow li:eq(0) .right").text(data.data.consumeGold).end()
	                	.find(".coinShow li:eq(1) .right").text(data.data.consumeCoin).end()
	                	.find(".buyDetail li:eq(0) .right").text("储存空间"+numSpace+"G("+serviceText+")").end()
	                	.find(".buyDetail li:eq(2) .right").text(data.data.CreateTime).end()
	                	.find(".buyDetail li:eq(3) .right").text(data.data.GoldBalance).end()
	                	.find(".buyDetail li:eq(4) .right").text(data.data.CoinBalance).end();
	            		if(data.status==10054){
	            			$delMarkModal
	            			.find(".coinShow li:eq(0) .right").addClass("red").end()
	            			.find(".oparate").addClass("fail").find("a").text("立即充值").attr("href","/account/goldRecharge");
	            		};
	                });
            	},'',true);
            })
            //点击弹窗隐藏年限选择
            .on("click",".extendModal",function(e){
            	var $target=$(e.target);
            	!$target.hasClass("selectBox")&&!$target.parents(".selectBox").length&&$(".nano").removeClass("on");
            })
            //支付
            .on("click",".delMarkModal .oparate a",function(){
            	if($(this).hasClass("disable")||$(this).parent().hasClass("fail")) return;
            	_ut.ajax("/account/buy/buyCapacity","post",sendData,function(data){
                    _ut.saveTip(data,{"succ":"支付成功","fail":"支付失败"},function(){
                    	setTimeout(function(){
                    		window.location.reload();
                    	},2000);
                    	// var $processBar=$(".space .processBar span"),nowUseCapacity=$(".usedCapacity").attr("used");
                    	// _t.$rightCont
                    	// .find(".space .totalCapacity").text(parseInt(bytesToSize(data.data.totalCapacity),10)+"GB").end()
                    	// .find(".space .date .useIndate").text(data.data.useIndate).removeClass("red").end();
                    	// // $processBar.css("width",(nowUseCapacity/data.data.totalCapacity)*100+"%");
                    	// memorySpace(nowUseCapacity,data.data.totalCapacity);
                    });
            	},'',true);
            	$(this).addClass("disable");
            });
		}
	};
    return manageFile.init();
});