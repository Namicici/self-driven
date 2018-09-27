<template>
    <div class="page">
        <ss-header :title="'Home'" :isShowBackArrow="false"></ss-header>
        <section>
            <h3 class="section-name">小知识</h3>
            <div class="topic">
                <a href="javascript: void(0);" v-for="item in texts" :key="item.url" v-on:click="routeTo(item)">{{item.title}}</a>
            </div>
        </section>
    </div>
</template>

<style lang="less">
@import "../styles/index.less";
.topic{
    overflow: -webkit-paged-y;
    padding: 8px;
    a{
        padding: 8px 16px;
        display: inline-block;
        color: @topic-color;
        &:nth-child(2n):-webkit-any-link{
            top: 16px;
            color: @topic-o-color;
            position: relative;
        }
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
                {title: '瀑布流布局', url: '/tips/waterflow'},
                {title: 'h5小游戏', url: '/tips/games', blank: true},
                {title: '实时通讯', url: '/tips/chat', blank: false} // blank=true的时候新打开一个tab
            ]
        }
    },
    methods: {
        routeTo (item) {
            this.$router.push(item.url)
        }
    },
    mounted () {
    }
}

</script>
