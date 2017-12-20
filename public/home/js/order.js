define(["utility"], function(_ps) {
	var obj;
	var orderDetail = {
			orderInit: function() {
				var _this = this;
				_this.orederBindEvent();
				_ps.removeModal(".closebtn,.cancle");
			},
			orederBindEvent: function() {
				//限制物流单号
		        $(document).on("input propertychange","input[name=numberLogistics]", function () {
		            $(this).val(this.value.replace(/[^a-zA-Z0-9]/g,"").substr(0,20));
		        });
				//验证弹框信息不能为空
				$("body").on("blur", ".orderContent input", function() {
						var val = $(this).val();
						checknull($(this), val);
						if (!checknull($(this), val)) {
							return
						}
					})
				//超出显示省略号
				if($(".order_address").length){
					if($(".order_address").html().length>20)
					$(".order_address").html($(".order_address").html().substring(0,17)+"...");
				}
				//点击状态按钮
				$("body").on("click", ".order_status p", function() {
					obj = $(this).parents(".order_listli");
					var _this = $(this);
					var orderId = $(this).parents(".order_listli").prev().val();
					//关闭按钮
					if ($(this).hasClass("close_order")) {
						if ($(this).parent().find(".awaiting_pay").length) {
							_ps.modal("cancel");
						} else {
							_ps.modal("canceldetail");
						}
					}
					//申请退款
					else if ($(this).hasClass("refund_pay")) {
						_ps.modal("reimburse")
					}
					//确认退款
					else if ($(this).hasClass("confirm_refund")) {
						_ps.modal("refund");
					}
					//物流
					else if ($(this).hasClass("revised_btn")) {
						_ps.modal("revised");
						//点击下拉的时候渲染数据
						$.ajax({
							url: "/orderManage/order/" + orderId + "/getLogisticsSelect",
							type: "get",
							async: "false",
							success: function(data) {
								if (data.status == 200) {
									renderDomlist(data.data, _this);
								}
							}
						})
					} else if ($(this).hasClass("delivery_btn")) {
						_ps.modal("delivery");
						$.ajax({
							url: "/orderManage/order/" + orderId + "/getLogisticsSelect",
							type: "get",
							async: "false",
							success: function(data) {
								if (data.status == 200) {
									renderDomlist(data.data);
								}
							}
						})
					}
				})
				$("body").on("click", ".orderContent .save", function() {
						var orderId = obj.prev().val();
						//关闭按钮
						if ($(this).parents(".orderCancel").length) {
							$.ajax({
								url: "/orderManage/order/" + orderId + "/close",
								type: "post",
								success: function(data) {
									if (data.status == 200) {
										window.location.reload();
									}
								}
							})
						}
						//关闭
						else if ($(this).parents(".orderCanceldetail").length) {
							$.ajax({
								url: "/orderManage/order/" + orderId + "/close",
								type: "post",
								success: function(data) {
									if (data.status == 200) {
										window.location.reload();
									}
								}
							})
						}
						//申请退款
						if ($(this).parents(".orderreimburse").length) {
							$.ajax({
								url: "/orderManage/order/" + orderId + "/refund",
								type: "post",
								success: function(data) {
									_ps.saveTip(data, {
										succ: "设置成功！",
										fail: "设置失败！"
									}, function() {
										window.location.reload();
									}, function() {});
								}
							})
						}
						//确认退款
						if ($(this).parents(".orderRefund").length) {
							$.ajax({
								url: "/orderManage/order/" + orderId + "/confirmRefund",
								type: "post",
								success: function(data) {
									_ps.saveTip(data, {
										succ: "设置成功！",
										fail: "设置失败！"
									}, function() {
										window.location.reload();
									}, function() {});
								}
							})
						}
						//物流
						if ($(this).parents(".orderRevised").length) {
							if (!checkBtn()) {
								return
							}
							var orderId = obj.prev().val();
							var id = obj.attr("id");
							var logisiticsNumber = $(this).parents(".orderContent ").find("input").val();
							var logisiticsCode = $(this).parents(".orderContent ").find(".orderEllipsis").attr("id");
							var logisiticsCompany = $(this).parents(".orderContent ").find(".orderEllipsis").text();
							var datas = {
								"id": id,
								"logisiticsNumber": logisiticsNumber,
								"orderId": orderId,
								"logisiticsCode": logisiticsCode,
								"logisiticsCompany": logisiticsCompany,
								"deliveryWay": 1, //配送方式(1-快递;2-送货上门;3自提) (暂时=1)
								"deliveryFee": 0, //运费
								"logisiticsStatus": 0, //物流状态
								"logisiticsDescribe": ""
							}
							$.ajax({
								url: "/orderManage/order/" + orderId + "/logistics/modify",
								data: JSON.stringify(datas),
								"contentType": "application/json; charset=utf-8",
								type: "post",
								success: function(data) {
									_ps.saveTip(data, {
										succ: "设置成功！",
										fail: "设置失败！"
									}, function() {
										window.location.reload();
									}, function() {});
								}
							})
						}
						//修改物流
						if ($(this).parents(".orderdelivery").length) {
							if (!checkBtn()) {
								return
							}
							var orderId = obj.prev().val();
							var logisiticsNumber = $(this).parents(".orderContent ").find("input").val();
							var logisiticsCode = $(this).parents(".orderContent ").find(".orderEllipsis").attr("id");
							var logisiticsCompany = $(this).parents(".orderContent ").find(".orderEllipsis").text();
							var data = {
								"id": 0,
								"logisiticsNumber": logisiticsNumber,
								"orderId": orderId,
								"logisiticsCode": logisiticsCode,
								"logisiticsCompany": logisiticsCompany,
								"deliveryWay": 1, //配送方式(1-快递;2-送货上门;3自提) (暂时=1)
								"deliveryFee": 0, //运费
								"logisiticsStatus": 0, //物流状态
								"logisiticsDescribe": ""
							};
							$.ajax({
								url: "/orderManage/order/" + orderId + "/deliver",
								data: JSON.stringify(data),
								type: "post",
								"contentType": "application/json; charset=utf-8",
								success: function(data) {
									_ps.saveTip(data, {
										succ: "设置成功！",
										fail: "设置失败！"
									}, function() {
										window.location.reload();
									}, function() {});
								}
							})
						}
					})
					//物流下拉
				$("body").on("click", ".orderLists", function() {
						if ($(this).find(".orderBgIcon").hasClass("active")) {
							$(this).find(".orderBgIcon").removeClass("active").find(".orderEllipsis").css("color", "#59c4ff")
							$(".order_selectBodys").show();
							 $("#about").nanoScroller({alwaysVisible: false});
						} else {
							$(this).find(".orderBgIcon").addClass("active").find(".orderEllipsis").css("color", "#666");
							$(".order_selectBodys").hide()
						}
					})
					//下拉菜单
				$("body").on("click", ".siteLists", function() {
					if ($(this).find(".siteBgIcon").hasClass("active")) {
						$(this).find(".siteBgIcon").removeClass("active").find(".siteEllipsis").css("color", "#59c4ff")
						$(".selectBodys").show();
					} else {
						$(this).find(".siteBgIcon").addClass("active").find(".siteEllipsis").css("color", "#666");
						$(".selectBodys").hide();
					}
				})
				$(".siteLists .siteEllipsis").html($(".siteLists .nano-content li.active").text() ? $(".siteLists .nano-content li.active").text() : $(".siteLists .nano-content li:first").text());
				//点击li
				$("body").on("click", ".selectBodys .nano-content li", function() {
						$(this).addClass("active").siblings().removeClass("active").parents(".selectBodys").hide().end().parents(".siteLists").find(".siteEllipsis").css("color", "#666").text($(this).text());
						$("input[name=serchText]").attr("placeholder", "请输入" + $(this).text());
					})
					.on("click", ".orderLists .nano-content li", function() {
						var id = $(this).attr("revisedid");
						$(this).addClass("active").siblings().removeClass("active").parents(".order_selectBodys").hide().end().parents(".orderLists").find(".orderEllipsis").attr("id", id).css("color", "#666").text($(this).text());
					})
					//分页
				$("body").on("click", ".searchBox .searchBg", function() {
						var orderNum = $(".selectBodys li.active").index() == -1 ? 0 : $(".selectBodys li.active").index();
						var data = {};
						var orderNumber, phone, customerName, customerId;
						var name = ["orderNumber", "phone", "customerName", "customerId"][orderNum];
						data[name] = $("input[name=serchText]").val();
						var status = $(".nav_list li.active").index();
						var groupId = $("input[name=groupId]").val();
						location.href = "/orderManage/index.html?groupId=" + groupId + "&" + name + "=" + data[name] + "&status=" + status + "&pageNo=" + 1;
					})
					//上一页和下一页
				$(".order_nextbtn").on("click", function(e) {
					e.preventDefault();
					var pageCount = $("input[name=pageCount]").val(),
						pageNo = $(".prePageNo").text();
					pageNo++;
					if (pageNo >= pageCount) pageNo = pageCount;
					var url = window.location.href,
						arg = "pageNo",
						arg_val = pageNo;
					changeURLArg(url, arg, arg_val);
					location.href = changeURLArg(url, arg, arg_val);
				})
				$(".order_prevbtn").on("click", function(e) {
					e.preventDefault();
					var pageCount = $("input[name=pageCount]").val(),
						pageNo = $(".prePageNo").text();
					pageNo--;
					if (pageNo <= 1) pageNo = 1;
					var url = window.location.href,
						arg = "pageNo",
						arg_val = pageNo;
					changeURLArg(url, arg, arg_val);
					location.href = changeURLArg(url, arg, arg_val);
				})
			}
		}
		//修改url参数pageNo若果存在就覆盖
	function changeURLArg(url, arg, arg_val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + arg_val;
		if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
		} else {
			if (url.match('[\?]')) {
				return url + '&' + replaceText;
			} else {
				return url + '?' + replaceText;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;
	}
	//渲染页面
	function renderDomlist(result, el) {
		var _result = result.logisiticsDics;
		el ? el.parents(".order_listli").attr("id", result.logisitics.id) : "";
		var html = "";
		for (var i = 0; i < _result.length; i++) {
			if(result.logisitics.logisiticsCompany==_result[i].logisiticsCompany){
				html += "<li revisedid=" + _result[i].logisiticsCode + " id=" + _result[i].id + " class='active'>" + _result[i].logisiticsCompany + "</li>"
			}
			else{
				html += "<li revisedid=" + _result[i].logisiticsCode + " id=" + _result[i].id + ">" + _result[i].logisiticsCompany + "</li>"
			}
		}
		$(".order_selectBodys").find(".nano-items").html($(html));
		$("input[name=numberLogistics]").val(result.logisitics.logisiticsNumber);
		var id = $(".order_selectBodys").find(".nano-content li:first").attr("revisedid");
		var tet = $(".order_selectBodys").find(".nano-content li:first").text();
		if (result.logisitics) {
			$('.orderLists .orderEllipsis').attr("id",result.logisitics.logisiticsCode).html(result.logisitics.logisiticsCompany);
		} else {
			$('.orderLists .orderEllipsis').attr("id", id).html(tet);
			$(".order_selectBodys").find(".nano-items li:first").addClass("active");
		}
	}
	//判断是否为空
	function checknull(el, _val) {
		checkRight = _val != "" && _val != null && /[^a-zA-Z0-9]*/.test(_val);
		checkRight ? el.removeAttr("flag") : el.attr("flag", true);
		return checkRight
	}
	//检测是否填写信息
	function checkBtn() {
		var checkInput = true;
		if ($("body").find(".orderContent input").attr("flag")) {
			checkInput = false;
		}
		return checkInput;
	}
	orderDetail.orderInit();
})