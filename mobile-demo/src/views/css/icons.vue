<template>
    <div class="page">
        <ss-header title="Icons"></ss-header>
        <section>
            <div>重点是display:block;border: solid xxpx transparent;</div>
            <span class="icon-triangle"></span>
            <div>background-clip可以设置背景填充是content-box，那么padding区域就回不填充，然后结合border属性就可以实现间隔的效果</div>
            <span class="icon-menu"></span>
            <span class="icon-dot"></span>
            <div>利用border-style:double【3px及其以上会产生两条实线】</div>
            <p class="icon-menu-double"></p>
            <div>圆/圆角的画法有两种：一种是border-radius；IE下可以通过border-style:dotted来实现</div>
            <span class="icon-cicle"></span>
            <div class="icon-ie-cicle-container">
                <span class="icon-ie-cicle"></span>
            </div>
            <div class="icon-ie-radius-container">
                <span class="icon-ie-cicle"></span>
                <div class="icon-rect-vertial"></div>
                <div class="icon-rect-horizol"></div>
            </div>
            <div>绘制上传使用的外框+加号，使用伪元素before/after来绘制+</div>
            <div class="add"></div>
        </section>
    </div>
</template>
<style lang="less" scoped>
.icon-triangle{
    // content:"";
    height: 0;
    width: 0;
    border: solid 12px transparent; // transparent
    border-left: solid 12px;
    display: inline-block;
}
.icon-menu-double{
    width:32px;
    height: 6px;
    border-top: double 19px;
    border-bottom: solid 6px;
}
.icon-menu{
    width: 24px;
    height: 2px;
    padding: 6px 0;
    display: inline-block;
    background-color: currentColor;
    background-clip: content-box;
    border-top: 2px solid;
    border-bottom: 2px solid;
}
.icon-dot{
    width: 14px;
    height: 14px;
    padding: 3px;
    background-color: currentColor;
    border: 3px solid;
    display: inline-block;
    background-clip: content-box;
    border-radius: 50%;
}
.icon-cicle{
    width:24px;
    height: 24px;
    border-radius: 50%;
    background-color:currentColor;
    display: inline-block;
}
.icon-ie-cicle {
    width:24px;
    height: 24px;
    border: dotted 23px;
    display: inline-block;
}
.icon-ie-cicle-container{
    width: 24px;
    height: 24px;
    overflow: hidden;
    display: inline-block;
}
.icon-ie-radius-container{
    position: relative;
    display: inline-block;
}
.icon-rect-vertial{
    background-color:currentColor;
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    bottom: 7px;
}
.icon-rect-horizol{
    background-color:currentColor;
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    bottom: 19px;
}
.add{
    border: dashed 2px;
    width: 50px;
    height: 50px;
    position: relative;
    box-sizing: border-box;
    &:before{
        content: "";
        border-top: solid 2px;
        position: absolute;
        width: 32px;
        margin-top: 50%;
        margin-left: 50%;
        transform: translate(-50%, -50%);
    }
    &:after{
        content:"";
        border-left: solid 2px;
        position: absolute;
        height:32px;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
