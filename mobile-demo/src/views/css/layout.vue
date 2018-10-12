<template>
    <div class="page">
        <ss-header title="Layout"></ss-header>
        <section>
            <a href="javascript:void(0);" v-on:click="routeTo('/tips/css/waterflowByJS')">使用JS做到水平瀑布流布局</a>
            <a href="javascript:void(0);" v-on:click="routeTo('/tips/css/waterflowByCSS')">使用CSS做到垂直瀑布流布局（使用column-count来指明列数）</a>
            <a href="javascript:void(0);" v-on:click="routeTo('/tips/css/waterflowByFlex')">使用flex实现瀑布流布局</a>
            <p>两端对齐，通过伪类last child的margin-right设置为0</p>
            <ul class="through-margin">
                <li>width:30%</li>
                <li>margin-right:5%</li>
                <li>last margin-right:0</li>
            </ul>
            <p>使用table-cell实现</p>
            <ul class="through-table-cell">
                <li>li设置display：table-cell;父级display：table；width：100%</li>
                <li>li的width：50%</li>
            </ul>
            <p>使用flex设置九宫格，3行，每行3列</p>
            <div class="flex-container">
                <div class="flex-item"></div>
                <div class="flex-item"></div>
                <div class="flex-item"></div>
            </div>
            <div class="flex-container">
                <div class="flex-item"></div>
                <div class="flex-item"></div>
                <div class="flex-item"></div>
            </div>
            <div class="flex-container">
                <div class="flex-item"></div>
                <div class="flex-item"></div>
                <div class="flex-item"></div>
            </div>
            <p>使用float实现，width=（deviceWidth-borderWidth的总和）/3</p>
            <div class="float">
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
                <div class="float-item"></div>
            </div>
            <p>Grid实现九宫格</p>
            <div class="grid"></div>
        </section>
    </div>
</template>
<style lang="less" scoped>
.through-margin{
    li {
        width: 30%;
        height: 100px;
        margin-right: 5%;
        background-color: teal;
        float: left;
        &:last-child{
            margin-right: 0;
        }
    }
}
.through-table-cell{
    display: table;
    width: 100%;
    li{
        display: table-cell;
        width: 50%;
        height: 100px;
        // margin-bottom: -9999px;
        // padding-bottom: 9999px;
        background-color:aquamarine;
        border: 1px solid #eee;
    }
}
.flex-container{
    display: flex;
    justify-content: space-between;
    .flex-item{
        width:33%;
        height: 20px;
        border: solid 1px #ccc;
    }
}
.float{
    width: 100%;
    .float-item{
        float: left;
        width: 123px;
        height: 20px;
        border: solid 1px #ccc;
    }
}
.grid{
    display: grid;
}
</style>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        routeTo (url) {
            this.$router.push(url)
        }
    }
}
</script>
