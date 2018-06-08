<template>
    <div class="page">
        <img src="./images/1.png" id="shan-img" style="display:none;" />
        <img src="./images/2.png" id="sorry-img" style="display:none;" />
        <div class="banner">
            <div class="turnplate">
                <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
                <img class="pointer" src="./images/turnplate-pointer.png" v-on:click="start"/>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.page{
    background:#e62d2d;
    overflow-x:hidden;
}
/* 大转盘样式 */
.banner{display:block;width:95%;margin-left:auto;margin-right:auto;margin-bottom: 20px;}
.banner .turnplate{display:block;width:100%;position:relative;}
.banner .turnplate canvas.item{width:100%;}
.banner .turnplate img.pointer{
    position:absolute;
    width:31.5%;
    height:42.5%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -65%);
}
.turnplate{
    background-image: url(./images/turnplate-bg.png);
    background-size: 100% 100%;
}
// .pointer{
//     background-image: url(./images/turnplate-pointer.png);
//     background-size: 100% 100%;

// }
</style>
<script>
// import bg from './images/turnplate-bg.png'
import pointerImg from 'file-loader!./images/turnplate-pointer.png'
import Rotate from './awardRotate'

const PADDING = 16
export default {
    data () {
        return {
            turnplate: {
                restaraunts: ["50M免费流量包", "10闪币", "谢谢参与", "5闪币", "10M免费流量包", "20M免费流量包", "20闪币 ", "30M免费流量包", "100M免费流量包", "2闪币"],				//大转盘奖品名称
                colors: ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF"],					//大转盘奖品区块对应背景颜色
                outsideRadius: 192,			//大转盘外圆的半径
                textRadius: 155,				//大转盘奖品位置距离圆心的距离
                insideRadius: 68,			//大转盘内圆的半径
                startAngle: 0,	
                bRotate: false,   			//false:停止;ture:旋转
                
            }
        }
    },
    methods: {
        rnd (n, m) {
            return Math.floor(Math.random()*(m-n+1)+n)
        },
        start () {
            let turnplate = this.turnplate
            if (turnplate.bRotate) return;
            turnplate.bRotate = !turnplate.bRotate;
            // 获取随机数(奖品个数范围内)
            let item = this.rnd(1, turnplate.restaraunts.length);
            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            this.rotateFn(item, turnplate.restaraunts[item-1]);
            console.log(item);
        },
        //旋转转盘 item:奖品位置; txt：提示语;
        rotateFn (item, txt){
            let turnplate = this.turnplate
            let angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
            if(angles<270){
                angles = 270 - angles; 
            }else{
                angles = 360 - angles + 270;
            }
            Rotate.stopRotate();
            Rotate.rotate({
                angle:0,
                animateTo: angles+1800,
                duration: 8000,
                id: 'wheelcanvas',
                callback: () => {
                    alert(txt);
                    turnplate.bRotate = !turnplate.bRotate;
                }
            });
        },
        drawRouletteWheel () {    
            let canvas = document.getElementById("wheelcanvas");  
            if (!canvas.getContext) {
                this.$toast('不支持canvas')
                return
            }
            let turnplate = this.turnplate
            // 根据奖品个数计算圆周角度
            let arc = Math.PI / (turnplate.restaraunts.length/2);
            let ctx = canvas.getContext("2d");
            //在给定矩形内清空一个矩形
            ctx.clearRect(0,0,422,422);
            //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
            ctx.strokeStyle = "#FFBE04";
            //font 属性设置或返回画布上文本内容的当前字体属性
            ctx.font = '16px Microsoft YaHei';      
            for(let i = 0; i < turnplate.restaraunts.length; i++) {       
                let angle = turnplate.startAngle + i * arc;
                ctx.fillStyle = turnplate.colors[i];
                ctx.beginPath();
                //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
                ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
                ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                ctx.stroke();  
                ctx.fill();
                //锁画布(为了保存之前的画布状态)
                ctx.save();   
                
                //----绘制奖品开始----
                ctx.fillStyle = "#E5302F";
                let text = turnplate.restaraunts[i];
                let line_height = 17;
                //translate方法重新映射画布上的 (0,0) 位置
                ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
                
                //rotate方法旋转当前的绘图
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                
                /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                if(text.indexOf("M")>0){//流量包
                    let texts = text.split("M");
                    for(let j = 0; j<texts.length; j++){
                        ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                        if(j == 0){
                            ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
                        }else{
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    }
                }else if(text.indexOf("M") == -1 && text.length>6){//奖品名称长度超过一定范围 
                    text = text.substring(0,6)+"||"+text.substring(6);
                    let texts = text.split("||");
                    for(let j = 0; j<texts.length; j++){
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                }else{
                    //在画布上绘制填色的文本。文本的默认颜色是黑色
                    //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                }
                
                //添加对应图标
                if(text.indexOf("闪币")>0){
                    let img= document.getElementById("shan-img");
                    // img.onload = () => {  
                    //     ctx.drawImage(img,-15,10);      
                    // }; 
                    ctx.drawImage(img,-15,10);  
                } else if(text.indexOf("谢谢参与")>=0){
                    let img= document.getElementById("sorry-img");
                    // img.onload = () => {  
                    //     ctx.drawImage(img,-15,10);      
                    // };  
                    ctx.drawImage(img,-15,10);  
                }
                //把当前画布返回（调整）到上一个save()状态之前 
                ctx.restore();
                //----绘制奖品结束----
            } 
        }
    },
    mounted () {
        this.drawRouletteWheel ()
    }
}
</script>