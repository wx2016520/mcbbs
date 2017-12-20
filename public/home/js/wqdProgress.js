// $(function() {
// 	window.onload = function() {
// 		function setDeg(ele, realNum, totalNum) {
// 			var startDeg = -45;
// 			var deg = startDeg + (180 / totalNum) * realNum,
// 				maxDeg = 135,
// 				legalDeg = deg > maxDeg ? maxDeg : deg;
// 			$(ele).find(".circularPart").css("transform", "rotate(" + legalDeg + "deg)").attr("class", setProcessClass(realNum, totalNum, "circularPart "));
// 		};
//
// 		function setProcessClass(used, total, initClass) {
// 			var percent = (used / total) * 100;
// 			if (percent <= 70) {
// 				return initClass + "normal"
// 			};
// 			if (percent > 70 && percent <= 90) {
// 				return initClass + "warning"
// 			}; //橙色
// 			if (percent > 90) { //红色
// 				if (percent < 100) return initClass + "danger";
// 				if (percent >= 100) return initClass + "danger fullSpace";
// 			};
// 		};
//
// 		function setWidth(ele, used, total) {
// 			$(ele).find(".progress").css({
// 				"width":((used / total) * 100)>=100?100+"%":(used / total) * 100+"%"
// 			}).attr("class", setProcessClass(used, total, "progress "));
// 		};
// 		setWidth(".spaceBox", parseFloat(dataTotal.spaceStartNum), parseFloat(dataTotal.spaceEndNum)); //存储空间
// 		setWidth(".flowBox", parseFloat(dataTotal.flowStartNum), parseFloat(dataTotal.flowEndNum)); //网站流量
// 		setDeg(".pc_ount", parseFloat(dataTotal.pcStartNum), parseFloat(dataTotal.pcEndNum)); //PC网站页面数量
// 		setDeg(".wap_ount", parseFloat(dataTotal.phoneStartNum), parseFloat(dataTotal.phoneEndNum)); //手机网站页面数量
// 	};
// })