define(["utility","city"],function(_ut,city){
	var infoManage={
		init:function(){
			var _=this;
			// _.
			_ut.bindEvents(_.setEvents);
			_.companyInfoData={};
    		_.siteInfoData={};
			_.companyInfoData.companyInfo={
				"id" : "",
				"createDate" : "",
				"updateDate" : "",
				"userId" : "",
				"name" : "",
				"brandName" : "",
				"companyType" : 0,
				"commerceCode" : "",
				"businessLicense" : "",
				"introduction" : "",
				"brandLogo" : "",
				"companyScale" : '',
				"businessModel" : 0,
				"businessModel":"",
				"registerYear" : "",
				"registerFund" : "",
				"registerProvince" : "",
				"registerCity" : "",
				"registerArea" : "",
				"legalPerson" : "",
				"bankName" : "",
				"bankAccount" : "",
				"country" : "",
				"province" : "",
				"city" : "",
				"area" : "",
				"detailAddress" : "",
				"email" : "",
				"mobile" : "",
				"telephone" : "",
				"qq" : "",
				"contacts" : "",
				"faxes" : "",
				"postCode" : ""
			};
			_.siteInfoData.siteInfo={
			        "id":"",//数据ID
			        "userId":"", //
				    "url":"", // 公司网址
				    "siteIcpRecords":"", // 网站ICP备案号
				    "siteSafetyRecords":"", // 网安备案号
				    "siteSafetyVersions":"",// 网安版权
				    "industry":"", // 主营行业
				    "product":"", // 主营产品
				    "sellArea":"",// 销售区域
				    "customerBase":"",// 主要客户群
				    "serviceAim":"",// 服务宗旨
				    "doBusinessDate":"",// 营业时间
				    "honorQualification":"",// 荣誉资质(可以上传最多20张照片)
					"createDate":"",	//创建时间
				    "updateDate":"",	//最后更新时间 
			};
            function localUpPic(e,t) {
                var res=e.target.result;
                var formData=new FormData();
                var $img=$(t);
                formData.append('fileUpload',t.files[0]);
                formData.append('userFileType',"pic");
                formData.append('fileId',0);
                _ut.upfile("/manageFile/uploadFile",formData,function(data){
                    // var path=imgsever+"/"+data.data.material.path;
                    var path=data.data.material.path,id=data.data.material.id;
                    $img.parent().siblings("img").attr("src",res).attr("param",path).parents(".uploadImg").addClass('haspic').attr({"id":id});
                    var html='<div class="uploadImg" >\
										<img src="" alt="" param="">\
										<div class="fileupload">\
											上传 <input type="file" id="fileupload">\
										</div>\
										<div class="mask">\
											<span title="更改" class="change"><i></i></span> <span title="删除" class="del"><i></i></span>\
									    </div>\
									</div>';
                    if($img.parents(".honorsPicsBox").is(":visible")&&$(".honorsPicsBox .uploadImg").length<20&&!$(".honorsPicsBox .uploadImg").not(".haspic").length)
                    $(html).insertBefore($(".honorsPicsBox .save"));
                });
            }
            _ut.upLoadFile({
                ele:"[type='file']",
                maxSize:3*Math.pow(1024,2),
                reg:/(gif|jpg|jpeg|png|TIFF|RAW|BMP|GIF|JPG|PNG|PCX|DXF|WMF|EMF|LIC|EPS|ICO)/i,
                overSizeTip:"上传图片超过3M",
                wrongFormatTxt:"图片格式错误",
                callBack:localUpPic
            });
			city.change($(".companyDetailInfo .areaSelect"),0);
			$(".productService .selectBox .body ul").html($(".pro ul").html());
			city.change($(".contactWay .areaSelect"),0);
			return _;
		},
		setEvents:{
			// tab切换
		    tab:{
               // proxy:0,
               ele:".infoManageWrap .topNav li",
               event:{
               	   "click":function(){
					    var $t=$(this),index=$t.index();
					    $t.addClass('on').siblings().removeClass('on');
                        $t.parents(".topNav").siblings('.contentWrap').removeClass('on').eq(index).addClass('on');
               	   },
               }
		    },
		    // 下拉
		    selectDown:{
		    	ele:".selectBox",
		    	isUnbind:1,
		    	event:{
		    		"click":function(e){
		    			var $t=$(this),$tar=$(e.target),arr=[],$title=$t.find(".head span"),
		    			    title=$title.text();
                        ($t.parents(".productService").length&&$tar.is("b"))||$t.toggleClass('on').siblings(".selectBox").removeClass('on');
                        if($tar.is("li")||$tar.is("b")){
							var $li=$tar.is("li")?$tar:$tar.parent();
							$t.parents(".productService").length?$li.toggleClass('on'):$li.addClass("on").siblings().removeClass("on");
							$t.find(".body li.on").each(function(){
								arr.push($(this).text());
							});
							$title.text(arr.join('，'));
                        }else if($tar.parent().hasClass('head')||$tar.hasClass('head')){
                           var selTxt=$.trim($tar.text());
                           $tar.closest('.selectBox').find(".body li").each(function(){
                           	   $(this).removeClass('on');
                               if(selTxt.indexOf($(this).text().substr(0,2))!=-1) $(this).addClass('on');
                           });
                        };
		    		}
		    	}
		    },
		    //隐藏下拉
		    hideDownSelect:{
                // proxy:1,
		    	ele:"body",
		    	event:{
		    		"click":function(e){
		                $tar=$(e.target);
		                (!$tar.parents(".selectBox").length)&&$(".selectBox").removeClass('on');
		    		}
		    	}
		    },
		    // 图片修改及删除
		    modifyPic:{
		    	proxy:1,
		        ele:".uploadImg",
		        event:{
		        	"click":function(e){
		        		var $tar=$(e.target),$uploadImg=$tar.closest('.uploadImg');
		        		var isHornorBox=$tar.parents(".honorsPicsBox").length?1:0;
			            if($tar.closest(".fileupload").length||$tar.closest(".change").length){
                            infoManage.img=$uploadImg.find("img");
                            !$tar.is("input")&&$uploadImg.find("[type='file']").trigger('click');
			            }else if($tar.closest(".del").length||$tar.parent().hasClass('del')){
			            	if(!$(".uploadImg",".honorsPicsBox").not(".haspic").length||!isHornorBox){
				            	$uploadImg.removeClass('haspic').find("img").attr({"param":"","src":""});
			            	}else if(isHornorBox){
			            		$uploadImg.remove();
			            		$(".uploadImg",".honorsPicsBox").not(".haspic").insertBefore($(".honorsPicsBox .save"))
			            	}
                            // _ut.ajax("/managedFile/delete","post",{ids:$uploadImg.attr("id").split(",")},function(){
	                           //  $uploadImg.removeClass('haspic').find("img").attr({"param":"","src":""});
                            // });
			            }
		        	}
		        }
		    },
		    // 经营模式单选
		    radioSelect:{
		        ele:".inputBox .selBox",
		        event:{
		        	"click":function(e){
		        		var $t=$(this);
		        		$t.find("i").addClass('selected').end().siblings().find("i").removeClass('selected');
		        		$t.parent().find("input").attr("class",$t.index()==4?"on full":"full");
		        	}
		        }
		    },
		    //输入验证
		    checkInput:{
		        ele:"[checkType]",
		        event:{
		        	"blur":function(e){
		        		var $t=$(this),checkType=$t.attr("checkType"),val=$t.val();
		        		// if($t.attr("name")=="url") return;
		        		if(checkType=="http"&&!/^http(s)?:\/\//.test(val)) $t.val("http://"+val);
		        		_ut.checkVal(checkType,$t,{
		        			failFun:function(ele,err){
                                ele.siblings('.errortips').text(err[checkType]);
                                // if(checkType=="http") $t.val("http://"+$t.val());
		        			},
		        			succFun:function(ele){
		        				ele.siblings('.errortips').text("");
		        			}
		        		});
		        	},
		       //  	"input":function(e){
					    // var $t=$(this),checkType=$t.attr("checkType");
					    // if($t.attr("name")!="url") return;
					    // _ut.checkVal(checkType,$t,{
		       //  			failFun:function(ele,err){
         //                        $t.val("http://"+$t.val());
		       //  			},
		       //  			succFun:function(ele){
		       //  				// ele.siblings('.errortips').text("");
		       //  			}
		       //  		});
		       //  	},
		        }
		    },
		    // 提交
		    submit:{
		        ele:".companyProfile .save",
		        event:{
		        	"click":function(e){
		        		var $t=$(this),$err=$t.parents("ul").find(".errortips"),iserror=0,
		        		    $contentWrap=$(".contentWrap.on"),type=$contentWrap.attr("type");
		        		var isCompanyInfo="124".indexOf(type)!=-1?true:false;
		        		$err.each(function(){
		        			var $t=$(this);
		                    if($t.text()&&!!$.trim($t.siblings('input').val())&&!/^http:\/\//.test($t.siblings('input').val())) iserror=1;
		        		});
		        		if(iserror) return;
    					$.each(infoManage.companyInfoData.companyInfo,function(k,v){
                             v="";
    					});
		        		$contentWrap.find("[name]").each(function(){
		        			var $t=$(this),name=$t.attr("name");
		        			if($t.is("input")||$t.is("textarea")){
		        				if(isCompanyInfo) {
		        					infoManage.companyInfoData.companyInfo[name]=$t.val();
		        				};
		        				if(!isCompanyInfo) {
		        					infoManage.siteInfoData.siteInfo[name]=(name=="url"&&$t.val()=="http://")?"":$t.val();
		        				};
		        			}else if($t.is("span")){
                                if(isCompanyInfo) 
                                	infoManage.companyInfoData.companyInfo[name]=$.trim($t.text());
                                if(!isCompanyInfo) 
                                	infoManage.siteInfoData.siteInfo[name]=$.trim($t.text());
		        			}else if($t.is("div")){
                                if(isCompanyInfo&&name=="businessLicense"){
		                            infoManage.companyInfoData.companyInfo[name]=$t.find("[param]").attr("param");
                                }else if(name=="brandLogo"||name=="honorQualification"){
                                    var arr=[];
                                    $t.find("[param]").each(function(){
                                    	$(this).attr("param")!=""&&arr.push($(this).attr("param"));
                                    });
                                    if(isCompanyInfo) infoManage.companyInfoData.companyInfo[name]=arr.join(",");
                                    if(!isCompanyInfo) infoManage.siteInfoData.siteInfo[name]=arr.join(",")
                                }else if(isCompanyInfo&&name=="businessModel"){
                                	infoManage.companyInfoData.companyInfo[name]=$t.find(".selected").parent().text();
                                	infoManage.companyInfoData.companyInfo["businessModelText"]=$t.find(".selected").parent().index()==4?$t.find("input").val():"";
                                }
		        			};
		        		});
		        		var sendData={};
		        		sendData.type=type;
		        		var url=isCompanyInfo?"/companyInfo/operateCompanyInfo":"/siteInfo/operateSiteInfo ";
                        if(isCompanyInfo) {
                        	sendData.companyInfo=JSON.stringify(infoManage.companyInfoData.companyInfo);
                        }else{
                        	sendData.siteInfo=JSON.stringify(infoManage.siteInfoData.siteInfo);
                        }
		        		_ut.ajax(url,"post",sendData,function(data){
                             _ut.saveTip(data,{
                             	succ:"保存成功",fail:"保存失败"
                             });
		        		});
		        	}
		        }
		    },
		    //区域选择
		    selectArea:{
		    	proxy:1,
		        ele:".areaSelect .selectBox .body ul li",
		        event:{
		        	"click":function(e){
						var $t=$(this),$par=$(this).parents(".selectBox"),IDX=$par.index(),idx=$t.index();
						var $areaSelect=$t.parents(".areaSelect"),queryArr=$areaSelect.data("queryArr");
				        	$t.addClass('on').siblings().removeClass("on");
				        	$par.find(".head span ").text($t.text());
				        	// if(idx!=0&&IDX!=2){//不点击默认选项，并且不是点击县、区
				        	if(IDX!=2){ 
					        	queryArr[IDX+1]=queryArr[IDX]+"_"+(idx);
					        	city.init=false;
					        	city.proSel=IDX==0?true:false;
					        	if(IDX==0) queryArr[2]=queryArr[1]+"_0";
					        	city.citySel=IDX==1?true:false;
					            city.change($t.parents(".areaSelect"),IDX);
				        	}
		        	}
		        }
		    }
		},
	};
	window.location.pathname.indexOf("infoManage/index")!=-1&&infoManage.init();
	return infoManage;
});