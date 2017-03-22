"use strict";

import flexible from "../../libs/flexible.js";
import Vue from 'vue';
import VueRouter from 'vue-router';
import {Swipe, SwipeItem} from "mint-ui";
import "./home.scss";

//import Main from "./main.vue";
import Mine from "./mine/mine.vue";
import Safety from "./safety/safety.vue";

import url1 from "../../images/swiper/index01.png";
import url2 from "../../images/swiper/index02.png";
import url3 from "../../images/swiper/itemPicture1.png";


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



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
    //{path: "/", component: Main},
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
    data: function () {
        return {
            main: "this is home page",
            swiper1: url1,
            swiper2: url2,
            swiper3: url3,
        }
    },
    router: router
})


//module.export = App;
