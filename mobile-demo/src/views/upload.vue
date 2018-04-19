<template>
    <div class="page">
        <header>
            <p class="header-return"></p>
            <p>Upload</p>
            <p></p>
        </header>
        <section>
            <div class="upload-container"> 
                <label></label>
                <input ref="file-upload" type="file" v-on:change="add" multiple/>
            </div>
            <ul>
                <li v-for="file in files" :key="file.name">
                    <span>{{file.name}}</span>
                    <ss-progress :percent="percent"></ss-progress>
                </li>
            </ul>
            <button v-on:click="upload">上传</button>
        </section>
    </div>
</template>
<style lang="less">
.upload-container{
    width: 64px;
    height: 64px;
    margin: 16px;
    border: solid 1px #eee;
    position: relative;
    label{
        background: url(../assets/images/add.png) no-repeat;
        background-size: 48px;
        position: absolute;
        top: 8px;
        left: 8px;
        width: 48px;
        height: 48px;
    }
    input[type='file']{
        opacity: 0;
        position: absolute;
        top: 8px;
        left: 8px;
        width: 48px;
        height: 48px;
    }
}
ul{
    margin: 16px;
}
button{
    margin: 16px;
}
</style>

<script>
import ssProgress from '@/components/progressbar/index'
export default {
    components: {ssProgress},
    data () {
        return {
            files: [],
            percent: 0
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
        add (e) {
            this.files = e.target.files
            console.log(this.files)
        },
        onload () {

        },
        loadProgress (e) {
            this.percent = e.loaded/e.total * 100
            console.log(e)
        },
        displayProgress () {

        },
        upload () {
            let reader = new FileReader()
            reader.onload = this.onLoaded
            reader.onprogress = this.displayProgress
            for (var i = 0; i < this.files.length; i++){
                let file = this.files[i]
                let formdata = new FormData()
                formdata.append('file', file)
                this.$http({
                    method: 'post',
                    url: '/common/file/upload',
                    data: formdata,
                    onUploadProgress: this.loadProgress 
                }).then((data)=>{
                    console.log(data)
                    reader.readAsDataURL(file)
                })
            }
        }

    }
}
</script>
