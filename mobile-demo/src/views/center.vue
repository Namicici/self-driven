<template>
    <div class="page">
        <ss-header :title="'Center'"></ss-header>
        <section>
            <div class="vertical">Hi, I am vertical center.{height: 100px;line-height: 100px;}</div>
            <div class="horizontal">Hi, I am horizontally center.{text-align: center;}</div>
            <div class="horizontal-multi">
                <div class="box">{margin: auto;}</div>
            </div>
            <div class="center">
                <div class="box2">relative and absolute</div>
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
            <div class="triangle">重点是display:block;border: solid xxpx transparent;</div>

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
<style lang="less">
    .vertical{
        height: 100px;
        line-height: 100px;
        background-color: teal;
    }
    .horizontal{
        height: 100px;
        background-color: greenyellow;
        text-align: center;
    }
    .horizontal-multi{
        height: 100px;
        background-color: red;
    }
    .box{
        height: 60px;
        width: 60px;
        background-color: black;
        margin: auto;
        color: #fff;
    }
    .center{
        height: 100px;
        background-color: yellow;
        position: relative;
        .box2{
            height: 80px;
            width: 80px;
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
        background-color: gray;
        .item{
            position: relative;
            left: 12px;
        }
    }
    .triangle{
        margin: 20px;
        &:after{
            content:"";
            height: 0;
            width: 0;
            border: solid 12px transparent;//transparent
            border-left: solid 12px thistle;
            display: block;
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

