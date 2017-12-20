define(["city", "utility", "infoManage"], function(_ct, _ut, _info) {
    var _ = {
        init: function() {
            _ct.change($(".areaSelect"), 0);
            _.bindEvent();
            _ut.overFlowHidden($("#desc b"),$("#desc"));
            _ut.removeModal(".modalClose,.recordModal .rightBtn,#cboxOverlay", function(_) {
                if (!$(".userInfo").is(":visible")) return;
                window.location.href = "/setting/center.html?groupId=" + groupId + "&siteRecordOn=on";
            });
            _.arr1 = ["主办单位名称： ", "网站持有人："];
            _.arr2 = ["主办单位所属区域： ", "网站持有人所属区域： "];
            _.userInfoData = {};
            _.tips = function() {
                return {
                    "applicant": "申请人",
                    "phone": "手机",
                    "sponsor": !!_.idx ? _.arr1[_.idx].split("：")[0] : "主办单位名称",
                    "domain": "域名",
                    "siteDesc": "网站描述",
                };
            }
            $(".success,.fail,.checking", ".record").length && $("p.tips").show();
        },
        addErrorMark: function($input) {
            var $t = $input,
                val = $.trim($t.val()),
                $error = $t.siblings('.errortips'),
                errTxt = $error.text();
            if (!val || errTxt) {
                $t.css("border", "1px solid red");
                $error.text(!val ? "请填写" + _.tips()[$t.attr("name")] : ($t.attr("checktype") && errTxt ? errTxt : ""));
                !$error.text() && ($t.css("border", "1px solid #dcdcdc"));
            } else {
                $t.css("border", "1px solid #dcdcdc");
                $error.text("");
            }
        },
        bindEvent: function() {
            var setEvents = {
                // 点击复制
                copy: {
                    ele: ".copy",
                    event: {
                        "click": function(e) {
                            var $t = $(this);
                            _ut.copyToClipboard($t.siblings('b').text());
                        }
                    }
                },
                // 选择主体类型
                radioSelect: {
                    ele: ".radioBox",
                    event: {
                        "click": function(e) {
                            var $t = $(this),
                                arr = ['company', 'person'];
                            _.idx = $t.index();
                            var notSelet = arr[_.idx ? 0 : 1],
                                select = arr[_.idx];
                            $t.find("i").addClass('selected').end().siblings().find("i").removeClass('selected');
                            $("#host").text(_.arr1[_.idx]);
                            $("#hostArea").text(_.arr2[_.idx]);
                            _.userInfoData[notSelet] = {};
                            $("input[name],textarea[name]", ".userInfo").each(function() {
                                var $t = $(this),
                                    name = $t.attr('name'),
                                    cacheNotSel = _.userInfoData[notSelet][name] = [];
                                var $error = $t.siblings('.errortips');
                                cacheNotSel.push($t.val());
                                cacheNotSel.push($error.text());
                                if (!_.userInfoData[select]) {
                                    $t.val("").css("border", "1px solid #dcdcdc").siblings('.errortips').text("");
                                } else {
                                    var cacheSel = _.userInfoData[select][name];
                                    $t.val(cacheSel[0]).css("border", "1px solid " + (cacheSel[1] ? "red" : "#dcdcdc")).siblings('.errortips').text(cacheSel[1]);
                                };
                            });
                        }
                    }
                },
                submit: {
                    ele: ".userInfo .submit",
                    // ele:".checking",
                    event: {
                        "click": function(e) {
                            var $t = $(this),
                                sendData = {},
                                isAllowed = true;
                            $(".userInfo input[name],.userInfo textarea[name]").each(function() {
                                var $t = $(this),
                                    param = $t.attr("name"),
                                    val = $.trim($t.val());
                                var $error = $t.siblings('.errortips'),
                                    errTxt = $error.text()
                                if (!val) isAllowed = false;
                                _.addErrorMark($t);
                                // $error.text(!val?"请填写"+_.tips()[$t.attr("name")]:($t.attr("checktype")&&errTxt?errTxt:""));
                                if (val && !errTxt) sendData[param] = val;
                                if ($t.siblings('.errortips').text()) isAllowed = false;
                            });
                            if (!isAllowed||isAgentDemoAccount=="true") return;
                            sendData.subject = $(".userInfo .selected").parent().index() == 0 ? "enterprise" : "person";
                            sendData.sponsorArea = "";
                            $(".selectBox .head").each(function() {
                                sendData.sponsorArea += ($.trim($(this).text()) + " ");
                            });
                            _ut.ajax("/setting/submitInfo", "post", sendData, function(data) {
                                if (data.status == 200) {
                                    _ut.modal('chargeNormal', '', function() {
                                        var $chargeNormal = $(".chargeNormal").addClass('recordModal'),
                                            title, content;
                                        $chargeNormal.html('<div class="title"> <h3>提交成功</h3> </div> <div class="content"><p>审核时间为1个工作日，审核通过后，本页面将显示备案服务号及有效期。</p><a class="rightBtn" href="javascript:void(0)">我知道了</a></div> <span class="modalClose"></span> ');
                                    });
                                }
                                else if(data.status==500){
                                    _ut.modal('chargeNormal', '', function() {
                                        var $chargeNormal = $(".chargeNormal").addClass('recordModal'),
                                            title, content;
                                        $chargeNormal.html('<div class="title"> <h3>提交失败</h3> </div> <div class="content"><p>'+data.msg+'</p><a class="rightBtn" href="javascript:void(0)">我知道了</a></div> <span class="modalClose"></span> ');
                                    });
                                }
                            });
                        }
                    }
                },
                check: {
                    ele: ".userInfo [name]",
                    event: {
                        "blur": function(e) {
                            _.addErrorMark($(this));
                        }
                    }
                },
                // 信息填写
                callForm: {
                    ele: ".apply .submit",
                    proxy: 1,
                    // ele:".checking",
                    event: {
                        "click": function(e) {
                            $(".apply").hide(200).siblings('.userInfo').show(200);
                            $(".record").find(".contentBox").css("height", 610).end().find(".titlebox h4").text("备案信息填写");
                        }
                    }
                },
                // 重新申请
                resubmit: {
                    ele: ".fail #resubmit",
                    proxy: 1,
                    // ele:".checking",
                    event: {
                        "click": function(e) {
                            _ut.ajax("/setting/reSubmit", "get", {}, function(data) {
                                if (data.status == 200) {
                                    localStorage.setItem("applyFail",1);
                                    localStorage.getItem("applyFail")&&window.location.reload();
                                }
                            });
                        }
                    }
                }
            };
            _.setEvents = $.extend(true,_info.setEvents, setEvents);
            _ut.bindEvents(_.setEvents);
        }
    };
    window.location.pathname.indexOf("setting/center") != -1 && _.init();
});