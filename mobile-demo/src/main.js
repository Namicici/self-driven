import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Axios from './utils/http'
import * as filters from './utils/filters'
import FastClick from 'fastclick'

Vue.config.productionTip = false

Vue.prototype.$http = Axios

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 同步router状态到store
sync(store, router)

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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

// For Mobile Only
FastClick.attach(document.body)
