<template>
    <div class="page">
        <ss-header :title="'Adaptive Tips'"></ss-header>
        <section>
            <div>
                <a v-bind:href="pxHtml">没有适配</a>
                <a v-bind:href="flexibleHtml">手淘适配</a>
            </div>
        </section>
    </div>
</template>
<style lang="less">
</style>
<script>
import pxHtml from 'file-loader!./px.html'
import flexibleHtml from 'file-loader!./flexible.html'

export default {
    data () {
        return {
            pxHtml: pxHtml,
            flexibleHtml: flexibleHtml
        }
    },
    mounted () {
        console.log(pxHtml)
    }
}
</script>
