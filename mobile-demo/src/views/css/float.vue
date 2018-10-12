<template>
    <div class="page">
        <ss-header title="Float"></ss-header>
        <section>
            <div class="card bg">
                <div class="title">BFC问题</div>
                <div class="content">
                    <div class="right">1</div>
                    <div class="left">2</div>
                    <div style="width: 120px;height:50px;background: teal;">3</div>
                </div>
            </div>
            <div class="illustrate">黄色区域为红绿块的父级，绿色块浮动了，导致父级高度塌陷</div>
            <div class="illustrate">浮动块后面的元素，如果是文字类的，不论是否使用元素p，只要是文字就会环绕；如果其他没有文字的块级元素，则会忽略浮动块的尺寸</div>
            <div class="illustrate">针对这种问题，将父级（也就是黄色部分）变成bfc即可</div>
            <div class="illustrate">
                <span>BFC方法：</span>
                <ul>
                    <li>父级添加overflow:hidden/scroll/auto/overlay</li>
                    <li></li>
                </ul>
            </div>

            <div class="card">
                <div class="title">float元素与内联元素</div>
                <div class="content bfc">
                    <div class="left"></div>
                    <span>我是span元素</span>
                </div>
            </div>
            <div class="card">
                <div class="title">float元素与block块级元素</div>
                <div class='content bfc'>
                    <div class='left'>float</div>
                    <div class='right'></div>
                    <p>float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动中移除，尽管仍然保持部分的流动性（与绝对定位相反）。</p>
                </div>
            </div>
            <div class='box3'>
                <div class='left'>float</div>
                <div class='right' style="overflow:hidden"> </div>
                <p>绿色浮动后除了文字和内敛元素可环绕外，粉色的块级元素的定位是从左上角开始的，所以出现了与绿色块的叠加，可以给粉色添加任何可以将块级元素格式化的样式即可消除叠加。比如overflow:hidden/float:left/display:flex/table/inline-block/-webkit-box/flow-root</p>
            </div>
            <div class='box3'>
                <div class='left'>float</div>
                <div class='right' style="clear:both"> </div>
                <p>清浮动，是清楚前面的浮动元素造成的影响，粉色块使用clear：both即可；</p>
            </div>
        </section>
    </div>
</template>
<style lang="less">
.bfc{
    overflow: hidden;
}
.illustrate{
    margin: 8px;
    background-color: #eeeeee;
}

.gap{
    margin-top: 50px;
}
.bg {
    background-color:green;
}

.card {
    margin: 8px;
    .title {
        font-size: 14px;
        font-weight: bold;
    }
    .content {
        background-color: yellow;
    }
}

.left{
    background: #73DE80;    /* 绿色 */
    opacity: 0.5;
    border: 3px solid green;
    width: 80px;
    height: 80px;
    float: left;
}
.right{                     /* 粉色 */
    background: #EF5BE2;
    opacity: 0.5;
    border: 3px solid yellowgreen;
    width: 160px;
    min-height: 40px;
}
.box3{
    background:#888;
    height: 100%;
    margin-left: 20px;
    width: 80%;
}
</style>