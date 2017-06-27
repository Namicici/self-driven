"use strict";

import flexible from '../assets/libs/flexible.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';

import HomeIcon from '../assets/images/icons/home.png';
import LifeIcon from '../assets/images/icons/life.png';

/* 另一种一种适配方案
let html = document.documentElement;
window.rem = html.getBoundingClientRect().width / 25 ;
html.style.fontSize = window.rem + 'px';
//alert(html.style.fontSize);
console.log(html.style.fontSize);
*/

flexible(window, window['lib'] || (window['lib'] = {}));



Vue.use(VueRouter);

var app = new Vue({
	el:'#app',
    router: router
})

app.$on('needSafeInputKeyboard', function(data){
	console.log(data);
})
