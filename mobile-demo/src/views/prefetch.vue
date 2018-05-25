<template>
    <div class="page">
        <ss-header :title="'Test Render'"></ss-header>
        <section>
            <div>{{item}}</div>
        </section>
    </div>
</template>
<style lang="less">

</style>
<script>
export default {
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchItem', 'testRender')
    },
    computed: {
        // 从 store 的 state 对象中的获取 item。
        item () {
            console.log(this.$store.state.items['testRender'])
            return this.$store.state.items['testRender']
        }
    }
}
</script>
