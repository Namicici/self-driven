import Vue from 'vue'
import Router from 'vue-router'
import Topic from './topic'
import Subject from './subject'

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
			},
			...Topic,
			...Subject
        ]
    })
}
