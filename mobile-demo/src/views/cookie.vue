<template>
    <div class="page">
        <header>
            <p class="header-return"></p>
            <p>Cookie Tips</p>
            <p></p>
        </header>
        <section>
            <div>
                cookie中的expires/max-age不设置（默认是1970年的时间）的时候就是一个session-cookie，
                这种类型的cookie在浏览器不关闭的时候有效，关闭后就删除了 https://yq.aliyun.com/articles/53643
            </div>
        </section>
    </div>
</template>
<style lang="less">

</style>
<script>
export default {
    // asyncData ({ store, route }) {
    //     // 触发 action 后，会返回 Promise
    //     return store.dispatch('fetchItem', 'testRender')
    // },
    // computed: {
    //     // 从 store 的 state 对象中的获取 item。
    //     item () {
    //         console.log(this.$store.state.items['testRender'])
    //         return this.$store.state.items['testRender']
    //     }
    // }
}
</script>
