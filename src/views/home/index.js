"use strict";

import flexible from "../../libs/flexible.js";
import Vue from 'vue';
import VueRouter from 'vue-router';
import "./home.scss";

import Main from "./main.vue";
import Mine from "./mine.vue";
import Safety from "./safety.vue";

/*
let html = document.documentElement;
window.rem = html.getBoundingClientRect().width / 25 ;
html.style.fontSize = window.rem + 'px';
//alert(html.style.fontSize);
console.log(html.style.fontSize);
*/

flexible(window, window['lib'] || (window['lib'] = {}));

Vue.use(VueRouter);
//Vue.use(Mine);

const routes = [
    {path: "/home", component: Main},
    {path: '/mine', component: Mine},
    //{path: '/transfer', component: Transferar},
    //{path: '/card', component: Card},
    {path: '/safety', component: Safety}
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
    el: '#app',
    router: router
})


//module.export = App;
