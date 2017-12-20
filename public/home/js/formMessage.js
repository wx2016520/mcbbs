define(['utility'], function (utility){
   var message = {
   		'init' : function(){
            var date = new Date(),
            today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            $(".dateSeach .dateEnd").val(today);
            typeof $.date_input != "undefined" && $(".dateSeach input").date_input();

            this.viewDrop();
   			this.bindEvent();
            $(".formWarp .formList li:first-child").trigger("click"); 
            if(!$(".formWarp .formList li").length){
               $(".messageFooter .selectAll").css({"color":"#ccc","cursor":"default"});
               $(".messageFooter .mes-add").removeClass("active");
               $(".messageTable").html('<p class="noMessage noMessage1">您还没有收到用户留言！</p><p class="noMessage noMessage2">可能是用户尚未留言，或者您的网站没有添加留言栏目</p>');
   	         $(".formWarp .formHead").html('<span class="messageIcon"></span><p class="siteEllipsis">您还未添加留言表单</p><i class="messageIcon"></i>');
            }
         },
         'deleteState' : false,   //删除状态
         'loadState'   : false   //加载状态

   };
   message.viewDrop = function(){
      $(document).on("mousedown.viewDrop",".messagePopup .popupText",function(event){
        var that = $(this),
            DragElem = $(this).parents(".messagePopup"),
            DragView = $(document);
        var startPagex, intervalX, intervalY, startLeft, startTop, boole = false, maxLeft = DragView.outerWidth()-DragElem.outerWidth(), maxTop = DragView.outerHeight()-DragElem.outerHeight();
          boole = true;
          startLeft = DragElem.position().left;
          startTop = DragElem.position().top;
          startPagex = event.pageX;
          startPagey = event.pageY;
         DragView.on("mousemove.viewDrop",{obj:that},function(event){
              if(boole){
                  intervalX = event.pageX - startPagex + startLeft;
                  intervalY = event.pageY - startPagey + startTop;
                  if(intervalX > maxLeft){
                    intervalX = maxLeft;
                  }else if(intervalX < 0){
                    intervalX = 0;  
                  } 
                  if(intervalY < 0){
                    intervalY = 0;  
                  } 
                  event.data.obj.parents(".messagePopup").css({"left":intervalX+"px","top":intervalY+"px","transform":"none"});
              }
          }).on("mouseup.viewDrop",{obj:that},function(event){
              boole = false;
              DragView.off("mousemove.viewDrop").off("mouseup.viewDrop");
          });
      });
   }
   message.bindEvent = function(){
   		//表单列表 展开、收起
   		$(".formWarp .formHead, .formElements .describe").on("click",function(){
            $(".formList li.change_name").find("span.btnOne").trigger("click");
   			$(this).parent().toggleClass("active");
   			$(this).parent().find(".nano").nanoScroller({alwaysVisible: true});
   		});
         $(document).on("click",function(event){
            if(!$(event.target).closest(".formWarp").length && !$(event.target).closest(".formElements").length){
               $(".formWarp, .formElements").removeClass("active");
               $(".formWarp .formList li.change_name").find("span.btnOne").trigger("click");
            }
            if($(event.target).hasClass("dateStart")||$(event.target).hasClass("dateEnd")){
               $(".dateSeach").addClass("active");
            }else{
               $(".dateSeach").removeClass("active");
            }
         });
         //正序、倒序
         $(".messageTable").on("click","tr.tableHead .mes-date i",function(){
            var dateSort = $(".messageTable").attr("sort") || "Desc";
            if(dateSort == "Desc") $(".messageTable").attr("sort","Asc");
            else $(".messageTable").attr("sort","Desc");
            $(".formWarp .formList li.active").removeClass("active").trigger("click",true);
         });
         //日期校验
         $(".dateSeach .dateStart").on("change",function(){
            message.verifyDate($(this),$(".dateSeach .dateEnd"),1);
            $(".formWarp .formList li.active").removeClass("active").trigger("click");
            $(".dateSeach").removeClass("active");
         });
         $(".dateSeach .dateEnd").on("change",function(){
            message.verifyDate($(".dateSeach .dateStart"),$(this),2);
            $(".formWarp .formList li.active").removeClass("active").trigger("click");
            $(".dateSeach").removeClass("active");
         })
   		//表单选择
   		$(".formList").on("click","li",function(e,bool){
            if($(this).hasClass("active")) return;
            !bool && $(".messageTable").removeAttr("sort");
   			var that = $(this),
               startDate = $("input.dateStart").val(),
               endDate = $("input.dateEnd").val(),
   				formId = that.attr("formid") || "",
               requestData = {
                  pageSize : 10,
                  fromDate : startDate,
                  toDate : endDate,
                  orderByName : "CREATE_DATE",
                  orderBySort : ($(".messageTable").attr("sort")||"Desc")
               };
   			utility.ajax("/form/listItems/"+formId+"/1","get",requestData,function(data){
               message.formReload(data,false);
            });
            $(".formWarp, .formElements, a.selectAll, a.mes-delete").removeClass("active");
            that.addClass("active").siblings("li").removeClass("active").parents(".formWarp").removeClass("active").find(".formHead p").text(that.find("p").text());
            that.find(".number").remove();
   		});
   		//表单项重命名、取消设置
   		$(".formList").on("click",".btnOne",function(event){
   			event.stopPropagation();
   			var that = $(this),
   				textdom = that.siblings("p");
   			if(that.parent().hasClass("change_name")){
   				that.attr("title","重命名").siblings(".btnTwo").attr("title","删除").parent().removeClass("change_name");
   				textdom.html(textdom.attr("formname")).removeAttr("formname");
   			}else{
               $(".formList li.change_name").find("span.btnOne").not(that).trigger("click");
   				that.attr("title","取消").siblings(".btnTwo").attr("title","确定").parent().addClass("change_name");
   				textdom.attr("formname",textdom.text()).html('<input type="text" value="'+textdom.text()+'" />');
   				textdom.find("input").select().on("click",function(event){event.stopPropagation();});
   			}
   		});
   		//表单项删除、重命名确定
   		$(".formList").on("click",".btnTwo",function(event){
   			event.stopPropagation();
   			var that = $(this),
   				textdom = that.siblings("p"),
   				formid = that.parent().attr("formid") || "";
   			if(that.parent().hasClass("change_name")){
   				var val = textdom.find("input").val() || "";
   				if(!val){
   					that.siblings(".btnOne").trigger("click");
   					return;
   				}
   				utility.ajax("/form/rename/"+formid,"post",{name:val},function(data){
   					if(data.status==200){
   						that.attr("title","删除").siblings(".btnOne").attr("title","重命名").parent().removeClass("change_name");
   						textdom.html(val).removeAttr("formname");
   						that.parent().hasClass("active") && that.parents(".formWarp").find(".formHead p").text(val);
   					}else{
   						that.siblings(".btnOne").trigger("click");
   						alert(data.msg);
   					}
   					
   				});
   			}else{
               utility.modal("j","",function(){
                  $(".modalBox  .content p").text("您正在删除留言表单，是否继续？");
                  $(".modalBox .set .cancle, .modalBox .modalClose").on("click",function(){
                     $.fn.colorbox.close();
                  });
                  $(".modalBox .set .continue").on("click",function(){
                     utility.ajax("/form/delete/"+formid,"post",{},function(data){
                        if(data.status==200){
                           var bool = that.parent().hasClass("active");
                           that.parent().remove();
                           if(!$(".formWarp .formList li").length){
                              $(".messageFooter .selectAll").css({"color":"#ccc","cursor":"default"});
                              $(".messageFooter .mes-add").removeClass("active");
                              $(".messageTable").html('<p class="noMessage noMessage1">您还没有收到用户留言！</p><p class="noMessage noMessage2">可能是用户尚未留言，或者您的网站没有添加留言栏目</p>');
                              $(".formWarp").removeClass("active").find(".formHead p").text("您还未添加留言表单");
                           }
                           bool && $(".formWarp .formList li:first-child").trigger("click");
                           $(".formWarp .nano").nanoScroller({alwaysVisible: true});
                           $.fn.colorbox.close();
                        }else{
                           alert(data.msg);
                        }
                     });
                  });
               });
   				
   			}
   			
   		});
   		//隐藏表单数据项
   		$(".formElements .elementList").on("click","li",message.hideFormItem);

         //留言选中
         $(".messageTable").on("click",".check_btn",function(event){
            event.stopPropagation();
            var that = $(this);
            that.parents("tr").toggleClass("active");
            if($(".messageTable tbody tr.active").length) $("a.mes-delete").addClass("active");
            else $("a.mes-delete").removeClass("active");
            if($(".messageTable tbody tr.active").length == $(".messageTable tbody tr").length) $("a.selectAll").addClass("active");
            else $("a.selectAll").removeClass("active");
         });

         //全选
         $(".messageFooter .selectAll").on("click",function(){
            if(!$(".messageTable tbody tr").length) return;
            if($(this).hasClass("active")) $(".messageTable tbody tr, a.mes-delete").removeClass("active");
            else $(".messageTable tbody tr, a.mes-delete").addClass("active");
            $(this).toggleClass("active");
         });

          //刷新
         $(".messageFooter .Reload").on("click",function(){
            $(".formWarp .formList li.active").removeClass("active").trigger("click");
         });
         //删除
         $(".messageFooter .mes-delete").on("click",function(){
            if(!$(this).hasClass("active")) return;
            var idArr = [],
               form_id = $(".formWarp .formList li.active").attr("formid") || "";
            $(".messageTable tbody tr.active").each(function(){
               idArr.push($(this).attr("mesid")||"");
            });
            utility.modal("j","",function(){
               $(".modalBox  .content p").text("您正在删除用户留言，是否继续？");
               $(".modalBox .set .cancle, .modalBox .modalClose").on("click",function(){
                  $.fn.colorbox.close();
               });
               $(".modalBox .set .continue").on("click",function(){
                  message.deleteMess({formId:form_id, formItemIds:idArr.join("|")},false);
               });
            });
         });
         //滑动加载
         $(".messageBody").scroll(function(){
            if(message.loadState || !$(".loadMore").is(":visible")) return;
            if($(this).scrollTop()+$(this).height()>=$(".messageTable").height()+$(".loadMore").outerHeight()){
               message.loadState = true;
               $(".loadMoreWarp").show();
               var formId = $(".formWarp .formList li.active").attr("formid") || "",
                  pageNum = $(".messageTable").attr("pagenum") || 2,
                  startDate = $("input.dateStart").val(),
                  endDate = $("input.dateEnd").val(),
                  requestData = {
                     pageSize : 10,
                     fromDate : startDate,
                     toDate : endDate,
                     orderByName : "CREATE_DATE",
                     orderBySort : ($(".messageTable").attr("sort")||"Desc")
                  };
               utility.ajax("/form/listItems/"+formId+"/"+pageNum,"get",requestData,function(data){
                  message.formReload(data,true,function(){
                     $(".messageTable").attr("pagenum",parseInt(pageNum)+1);
                  });
               });
            }
         });
         //弹出留言详情
         $(".rightCont").on("click","tbody tr[mesid], a.mes-add",function() {
            var that = $(this);
            if(that.hasClass("mes-add") && !$(".formWarp .formList li.active").length) return;
            $.ajax({
                type: "GET",
                url: "/js/mysiteV3/josn/mySiteSystem.json",
                dataType: "json",
                success:function(data){
                     window.wqdMessageDetail = {
                        category : 1,
                        domObj : that
                     };
                     //添加
                     if(that.hasClass("mes-add")){
                        wqdMessageDetail.category = 2;
                        that.addClass("action");
                     }else{
                        if(that.attr("nolook")){
                           that.removeAttr("nolook");
                           var numDom = $(".sideNav ul li.active .messCount");
                           if(numDom.text() == "1"){
                              numDom.remove();
                           }else{
                              numDom.length && numDom.text(numDom.text()-1);
                           }
                        }
                     }
                     $.colorbox({
                        transition: "none",
                        opacity: 0.5,
                        html: data.messageDetail,
                        fixed: true,
                        closeButton: false,
                        onComplete: function() {
                            message.detail.init();
                        },
                        onClosed: function(){ 
                           $(".messageFooter .mes-add").removeClass("action");
                        }
                     });
                }
            });
         });
   };
   //日期校验
   message.verifyDate = function(date1,date2,type){
      if(!date1.val() || !date2.val()) return;
      var datePass = false, 
         date_1 = date1.val().split("-"),
         years_1 =  parseInt(date_1[0]),
         month_1 = parseInt(date_1[1]),
         days_1 = parseInt(date_1[2]),
         date_2 = date2.val().split("-"),
         years_2 =  parseInt(date_2[0]),
         month_2 = parseInt(date_2[1]),
         days_2 = parseInt(date_2[2]);

      if(years_1 < years_2){
         datePass = true;
      }else if(years_1 == years_2){
         if(month_1 < month_2){
            datePass = true;
         }else if(month_1 == month_2){
            if(days_1 <= days_2){
               datePass = true;
            }
         }
      }
      if(!datePass){
         if(type == 1) date1.val(date2.val());
         else date2.val(date1.val());
      }
   }
   //删除操作 ispopup为true时来自弹出窗的删除操作
   message.deleteMess = function(parame,ispopup){
      utility.ajax("/form/item/delete","post",parame,function(data){
         if(data.status==200){
            if(ispopup){
               var index =  $(".messageTable tbody").find("tr[mesid="+parame.formItemIds+"]").index(),
                  nextDom = $(".messageTable tbody").find("tr[mesid="+parame.formItemIds+"]").next();
               $(".messageTable tbody").find("tr[mesid="+parame.formItemIds+"]").remove();
            }
            
            $(".presentation span").text($(".presentation span").text()-parame.formItemIds.split("|").length);
            
            if(ispopup && !nextDom.length){
               nextDom = $(".messageTable tbody tr:last-child");
               if(!nextDom.length) $.fn.colorbox.close();
               else message.detail.pageRun(nextDom,1);
            }
            ispopup && nextDom.length && message.detail.pageRun(nextDom,1);
            $(".formWarp .formList li.active").removeClass("active").trigger("click",true);
            ispopup && $(".deleMask").remove();
            !ispopup && $.fn.colorbox.close();
         }else{
            alert(data.msg);
         }
      });
   }
   //刷新表单数据项 loadMore为true时为加载更多
   message.formReload = function(data,loadMore,callBack){
      if(!loadMore){
         var tempArr = data.titles;
         tempArr.length && $(".messageTable").attr("formitem",tempArr.join(",")).removeAttr("pagenum");
         $(".presentation span").text(data.count);
         if(data.allFormsNoRead) $(".sideNav li.active .messCount").text(data.allFormsNoRead);
         else $(".sideNav li.active .messCount").remove();

         var html = "";
         for(var k=0; k<data.titles.length; k++){
            html += '<li itemid="'+k+'" title="'+data.titles[k]+'" elemid="'+data.formIds[k]+'"><i class="messageIcon"></i><span class="siteEllipsis">'+data.titles[k]+'</span></li>';
         }
         $(".formElements .elementList").html(html);
      } 
      var tableBody, messageLength = 10;
      if(data.formItems.length){
         if(!loadMore){
            $(".messageFooter .selectAll").css({"color":"#666","cursor":"pointer"});
            $(".messageFooter .mes-add").addClass("active");
            $(".messageTable").html("");
            var tableWidth = 102 - 60,
               tableHead = '<thead><tr class="tableHead"><th class="mes-number"><span>序号</span><i class="messageIcon"></i></th>';
            tableBody = "<tbody>";
            //表头
            for(var k=0; k<data.titles.length; k++){
               if(data.formIds[k] == "createDate"){
                  var Reverse = data.formItems.length==1 ? '' : '<i class="messageIcon"></i>';
                  tableHead += '<th class="mes-date" title="'+data.titles[k]+'" itemid="'+k+'"><span>'+data.titles[k]+'</span>'+Reverse+'</th>';
               }else{
                  tableHead += '<th title="'+data.titles[k]+'" itemid="'+k+'"><span>'+data.titles[k]+'</span></th>';
               }
              tableWidth += 215;
            }
            tableHead += '</tr></thead>';
            $(".messageTable").width(tableWidth).append(tableHead);
         }
         //内容
         for(var i=0; i<data.formItems.length; i++){
            var dif = 0,   //差值
               ordinal = $(".messageTable tbody tr").length,
               reaStatus = data.formItems[i].reaStatus=="read" ? "" : ' nolook="true"'; //是否已读
            tableBody += '<tr'+reaStatus+' mesid="'+data.formItems[i].id+'"><td class="check_btn"><span class="messageIcon"></span></td><td class="message-number">'+(ordinal+i+1)+'</td>';
            for(var j=0; j<$(".formElements .elementList li").length; j++){
               var isHide = $(".formElements .elementList li").eq(j).hasClass("active") ? ' style="display:none;"' : '',
                  createDate = data.formItems[i].values[j-dif].key=="createDate" ? ' class="message-date"' : "";
               if((data.formItems[i].values[j-dif].key=="createDate" && j!=$(".formElements .elementList li").length-1) || data.formItems[i].values[j-dif].key!=data.formIds[j]){
                  tableBody += '<td'+isHide+' itemid="'+j+'"></td>';
                  dif++;
               }else{
                  tableBody += '<td'+isHide+createDate+' itemid="'+j+'" title="'+data.formItems[i].values[j-dif].value+'">'+data.formItems[i].values[j-dif].value+'</td>';
               } 
            }
            tableBody += '</tr>';
         }
         if(!loadMore){
            tableBody += '</tbody>';
            $(".messageTable").append(tableBody);
         }else{
            $(".messageTable tbody").append(tableBody);
         }
         if(data.formItems.length < messageLength){
            $(".loadMore").hide();
         }else{
            $(".loadMore").show().find(".loadMoreWarp").hide();
         }
      }else{
         if(!loadMore || !$(".messageTable tbody tr").length){
            $(".messageFooter .selectAll").css({"color":"#ccc","cursor":"default"});
            $(".messageTable").css("width","auto").html('<p class="noMessage noMessage1">您还没有收到用户留言！</p><p class="noMessage noMessage2">可能是用户尚未留言，或者您的网站没有添加留言栏目</p>');
         }
         $(".loadMore").hide();
      }
      typeof callBack == "function" && callBack();
      message.loadState = false;
   }
   //隐藏表单数据项
   message.hideFormItem = function(){
      var that = $(this),
         minWidth = $(".messageTable tbody tr").length > 9 ? 1108 : 1128,
         itemid = that.attr("itemid") || "",
         itemWidth = $(".messageTable").find("[itemid="+itemid+"]").eq(0).outerWidth();
      if(that.hasClass("active")){
         $(".messageTable").find("[itemid="+itemid+"]").show();
      }else{
         $(".messageTable").find("[itemid="+itemid+"]").hide();
      }
      $(".messageTable").width(function(){
         var Width = 0;
         $(".tableHead th:visible").each(function(){
            Width += $(this).outerWidth();
         });
         return Width+5;
      });
      $(".messageTable").css("min-width",minWidth);
      that.toggleClass("active");
   }
   message.detail = {
      'init' : function(){
         var popup = $(".messagePopup"),
            left = ($(window).width()-popup.width())/2,
            top = ($(window).height()-popup.height())/2;
         popup.css({"left":left,"top":top,"margin":0});
         this.pageRun(wqdMessageDetail.domObj, wqdMessageDetail.category);
         popup.find(".nano").nanoScroller({alwaysVisible: true});
         this.bindEvent();
      },
      'bindEvent' : function(){
         var popup = $(".messagePopup");
         $(".messagePopup .popupClose").on("click",function(){$.fn.colorbox.close();});
         //修改
         popup.find("a.popupChange").on("click",function(){
            popup.find(".popupSet").hide().siblings(".popupEdit").show();

            $(".dataList .menuWarp-right p").each(function(i){
               var text = $(this).text() || "";
               $(this).attr("temptext",text);
               if(i == $(".dataList .menuWarp-right p").length-1) return true;
               $(this).attr("contenteditable","true");
            });
         });
         //修改确定
         popup.find("a.popupSubmit").on("click",function(){
            var objVal = {},
               sortId =[],
               formid = $(".formWarp .formList li.active").attr("formid") || "",
               mesId = wqdMessageDetail.domObj.attr("mesid") || "";
            $(".dataList tbody tr").each(function(){
               if(wqdMessageDetail.category==1 && $(this).attr("elemid")=="createDate") return true;
               var elemid = $(this).attr("elemid") || " ",
                  tempObj = {};
               tempObj[$(this).find("p.sideMenu").text()] = $(this).find("p.itemText").text();
               objVal[elemid] = tempObj;
               sortId.push(elemid);
            });
            var dataObj = {formId:formid,id:mesId,fieldOrder:sortId.join(","),value:JSON.stringify(objVal)};
            wqdMessageDetail.category == 2 && delete dataObj.id;
            utility.ajax("/form/editFormItem","post",dataObj,function(data){
               if(data.status==200){
                  if(wqdMessageDetail.category == 2){
                     // var html = '<tr nolook="true"><td class="check_btn"><span class="messageIcon"></span></td><td class="message-number">1</td>';
                     // $(".formElements .elementList li").each(function(){
                     //    var isHide = $(this).hasClass("active") ? ' style="display:none;"' : '',
                     //    createDate = !$(this).next().length ? ' class="message-date"' : "";
                     //    html+= '<td'+isHide+createDate+' itemid="'+1+'" title="'+$(".dataList .itemText").eq(i).text()+'">'+$(".dataList .itemText").eq(i).text()+'</td>';
                     // });
                     $(".formWarp .formList li.active").removeClass("active").trigger("click");
                     $.fn.colorbox.close();
                  }else{
                     var domobj = $(".messageTable tbody").find("tr[mesid="+wqdMessageDetail.domObj.attr("mesid")+"]");
                     $(".dataList .menuWarp-right p").removeAttr("contenteditable").removeAttr("temptext");
                     popup.find(".popupEdit").hide().siblings(".popupSet").show();
                     domobj.find("td[itemid]").each(function(i){
                        if($(this).hasClass("message-date")) return true;
                        $(this).attr("title",$(".dataList p.itemText").eq(i).text()).text($(".dataList p.itemText").eq(i).text());
                     });
                  }
               }else{
                  alert(data.msg)
               }
            }); 
         });
         //修改取消
         popup.find("a.popupCancle").on("click",function(){
            if(wqdMessageDetail.category == 2){
               $.fn.colorbox.close();
            }else{
               $(".dataList .menuWarp-right p").each(function(){
                  var text = $(this).attr("temptext") || "";
                  $(this).text(text).removeAttr("contenteditable").removeAttr("temptext");
                  popup.find(".popupEdit").hide().siblings(".popupSet").show();
               });
            }
         });
         //删除
         popup.find("a.popupDelete").on("click",function(){
            var formid = $(".formWarp .formList li.active").attr("formid") || "",
               messId = wqdMessageDetail.domObj.attr("mesid") || "",
               deleMask = $("<div class='deleMask'><div class='modalBox middleTip' style='position:absolute;left:50%;top:50%;margin:-109px 0 0 -265px; width: 530px;height: 218px;'> <div class='title'> <h3>删除提示</h3> </div> <div class='content'> <p>您正在删除用户留言，是否继续？</p> </div> <div class='set'> <p> <span class='continue'>删除</span><span class='cancle'>取消</span> </p> </div> <span class='modalClose'></span></div></div>");
            $("body").append(deleMask);
            deleMask.find(".set .cancle, .modalClose").on("click",function(){
               deleMask.remove();
            });
            deleMask.find(".modalBox .set .continue").on("click",function(){
               message.deleteMess({formId:formid, formItemIds:messId},true);
            });
         });
         //上一条
         popup.find("a.prevMes").on("click",function(){
            if($(".popupPage .thisIndex").text()=="1") return;
            var mesid =  wqdMessageDetail.domObj.attr("mesid") || "";
            message.detail.pageRun($(".messageTable tbody").find("tr[mesid="+mesid+"]").prev(),1);
            popup.find(".popupEdit").hide().siblings(".popupSet").show();
         });
         //下一条
         popup.find("a.nextMes").on("click",function(){
            if($(".popupPage .thisIndex").text()==$(".popupPage .allMes").text()) return;
            popup.find(".popupEdit").hide().siblings(".popupSet").show();
            var mesid =  wqdMessageDetail.domObj.attr("mesid") || "",
               index = $(".messageTable tbody").find("tr[mesid="+mesid+"]").index(),
               nextDom = $(".messageTable tbody").find("tr[mesid="+mesid+"]").next();
            if(nextDom.length){
               message.detail.pageRun(nextDom,1);
            }else{
               if(!message.loadState && $(".loadMore").is(":visible")){
                  message.loadState = true;
                  $(".loadMoreWarp").show();
                  var formId = $(".formWarp .formList li.active").attr("formid") || "",
                     startDate = $("input.dateStart").val().split(".").join("-"),
                     endDate = $("input.dateEnd").val().split(".").join("-"),
                     pageNum = $(".messageTable").attr("pagenum") || 2;
                  utility.ajax("/form/listItems/"+formId+"/"+pageNum,"get",{pageSize:10,fromDate:startDate,toDate:endDate},function(data){
                     message.formReload(data,true,function(){
                        $(".messageTable").attr("pagenum",parseInt(pageNum)+1);
                        nextDom = $(".messageTable tbody tr").eq(index+1);
                        message.detail.pageRun(nextDom);
                     });
                  });
               }
            }
         });
      },
      //翻页
      'pageRun' : function(dom,category){
         wqdMessageDetail.domObj = dom;
         var html = "",
            itemArr = ($(".messageTable").attr("formitem") || "").split(",");
         if(category==2) itemArr.pop();
         for(var k=0; k<itemArr.length; k++){
            html += '<tr elemid="'+$(".formElements .elementList li").eq(k).attr("elemid")+'"><td class="menuWarp-left"><p class="sideMenu">'+itemArr[k]+'</p></td>';
            html += '<td class="menuWarp-right"><p class="itemText">'+dom.find("[itemid="+k+"]").text()+'</p></td></tr>';
         }
         $(".messagePopup").find(".dataList tbody").html("").append(html);
         if(category==2){
            $(".messagePopup").find(".popupSet").hide().siblings(".popupEdit").show();
            $(".dataList .menuWarp-right p").attr("contenteditable","true");
         }else{
            $(".messagePopup").find(".popupPage").show().find(".thisIndex").text(dom.index()+1).siblings().text($(".presentation span").text());
         }
      }
   }

   $(".sideNav li.active span").eq(0).text()=="用户留言" && message.init();
});