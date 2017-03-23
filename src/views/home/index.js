"use strict";

import flexible from "../../libs/flexible.js";
import Vue from 'vue';
import VueRouter from 'vue-router';
import CommonService from '../../services/common.js';

import {Swipe, SwipeItem} from "mint-ui";
import { Loadmore } from 'mint-ui';

import "./home.scss";
import Mine from "./mine/mine.vue";
import Safety from "./safety/safety.vue";

import AccountIcon from "../../images/icons/account.png";
import SafetyCenter from "../../images/icons/safety.png";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);

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

var app = new Vue({
    el: '#app',
    data: function () {
        return {
            slides: [],
            cardList: [],
            allLoaded: false,
            accountIcon: AccountIcon,
            safetyCenter: SafetyCenter
        }
    },
    methods:{
        getSlides: function(){
            var self = this;
            CommonService.http({
                method: 'get',
                url:'/ad/list',
                data:{
                    adpCode: '01'
                }
            }).then(function(data){
                self.slides = data;
                return self.slides;
            })
        },
        loadBottom() {
            var self = this;
            CommonService.http({
                method:'get',
                url:'/introduct/intrInfo',
                data:{}
            }).then(function(data){
                for (var i = 0; i < data.length; i++){
                    self.cardList.push(data[i]);
                }
                //self.allLoaded = true;// 若数据已全部获取完毕
                self.$refs.loadmore.onBottomLoaded();
                return self.cardList;
            })
        }
    },
    created: function(){
        this.getSlides();
        this.loadBottom();
    },
    router: router
})

//app.getSlides();
