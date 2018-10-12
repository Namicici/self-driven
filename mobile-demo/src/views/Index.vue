<template>
    <div class="page">
        <ss-header :title="'Home'" :isShowBackArrow="false"></ss-header>
        <section>
            <h3 class="section-name">小知识</h3>
            <ul class="topic">
                <li v-for="item in texts" :key="item.url" v-on:click="routeTo(item)">{{item.title}}</li>
            </ul>
        </section>
    </div>
</template>

<style lang="less">
@import "../styles/index.less";
.topic{
    overflow: -webkit-paged-y;
    padding: 8px;
    li{
        padding: 8px 16px;
        display: inline-block;
        color: @topic-o-color;
    }
}
</style>

<script>
export default {
    data () {
        return {
            texts: [
                {title: '下载', url: '/tips/download'},
                {title: '预取', url: '/tips/prefetch'},
                {title: 'Cookie', url: '/tips/cookie'},
                {title: '移动端适配演示', url: '/tips/adaptive'},
                {title: '上传', url: '/tips/upload'},
                
                {title: 'css居中', url: '/tips/center'},
                {title: 'css浮动', url: '/tips/float'},
                {title: 'css icon', url: '/tips/icons'},
                {title: 'css文档流', url: '/tips/flow'},
                {title: 'css布局', url: '/tips/layout'},

                {title: '正则表达式研究', url: '/tips/regexp'},

                {title: '瀑布流布局', url: '/tips/css/waterflow'},
                {title: 'h5小游戏', url: '/tips/games', blank: true},
                {title: '实时通讯', url: '/tips/chat', blank: false} // blank=true的时候新打开一个tab
            ]
        }
    },
    methods: {
        routeTo (item) {
            console.log(item.url)
            this.$router.push(item.url)
        }
    },
    mounted () {
    }
}

</script>
