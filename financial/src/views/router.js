"use strict";

import VueRouter from 'vue-router';
import App from './app.vue';

/* 懒加载，按需加载*/
const Home = r => require.ensure([], () => r(require("./home/home.vue")), 'home');
const Account = r => require.ensure([], () => r(require("./home/account/account.vue")), 'account');
const Safety = r => require.ensure([], () => r(require("./home/safety/safety.vue")), 'safety');
const Life = r => require.ensure([], () => r(require("./life/life.vue")), 'life');
const Mine = r => require.ensure([], () => r(require('./mine/mine.vue')), 'mine');

const routes = [
    {path: '/home', component: App, children:[
        {path: '/', component: Home},
	    {path: 'account', component: Account},
	    //{path: '/transfer', component: Transferar},
	    //{path: '/card', component: Card},
	    {path: 'safety', component: Safety}
	]},
    {path:'/life', component:App, children:[
        {path: '/', component: Life},
    ]},
    {path: '/mine', component:App, children:[
        {path: '/', component: Mine},
    ]}
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

module.exports = router;
