<template>
    <ul>
        <li>
            <span>window.open的方式下载，浏览器可能阻止窗口的打开</span>
            <i></i>
            <!-- <ss-code :xml="['window.open("http://localhost:9001/api/download/test")']"></ss-code> -->
        </li>
        <li>
            <span>a标签中使用download</span>
        </li>
    </ul>
</template>
<style lang="less">

ul{
    li{
        padding: 0.08rem;
    }
}

</style>
<script>
import Code from '../components/Code'
export default {
    components: {Code},
    data () {
        return {

        }
    }
}
</script>
