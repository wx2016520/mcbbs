define(['utility'],function(_ut){
	var itemCenter = {
		"init" : function(){
			if(!$('#itemcenter').length) return;
			var that = this;
			if($('#itemcenter').attr('type')=='edititemcenter') this.editStatus($('#itemcenter').attr('itemid'));
			this.categoryObj = this.getcategoryObj();
			typeof $.date_input != "undefined" && $(".dateSeach input").date_input() && $(".dateSeach .dateEnd").val(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate());
			$('.newsBody').length && $('.newsBody').find('tbody tr').length < 10 && $('.newsBody').find('tbody tr:last').css({'border-bottom':'1px dashed #dcdcdc'});

			$(document).on('click',function(event){
				var a = $(event.target);
				event.target.tagName.toLowerCase()!='span' && !a.closest('.detailaddcat').length && $('.detailaddcat .nano').hide();
				(event.target.tagName.toLowerCase()=='div' || a.hasClass('t'))  && a.closest('.detailaddcat').length && $('.detailaddcat .nano').hide();
				$('.detailspecification ul').hide();
			});

			$('.newsHead').children('.selectCat,.releaseStatus').click(function(event){
				if($(this).hasClass('selectCat')){
					if(!$(event.target).hasClass('cont') && $(event.target).closest('.cont').find('.nano').is(':hidden')){
						var id = 0 ,html = '';
						if($(event.target).closest('.cont').index() == 0){
							html = '<li>全部</li><li dataid="0" id="0">未分类</li>';
						}else{
							id = $(event.target).closest('.cont').prev().attr('id') * 1;
							if(!id) return;
						}
						_ut.ajax('/itemCenter/queryItemCategory' ,'GET', {"parentId":id} ,function(data){
							if(data.status==200){
								var ul = $(event.target).parent().find('ul');
								if(data.data.length){
									for(i=0;i<data.data.length;i++){
										html += '<li id="'+data.data[i].id+'" primaryId="'+data.data[i].primaryId+'">'+data.data[i].name+'</li>';
									}
								}/*else{
									html +='<li>未分类</li>';
								}*/
								html && ul.html(html).closest('.nano').show().nanoScroller({alwaysVisible: false});
							}
						});
					}
				}
				if($(this).hasClass('releaseStatus')){
					if(event.target.tagName.toLowerCase()=='li'){
						$(this).attr('status',$(event.target).attr('status') || '');
						$(event.target).closest('ul').prev().text($(event.target).text());
						that.getSearchRequire({"pageNo":1});
					}
				}
			});

			$('.newsBody table tbody').on('click','tr a,tr em',function(){
				var tr = $(this).closest('tr');
				if($(this).hasClass('release')) tr.attr('release')=='no' ? that.releaseItem([tr.attr('itemid')] ,'hasPublished') : that.releaseItem([tr.attr('itemid')] ,'noPublish');
				if($(this).hasClass('delete')) that.deleteItem([tr.attr('itemid')]);
				if($(this).hasClass('action')) that.itemSelect($(this));
			});
			
			$('.newsBody table tbody').on('mouseover','tr span',function(event){ 
				var pic = $(this).closest('tr').attr('pic') ,
				cat = $(this).closest('tr').attr('categorynames')!='' ? $.trim($(this).closest('tr').attr('categorynames')).split(' ') : [] ,
				str = '' ,top = $(this).offset().top ,left = event.pageX + 10;
				
				if($(this).closest('tr').index()==9) top = $(this).offset().top*1 - 245;
				if(pic){
					pic = pic.split(',')[0];
					if(cat.length==3) str = '<em>'+cat[0]+'>'+cat[1]+'>'+cat[2]+'</em>';
					if(cat.length==2) str = '<em>'+cat[0]+'>'+cat[1]+'</em>';
					if(cat.length==1) str = '<em>'+cat[0]+'</em>';
					
					$('body').append($('<div style="top:'+top+'px;left:'+left+'px;" id="tabimg"><p><img src="'+imgsever+'/'+pic+'"/></p>'+str+'</div>'))
				}
			});
			
			$('.newsBody table tbody').on('mouseleave','tr span',function(){
				$('#tabimg').remove();
			});
			
			$(".dateEnd,.dateStart").on('change',function(){
				that.getSearchRequire({"pageNo":1});
			});

			$('.seachWarp input').bind('keypress',function(event){
		        event.keyCode == "13" && that.getSearchRequire();
		    });

			$('.seachWarp a.seachBtn').click(function(){
				that.getSearchRequire({"pageNo":1});
			});

			$('.selectCat').on('click','div.cont ul li',function(){
				var primaryId = $(this).attr('id');
				if(primaryId!=undefined){
					$(this).closest('div.cont').attr('id')!=primaryId && $(this).closest('div.cont').next().removeAttr('dataid').find('span[old]').text($(this).closest('div.cont').next().find('span[old]').attr('old'));
					$(this).closest('.cont').find('span').html($(this).text()).end().attr('id' ,$(this).attr('primaryid')).attr('dataid' ,$(this).attr('id')).nextAll().removeAttr('id').removeAttr('dataid');
					$(this).closest('.cont').nextAll('.cont').find('span[old]').each(function(){
						$(this).text($(this).attr('old'));
					});
				}else{
					$(this).closest('.cont').removeAttr('id').removeAttr('dataid').siblings('.cont').removeAttr('id').removeAttr('dataid');
					$('.selectCat').find('span[old]').each(function(){
						$(this).text($(this).attr('old'));
					});
				}
				 
				if($(this).closest('div.cont').index()==0){
					if($(this).attr('primaryId')!=0 && $(this).attr('primaryId')!=void 0){
						$('.selectCat').find('span[old]').each(function(index){
							if(index!=0) $(this).text($(this).attr('old')).closest('div.cont').removeAttr('id').removeAttr('dataid');
						});
					}else if($(this).attr('dataid')==0){
						$(this).closest('div.cont').attr('dataid',0).attr('id',0);
					}else{
						$(this).closest('div.cont').removeAttr('id').removeAttr('dataid');
					}
				}
				that.getSearchRequire({"pageNo":1});
			});

			$('.selectCat').on('mouseleave','div.cont',function(){
				$(this).find('ul').closest('.nano').hide();
			});

			$('.newsFooter').children().click(function(){
				var eventIndex = $(this).index();
				switch (eventIndex){
					case 0: $(this).hasClass('active') ? $(this).removeClass('active') && $('.newsBody table').find('tbody tr').removeClass('on') && $('.newsFooter').children('a.newsHandle').removeClass('selected') : $(this).addClass('active') && $('.newsBody table').find('tbody tr').addClass('on') && $('.newsFooter').children('a.newsHandle').addClass('selected');break;
					case 1: $(this).hasClass('selected') && that.releaseItem(that.getTableDate() ,'hasPublished');break;
					case 2: $(this).hasClass('selected') && that.releaseItem(that.getTableDate() ,'noPublish');break;
					case 3: $(this).hasClass('selected') && that.deleteItem(that.getTableDate() ,'noPublish');break;
					case 6: that.manageCatr();break;
					case 7: that.specification();break;
				}
			});
			
			$('.newsPaging').on('click','a',function(){
				var data = {} ,page = $('.pageList li.active a').text()*1;
				data.pageNo = $(this).text();
				if($(this).hasClass('prevPage')) data.pageNo = (page-1) ? page-1 : 1;
				if($(this).hasClass('nextPage')) data.pageNo = page+1;
				that.getSearchRequire(data);
			});

			$('.newsBody thead th[name] .articleIcon').click(function(){
				var _this = $(this).parent(),
					order = '';
				if(_this.hasClass('asc')){
					order = 'Desc';
					_this.removeClass('desc asc').addClass('desc');
				}else{
					order = 'Asc';
					_this.removeClass('desc').addClass('asc').siblings().removeClass('desc asc');
				}
				_this.siblings().removeClass('asc');
				that.getSearchRequire({"orderBy":_this.attr('name') ,"order":order ,"pageNo":$('.newsPaging li.active a').text()});
				_this.closest('tr').attr('status',order);
			});

			//detail page
			$('.goodscontent .hd ul li').click(function(){
				$(this).addClass('on').siblings().removeClass('on');
				$('.goodscontent .bd').removeClass('show');
				$('.goodscontent .bd').eq($(this).index()).addClass('show');
			});

			$('.detailspecification a').click(function(){
				that.specification();
			});

			$('.detailspecification').on('click','label ,ul li',function(event){
				event.stopPropagation();
				$('.detailaddcat .nano').hide();
				var elm = $(this) ,parentid = elm.attr('primaryId') || 0;

				if($(event.target).closest('li').attr('dataid')){
					var li = $(event.target).closest('li');
					li.closest('ul').hasClass('one') && li.find('i.goodsIcon').length && li.find('ul.two').html( that.getlabelData(li.attr('primaryid') ,li.closest('label')) ).show() && li.siblings().find('ul.two').hide();
				}else if(event.target.tagName.toLowerCase()=='b' && !$(event.target).closest('label').find('ul.one').is(":hidden")){
					$(event.target).closest('label').find('ul.one').hide();
					return;
				}else if(event.target.tagName.toLowerCase()=='b'){
					$(event.target).closest('label').find('ul.one').html(that.getlabelData(0 ,$(event.target).closest('label')) ).show().end().siblings().find('ul').hide();
				}
	
				if(event.target.tagName.toLowerCase()=='em'){
					var li = $(event.target).closest('li');
					if(li.closest('ul').hasClass('one')){
						if(li.hasClass('active')){
							li.removeClass('active').find('ul.two li').removeClass('active');
							li.closest('label').removeAttr('f').removeAttr('f_name').removeAttr('c').removeAttr('c_name');;
							li.closest('label').children('b').text(li.closest('label').children('b').attr('name'));
							that.transformData();
						}else{
							li.addClass('active').siblings().removeClass('active').find('ul.two li').removeClass('active');
							li.closest('label').attr('f' ,li.attr('dataid')).attr('f_name' ,li.children('b').text()).removeAttr('c').removeAttr('c_name');;
							li.closest('label').children('b').text(li.children('b').text());
						}
					}
					
					if(li.closest('ul').hasClass('two')){
						var arr = [] ,name = [];
						if(!li.closest('ul').parent().hasClass('active')) return;
						li.hasClass('active') ? li.removeClass('active') : li.addClass('active');
						li.closest('ul').find('li.active').each(function(){ 
							arr.push($(this).attr('dataid')); 
							name.push($(this).text());
						});
						li.closest('label').attr('c',arr.join(','));
						li.closest('label').attr('c_name',name.join(','));
						that.transformData();
					}
				}
			});

			$('.detailaddcat').click(function(event){
				var tagName = event.target.tagName.toLowerCase() ,text = '' ,elm = $(event.target) ,em = elm.closest('span').nextAll('em');
				if(tagName=='span'){
					$(this).find('div.nano.one').is(':hidden') ? that.detailCatshow(0 ,-1) : $(this).find('div.nano').hide();
				}else if(tagName=='a'){
					$(this).find('div.nano').hide();
					that.manageCatr();
				}else{
					var index = elm.closest('div.nano').attr('index') ,id = elm.closest('li').attr('primaryid'),id2 = elm.closest('li').attr('id');
					if(elm.hasClass('nano-slider') || elm.hasClass('nano-pane')) return;
					if(!elm.closest('li').find('i').hasClass('on')){
						elm.closest('li').find('i').addClass('on').parent().siblings().find('i').removeClass('on');
						$('input[index]').removeAttr('name');
						if(index==0 && $('input[index='+index+']').val()!=id2){
							$('.detailaddcat').find('input').val('');
							$('input[index='+index+']').val(id2);
							$('input[name=categoryId]').val(id2);
							$('.nano.two,.nano.three').hide().find('i.goodsIcon').removeClass('on');
							text = '';
						}else{
							index==1 && $('.nano.three').hide().find('i.goodsIcon').removeClass('on') && $('input[index=2]').val('');
							$('input[index='+index+']').val(id2);
							id2 && $('input[name=categoryId]').val(id2);
						}
						that.catshow(em);
					}
					if(elm.closest('li').find('b').length){
						if(elm.closest('div.nano').attr('index')==0) $(this).find('.nano[index!=0]').hide();
						if(elm.closest('div.nano').attr('index')==1) $(this).find('.nano[index=2]').hide();
						that.detailCatshow(id ,index);
					}
				} 
			});
			
			$('.upimg').on('change','input[type=file]',function(){
				var form = new FormData() ,node = $(this);
				form.append("fileUpload" ,$(this)[0].files[0]);
				form.append("userFileType" ,'pic');
				_ut.upfile('/manageFile/uploadFile' ,form,function(data){ 
					node.parent().attr('path',data.data.material.path).html('<img src="'+imgsever+'/'+data.data.material.path+'"><p></p>');
					that.detailimgNum();
				});
			});
			
			$('.goodscontent').find('input[textlength],textarea[textlength]').bind('input propertychange',function(){
				//$(this).val($(this).val().replace(/[<>]/ig,''));
				if($(this).attr('textlength') && $(this).attr('textlength')=='number'){
					$(this).val().match(/\D+/ig) ? $(this).next('p.eromsg').attr('status','erro').show() : $(this).next('p.eromsg').removeAttr('status').hide();
				}else{
					_ut.getStringLength($(this).val() ,$(this).attr('textlength')) ? $(this).next('p.eromsg').removeAttr('status').hide() : $(this).next('p.eromsg').html('不能超过'+($(this).attr('textlength')/2)+'个汉字').show().attr('status','erro');
				}
			});
			
			$('.goodscontent div.pl span').on('click',function(){
				_ut.modal("itembatch","",function(){
					var s = $('.Specification');		  
					$(".Specification a.close,.Specification .hd span.goodsIcon").on("click",function(){
						$.fn.colorbox.close();
					});
					$('.Specification a.save').click(function(){
						$('input[name=price]').val()!='' && $('.dtab input[usetype=p]').val( $('input[name=price]').val() );
						$('input[name=stock]').val()!='' && $('.dtab input[usetype=s]').val( $('input[name=stock]').val() );	
						that.inventory();
						$.fn.colorbox.close();
					});
				});
			});
			
			$('.goodscontent .hd span.save').click(function(){
				var a = [], b = [] ,d = [];
				$('input[name=publishStatus]').val($(this).attr('type'));
				$('.detailspecification label[c]').each(function(){
					a.push('"'+$(this).attr('f')+'@'+'"' + ':' + '"'+$(this).attr('c')+'"');
					d.push($(this).attr('f'));
					d.push($(this).attr('c'));
				});
				$('.dtab table tr').each(function(){
					var json = '';
					json = $(this).find('input[mark]').eq(0).attr('mark')+'&'+$(this).find('input[mark]').eq(0).attr('usetype')+'_'+$(this).find('input[mark]').eq(0).val()+'_'+$(this).find('input[mark]').eq(1).attr('usetype')+'_'+$(this).find('input[mark]').eq(1).val();
					b.push(json);
				});
				$('input[name=specificationIds]').val(d.join(','));
				$('input[name=specificationValue]').val('{'+a.join(',')+'}');
				$('input[name=itemDetailValues]').val(b.join(','));
				if($('input[name=picPath]').val()==''){
					_ut.modal("j","",function(){
						$(".modalBox  .content p").text("请至少上传一张图片");
						$(".modalBox .set .cancle").text("确定");
						$(".modalBox .set .cancle, .modalBox .modalClose").on("click",function(){
							$.fn.colorbox.close();
						});
						$(".modalBox .set .continue").hide(); 
					});
					return;
				}
				!$.trim($('input[name=name]').val()) ? $('input[name=name]').next('p').html('商品名称必填').show() : !$('.goodscontent').find('p.eromsg[status=erro]').length && $('form').submit();
			})
			
			$('.upimg').on('click','ul li p',function(){
				$(this).closest('li').remove();
				$('.upimg li').length<5 && $('.upimg ul').append($('<li><span></span><input type="file" multiple="" accept="image/jpeg,image/gif,image/png,.JPEG"></li>'));
				that.detailimgNum(); 
			});
			
			$('.detailhref').on('click','span.articleIcon,.lj li',function(){
				if($(this).hasClass('articleIcon')){
					$(this).hasClass('active') ? $(this).removeClass('active') && $('input[name=widowsType]').val('olds') : $(this).addClass('active') && $('input[name=widowsType]').val('news');
				}else{
					$('.detailhref').find('b').text($(this).text());
					$(this).text() == '站外' ? $('.detailhref').find('input[type=text]').removeAttr('disabled').val('http://') && $('input[name=detailsType]').val('external') : $('.detailhref').find('input[type=text]').val('http://').attr('disabled','disabled') && $('input[name=detailsType]').val('interior');
				}
			});
			
			$('body').on('input propertychange','input[name=salesVolume],input[name=favorable],input[name=stock]',function(){
				$(this).val($(this).val().replace(/\D/ig,''));
				if($(this).val()=='' && ($(this).attr('name')=='salesVolume' || $(this).attr('name')=='favorable')) $(this).val(0);
			});
			
			$('input[name=name]').blur(function(){
				$(this).val($(this).val().replace(/[<>]/ig,''));
			})
			

			$('input[name=price]').bind('input propertychange',function(){
				$(this).val($(this).val().replace(/[^\d.]+/ig,''));
			});
			
			$('.dtab table tbody').on('input propertychange','input',function(){
				if($(this).attr('usetype')=='s') $(this).val($(this).val().replace(/\D/gi,''));
				//$(this).val($(this).val().replace(/[_&]/g,''));
				that.inventory();
			});
		},
		"catshow":function(em){
			var text = '';
			$('.detailaddcat i.goodsIcon.on').each(function(index){
				if(index==1){
					text += ' > '+$(this).next().text();
				}if(index==2){
					text += ' > '+$(this).next().text();
				}else if(index==0){
					text += $(this).next().text();
				}
			});
			em.html(text);
		},
		"transformData" : function(){
			var det = $('.detailspecification') , obj = [] ,arg = '';
			det.find('label').each(function(){
				if($(this).attr('c') && $(this).attr('c').split(',').length){
					obj.push({
						"f_id"   : $(this).attr('f'),
						"f_name" : $(this).attr('f_name'),
						"c_id"   : $(this).attr('c') ? $(this).attr('c').split(',') : [],
						"c_name" : $(this).attr('c_name') ? $(this).attr('c_name').split(',') : [],
						"length" : $(this).attr('c') ? $(this).attr('c').split(',').length : 0
					});
				}
			});
			this.creatTable(obj);
		},
		'getlabelData' : function(parentid ,label){
			var html = goodsIcon = '',exit = [];
			label.siblings('label').each(function(){
				if($(this).attr('f')) exit.push($(this).attr('f'));
			})
			_ut.ajax('/itemCenter/queryItemSpecificationByPid' ,'GET', {"parentId":parentid} ,function(data){ 
				if(data.status==200 && data.data.length){
					if(parentid==0){
						for(i=0;i<data.data.length;i++){
							var isexit = false;
							if(data.data[i].subSpecification!=0) goodsIcon = '<i class="goodsIcon"></i>';
							for(n=0;n<exit.length;n++){
								if(exit[n]==data.data[i].id){
									isexit = true;
								}
							}
							if(!isexit){
								if(label.attr('f')==data.data[i].id){
									html += '<li class="active" dataid="'+data.data[i].id+'" primaryId="'+data.data[i].primaryId+'"><em class="articleIcon"></em><b>'+data.data[i].name+''+goodsIcon+'</b><ul class="two"></ul></li>';
								}else{
									html += '<li dataid="'+data.data[i].id+'" primaryId="'+data.data[i].primaryId+'"><em class="articleIcon"></em><b>'+data.data[i].name+''+goodsIcon+'</b><ul class="two"></ul></li>';
								}
							}
						}
					}else{
						for(i=0;i<data.data.length;i++){
							var carr = label.attr('c');
							if(carr && carr.match(data.data[i].id) && carr.match(data.data[i].id).length){
								html += '<li class="active" dataid="'+data.data[i].id+'" primaryId="'+data.data[i].primaryId+'"><em class="articleIcon"></em>'+data.data[i].name+'</li>';
							}else{
								html += '<li dataid="'+data.data[i].id+'" primaryId="'+data.data[i].primaryId+'"><em class="articleIcon"></em>'+data.data[i].name+'</li>';
							}
						}
					}
				}
			});
			return html;   
		}, 
		'creatTable' : function(a){
			var thead = $('.dtab thead') ,tbody = $('.dtab tbody') ,num = 1, html = '';
			var n=[];
			var tr = '' ,td = '' ,rowspan = '' ,th = '';
			
			var hasremove = false;
			for(ff=0;ff<a.length;ff++){
				n.push(a[ff]);
				
			}
			if(!n.length ){
				thead.html('');
				tbody.html('');
				$('div.pl').hide();
				$('#inventory').remove();
				return;
			}
			
			for(x=0;x<n.length;x++){ 
				if(n[x].length!=0){
					num *= n[x].length;
					td += '<td></td>';
					th += '<th>'+n[x].f_name+'</th>';
				}
			}

			var usetypep = $('input[name=price]').val() ? $('input[name=price]').val() : 0,
			    usetypes = $('input[name=stock]').val() ? $('input[name=stock]').val() : 0;

			if(n[0] && n[0].length>0){
				td += '<td><input type="text" value="'+usetypep+'" usetype="p" maxlength="7" /></td><td><input type="text" oninput="this.value=this.value.replace(/^00+/,0)" maxlength="7" value="'+usetypes+'" usetype="s"/></td>'; 
				th += '<th>价格</th><th>库存</th>';
			}
			for(i=0;i<num;i++){
				tr += '<tr>'+td+'</tr>';
			}
			tr = $(tr);
			
			var p = l = m = 0 ,mark1 = mark2 = mark3 = '';
			tr.each(function(index){
				if(num>0 && index==0){
					$(this).find('td').eq(0).attr('rowspan',num/n[0].length).text(n[0].c_name[p]); // 1级别
					mark1 = n[0].c_id[p];
				}else{
					if(n[0] && index%(num/n[0].length)==0){
						mark1 = '';
						++p; // 1级
						if(n[2] && n[2].length>0) l=0;
						$(this).find('td').eq(0).attr('rowspan',num/n[0].length).text(n[0].c_name[p]); // 1级别
						mark1 = n[0].c_id[p];
					}else{
						$(this).find('td').eq(0).attr('remove','1');
					}
				}
				
				if(!a[2]){
					a[2] = {'length':0};
				}
				if(a[2] && a[2].length<=0 && a[1] && a[1].length>0){
					if(index%n[1].length==0){
						l=0; //2 级别
						mark2 = '';
					}
					mark2 = n[1].c_id[l];
					$(this).find('td').eq(1).text(n[1].c_name[l++]);// 2级别;
				}
				
				if(n[2] && n[2].length>0){
					if(index%n[2].length==0){
						m = 0; // 3级别
						mark2 = n[1].c_id[l];
						$(this).find('td').eq(1).attr('rowspan',n[2].length).text(n[1].c_name[l++]);// 2级别;	
					}else{
						$(this).find('td').eq(1).attr('remove','1');
					}
					mark3 = n[2].c_id[m];
					$(this).find('td').eq(2).text(n[2].c_name[m++]);	 //3级别
				}
				var mark = '';
				if(mark1!='') mark += mark1;
				if(mark2!='') mark += '_'+mark2;
				if(mark3!='') mark += '_'+mark3;
				$(this).find('input').attr('mark',mark);
			});
			tr.find('td[remove]').remove();
			
			for(h=0;h<tr.length;h++){
				html += tr[h].outerHTML;
			}
			thead.html('').html(th);
			tbody.html('').html(html);
			$('div.pl').show();
			this.inventory();
		},
		'inventory':function(){
			var a = 0;
			$('input[usetype=s]').each(function(){
				a += ($(this).val()*1);
			});
			if($('.dtab table th').length){
				if($('#inventory').length){
					$('#inventory').find('b').text(a);
				}else{
					$('.dtab').append('<p id="inventory">总库存：<b>'+a+'</b>件</p>');
				}
				$('input[name=inventory]').val(a);
			}
		},
		'detailimgNum' : function(){
			var path = [] ,ul = $('div.upimg ul') ,li = $('<li><span></span><input type="file" multiple="" accept="image/jpeg,image/gif,image/png,.JPEG"></li>');
			ul.children().each(function(){
				$(this).attr('path') && path.push($(this).attr('path'));
			})
			path.length ? ul.next().val(path.join(',')) : ul.next().val('');
		},
		'detailCatshow' : function(parentid ,index){
			var selectId = $('input[index='+(index*1+1)+']').val();
			
			_ut.ajax('/itemCenter/queryItemCategorysByPid' ,'GET', {"parentId":parentid} ,function(data){
				var html = '';
				if(data.status==200){
					for(i=0;i<data.data.length;i++){
						var goodsIcon = selectId==data.data[i].id ? '<i class="goodsIcon on"></i>' : '<i class="goodsIcon"></i>';
						if((index*1+1)!=2 && data.data[i].submenu!=0){
							html += '<li id="'+data.data[i].id+'" primaryid="'+data.data[i].primaryId+'">'+goodsIcon+'<em>'+data.data[i].name+'</em><b class="goodsIcon"></b></li>';
						}else{
							html += '<li id="'+data.data[i].id+'" primaryid="'+data.data[i].primaryId+'">'+goodsIcon+'<em>'+data.data[i].name+'</em></li>';
						}
					}
					(html!='') && $('.detailaddcat').find('.nano[index='+(index*1+1)+']').find('ul').html(html).end().show().nanoScroller({alwaysVisible: false});
				}
			});
		},
		'itemSelect' : function(node){
			var parent = node.closest('tr') ,tb = $('.newsBody table') ,footerSet = $('.newsFooter');
			parent.hasClass('on') ? parent.removeClass('on') : parent.addClass('on') && footerSet.children('a.newsHandle').addClass('selected');
			if(!tb.find('tbody tr.on').length) footerSet.children('a.newsHandle').removeClass('selected');

			tb.find('tbody tr.on[release=no]').length ? footerSet.find('a.newsHandle.newsRelease').addClass('selected') : footerSet.find('a.newsHandle.newsRelease').removeClass('selected');
			tb.find('tbody tr.on[release!=no]').length ? footerSet.find('a.newsHandle.newsCancle').addClass('selected') : footerSet.find('a.newsHandle.newsCancle').removeClass('selected');
			tb.find('tbody tr.on').length == tb.find('tbody tr').length ? footerSet.find('.selectAll').addClass('on') : footerSet.find('.selectAll').removeClass('on');
		},
		"getTableDate" : function(){
			var arr = [];
			$('.newsBody table tbody tr.on').each(function(){
				arr.push($(this).attr('itemid'));
			});
			return arr;
		},
		"releaseItem" : function(id ,status){
			id.length && _ut.ajax('/itemCenter/updateItemsStatus' ,'POST' ,{"itemId":id.join(',') ,"publishStatus":status} ,function(data){
				if(data.status==200){
					for(i=0;i<id.length;i++){
						status=='hasPublished' ? $('tr[itemid='+id[i]+']').removeClass('on').removeAttr('release').find('a.release').attr('title','发布') : $('tr[itemid='+id[i]+']').removeClass('on').attr('release','no').find('a.release').attr('title','撤回');
						$('.newsFooter .selectAll,.newsFooter .newsHandle ').removeClass('active').removeClass('selected');

					}
				}
			});
		},
		"deleteItem" : function(id){
			var pageNo = parseInt($(".pageList").find(".active").find("a").text());
			_ut.modal("j","",function(){
				$(".modalBox  .content p").text("您确定要删除商品吗？");
				$(".modalBox .set .cancle, .modalBox .modalClose").on("click",function(){
					$.fn.colorbox.close();
				});
				$(".modalBox .set .continue").off().on("click",function(){
					id.length && _ut.ajax('/itemCenter/deleteItem' ,'POST' ,{"itemId":id.join(',')} ,function(data){
						if(data.status==200){
							window.location.href = "/itemCenter/index.html?groupId=" + groupId;
						}else{
							alert(data.msg);
						}
					}); 
				});
			});
		},
		"getcategoryObj" : function(){
			var categoryObj = [];
			return {
				'setCat' : function(dataid ,primaryId ,name ,parentId ,action){
					var isExitRemove = true;
					for(i=0;i<categoryObj.length;i++){
						if(categoryObj[i].id==dataid && categoryObj[i].primaryId==primaryId){
							categoryObj[i].action = action;
							isExitRemove = false;
						}
					}
					isExitRemove && categoryObj.push({"id":dataid ,"name":name ,"primaryId":primaryId*1 ,"parentId":parentId*1,"action":action});
				},
				'removeCat' : function(primaryId){
					var parent = null;
					for(i in categoryObj){
						if(categoryObj[i].primaryId==primaryId){
							categoryObj[i] = '';
						} 
						if(categoryObj[i].parentId==primaryId){
							parent = categoryObj[i].primaryId;
						}
					}   
					if(parent!=null){
						arguments.callee(parent);
					}else{
						categoryObj = $.grep(categoryObj,function(n,i){ return n!=''; });
					} 
				},
				'updataCat' : function(dataid ,primaryId ,name ,parentId ,isExit){ // isexit  1 数据库存在  0后来加的
					if(!isExit){
						for(i in categoryObj){
							if(categoryObj[i].primaryId==primaryId){
								categoryObj[i].name = name;
							}
						}
					}else{
						this.setCat(dataid ,primaryId ,name ,parentId ,'update');
					}
				},
				getlength : function(){
					return categoryObj.length;
				},
				'getCat' : function(){
					return JSON.stringify(categoryObj);
				},
				'getCatObj' : function(){
					return categoryObj;
				},
				'clear' : function(){
					categoryObj = [];
				}
			}
		},
		"editStatus" : function(id){
			var specificationValue = JSON.parse($('input[name=specificationValue]').val()) ,arr = [] ,label = $('.detailspecification label') ,price;
			for(x in specificationValue){
				arr.push({'a':x.replace(/@/,'') ,'b':specificationValue[x].split(',')});
			}
			if(!arr.length) return;
			_ut.ajaxJson('/itemCenter/queryItemDetails' ,'GET' ,{"id":id} ,function(data){
				price = data.data.itemDetails.split(',');
				for(var i=0;i<arr.length;i++){
					var c_name = [];
					label.eq([i]).attr('f',arr[i].a).attr('f_name',data.data.itemSpecificationMap[arr[i].a]).attr('c',arr[i].b).children('b').text(data.data.itemSpecificationMap[arr[i].a]);
					for(j=0;j<arr[i].b.length;j++){
						c_name.push(data.data.itemSpecificationMap[arr[i].b[j]]);
					}
					label.eq([i]).attr('c_name',c_name.join(','));
				}
			});
			this.transformData();
			for(var i=0;i<price.length;i++){
				var a = price[i].split('&') ,b = a[1].split('_');
				$('input[mark='+a[0]+'][usetype='+b[0]+']').val(b[1]);
				$('input[mark='+a[0]+'][usetype='+b[2]+']').val(b[3]);
			}
			this.inventory();
		},
		"removeNode" : function(removeId){ 
			var node = $('.goods table').find('*[parentid='+removeId+']') ,id = [];
			for(i=0;i<node.length;i++){
				id.push($(node[i]).attr('primaryId'));
				$(node[i]).remove();
			}

			for(i=0;i<id.length;i++){
				$('.goods table').find('*[parentid='+id[i]+']').remove();
			}
		},
		"manageCatr" : function(){
			var that = this;
			this.categoryObj.clear();
			$('.markSet').addClass('active');
			_ut.modal("itemCategory",function(){
				that.levelBtn();
			},function(){
				var goods = $('.goods') ,levelcont = goods.find('.nano-content');
				that.showCatData('' ,levelcont);

				goods.find('.hd span.goodsIcon,a.btn').click(function(){ 
					$(this).hasClass('close') || $(this).hasClass('goodsIcon') ? that.closeBox() : that.categoryObj.getlength()!=0 ? _ut.ajaxJson('/itemCenter/cudItemCategory','POST', that.categoryObj.getCat() ,function(data){
						if(data.status==200){
							var a = that.categoryObj.getCatObj() ,id = $('input[name=categoryId]').val();
							for(x in a){
								if(a[x].id){
									var li = $('.detailaddcat').find('li[id='+a[x].id+']');
									a[x].action=='update' && li.find('em').text(a[x].name);
									a[x].action=='removeCategory' && id==a[x].id && li.remove() && $('input[name=categoryId]').val($('.detailaddcat li i.on:last').closest('li').attr('id') || '');
								}
							}
							that.closeBox();
						} 
					}) : that.closeBox();
				});

				goods.find('.nano-content').on('click','p span',function(){ 
					var primaryId = $(this).parent().attr('primaryId') ,hidePri = $(this).parent().siblings('p.active').attr('primaryId') ,hidePar = $(this).parent().siblings('p.active').attr('parentid');
					!$('div[levPar='+primaryId+']').length && that.showCatData(primaryId ,levelcont);
					$('div.level1').children().length ? $('b.level2').show() && $('div.level2').find('p[primaryid]').length ? $('b.level3').show() : $('b.level3').hide() : $('b.level2').hide();

					$(this).parent().addClass('active').siblings('p').removeClass('active');
					goods.find('div[levPar='+primaryId+']').show().children('p').removeClass('active');
					goods.find('div[levPar='+hidePri+']').hide().children('p').removeClass('active');
					!(hidePar*1) && goods.find('div[levPar='+hidePri+']').length && $('.nano-content.level3').children('div[levPar]').hide();
				}).on('click','p i.articleIcon',function(){
					var primaryId = $(this).closest('p').attr('primaryId'),
						dataid = $(this).closest('p').attr('dataid') ? $(this).closest('p').attr('dataid') : '',
						name = $(this).closest('p').find('span').text();

					$(this).closest('p').addClass('active').siblings().removeClass('active');

					if($(this).hasClass('remove')){
						if($(this).closest('p[primaryid]').attr('parentid')==0){
							$('b.level2,b.level3').hide();
						}
						if($(this).closest('p[primaryid]').attr('edit')=='no'){
							that.categoryObj.setCat(dataid ,primaryId ,name ,'' ,'removeCategory');
						}else{
							that.categoryObj.removeCat(primaryId);
						}
						$(this).closest('p[primaryid]').remove();
						that.removeNode(primaryId);
						if($('.selectCat .cont[id='+primaryId+']').length){
							$('.selectCat .cont').each(function(){
								$(this).find('span').text($(this).find('span').attr('old'));
							});
							$('.selectCat .cont[id='+primaryId+']').removeAttr('id');
						}
						$('.nano').nanoScroller({alwaysVisible: false});
					} 

					if($(this).hasClass('edit')){
						var node = $(this).parent().prev() ,oldname = node.text() ,ipt = $('<input type="text" maxlength="6" value="'+oldname+'"/>') ,dataid = node.closest('p').attr('dataid') ? node.closest('p').attr('dataid') : '';
						node.html('').append(ipt);
						ipt.focus().blur(function(){
							var name = $.trim($(this).val())=='' ? '分类名称' : $.trim($(this).val());
							name = name.replace(/[，,<>]/ig,'');
							ipt.off();
							node.html(name);
							that.categoryObj.updataCat(dataid ,node.closest('p').attr('primaryid') ,name ,node.closest('p').attr('parentid') ,node.closest('p').attr('edit')=='no' ? 1 : 0);
						}).bind('keydown',function(event){
							if(event.keyCode==13) $(this).blur();
						});
					}
				});

				goods.find('b').click(function(){
					var name ='' ,level = $(this).attr('class'),
						levelcontent = levelcont.filter('.'+level.match(/level[0-9]/ig)[0]),
						editTempl = $('<p><label><em class="gbtn"><input type="text" maxlength="6" placeholder="分类名称"/></em></label></p>'),
						parentId = 0,
						levelVal = level.match(/[0-9]/ig)[0],
						levPar = '';

					if(levelVal>1){
						parentId = $('div.nano-content.level'+(levelVal-1)).find('p.active').attr('primaryId');
						if(!parentId) return;
						$('div.nano-content.level'+(levelVal*1+1)).children('div[levPar]').hide();
						if($('div[levPar='+parentId+']').length){
							levPar = $('div[levPar='+parentId+']').show();
						}else{
							levPar = $('<div levPar='+parentId+'></div>');
							levelcontent.append(levPar);
						}
					}else{
						$('div.nano-content.level2,div.nano-content.level3').children('div[levPar]').hide();
						levPar = levelcontent;
					}
					levPar.append(editTempl).siblings('div[levPar]').hide().find('p').removeClass('active');
					
					editTempl.find('input').focus().blur(function(){ 
						that.addCat($(this) ,parentId ,levPar ,'addCategory');
					}).bind('keydown',function(event){
						if(event.keyCode==13) $(this).blur();
					}).end().find('i.articleIcon').click(function(){ 
						$(this).closest('p').remove();
						that.levelBtn(); 
					});
				});
			},function(){
				$('.markSet').removeClass('active');
				that.catshow($('.detailaddcat').children('em'));
			});
		},
		"specification" : function(){
			var that = this;
			this.categoryObj.clear();
			$('.markParam').addClass('active');
			_ut.modal("itemSpecification",function(){
				$(".goods").find('.nano').nanoScroller({alwaysVisible: false});
			},function(){
				var goods = $('.goods');
				that.showSpecification();

				goods.find('.hd span.goodsIcon,a.btn').click(function(){ 
					$(this).hasClass('close') || $(this).hasClass('goodsIcon') ? that.closeBox() : that.categoryObj.getlength()!=0 ? _ut.ajaxJson('/itemCenter/cudItemSpecification','POST', that.categoryObj.getCat() ,function(data){
						data.status==200 && that.closeBox();
					}) : that.closeBox();
				});

				goods.on('click','table span.add',function(){
					var btn = $(this).closest('tr'),
						id = that.creatID(),
						sysmtext = '示例：尺寸',
						sysmtext2 = '示例：XXL',
						html = '<tr><td><em class="gbtn" parentId="0" primaryId="'+id+'"><i class="articleIcon"></i><p>'+sysmtext+'</p></em></td><td><span class="add" primaryId="'+id+'"><i class="goodsIcon"></i>添加</span></td></tr>';
					if(!$(this).parent().index()){
						if(btn.prevAll(':visible').length < 4){
							btn.before($(html));
						}else{
							$(this).parent().next().html('<span class="add" primaryId="'+id+'"><i class="goodsIcon"></i>添加</span>');
							$(this).parent().html('<em class="gbtn" parentId="0" primaryId="'+id+'"><i class="articleIcon"></i><p>'+sysmtext+'</p></em>');
						}
						that.categoryObj.setCat('' ,id ,sysmtext ,0 ,'addSpecification');
					}else{
						if(!$(this).parent().find('em[parentid]').length){
							$(this).parent().prepend($('<em class="gbtn" parentid="'+$(this).attr('primaryid')+'" primaryId="'+id+'"><i class="articleIcon"></i><p>'+sysmtext2+'</p></em>'));
						}else{
							$(this).before($('<em class="gbtn" parentid="'+$(this).attr('primaryid')+'" primaryId="'+id+'"><i class="articleIcon"></i><p>'+sysmtext2+'</p></em>'));
						}
						//$(this).siblings().length==10 && $(this).hide();
						that.categoryObj.setCat('' ,id ,sysmtext2 ,$(this).attr('primaryid') ,'addSpecification');
					}
					$(".goods").find('.nano').nanoScroller({alwaysVisible: false});
				});

				goods.on('click','table em.gbtn i',function(){
					var node = $(this).parent() ,primaryid = node.attr('primaryid') ,parentid = node.attr('parentid') ,dataid = node.attr('dataid') ? node.attr('dataid') : '';
					if(node.attr('edit')=='no'){
						that.categoryObj.setCat(dataid ,primaryid ,node.find('p').text() ,parentid ,'removeSpecification');
					}else{
						that.categoryObj.removeCat(primaryid);
					}

					if($(this).parent().attr('parentid')==0 && $(this).closest('tr').siblings().length==4){
						var add = true;
						$(this).closest('tr').siblings().each(function(){
							if($(this).find('td').eq(0).find('span.add').length){
								add = false;
							}
						})
						add && $(this).closest('tbody').append($('<tr><td><span class="add"><i class="goodsIcon"></i>添加规格</span></td><td>&nbsp;</td></tr>'));
					}else if($(this).parent().attr('parentid')==0){
						$(this).closest('tbody').find('tr:last').show();
					}

					// if($(this).parent().attr('parentid') && $(this).parent().siblings().length==10){
					// 	$(this).closest('td').find('span.add').show();
					// }

					if(parentid==0) $(this).closest('tr').remove();
					$(this).closest('em[primaryid]').remove();
				});

				goods.on('click','table em.gbtn p',function(){
					var len = $(this).closest("td").eq(0).index() == 0 ? "6" : "16",
						node = $(this) ,input = $('<input old="'+$(this).text()+'" type="text" maxlength="'+len+'" value="'+$(this).text()+'"/>') ,dataid = $(this).closest('em.gbtn').attr('dataid') ? $(this).closest('em.gbtn').attr('dataid') : '';
					if(!$(this).find('input').length)$(this).html('').append(input);
					input.focus().blur(function(){
						var name = $.trim($(this).val())=='' ? $(this).attr('old') : $.trim($(this).val());
						name = name.replace(/[，,<>]/ig,''); 
						input.off();
						node.html(name);
						that.categoryObj.updataCat(dataid ,node.closest('em').attr('primaryid') ,name ,node.closest('em').attr('parentid') ,node.closest('em').attr('edit')=='no' ? 1 : 0);
					}).on("keydown",function(event){
						if(event.keyCode==13) $(this).blur();
					});
				});

			},function(){
				$('.markParam').removeClass('active');
			});
		},
		"addCat" : function(node ,parentId ,levPar ,action){
			var primaryId = this.creatID() ,levelTem = '';
		
			levelTem = $('<p class="active" parentId="'+parentId+'" primaryId="'+primaryId+'" ><span></span><label><i class="articleIcon edit"></i><i class="articleIcon remove"></i></label></p>');

			name = $.trim(node.val())=='' ? '分类名字' : $.trim(node.val());
			name = name.replace(/[，,<>]/ig,'');
			levelTem.find('span').html(name);

			node.closest('p').remove();
			levPar.children('p').removeClass('active').end().append(levelTem);

			this.categoryObj.setCat('' ,primaryId ,name ,parentId ,action);
			this.levelBtn();
		},
		"closeBox" : function(){
			$.colorbox.close();
			this.categoryObj.clear();
		},
		"levelBtn" : function(){
			$('div.level1').children().length ? $('b.level2').show() && $('div.level2').find('p[primaryid]').length ? $('b.level3').show() : $('b.level3').hide() : $('b.level2').hide();
			$(".goods").find('.nano').nanoScroller({alwaysVisible: false});
		},
		"creatID" : function(){
			return new Date().getTime().toString() + Math.round(Math.random()*100).toString();
		},
		"showCatData": function(parentid ,levelcont){
			var parentid = parentid || 0 ,html = '' , levPar = '', that = this;
			if(parentid!=0){
				levelcontent = levelcont.filter('.level'+($('p[primaryid='+parentid+']').closest('div.nano-content').attr('class').match(/[0-9]/ig)[0]*1+1));
				if(!levelcontent.children('div[levPar='+parentid+']').length){
					levPar = $('<div levPar="'+parentid+'"></div>');
					levelcontent.append(levPar);
				}else{
					levPar = levelcontent.children('.div[levPar='+parentid+']');
				}
			}else{ 
				levPar = levelcont.filter('.level1');
			}
			_ut.ajax('/itemCenter/queryItemCategory' ,'GET', {"parentId":parentid} ,function(data){
				if(data.status==200){
					for(i=0;i<data.data.length;i++){
						html += '<p dataid="'+data.data[i].id+'" parentid="'+data.data[i].parentId+'" primaryid="'+data.data[i].primaryId+'" edit="no"><span>'+data.data[i].name+'</span><label><i class="articleIcon edit"></i><i class="articleIcon remove"></i></label></p>';
					}
					levPar.append($(html));
					that.levelBtn();
				}
			});
		},
		"showSpecification": function(){
			_ut.ajax('/itemCenter/queryItemSpecification' ,'GET' ,{} ,function(data){
				var html = '' ,secondhtml ='' ,res = '';
				if(data.status==200){
					for(i=0;i<data.data.length;i++){ 
						var parentid = data.data[i].parentId ? data.data[i].parentId : 0;
						if(data.data[i].usedAmount!=0){
							html = '<td><em edit="no" dataid="'+data.data[i].id+'" parentId="'+parentid+'" primaryid="'+data.data[i].primaryId+'" class="gbtn"><p>'+data.data[i].name+'</p></em></td>';
						}else{
							html = '<td><em edit="no" dataid="'+data.data[i].id+'" parentId="'+parentid+'" primaryid="'+data.data[i].primaryId+'" class="gbtn"><i class="articleIcon"></i><p>'+data.data[i].name+'</p></em></td>';
						}
						_ut.ajax('/itemCenter/querySecondItemSpecification' ,'GET' ,{"primaryId":data.data[i].primaryId} ,function(seconddata){
							for(j=0;j<seconddata.data.length;j++){
								if(seconddata.data[j].usedAmount!=0){
									secondhtml += '<em edit="no" dataid="'+seconddata.data[j].id+'" parentId="'+seconddata.data[j].parentId+'" primaryid="'+seconddata.data[j].primaryId+'" class="gbtn"><p>'+seconddata.data[j].name+'</p></em>';
								}else{
									secondhtml += '<em edit="no" dataid="'+seconddata.data[j].id+'" parentId="'+seconddata.data[j].parentId+'" primaryid="'+seconddata.data[j].primaryId+'" class="gbtn"><i class="articleIcon"></i><p>'+seconddata.data[j].name+'</p></em>';
								}
							}
							
							secondhtml = '<td>' + secondhtml + '<span primaryid="'+data.data[i].primaryId+'" class="add"><i class="goodsIcon"></i>添加</span></td>';

						});
						res += "<tr>" + html + secondhtml + "</tr>";
						secondhtml = ''; 
					} 
					$('.Specification table tbody tr').before($(res));
					$(".goods").find('.nano').nanoScroller({alwaysVisible: false});
					if(data.data.length==5) $('.Specification table tbody tr:last').hide();
				}
			});
		},
		"getSearchRequire": function(arg){
			var data = {
				"categoryId" : $('.selectCat').children('.cont[dataid]:last').attr('dataid'),
				"publishStatus" : $('.releaseStatus').attr('status'),
				"name" : $.trim($('.seachWarp input').val()),
				"startDate" : $('.dateStart').val() +' 00:00:00',
				"endDate" : $('.dateEnd').val() +' 23:59:59',
				"pageNo" : $('.newsPaging li.active').text(),
				"orderBy" : $('th.asc').attr('name') || $('th.desc').attr('name') || "CREATE_DATE",
				"order" : $('.newsBody table thead tr').attr('status') || "Desc" //da xiao
			},
			params = $.extend(data, arg || {});
			this.showItemData('/itemCenter/queryItem' ,params);
		},
		"showItemData" : function(url ,searchData){ 
			var table = $('.newsBody table') ,footerSet = $('.newsFooter') ,tr = page = '' ,dataCopy = searchData;
			_ut.ajax('/itemCenter/queryItem' ,'GET' ,searchData ,function(data){
				
				if(!data.data.totalCount){
					if($('.nodata2').is(':hidden')) $('.nodata').show();
					table.find('tbody').html('');
					footerSet.find('.newsPaging').hide().end().find('span.total em').text(0);
				}else{
					for(i=0;i<data.data.data.length;i++){
						release = data.data.data[i].item.publishStatus!='hasPublished' ? 'release="no"' : '';
						status = data.data.data[i].item.publishStatus!='"hasPublished"' ? '<a href="javascript:;" class="release articleIcon" title="发布"></a>' : '<a href="javascript:;" class="release articleIcon" title="撤回"></a>';
						tr += '<tr '+release+' categorynames="'+data.data.data[i].categoryName+'" pic="'+data.data.data[i].item.picPath+'" itemid="'+data.data.data[i].item.id+'"><td><em '+release+' class="articleIcon action"></em><span>'+data.data.data[i].item.name+'</span></td><td>'+data.data.data[i].item.currentPrice+'</td><td>'+data.data.data[i].item.pvVolume+'</td><td>'+data.data.data[i].item.createDate+'</td><td><a href="'+'/itemCenter/editItem.html?groupId='+groupId+'&id='+data.data.data[i].item.id+'" class="edit articleIcon" title="编辑"></a>'+status+'<a href="javascript:;" class="delete articleIcon" title="删除"></a></td></tr>';
					}
					$('.nodata').hide();
					table.find('tbody').html(tr);
					table.find('tbody tr').length < 10 && table.find('tbody tr:last').css({'border-bottom':'1px dashed #dcdcdc'});
					footerSet.find('span.total em').text(data.data.totalCount);
					
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
					
					if(pageEnd<dataCopy.pageNo) dataCopy.pageNo = 1;
					for(i=pageStart;i<=pageEnd;i++){
						if(dataCopy.pageNo==i){
							page += '<li class="active"><a href="javascript:;">'+i+'</a></li>';
						}else{
							page += '<li><a href="javascript:;">'+i+'</a></li>';
						}
					}

					(data.data.totalCount <= dataCopy.pageNo * data.data.pageSize) ? footerSet.find('.nextPage').hide() : footerSet.find('.nextPage').show();
					(dataCopy.pageNo==1 && data.data.pageSize) ? footerSet.find('.prevPage').hide() : footerSet.find('.prevPage').css('display','inline-block');
					footerSet.find('.newsPaging').show().find('.pageList').html(page);
					
					footerSet.find('.selectAll').removeClass('active');
				}

			});
		}
	};
	itemCenter.init();
});