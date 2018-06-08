var userFlag = false;
var lotteryFlag = false;
var prizeFlag = false;

$(document).ready(function () {
	sessionStorage.setItem('indexFlag', 'hang');
})

Q.reg('scratch', function () {
    // 校验是否经过授权登录
    $.getAct = function () {
        getActivity();
    }
    getActivity();
    $(".guayigua h1").html("");
    $('.index').show();
    $('.scratch').css("opacity","1");
    lotteryFlag = false;
    wipeBind();
})

/* 路由启动函数 */
Q.init({
    key:'!',/* url里#和url名之间的分割符号 默认为感叹号 */
    index:'scratch',/* 首页地址 如果访问到不能访问页面也会跳回此页 */
    pop:function(L,arg){/* 每次有url变更时都会触发pop回调 */
    }
});

// 手指离开触发
var obj = document.getElementById('guaGray');
obj.addEventListener('touchend', function (event) {
    if (userFlag) {
		return;
	} else {
		var dayCount = Number($('#dayCount').html());
		if(dayCount <= 0){
			layer.open({content: '当日抽奖次数已用完',skin: 'msg',time: 2});
			wipeBind();
			return false;
		}else{
			 $(".coverlayer").show();
			 var win = setInterval(function(){
				if($("#winFlag").val() == "1"){
					clearInterval(win);
					commitLottery();
					$(".wing span").html($("#prizeName").val());
					$(".wPrize h3").html($("#prizeLevel").val());
					$(".coverlayer").show();
					layer.open({
						type:1,
						shadeClose:false,
						content: $('.Winning').html()
					});	
					addTransparent();
                } else if ($("#winFlag").val() == "0") {
					clearInterval(win);
					layer.open({
						type:1,
						shadeClose:false,
						content: $('.NotWinning').html()
					});
					addTransparent();
				}
			},200);
		}
	}
}, false);

obj.addEventListener('touchstart', function(event) {
	if(userFlag){
		//用户不存在，新增领奖人信息	
		layer.open({
			type:1,
			shadeClose:false,
			content: $('.addUser').html()
		});
		addTransparent();
		wipeBind();
	}else{
		var dayCount = Number($('#dayCount').html());
		if(dayCount > 0){
			getLottery();
		}	
	}
}, false);

//获取活动信息
function getActivity(){
	var mdata= {};
    $.commonAjax({
        type: 'GET',
        url: '/activity/getActivity',
        data: mdata,
        success: function(data){
        	if (data.code == "0000"){
        		//音乐播放
				var media = document.getElementById("musicBox");
			    media.src = data.data.activityMusic;
				var flag = sessionStorage.getItem('music');
				if(flag=="false"){
					media.pause();
					$("#musicPlay").show();
					$("#musicStop").hide();
				}else{
					media.play();
					$("#musicPlay").hide();
					$("#musicStop").show();
				}
    			
				if($('#dayCount').html()==""){
					$('#dayCount').html(data.data.dayCount);
				}
	        	
	        	var result = '';
	            //首页奖品列表默认显示前4个
	            var arrLen = data.data.prizeList.length;
	            arrLen = arrLen > 4 ? 4 : arrLen;
	            
	            var prizeList = data.data.prizeList;
	            for(var i = 0; i < arrLen; i++){
	                result +=   '<li>'+prizeList[i].prizeLevel+'：'+prizeList[i].prizeName
	                			+' 数量：'+prizeList[i].prizeCount+'</li>';
	        	}
	            
		        $('#prizeLists').html(result);
		        
				//$.wxConfig();
		        getUser();
        		
        	}else{
        		$.closeBridgeWindow(data.message);
        	}
        },
    });
}

//领奖人信息检查
function getUser() {
    $.commonAjax({
        type: 'GET',
        url: '/activity/getUser',
        load: 'Noloading',
        success: function(data){
        	if (data.code == "0000"){
        		$('#dayCount').html(data.data.dayCount);
				
		        //先加载完数据，再显示页面
		        $('.index').show();
				
			//用户不存在，新增领奖人信息	
        	}else if(data.code == "6001"){
			  	layer.open({
			  		type:1,
			  		shadeClose:false,
					content: $('.addUser').html()
			  	});
			  	addTransparent();
			  	
			  	userFlag = true;
			  	wipeBind();
		        //先加载完数据，再显示页面
		        $('.index').show();
        	}
        },
    });
};


//新增领奖人信息
$(document).on('click', '.addSubmit', function(){
	
	var userName = $(".layui-m-layercont #userName").val();
	var mobile = $(".layui-m-layercont #mobile").val();
	if(userName == ""){
		 layer.open({content: '请填写姓名',skin: 'msg',time: 2});
		 return false;
	}
	
	if(userName.length < 2){
		 layer.open({content: '姓名长度必须大于2位',skin: 'msg',time: 2});
		 return false;
	}
	
	if(mobile == ""){
		 layer.open({content: '请填写手机号码',skin: 'msg',time: 2});
		 return false;
	}
	
	if(!/^1\d{10}$/.test(mobile)){
		 layer.open({content: '请填写正确手机号码',skin: 'msg',time: 2});
		 return false;
	}
	
	var mdata= {};
	mdata.userName = userName;
	mdata.mobile = mobile;
    $.commonAjax({
        type: 'POST',
        url: '/activity/addUser',
        data: mdata,
        success: function(data){
        	
        	if (data.code == "0000"){
        		$('#dayCount').html(data.data.dayCount);
        		
      			layer.open({type: 2,content: '加载中',shadeClose: false});
        		setTimeout(function(){layer.closeAll();},2000);
        		userFlag = false;
        		shakeF = 1
        	}else{
				layer.open({content: data.message,skin: 'msg',time: 2});
				userFlag = true;
				shakeF = 1
			}
        },
    });
})

