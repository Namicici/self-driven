import Vue from 'vue'
import { createApp } from './main'
import FastClick from 'fastclick'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

router.beforeEach((to, from, next) => {
    // store.commit('updateLoading', true)
    // 更新文档标题
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach((to, from) => {
    // 转移到libs/base中的mounted函数中，挂载完成后表示页面加载
    // store.commit('updateLoading', false)
})

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            next()
        }).catch(next)
    })
    app.$mount('#app')
    // For Mobile Only
    FastClick.attach(document.body)
})