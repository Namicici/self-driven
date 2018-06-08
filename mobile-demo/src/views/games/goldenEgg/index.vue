<template>
    <div class="page">
        <div class="egg">
            <ul class="eggList">
                <p class="hammer" id="hammer">锤子</p>
                <p class="resultTip" id="resultTip"><b id="result"></b></p>
                <li v-for="(item, index) in [1, 2, 3]" :key="index" v-on:click="clickEgg(item)"><span>{{item}}</span><sup></sup></li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
.egg {width:660px; height:400px; margin:50px auto 20px auto;}
.egg ul li {z-index:999;}
.eggList{padding-top:110px;position:relative;width:660px;}
.eggList li{float:left;background:url(images/egg_1.png) no-repeat bottom;width:158px;
height:187px;cursor:pointer;position:relative;margin-left:35px;}
.eggList li span{position:absolute; width:30px; height:60px; left:68px; top:64px; color:#ff0;
 font-size:42px; font-weight:bold}
.eggList li.curr{background:url(images/egg_2.png) no-repeat bottom;cursor:default;z-index:300;}
.eggList li.curr sup{position:absolute;background:url(images/img-4.png) no-repeat;width:232px; 
height:181px;top:-36px;left:-34px;z-index:800;}
.hammer{background:url(images/img-6.png) no-repeat;width:74px;height:87px;position:absolute; 
text-indent:-9999px;z-index:150;left:168px;top:100px;}
.resultTip{position:absolute; background:#ffc ;width:148px;padding:6px;z-index:500;top:200px; 
left:10px; color:#f60; text-align:center;overflow:hidden;display:none;z-index:500;}
.resultTip b{font-size:14px;line-height:24px;}
</style>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        clickEgg (item) {

        }
    }
}

function eggClick(obj) {
	var _this = obj;
	$.getJSON("data.php",function(res){
		if(_this.hasClass("curr")){
			alert("蛋都碎了，别砸了！刷新再来.");
			return false;
		}
		//_this.unbind('click');
		$(".hammer").css({"top":_this.position().top-55,"left":_this.position().left+185});
		$(".hammer").animate({
			"top":_this.position().top-25,
			"left":_this.position().left+125
			},30,function(){
				_this.addClass("curr"); //蛋碎效果
				_this.find("sup").show(); //金花四溅
				$(".hammer").hide();
				$('.resultTip').css({display:'block',top:'100px',left:_this.position().left+45,opacity:0}).animate({top: '50px',opacity:1},300,function(){
					if(res.msg==1){
						$("#result").html("恭喜，您中得"+res.prize+"!");
					}else{
						$("#result").html("很遗憾,您没能中奖!");
					}
				});	
			}
		);
	});
}


$(".eggList li").click(function() {
	$(this).children("span").hide();
	eggClick($(this));
});

$(".eggList li").hover(function() {
	var posL = $(this).position().left + $(this).width();
	$("#hammer").show().css('left', posL);
})
    
</script>