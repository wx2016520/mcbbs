define(['utility'],function(_ut) {
    //依赖js文件
    // <script type="text/javascript" src="${libctx}/widget/jquery.ui.widget.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.iframe-transport.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/load-images.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-ui.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-process.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-image.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-audio.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-video.js"></script>
    // <script type="text/javascript" src="${libctx}/fileupload/jquery.fileupload-validate.js"></script>
    //点击按钮dom <p class="fileupload">上传<input type="file" id="fileUpload" name="fileUpload" multiple="" class=""></p>
    //调用  _uf.uploadFile({ele:$("#fileUpload"),url:"/manageFile/uploadFile"});
    // 视频格式支持iso|rar|html|htm|zip|exe|pdf|xls|txt|doc|docx|wps|dmg|ppt|pptx|xlsx|odp|odt|
    // 音频格式支持：MP3|CD|OGG|MP3PRO|REAL|APE|MODULE|MIDI|VQF
    //文件上传并渲染
    var selectNode=[],uploadFile={},
        $usedCapacity=$(".listset .usedCapacity"),
        $totalCapacity=$(".listset .totalCapacity");
    uploadFile.path={
        file:"/images/mysiteV3/file.png",
        voice:"/images/mysiteV3/audio.png",
        pic:imgsever+"/",
        video:imgsever+"/"
    };
    uploadFile.typeObj={
                pic:/^(gif|jpg|jpeg|png|TIFF|RAW|BMP|GIF|JPG|PNG|PCX|DXF|WMF|EMF|LIC|EPS|ICO)$/i,
                video:/^(RM|RMVB|x-ms-wmv|3GP|MP4|AVI|FLV|MKV|F4V|MPG|VOB|DAT|WMV|ASF|MKV|DV|MOV|TS|MTS|WEBM)$/i,
                //video:/^MP4$/i,
                file:/^(iso|rar|html|htm|zip|exe|pdf|plain|xls|txt|doc|docx|wps|dmg|ppt|pptx|xlsx|odp|odt)$/i,
                voice:/^(MP3|CD|OGG|MP3PRO|REAL|APE|MODULE|MIDI|VQF)$/i,
            };
    uploadFile.fileRegStr=function(){
        var arr=[];
        $.each(uploadFile.typeObj,function(k,v){
            arr.push(v.toString().replace(/^(\/\^\()([\S\s]+)(\)\$\/i)$/,"$2"));
        });
        return arr.join("|");
    }();
    uploadFile.uploadFileReg=new RegExp("^("+uploadFile.fileRegStr+")$","i");
    uploadFile.acceptFileTypes=new RegExp("(\.|\/)("+uploadFile.fileRegStr+")$","i");
    uploadFile.maxFileSize={
            pic:Math.pow(1024,2)*3,
            video:Math.pow(1024,2)*30,
            file:Math.pow(1024,2)*20,
            voice:Math.pow(1024,2)*10,
        };
    uploadFile.getFileInfo=function(fileType){
        var typeObj=uploadFile.typeObj;
        var maxFileSize=uploadFile.maxFileSize;
        var type="",size=0;
        $.each(typeObj,function(k,v){
            if(v.test(fileType)){
                type=k;
            };
        });
        return {
            type:type,
            size:maxFileSize[type],
        };
    };
    uploadFile.goToPage=function($ele,pageNo,sendData,e){
        //只有点击页数的时候指空 $ele=""
        var _t=this,categoryId=!$("#categoryBox p.on").attr("categoryId")?"":$("#categoryBox p.on").attr("categoryId"), fileType=$(".filcatlist .listhd").attr("filetype");
        _ut.showDataList($ele,"/managedFile/page",$.extend({pageNo:pageNo,categoryId:categoryId,fileType:fileType},sendData),_t.showData,e);
    };
    //初始化上传提示
    uploadFile.initProcessNum=function(){
        var failLen=$(".uploadAction.reload").length+$(".uploadProcess li.error").length+$(".uploadProcess li.wrongFormat").length;
        failLen==0?$(".uploadFail").hide():$(".uploadFail").show().find("i").text(failLen);
        $(".uploadTotal").text($(".uploadAction").length);
        $(".uploading").text($(".uploadAction.success").length);
    };
    //更新容量提示
    uploadFile.updateCapacity=function(usedCapacity,totalCapacity){
        $usedCapacity.attr("used",usedCapacity);
        $totalCapacity.attr("total",totalCapacity);
        memorySpace(usedCapacity,totalCapacity,function(u,t){
            $(".listset .usedCapacity").text(bytesToSize(u));
        });
    };
    //获取缩略图
    uploadFile.getThumbnail=function(data,saurce,callback){
        var maxRise = 2,upfileDetailHtml={},i=0,isLast=[],_t=this;
        _ut.modal("uploadFile","",function(){
                var usedCapacity=$usedCapacity.text(),totalCapacity=$totalCapacity.text();
                $(".content .usedCapacity").text(usedCapacity);$(".content .totalCapacity").text(totalCapacity);
                memorySpace($usedCapacity.attr("used"),$totalCapacity.attr("total"));
                $(".content .space>div span").css("width",$(".listset .space>div.processBar span").width()+"px");
                if (!window.FileReader) return;
                var files =data.files,filesLen=files.length;
                if(!files || filesLen>0){
                    //上传提示
                    for (var f; f = files[i]; i++) {
                        //加载图片
                        var $split = (f.name).split(".").splice(-1)[0];
                        var fileInfo=uploadFile.getFileInfo($split);
                        var imgsrc={
                            video:"/images/mysiteV3/vedioUp.png",
                            file:"/images/mysiteV3/fileUp.png",
                            voice:"/images/mysiteV3/voiceUp.png",
                        };
                        if(!uploadFile.uploadFileReg.test($split.toLocaleLowerCase())){
                            continue;
                        }
                        !function(f,i){
                            var reader = new FileReader(),wrongFormat;
                            // f.fileId=i;
                            wrongFormat=!$split.match(uploadFile.uploadFileReg)?'wrongFormat':"";
                            upfileDetailHtml="<li id='"+i+"' size='"+f.size+"' class='"+wrongFormat+"' filetype='"+fileInfo.type+"' limitSize='"+fileInfo.size+"'> <div class='thumbnailBox'> <img src='' height='48' width='48' alt=''> <div class='uploadIconTips'><i></i></div> </div> <div class='uploadDatail '> <p class='filedetail'> <span class='left fileName siteEllipsis'>"+f.name+"</span> <span class='right'>"+Number(f.size/(1024*1024)).toFixed(3)+"M</span> </p> <p class='tips red'>文件上传失败，请检查网络</p> <div class='progressBar'> <b></b> </div> </div> <div class='uploadAction  cancleBtn'> </div> </li>";
                            $(".fileUploadModal ul.uploadProcess").append(upfileDetailHtml);
                            reader.onload = (function(theFile,i) {
                                return function(e) {
                                    var display=totalUpload.activeCapacity<totalUpload.myCapacity?"block":"none",
                                        $id=$("#"+theFile.fileId),$img=$id.find("img");
                                    $img.attr("src",$id.attr("filetype")=="pic"?e.target.result:imgsrc[$id.attr("filetype")]);
                                    //显示图片信息
                                    _t.initProcessNum();
                                    data.filesContainer=$("#"+theFile.fileId);
                                    isLast.push(i);
                                    //最后一个
                                    if(isLast.length==filesLen){
                                        $('.nano').nanoScroller({alwaysVisible: false});
                                    };
                                };
                            })(f,i);
                             reader.readAsDataURL(f);
                        }(f,i);
                    };
                }
                typeof callback=="function"&&callback();
        });
    };
    uploadFile.uploadFile=function(json){
        var _t=this,isOnline=true,fileInfoArr=[];
        function failCallback(e,data,className){
            var fileId=data.files[0].fileId,$id=$("#"+fileId);
            $id.find(".progressBar b").css('width','0%');
            setTimeout(function(){
                $id.find(".uploadAction").attr("class","uploadAction "+($id.hasClass("error")?"cancleBtn":className));
                _t.initProcessNum();
                data.context = $("#"+fileId).find(".reload").off("click")
                .click(function () {
                    if($(this).hasClass("success")) return;
                    data.submit();
                });
            },500);
        };
        json.ele.fileupload({
            pasteZone: null,
            url:json.url   ,     //    "/user/gallery/upload", //文件上传地址，可以直接写在input的data-url属性内
            acceptFileTypes: uploadFile.acceptFileTypes,
            // maxFileSize: 3145728, // 3 MB
            dataType: 'text',
            sequentialUploads : 0,
            // limitMultiFileUploads:0,
            // formData:{'fileUpload':'fileUpload','userFileType':'video'},//         ,'id':i}, //参数
            done: function(e, result) {
                var data = JSON.parse(result.result),sendData={pageSize:32,orderBy:""},json={pageSize:32,orderBy:""};
                if (data.status==200) {
                    _t.updateCapacity(data.data.usedCapacity,data.data.totalCapacity);
                    var fileId=result.files[0].fileId,$curLi=$("#"+fileId);
                    if($curLi.hasClass("delLi")){
                        _ut.ajax("/managedFile/delete","post",{ids:(data.data.material.id+"").split(',')});
                    };
                    $curLi.find(".progressBar b").css('width', '100%');
                    setTimeout(function(){
                        $("#"+fileId).find(".uploadAction").attr("class","uploadAction success").end()
                        .find(".progressBar").hide().end()
                        .find(".tips").show().attr("class","tips success").text("上传成功");
                        _t.initProcessNum();
                    },500);
                    !$curLi.hasClass("delLi")&&_t.goToPage($(this),1,sendData,'');
                    _t.goToPage($(this),1,json,"");
                    $(".nodata").hide();
                }else{
                    failCallback(e,result,"cancleBtn");return;
                };
            },
            progress:function(e, result){
                var fileId=result.files[0].fileId , progress = Math.floor(result._progress.loaded / result._progress.total * 100);
                if(!isOnline) {
                    $("#"+fileId).find(".progressBar b").css("width","0%");return;
                };
                $("#"+fileId).find(".uploadAction").attr("class","uploadAction cancleBtn").end()
                .find(".progressBar b").css({'width':progress+'%'});
            },
            fail:function(e,result){
                isOnline=false;
                failCallback(e,result,"reload");
            },
            start:function(e){
                isOnline=true;
            },
            send:function(e,result){},
            change:function(e,result){
                var $t=$(this),files = result.files,$category=$(".categoryBox p.on"),filetype,sendData,realCapacity,checkType=false;
                var arr=[],options,fileFilter;
                totalUpload.activeCapacity=Number($totalCapacity.attr("total"))-Number($usedCapacity.attr("used"));
                totalUpload.totaljqXHR={};
                totalUpload.myCapacity=0;
                totalUpload.overLimit=false;
                if(files.length>15) {alert("一次上传文件最多不超过15个！");return false};
                for(var i=0;i<files.length;i++){
                    files[i].fileId=i;
                    totalUpload.myCapacity+=files[i].size;
                    filetype=files[i].name.split(".").splice(-1)[0];
                    fileFilter=$(".listhd").attr("filetype")==""?uploadFile.uploadFileReg:uploadFile.typeObj[$(".listhd").attr("filetype")];
                    if(!fileFilter.test(filetype.toLocaleLowerCase())) checkType=true;
                };
                if(totalUpload.activeCapacity<totalUpload.myCapacity) totalUpload.overLimit=true;
                if(checkType) {alert("您上传的文件格式不正确");return false};
                //if (checkType) {
                //    $(".listhd").attr("filetype") == "video" ? alert("请上传MP4格式的视频") : alert("您上传的文件格式不正确");
                //    return false;
                //}
                _t.getThumbnail(result,"change",function(){
                    var id=result.files[0].fileId,$modal=$(".fileUploadModal");
                    realCapacity=Number($(".listset [used]").attr("used"))+totalUpload.myCapacity;
                    $modal.find(".usedCapacity").attr("realCapacity",realCapacity).text(bytesToSize(realCapacity));
                    if(totalUpload.overLimit) {
                        // $t.fileupload({autoUpload:false}); 
                        $modal.find(".usedCapacity").addClass("red");
                        $modal.attr("notAutoUpload","false").find(".set p i").text("网站空间不足，请移除多余的文件继续上传").end()
                        .find(".totalUpload").addClass("disable").show().end()
                        .find(".uploadProcess li").each(function(){
                            var $t=$(this), errorTips="网站空间不足";
                            $t.find(".progressBar").hide().end().find(".tips").show().text(errorTips);
                        }).end()
                        .find(".serverInfo .left").text("共"+$(".uploadAction").length+"个文件");
                    }else{
                        $t.fileupload({autoUpload:true });
                    };
                    $(".uploadProcess li").each(function(){
                        var $t=$(this),size=$t.attr("size"),maxFileSize=$t.attr("limitsize");
                        if(Number(size)>Number(maxFileSize)){
                            $t.attr("isOverLimit",true).addClass("error").find(".progressBar").hide().end()
                            .find(".tips").show().text("上传文件超过"+maxFileSize/Math.pow(1024,2)+"M").end()
                            .find(".uploadAction").attr("class","uploadAction cancleBtn");
                        };
                        $t.hasClass("wrongFormat")&&$t.find(".progressBar").hide().end().find(".tips").show().text("文件格式错误");
                    });
                });
            },
            submit:function(e,data){
                var index = data.index, $t=$(this),fileId=data.files[0].fileId,$id=$("#"+fileId),$category=$(".categoryBox p.on");
                var filetype=data.files[0].name.replace(/[\S\s]+\.([^\.]+)/,"$1"),
                     fileInfo=uploadFile.getFileInfo(filetype);
                var sendData={
                        'fileUpload':'fileUpload','userFileType':fileInfo.type,
                        'categoryId':$category.length?$category.hasClass("all")?"":$category.attr("categoryid"):""
                    };
                if(data.files[0].size>fileInfo.size) return false;
                if(totalUpload.overLimit&&!$("[reSubmit]").length){
                    totalUpload.totaljqXHR[data.files[0].fileId]=data;
                    return false;
                };
                $t.fileupload('option', 'formData', sendData );
                if($("#"+fileId).hasClass("wrongFormat")) return false;
                data.context = $("#"+fileId).find(".cancleBtn").off("click")
                .click(function () {
                    if(!$(this).hasClass("cancleBtn")) return;
                    data.jqXHR.abort();
                });
            },
            // messages: {
            //     acceptFileTypes: '文件格式不正确',
            //     maxFileSize: '文件大小超过限制'
            // },
        }).off("fileuploadprocessalways").on('fileuploadprocessalways', function(e, result) {
            var index = result.index, file = result.files[index];
            if (file.error) {
                $("#"+file.fileId).addClass("error").find(".progressBar").hide().end().find(".tips").show().text(file.error);
                failCallback(e,result,"cancleBtn");
            };
        });
    };
    //《文件管理》渲染页面
    uploadFile.showData=function(data,$target){
        var $rightCont=$('.rightCont'),model=$('.rightCont').find(".model li:eq(0)").hasClass("on")?"list":"thumbnail",
             listHtml='',thumbnailHtml='',listData=data.data.data,fileType={"pic":"图片","video":"视频",'voice':"音频","file":"文件"},
             $selectAll=$rightCont.find(".fileft em"),isSelect,imgsrc;
        if($target.parents(".newsPaging").length) $selectAll.removeClass("on");
        // isSelect=$selectAll.hasClass("on")?"on":"";
        for(var i=0;i<listData.length;i++){
               var totalName=listData[i].name.split("."),filetype=!totalName[totalName.length-1]?"PNG":totalName[totalName.length-1],
                   reg=new  RegExp("."+filetype+"$"),
                   filename=listData[i].name.replace(reg,"");
               listHtml+="<tr fileid='"+listData[i].id+"' > <td><i class='icon'></i><span class='fileName'>"+filename+"</span></td>";
               listHtml+="<td><span class='fileType'>"+filetype.slice(0,20).toUpperCase()+"</span></td>"
               listHtml+="<td>"+bytesToSize(listData[i].fileSize)+"</td> <td>"+fileType[listData[i].fileType]+"</td> <td>"+listData[i].createDate.substring(0,16)+"</td>";
               listHtml+="<td> <a href='javascript:;'class='edit' title='编辑'></a> <a href='javascript:;' class='delete' title='删除'></a> </td> </tr>";
               if(/file|voice/gi.test(listData[i].fileType)){
                   imgsrc=uploadFile.path[listData[i].fileType];
               }else if(/video/gi.test(listData[i].fileType)){
                   imgsrc=uploadFile.path[listData[i].fileType]+listData[i].fileScreenPic;
               }
               else{
                   imgsrc=uploadFile.path[listData[i].fileType]+listData[i].thumbnail;
               };
               thumbnailHtml+="<li fileid='"+listData[i].id+"' fileType='"+listData[i].fileType+"'><img src='"+imgsrc+"'/><p><i class='typeIcon'></i><i class='selected'></i><span>"+listData[i].name+"</span><em></em></p></li>"
        };
        $rightCont.find("tbody").html(listHtml).end().find(".filepic ul").html(thumbnailHtml);
        $("[fileid]").each(function(){
            var $t=$(this);
            $.each(selectNode,function(i,j){
               $t.attr("fileid")==j&&$t.addClass("on");
            });
        });
        setTimeout(function(){$('.nano').nanoScroller({alwaysVisible: false}); },0);
    };
    return uploadFile;
});
    