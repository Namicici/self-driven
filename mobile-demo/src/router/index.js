import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'Index',
                component: resolve => require(['../views/index.vue'], resolve),
                meta: {
                    title: 'mobile-demo',
                    state: 0
                }
            }, {
                path: '/debris/download',
                name: 'Download',
                component: resolve => require(['../views/download.vue'], resolve),
                meta: {
                    title: 'download'
                }
            }, {
                path: '/debris/prefetch',
                name: 'Prefetch',
                component: resolve => require(['../views/prefetch.vue'], resolve),
                meta: {
                    title: 'prefetch'
                }
            }
        ]
    })
}
