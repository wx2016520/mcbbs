define(['utility'],function(_ut){
	var article = {
		'table'     : $('table.newsTable'),
		'footerSet' : $('.newsFooter'),
		'newsHead'  : $('.newsHead'),
		'tagWrap'   : $('.tagWrap'),
		'newsTabCon': $('ul.newsTabCon'),
		'init' : function(){ 
			var _self = this;
			
			if(!$('#articlePage').length) return;
			
			this.footermarkList = this.footerSet.find('ul.mark_list');
			this.headermarkList = this.newsHead.find('ul.markList');

			$('div.fabu').on('click',_self.saveArticle);
			this.upimg();
			
			$('.topNav li').click(function(){
				$(this).addClass('on').siblings().removeClass('on');
				$('ul.newsTabCon').children('li').eq( $(this).index() ).addClass('on').siblings().removeClass('on');
			});
			
			this.table.on('click',function(e){
				var target = $(e.target);
				target.hasClass('articleIcon') && target.parent().hasClass('check_btn') && _self.articleSelect(target);
				target.hasClass('release') && (target.closest('tr').attr('release')=='no' ? _self.releaseArticle( target.closest('tr[newsid]').attr('newsid') ) : _self.articleCancel( target.closest('tr[newsid]').attr('newsid') ) ); //发布 撤回
				target.hasClass('delete') && _self.articleRemove( target.closest('tr[newsid]').attr('newsid') ,'one'); //删除
				(target.parent().hasClass('newsDate') || target.hasClass('newsDate')) && ( _self.table.find('th.newsDate').hasClass('asc') ? _self.table.find('th.newsDate').removeClass('asc') && _self.searchByTag() : _self.table.find('th.newsDate').addClass('asc') && _self.searchByTag() );
			});

			this.footerSet.children('a').on('click',function(e){
				$(this).hasClass('selectAll') && _self.articleSelectAll($(this)); //批量选择
				$(this).hasClass('newsRelease') && _self.releaseArticle(); //批量发布
				$(this).hasClass('newsCancle') && _self.articleCancel(); //批量撤回
				$(this).hasClass('newsDelete') && _self.articleRemove(); //批量删除
			});

			this.footerSet.find('a.markSetbtn').click(function(){
				$(this).closest('.markSet').hasClass('active') ? $(this).closest('.markSet').removeClass('active') : $(this).closest('.markSet').addClass('active');

				$(this).next().find('span.closeMark').off().click(function(){
					$(this).closest('.markSet').hasClass('active') ? $(this).closest('.markSet').removeClass('active') : $(this).closest('.markSet').addClass('active');
				});
				$(this).next().find('a.addMark').off().click(function(){
					var li = $('<li contenteditable="true" class="active edit">新标签</li>');
					_self.footermarkList.find('li').removeClass('active');
					_self.footermarkList.append(li).closest('.scrollWarp').nanoScroller({alwaysVisible: false});
					li.bind('keydown',function(event){
						if(event.keyCode==13) return false;
					}).focus().blur(function(){
						_self.creatMark(li ,li.text());
					});
				});
				$(this).next().find('a.deleteMark').off().click(function(){
					_self.removeTag( $(this).closest('.markSet').find('ul.mark_list li.active') );
				});
				$(this).next().find('a.changeName').off().click(function(){
					_self.tagRename( $(this).closest('.markSet').find('ul.mark_list li.active') );
				});

				$(".nano").nanoScroller({alwaysVisible: false});
			});

			this.footerSet.find('ul.pageList').on('click','li a',function(){
				_self.searchByTag( {"pageNo":$(this).text()} ); 
			});
			
			this.footerSet.find('a.nextPage,a.prevPage').click(function(){
				if($(this).hasClass('nextPage')){
					_self.searchByTag( {"pageNo": parseInt(_self.footerSet.find('ul.pageList li.active a').text())+1 } ); 
				}else{
					_self.searchByTag( {"pageNo": parseInt(_self.footerSet.find('ul.pageList li.active a').text())-1 } ); 
				}
			});

			this.newsHead.find('input.seachNews').bind('keypress',function(event){
		        event.keyCode == "13" && _self.searchByTag();
		    });

			this.newsHead.find('.checkedMark').on('click','i.deleteMark',function(){
				!$(this).closest('li').siblings().length && _self.newsHead.find('a.deleteAll').hide();
				_self.headermarkList.find('li[id='+$(this).closest('li').attr('id')+']').removeClass('active');
				$(this).closest('li').remove();
				_self.searchByTag();
			});

			this.newsHead.on('click',function(e){
				var target = $(e.target);
				target.hasClass('markBtn') && target.closest('.markWarp').hasClass('active') ? target.closest('.markWarp').removeClass('active') : target.closest('.markWarp').addClass('active');
				target.hasClass('deleteAll') && $('.checkedMark').html('') && target.hide() && _self.newsHead.find('ul.markList li').removeClass('active') && _self.searchByTag();
				target.hasClass('closeMark') && target.closest('.markWarp').removeClass('active');
				(target.hasClass('confirm') || target.hasClass('seachBtn')) && _self.searchByTag();
				$(".nano").nanoScroller({alwaysVisible: false});
			});

			$('.scrollWarp ul.nano-content').on('click','li',function(){
				if($(this).closest('ul').hasClass('mark_list')){
					$(this).addClass('active').siblings().removeClass('active');
				}else{
					if($(this).attr('id')!='notag'){
						if($('.checkedMark li[id='+$(this).attr('id')+']').length) return;
						$('.checkedMark').find('li[id=notag]').remove();
						$(this).closest('ul.markList').find('li[id=notag]').removeClass('active');
						$(this).addClass('active');
						$('.deleteAll').show();
						$('.checkedMark').append( $('<li id='+$(this).attr('id')+'><span>'+$(this).text()+'</span><i class="deleteMark articleIcon"></i></li>') );
						$('.checkedMark').children().length == 6 && $(this).closest('ul').find('li[id='+$('.checkedMark').children().eq(0).attr('id')+']').removeClass('active') && $('.checkedMark').children().eq(0).remove();
					}else{
						$('.checkedMark').html('').append( $('<li id="notag"><span>无标签</span><i class="deleteMark articleIcon"></i></li>') );
						$(this).closest('ul.markList').find('li').removeClass('active');
						$(this).addClass('active');
					}
				}
			});

			this.tagWrap.find('span.addTag').click(function(){
				$(this).parent().next().is(":visible") ? $(this).parent().next().hide() : $(this).parent().next().show();
				$(this).parent().next().find('i.click').off().click(function(){ $('li.allTags').hide(); });
			});

			this.tagWrap.find('p.tag').on('click','span[id]',function(){
				if($(this).attr('state')!='on'){
					$(this).attr('state','on');
					_self.tagWrap.children('li').eq(0).append($(this).clone().removeAttr('state').append($('<i></i>')));
				}
				_self.upDataCategoryId();
			});

			this.tagWrap.children('li').eq(0).on('click','span[id] i',function(){
				_self.tagWrap.find('li.allTags span[id='+$(this).parent().attr('id')+']').removeAttr('state');
				$(this).parent().remove();
				_self.upDataCategoryId();
			});

			this.tagWrap.find('i.close').click(function(){
				_self.tagWrap.find('.allTags').hide();
			});

			this.tagWrap.find('p.set i').click(function(){
				var li = $('<span contenteditable="true" class="active edit">新标签</span>');
				_self.tagWrap.find('p.tag li').removeClass('active');
				_self.tagWrap.find('p.tag').append(li);
				li.bind('keydown',function(event){
					if(event.keyCode==13) return false;
				}).focus().blur(function(){
					_self.creatMark(li ,li.text());
				});
			});

			this.newsTabCon.find('input,textarea').bind('input propertychange',function(){
				if($(this).attr('textlength') && $(this).attr('textlength')=='number'){
					$(this).val().match(/\D+/ig) ? $(this).closest('li').find('p.eromsg').attr('status','erro').show() : $(this).closest('li').find('p.eromsg').removeAttr('status').hide();
				}else{
					_ut.getStringLength($(this).val() ,$(this).attr('textlength')) ? $(this).next('p.eromsg').removeAttr('status').hide() : $(this).next('p.eromsg').html('不能超过'+($(this).attr('textlength')/2)+'个汉字').show().attr('status','erro');
				}
			});
		},
		'upimg': function(){
			if(document.getElementById('uploadBtn')){
				document.getElementById('uploadBtn').onchange = function(evt) {
					var maxRise = 3;
				    if (!window.FileReader) return;
				    var files = evt.target.files;
				    if(!files || files.length>0){
				    	if(this.files && this.files[0] && ((this.files[0].size || 0) > maxRise*1024*1024)){
				    		alert("图片体积过大，请重新上传！");
				    		this.value = "";
				    		return;
				    	}else{
				    		for (var i = 0, f; f = files[i]; i++) {
				    			var $split = (f.type).split("image/")[1];
						        if($split!="gif" && $split!="jpg" && $split!="jpeg" && $split!="png")
								{
									alert("图片格式有误！");
									this.value = "";
									return false;
								}else{
									if (!f.type.match('image.*')) {
							            continue;
							        }
									var reader = new FileReader();
							        reader.onload = (function(theFile) {
							            return function(e) {
							            	$('.imgBox.hasImg').find('img')[0].src = e.target.result;
							            	$('input#file').val(e.target.result);
							                $('.imgBox.hasImg').show();
							            };
							        })(f);
							       	 reader.readAsDataURL(f);
							       	 //$(".aritcle-creat .error-msg").text("上传成功！").css("color","#30d18b");
								}
						    }
				    	}
				    }
				};
			}

			$('.imgBox.hasImg').find('.del').click(function(){
				$(this).parent().hide();
				$('input#file,input#icon').val('');
			});

			$('.imgBox.hasImg').find('span.change').click(function(){
				$('#uploadBtn').click();
			});

		},
		'upDataCategoryId' : function(){
			var id = [];
			this.tagWrap.children('li').eq(0).find('span[id]').each(function(){
				id.push($(this).attr('id'));
			});
			id.length ? $('input#categoryId').val(id.join(',')) : $('input#categoryId').val('no');
		},
		'getSelected' : function(msg){
			var release = [];
			this.table.find(msg).each(function(){
				release.push($(this).attr('newsid'));
			});
			return release;
		},
		'articleSelect' : function(node){
			var parent = node.closest('tr');
			parent.hasClass('active') ? parent.removeClass('active') : parent.addClass('active') && this.footerSet.children('a.newsHandle').addClass('selected');
			if(!this.table.find('tbody tr.active').length) this.footerSet.children('a.newsHandle').removeClass('selected');

			this.table.find('tbody tr.active[release=no]').length ? this.footerSet.find('a.newsHandle.newsRelease').addClass('selected') : this.footerSet.find('a.newsHandle.newsRelease').removeClass('selected');
			this.table.find('tbody tr.active[release!=no]').length ? this.footerSet.find('a.newsHandle.newsCancle').addClass('selected') : this.footerSet.find('a.newsHandle.newsCancle').removeClass('selected');
			this.table.find('tbody tr.active').length == this.table.find('tbody tr').length ? this.footerSet.find('.selectAll').addClass('active') : this.footerSet.find('.selectAll').removeClass('active');
		},
		'articleSelectAll' : function(node){
			node.hasClass('active') ? node.removeClass('active') && this.table.find('tbody tr').removeClass('active') && this.footerSet.children('a.newsHandle').removeClass('selected') : node.addClass('active') && this.table.find('tbody tr').addClass('active') && this.footerSet.children('a.newsHandle').addClass('selected');
		},
		'releaseArticle' : function(articleid){
			var release = !articleid ? this.getSelected('tr[release=no].active') : new Array(articleid) ,url = '/article/publish/batch' ,_self = this;
			release.length && _ut.ajax(url ,'POST' ,{"articleIds":release.join(',')} ,function(data){
				if(data.status==200){
					for(i=0;i<release.length;i++){
						$('.newsTable').find('tr[newsid='+release[i]+']').removeAttr('release class').find('a.release').attr('title','撤回');
					}
					_self.footerSet.find('.selectAll').removeClass('active');
					_self.footerSet.find('.newsHandle').removeClass('selected');
				}
			}); 
		},
		'articleCancel' : function(articleid){
			var release = !articleid ? this.getSelected('tr[release!=no].active') : new Array(articleid) ,url = '/article/reback/batch' ,_self = this;
			release.length && _ut.ajax(url ,'POST' ,{"articleIds":release.join(',')} ,function(data){
				if(data.status==200){
					for(i=0;i<release.length;i++){
						$('.newsTable').find('tr[newsid='+release[i]+']').removeAttr('class').attr('release','no').find('a.release').attr('title','发布');
					}
					_self.footerSet.find('.selectAll').removeClass('active');
					_self.footerSet.find('.newsHandle').removeClass('selected');
				}
			}); 
		},
		'articleRemove' : function(articleid ,msg){
			var release = !articleid ? this.getSelected('tr.active') : new Array(articleid) ,url = '/article/delete/batch';
			var pageNo = parseInt($(".pageList").find(".active").find("a").text());
			(msg=='one' || $('.newsDelete').hasClass('selected')) && _ut.modal("j","",function(){
				$(".modalBox  .content p").text("您确定要删除新闻吗？");
				$(".modalBox .set .cancle, .modalBox .modalClose").on("click",function(){
					$.fn.colorbox.close();
				});
				$(".modalBox .set .continue").on("click",function(){
					release.length && _ut.ajax(url ,'POST' ,{"articleIds":release.join(',')} ,function(data){
						if(data.status==200){
							window.location.href = "/article/index.html?groupId=" + groupId + "&pageNo=" + pageNo;
						}else{
							alert(data.msg);
						}
					}); 
				});
			});
		},
		'saveArticle' : function(){
			if(!$.trim($('input[name=title]').val())){

				$('input[name=title]').next('p').html('文章标题必填').show();
				$('ul.newsTabCon').children('li').eq(0).addClass('on').siblings().removeClass('on');
				$('.topNav li').eq(0).addClass('on').siblings().removeClass('on')
			}else{
				if(!$('ul.newsTabCon').find('p.eromsg[status=erro]').length){
					$(this).off("click");
					$('form').submit();
				}
			}
			
		},    
		'creatMark' : function(li ,name){
			var _self = this;
			_ut.ajax('/article/category/addCategory' ,'POST' ,{"name":name} ,function(data){
				if(data.status==200){
					li.attr('id',data.data.id).removeClass('active edit').removeAttr('contenteditable').off();
					_self.headermarkList.append(li.clone());
				}else{
					li.remove();
				}
			});
		},
		'removeTag' : function(node){
			var _self = this;
			node.length && _ut.ajax('/article/category/delete' ,'POST' ,{"tagId":node.attr('id')} ,function(data){
				if(data.status==200){
					_self.headermarkList.find('li[id='+node.attr('id')+']').remove();
					$('.checkedMark').find('li[id='+node.attr('id')+']').remove();
					!$('.checkedMark').find('li').length && $('.deleteAll').hide();
					node.remove();
					$(".nano").nanoScroller({alwaysVisible: false});
					_self.searchByTag();
				}
			});
		},
		'tagRename' : function(node){ 
			var text = node.text() ,_self = this;
			node.attr('contenteditable','true').addClass('edit').focus().bind('keydown',function(event){
					if(event.keyCode==13) return false;
				}).blur(function(){
					_ut.ajax('/article/category/rename' ,'POST' ,{"id":$(this).attr('id') ,"name":$(this).text()} ,function(data ,obj){
						data.status==200 ? obj.target.text(obj.target.text()) : obj.target.text(obj.oldname);
						obj.target.removeAttr('contenteditable').removeClass('edit');
						_self.headermarkList.find('li[id='+node.attr('id')+']').text(obj.target.text());
						$('.checkedMark').find('li[id='+node.attr('id')+'] span').text(obj.target.text());
					},{"target":node ,"oldname":text});
			});
		},
		'searchByTag' : function(arg){
			if($('.nodata2').is(':visible')) return;
			
			var tagid = [] ,url ,data = {} ,searchVal = $.trim($('input.seachNews').val()) ,params = {"pageNo":1 ,"order":$('.newsDate').hasClass('asc') ? "asc" : "desc"};
			$('.checkedMark li').each(function(){ tagid.push($(this).attr('id')); });
			
			params = $.extend(params, arg || {});
			
			if(!searchVal && tagid[0]!='notag'){
				url =  '/article/page';
				data = {"tagIds":tagid.join(',') ,"pageNo":params.pageNo ,"pageSize":10 ,"orderBy":"PUBLISH_TIME" ,"order":params.order};
			}
			
			if(searchVal && tagid[0]!='notag'){
				url =  '/article/searchkey';
				data = {"tagIds":tagid.join(',') ,"keyword":searchVal ,"pageNo":params.pageNo ,"pageSize":10 ,"orderBy":"PUBLISH_TIME" ,"order":params.order};
			}
			
			if(tagid.length && tagid[0]=='notag'){
				url =  '/article/pagenotag';
				data = {"keyword":searchVal ,"pageNo":params.pageNo ,"pageSize":10 ,"orderBy":"PUBLISH_TIME" ,"order":params.order};
			}
			
			if(url){
				this.newsHead.find('.markWarp').removeClass('active');
				this.showDataList(url ,data);
			}
		},
		'showDataList' : function(url ,data){
			var _self = this ,tr = '',release = '' ,page = '' ,dataCopy = data ,status = '' ,pageStart = pageEnd = 0;
			_ut.ajax(url ,'GET' ,data ,function(data){ 
				if(data.status==200){ 
					if(!data.data.totalCount){
						$('.nodata').show();
						_self.table.find('tbody').html('');
						_self.footerSet.find('.newsPaging').hide().end().find('span.total').hide();
					}else{
						for(i=0;i<data.data.data.length;i++){
							release = data.data.data[i].publishStatus=='off' ? 'release="no"' : '';
							status = data.data.data[i].publishStatus=='off' ? '<a href="javascript:;" class="release articleIcon" title="发布"></a>' : '<a href="javascript:;" class="release articleIcon" title="撤回"></a>';
							tr += '<tr '+release+' newsid="'+data.data.data[i].id+'"><td class="check_btn"><span class="articleIcon"></span></td><td class="news_icon"><span class="articleIcon" title="'+data.data.data[i].categoryName+'"></span></td><td class="news_title siteEllipsis">'+data.data.data[i].title+'</td><td class="news_date">'+data.data.data[i].publishTime+'</td><td class="news_set"><a href="'+'/article/editArticle.html?groupId='+groupId+'&amp;articleId='+data.data.data[i].id+'&amp;pageNo='+data.data.pageNo+'&amp;tagId='+tagId+'" class="edit articleIcon" title="编辑"></a>'+status+'<a href="javascript:;" class="delete articleIcon" title="删除"></a></td></tr>';
						}
						$('.nodata').hide();
						_self.table.find('tbody').html(tr);
						_self.footerSet.find('span.total em').text(data.data.totalCount);
						
						if(parseInt(dataCopy.pageNo)>5 && data.data.totalPages > 5){
							if(parseInt(dataCopy.pageNo)+2 <= data.data.totalPages){
								pageStart = parseInt(dataCopy.pageNo) - 2;
								pageEnd = parseInt(dataCopy.pageNo) + 2;
							}else{
								pageEnd = data.data.totalPages; 
								pageStart = pageEnd - 5;
							}
						}else{
							pageStart = 1;
							pageEnd = data.data.totalPages > parseInt(dataCopy.pageNo) ? data.data.totalPages > 5 ? 5 : data.data.totalPages : data.data.totalPages;
						}
						
						for(i=pageStart;i<=pageEnd;i++){
							if(dataCopy.pageNo==i){
								page += '<li class="active"><a href="javascript:;">'+i+'</a></li>';
							}else{
								page += '<li><a href="javascript:;">'+i+'</a></li>';
							}
						}
						
						(data.data.totalCount <= dataCopy.pageNo * data.data.pageSize) ? _self.footerSet.find('.nextPage').hide() : _self.footerSet.find('.nextPage').show();
						(dataCopy.pageNo==1 && data.data.pageSize) ? _self.footerSet.find('.prevPage').hide() : _self.footerSet.find('.prevPage').css('display','inline-block');
						_self.footerSet.find('.newsPaging').show().find('.pageList').html(page);
						
						_self.footerSet.find('.selectAll').removeClass('active');
					}
				}
			});
		}
	};
	
	return article;
});