<template>
    <div class="page">
        <ss-header :title="'Home'" :isShowBackArrow="false"></ss-header>
        <!-- <mt-cell title="test mongodb">
            <mt-button v-on:click="dbTest">db test</mt-button>
        </mt-cell> -->
        <section>
            <h3 class="section-name">小知识</h3>
            <div class="topic">
                <a :href="item.url" v-for="item in texts" :key="item.url">{{item.title}}</a>
            </div>
            <random-item-canvas :data="texts" :height="200" @click="routeTo"></random-item-canvas>
            
            <!-- <mt-cell title="test download">
                <mt-button v-on:click="download">download test</mt-button>
            </mt-cell>
            <mt-cell title="test download a">
                <a href="http://localhost:9001/api/download/test" download>download test 现在常用方法</a>
            </mt-cell>
            <mt-cell title="test download 同页面接口方式下载">
                <mt-button v-on:click="downloadSamePage">download test</mt-button>
            </mt-cell> -->
        </section>
        <!-- <div class="loading" v-if="show">Loading......</div>
        <iframe class="download-iframe" v-bind:src="downloadUrl" v-on:load="downloadFinish"></iframe>

        <mt-cell title="test custom keyboard">
            <mt-button v-on:click="">how to call custom keyboard</mt-button>
        </mt-cell>
        <ss-pie :percent-data="pieData"></ss-pie>
        <input v-on:focus="visible = true;" v-on:blur="visible = false;"/> -->
        <!--ss-keyboard focus="visible"></ss-keyboard-->
    </div>
</template>

<style lang="less">
@import "../styles/index.less";
.topic{
    overflow: -webkit-paged-y;
     background-color: antiquewhite;
    a{
        padding: 0 16px;
        &:nth-child(2n):-webkit-any-link{
            top: 16px;
            color: green;
            position: relative;
        }
    }
}
</style>

<script>
import randomItemCanvas from '@/components/random-item-canvas/index'

export default {
    components: {randomItemCanvas},
    data () {
        return {
            // focused: false
            show: false,
            download: false,
            pieData: [{name: '4305', value: 50}, {name: '3309', value: 200}, {name: '7890', value: 350}],
            diameter: 200,
            strokeWidth: 16,
            texts: [
                {title: '下载', url: '/tips/download'}, 
                {title: '预取', url: '/tips/prefetch'}, 
                {title: 'Cookie', url: '/tips/cookie'}, 
                {title: '移动端适配演示', url: '/tips/adaptive'},
                {title: '上传', url: '/tips/upload'},
                {title: 'css（居中、布局、小技巧等）', url: '/tips/center'},
                {title: '瀑布流布局', url: '/tips/waterflow'}
            ]
        }
    },
    methods: {
        dbTest () {
            this.$http({
                method: 'get',
                url: '/db/test'
            }).then((data) => {
                console.log('get data: ' + data)
            }, (error) => {
                console.log('test db error: ' + error)
            })
        },
        // download () {
        //     // 测试download请求发出后，后端返回流之前操作其他接口是否会导致卡断
        //     window.open('http://localhost:9001/api/download/test')
        // },
        downloadSamePage () {
            this.show = true
            this.$http({
                method: 'get',
                url: '/download/test'
            }).then((data) => {
                this.download = true
                this.downloadUrl = 'http://localhost:9001/api/download/test'
                // self.show = false;
                // self.download = false;
            }, () => {
                this.show = false
                this.download = false
            })
        },
        downloadFinish () {
            this.show = false
            this.download = false
            console.log('download complete')
        },
        routeTo(item){
            this.$router.push(item.url)
        }
    },
    mounted () {
    }
}

</script>
