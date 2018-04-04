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
                component: () => import('../views/index.vue'),
                meta: {
                    title: 'mobile-demo',
                    state: 0
                }
            }, {
                path: '/debris/download',
                name: 'Download',
                component: () => import('../views/download.vue'),
                meta: {
                    title: 'download'
                }
            }, {
                path: '/debris/prefetch',
                name: 'Prefetch',
                component: () => import('../views/prefetch.vue'),
                meta: {
                    title: 'prefetch'
                }
            }
        ]
    })
}
