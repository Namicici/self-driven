<template>
    <div class="page">
        <ss-header title="Float"></ss-header>
        <section>

            <div class='box3'>
                <div class='left'> </div>
                <div class='right'> </div>
                <p>float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动中移除，尽管仍然保持部分的流动性（与绝对定位相反）。</p>
            </div>
            <div class='box3'>
                <div class='left'> </div>
                <div class='right' style="overflow:hidden"> </div>
                <p>绿色浮动后除了文字和内敛元素可环绕外，粉色的块级元素的定位是从左上角开始的，所以出现了与绿色块的叠加，可以给粉色添加任何可以将块级元素格式化的样式即可消除叠加。比如overflow:hidden/float:left/display:flex/table/inline-block/-webkit-box/flow-root</p>
            </div>
            <div class='box3'>
                <div class='left'> </div>
                <div class='right' style="clear:both"> </div>
                <p>清浮动，是清楚前面的浮动元素造成的影响，粉色块使用clear：both即可；</p>
            </div>
        </section>
    </div>
</template>
<style>

.box3{
    background:#888;
    height: 100%;
    margin-left: 20px;
    width: 80%;
}
</style>

