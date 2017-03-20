"use strict";
//import Vue from '../../libs/vue.js';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import "./home.scss";
import url1 from "./swiper/index01.png";
import url2 from "./swiper/index02.png";
import url3 from "./swiper/itemPicture1.png";


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
