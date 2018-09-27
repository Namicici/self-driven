<template>
    <div class="page">
        <ss-header :title="'Download'"></ss-header>
        <section>
            <ul>
                <li>
                    <span>window.open的方式下载，浏览器可能阻止窗口的打开</span>
                    <i></i>
                    <!-- <ss-code :xml="['window.open("http://localhost:9001/api/download/test")']"></ss-code> -->
                </li>
                <li>
                    <span>a标签中使用download</span>
                    <a href="http://localhost:9001/api/download/test" download>下载</a>
                </li>
                <li>
                    <span>blob接手文件流的方式</span>
                    <button @click="download">下载</button>
                    <a :href="url" ref="download" download>do</a>
                </li>
            </ul>
        </section>
    </div>
</template>
<style lang="less">

ul{
    li{
        padding: 0.08rem;
    }
}

</style>
<script>
// import Code from '../components/Code'
export default {
    // components: {Code},
    data () {
        return {
            url: ''
        }
    },
    // asyncData ({ store, route }) {
    //     // 触发 action 后，会返回 Promise
    //     return store.dispatch('fetchItem', route.params.id)
    // },
    computed: {
        // 从 store 的 state 对象中的获取 item。
        // item () {
        //     return this.$store.state.items[this.$route.params.id]
        // }
    },
    methods: {
        download () {
            this.$http({
                method: 'post',
                url: '/download/test',
                baseURL: process.env.FILE_URL,
                responseType: 'blob',
                data: {
                    fileId: '001'
                }
            }).then((res) => {
                // application/vnd.ms-excel
                let blob = new Blob([res.data])
                let filename = res.headers["content-disposition"].split(';')[1].split('=')[1]

                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
            })
        }
    }
}
</script>
