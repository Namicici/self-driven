<template>
    <div class="page">
        <ss-header title="Center"></ss-header>
        <section>
            <div class="vertical"><span>height: 100px;line-height: 100px</span></div>
            <div class="horizontal">text-align: center</div>
            <div class="horizontal-multi">
                <div class="box">margin: auto</div>
            </div>
            <div class="center">
                <div class="box2">relative and absolute transform</div>
            </div>
            <div class="center" style="background-color: yellow;height:240px;">
                <div style="position:absolute;left:0;right:0;bottom:0;top:0;width:200px;height:200px;background-color:black;margin:auto;color:white">
                    父级relative，子级absolute然后top/bottom/left/right:0，设定宽高200/80，然后margin：auto，水平垂直方向子级都自动填充了，margin：auto就回自动计算了
                </div>
            </div>
            <div class="flex">
                <div>flex 居中 justify-content: space-around;align-items: center;</div>
            </div>
            <div class="position">
                <div class="before">before</div>
                <div class="item">position:relative之后left就生效了（相对于文档流中位置开始定位）</div>
                <div class="after">after</div>
                <ul>
                    <li>list1</li>
                    <li>list2</li>
                    <li>list3</li>
                </ul>
            </div>
            <div style="background-color:teal;text-align:center;height:60px;">
                <div style="display:inline-block;text-align:left;">Hello world Hello world </div>
            </div>
            <div style="background-color:yellow;text-align:center;height:100px;">
                <div style="display:inline-block;text-align:left;">参考上面的块状，当文字少的时候居中显示，当文字多的时候会从左往右排列的；
                    这是如何实现的呢？外层是一个div块，text-align：center，里面包裹一个inline-block，text-align：left</div>
            </div>
        </section>
		<section>
			关于line-height和vertical-aligin
		</section>
    </div>
</template>
<style lang="less">
    .vertical{
        height: 100px;
        line-height: 100px;
        background-color: #FFFFFF;
    }
    .horizontal{
        height: 100px;
        background-color: #F0D1FF;
        text-align: center;
    }
    .horizontal-multi{
        height: 100px;
        background-color: #B3C9B3;
    }
    .box{
        height: 60px;
        width: 100px;
        background-color: black;
        margin: auto;
        color: #fff;
    }
    .flex{
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color:antiquewhite;
        height: 100px;
        div{
            background-color:#A17C6B;
            width: 200px;
            height: 80px;
        }
    }
    .center{
        height: 100px;
        background-color: #CEB5A7;
        position: relative;
        .box2{
            height: 80px;
            width: 200px;
            background-color: black;;
            color: #fff;
            position: absolute;
            margin-left: 50%;
            margin-top: 50px;
            transform: translate(-50%, -50%);
        }
    }
    .position{
        width: 100%;
        background-color: #A17C6B;
        .item{
            position: relative;
            left: 12px;
        }
    }
</style>

