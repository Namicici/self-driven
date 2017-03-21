"use strict";

import flexible from "../../libs/flexible.js";
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import "./home.scss";
import url1 from "../../images/swiper/index01.png";
import url2 from "../../images/swiper/index02.png";
import url3 from "../../images/swiper/itemPicture1.png";

/*
let html = document.documentElement;
window.rem = html.getBoundingClientRect().width / 25 ;
html.style.fontSize = window.rem + 'px';
//alert(html.style.fontSize);
console.log(html.style.fontSize);
*/

flexible(window, window['lib'] || (window['lib'] = {}));


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

var App = new Vue({
    el:'#app',
    data: function () {
        return {
            swiper1: url1,
            swiper2: url2,
            swiper3: url3,
        }
    }
})


//module.export = App;
