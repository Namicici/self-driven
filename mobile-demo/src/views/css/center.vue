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
</style>

