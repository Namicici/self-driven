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
                path: '/tips/download',
                name: 'Download',
                component: resolve => require(['../views/download.vue'], resolve),
                meta: {
                    title: 'download'
                }
            }, {
                path: '/tips/prefetch',
                name: 'Prefetch',
                component: resolve => require(['../views/prefetch.vue'], resolve),
                meta: {
                    title: 'prefetch'
                }
            }, {
                path: '/tips/cookie',
                name: 'Cookie',
                component: resolve => require(['../views/cookie.vue'], resolve),
                meta: {
                    title: 'Cookie'
                }
            }, {
                path: '/tips/adaptive',
                name: 'Adaptive',
                component: resolve => require(['../views/adaptive.vue'], resolve),
                meta: {
                    title: 'Adaptive'
                }
            }, {
                path: '/tips/upload',
                name: 'Upload',
                component: resolve => require(['../views/upload.vue'], resolve),
                meta: {
                    title: 'Upload'
                }
            }
        ]
    })
}
