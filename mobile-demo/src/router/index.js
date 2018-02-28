import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Router.prototype._replace = Router.prototype.replace

Router.prototype.replace = function (location, onComplete, onAbort) {
    // 更新公共参数isReplace为true，表示是replace
    store.commit('updateReplace', true)
    return this._replace(location, onComplete, onAbort)
}

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['../views/Index.vue'], resolve),
            meta: {
                title: '美美的前端首页',
                state: 0
            }
        }, {
            path: '/debris/download',
            name: 'Download',
            component: resolve => require(['../views/Download.vue'], resolve),
            meta: {
                title: '下载'
            }
        }
    ]
})

export default router