//获取奖券
function getLottery() {
	lotteryFlag = true;
	prizeFlag = true;
	var mdata= {};
    $.commonAjax({
        type: 'GET',
        url: '/activity/getLottery',
        data: mdata,
        load: 'Noloading',
        success: function(data){
        	if (data.code == "0000"){
        		if(data.data.winFlag == "1"){
	        		$("#activityRecordId").val(data.data.activityRecordId);
	        		$("#winFlag").val(data.data.winFlag);
	        		$("#prizeName").val(data.data.prizeName);
	        		$("#prizeLevel").val(data.data.prizeLevel);
	        		$(".guayigua h1").html(data.data.prizeLevel);
        		}else{
	        		$("#activityRecordId").val(data.data.activityRecordId);
	        		$("#winFlag").val(data.data.winFlag);
	        		$("#prizeName").val(data.data.prizeName);
	        		$("#prizeLevel").val(data.data.prizeLevel);
	        		$(".guayigua h1").html("谢谢参与");
        		}
        	}
        },
    });
    
	
}


//提交奖券
function commitLottery() {
	
	var mdata= {};
	mdata.activityRecordId = $("#activityRecordId").val();
    $.commonAjax({
        type: 'GET',
        url: '/activity/commitLottery',
        load: 'Noloading',
        data: mdata,
        success: function(data){
        	
        	if (data.code == "0000"){
        		
        	}
        },
    });
}

function wipeBind(){
	if(prizeFlag){
		return;
	}
	//刮刮事件绑定
	var wipe = new Wipe({
		el: '.guaGray',
		fg: 'data:image/png;base64,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',
		size: 40,
		debug: false,
		autoWipe: false,
		data: null
		/*onswiping: function (percent) {
			
			if(userFlag){
				//用户不存在，新增领奖人信息	
				layer.open({
					type:1,
					shadeClose:false,
					content: $('.addUser').html()
				});
				addTransparent();
				wipeBind();
			}else{
				if (percent <= 0){
					return;
					
				} else if (percent > 0) {
					if(!lotteryFlag){
						getLottery();
					}
					setTimeout(function(){
						if(conmitLotFlag){
							return false;
						}
						var win = setInterval(function(){
							if($("#winFlag").val() == "1"){
								clearInterval(win);
								commitLottery();
								//if (percent > 20) {
									$(".wing span").html($("#prizeName").val());
									$(".wPrize h3").html($("#prizeLevel").val());
									$(".coverlayer").show();
									layer.open({
										type:1,
										shadeClose:false,
										content: $('.Winning').html()
									});	
									console.log("1111111");
									addTransparent();
								//}
							}else if($("#winFlag").val() == "0"){
								clearInterval(win);
								conmitLotFlag = true;
							//	if (percent > 20) {
								console.log("22222222");
								$(".coverlayer").show();
									layer.open({
										type:1,
										shadeClose:false,
										content: $('.NotWinning').html()
									});
									addTransparent();
								//}
							}
						},200);
					},600);	
					
					
				}
			}
			
			
		}*/
	})
}

//分享通知
$(document).on('click','.share',function(){
	layer.closeAll();
	removeTransparent()
	$(".cover").show();
	$(".coverlayer").hide();
	prizeFlag = false;
	$("#winFlag").val("");
	$(".guayigua h1").html("");
	lotteryFlag = false;
	wipeBind();
	getActivity();
})
$(document).on('click','.iGotit',function(){
	$(".cover").hide();
	$(".coverlayer").hide();
	$('.index').show();
	prizeFlag = false;
	$("#winFlag").val("");
	$(".guayigua h1").html("");
	lotteryFlag = false;
	wipeBind();
	getActivity();
	//Q.go("index");
	//history.back();
})

//分享通知
$.shareNotices =function(){
	
	var mdata= {};
    $.commonAjax({
        type: 'GET',
        url: '/activity/shareNotices',
        data: mdata,
        success: function(data){
        	
        	if (data.code == "0000"){
		        removeTransparent()
	        	layer.closeAll();
	        	$('.index').show();
				$(".coverlayer").hide();
	        	$(".cover").hide();
				lotteryFlag = false;
				wipeBind();
				getActivity();
				//Q.go("index");
				//history.back();
        	}
        },
    });
}

//再来一次
$(document).on('click','.OnceMore',function(){
	prizeFlag = false;
	$(".coverlayer").hide();
	$("#winFlag").val("");
	$(".guayigua h1").html("");
	layer.closeAll();
	removeTransparent();
	lotteryFlag = false;
	wipeBind();
	getActivity();
})

//继续再抽
$(document).on('click','.goon',function(){
	prizeFlag = false;
	$(".coverlayer").hide();
	$("#winFlag").val("");
	$(".guayigua h1").html("");
	layer.closeAll();
	removeTransparent();
	lotteryFlag = false;
	wipeBind();
	getActivity();
})

//关闭
$(document).on('click','.close',function(){
	layer.closeAll();
	removeTransparent()
	shakeF = 1;
})

$(document).on('click','#musicPlay',function(){
	
	$("#musicPlay").hide();
	$("#musicStop").show();
	var media = document.getElementById("musicBox");
	media.play();
	sessionStorage.setItem('music', 'true');
});

$(document).on('click','#musicStop',function(){
	
	$("#musicPlay").show();
	$("#musicStop").hide();
	var media = document.getElementById("musicBox");
	media.pause();
	sessionStorage.setItem('music', 'false');
});

function addTransparent(){
	$(".layui-m-layerchild").addClass("transparent");
}
function removeTransparent(){
	$(".layui-m-layerchild").removeClass("transparent");
}