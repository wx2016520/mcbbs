define(["utility"], function(_ps) {
	if (!/payPageManage/g.test(location.href)) {
		return
	}
	//$(document).off("click.down").on("click.down", ".siteLists", function() {
	//	if ($(this).find(".siteBgIcon").hasClass("active")) {
	//		$(this).find(".siteBgIcon").removeClass("active").find(".siteEllipsis").css("color", "#59c4ff")
	//		$(".selectBodys").show();
	//	} else {
	//		$(this).find(".siteBgIcon").addClass("active").find(".siteEllipsis").css("color", "#666");
	//		$(".selectBodys").hide();
	//	}
	//})

	//点击li
	$("body").on("click", ".selectBodys .nano-content li", function() {
			$(this).addClass("active").siblings().removeClass("active").parents(".selectBodys").hide().end().parents(".siteLists").find(".siteEllipsis").css("color", "#666").text($(this).text());
			$("input[name=serchText]").attr("placeholder", "请输入" + $(this).text());
		})
		.on("click", ".orderLists .nano-content li", function() {
			var id = $(this).attr("revisedid");
			$(this).addClass("active").siblings().removeClass("active").parents(".order_selectBodys").hide().end().parents(".orderLists").find(".orderEllipsis").attr("id", id).css("color", "#666").text($(this).text());
		});
	//查询结果显示
	$("body").on("click", ".searchBox .searchBg", function() {
		var dfd = $.Deferred();
		var orderNum = $(".selectBodys li.active").index() == -1 ? 0 : $(".selectBodys li.active").index();
		var data = {};
		var name = ["orderNum", "pageName", "customerId", "payPerson"][orderNum];
		data[name] = $("input[name=serchText]").val();
		var status = $(".nav_list li.active").index();
		var groupId = $("input[name=groupId]").val();
		var pageNo = $("body").find(".prePageNo").text();
		location.href = "/payPageManage/index.html?groupId=" + groupId + "&type=" + name + "&pageNo=" + 1 + "&pageSize=" + 10 + "&keyword=" + data[name];
	});
	//上一页和下一页
	$(document).off("click.next").on("click.next", ".order_nextbtn", function(e) {
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
	});
	$(document).off("click.prev").on("click.prev", ".order_prevbtn", function(e) {
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
})