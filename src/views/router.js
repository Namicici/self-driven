"use strict";

import VueRouter from 'vue-router';

/* 懒加载，按需加载*/
const Home = r => require.ensure([], () => r(require("./home/home.vue")), 'home');
const Account = r => require.ensure([], () => r(require("./home/account/account.vue")), 'account');
const Safety = r => require.ensure([], () => r(require("./home/safety/safety.vue")), 'safety');

const routes = [
    {path: "/", component: Home, children:[
	    {path: 'account', component: Account},
	    //{path: '/transfer', component: Transferar},
	    //{path: '/card', component: Card},
	    {path: 'safety', component: Safety}
	]},
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

module.exports = router;
