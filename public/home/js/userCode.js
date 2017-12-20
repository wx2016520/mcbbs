define(['utility'],function(_ut) {
    var userCode = {
		"init" : function(){
			_ut.refreshImgCode($('.imgCheck img'));
			
			$('.getcode').click(function(){
				var datatype = $(this).attr('datatype') ,imgcode = $.trim($('.imgcode').val()) ,logintype = $(this).attr('logintype') ,userval = $(this).attr('userval');
				if($(this).hasClass('disable')){
					return;
				}else if(!imgcode) {
					$('p.error').html('验证码有误').show();
					return;
				}
				_ut.getPhoneCode($('.imgcode').next() ,$(this) ,$('p.error')  ,{"loginId":userval ,"loginIdType":logintype ,"capImgCode":imgcode ,"actionType":datatype});
			});
			
			$('a.next').click(function(){
				if($.trim($('.codeCheck input').val())!='' && $('p.error').css("opacity")==0){
					_ut.removeSession('userId'+userId);
					$('#checkPhonePfrom,#checkEmailForm').submit();
				}
			})
			
		}
	}
	
	userCode.init();
    return userCode;
});
