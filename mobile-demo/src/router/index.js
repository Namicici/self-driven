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
                component: resolve => require(['../views/download/download.vue'], resolve),
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
                component: resolve => require(['../views/adaptive/adaptive.vue'], resolve),
                meta: {
                    title: 'Adaptive'
                }
            }, {
                path: '/tips/upload',
                name: 'Upload',
                component: resolve => require(['../views/upload/upload.vue'], resolve),
                meta: {
                    title: 'Upload'
                }
            }, {
                path: '/tips/center',
                name: 'Center',
                component: resolve => require(['../views/css/center.vue'], resolve),
                meta: {
                    title: 'Center'
                }
            }, {
                path: '/tips/float',
                name: 'Float',
                component: resolve => require(['../views/css/float.vue'], resolve),
                meta: {
                    title: 'Float'
                }
            }, {
                path: '/tips/icons',
                name: 'Icons',
                component: resolve => require(['../views/css/icons.vue'], resolve),
                meta: {
                    title: 'Icons'
                }
            }, {
                path: '/tips/waterflow',
                name: 'Water Flow',
                component: resolve => require(['../views/waterflow.vue'], resolve),
                meta: {
                    title: 'Water Flow'
                }
            }, {
                path: '/tips/games',
                name: 'Games',
                component: resolve => require(['../views/games/index.vue'], resolve),
                meta: {
                    title: 'Games'
                }
            }, {
                path: '/tips/games/turntable',
                name: 'Turntable Games',
                component: resolve => require(['../views/games/turntable/index.vue'], resolve),
                meta: {
                    title: 'Turntable Games'
                }
            }, {
                path: '/tips/games/scrape',
                name: 'Scrape Games',
                component: resolve => require(['../views/games/scrape/index.vue'], resolve),
                meta: {
                    title: 'Scrape Games'
                }
            }, {
                path: '/tips/chat',
                name: 'Chat',
                component: resolve => require(['../views/chat/index.vue'], resolve),
                meta: {
                    title: 'Chat'
                }
            }
        ]
    })
}
