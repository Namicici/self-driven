"use strict";

import Vue from 'vue';
import CommonService from '../../services/common.js';

import {Swipe, SwipeItem} from "mint-ui";
import { Loadmore } from 'mint-ui';

import AccountIcon from "../../assets/images/icons/account.svg";
import SafetyIcon from "../../assets/images/icons/safety.svg";
import CardIcon from "../../assets/images/icons/card.svg";
import TransferIcon from "../../assets/images/icons/transfer.svg";
import LoanIcon from "../../assets/images/icons/loan.svg";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);

module.exports = {
    data: function () {
        return {
            slides: [],
            cardList: [],
            allLoaded: false
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
        },
        jsonp: function(){
            var self = this;
            CommonService.jsonp({
                url: 'http://localhost:9002/api/client/token',
                withCredentials: true
            }).then(function(data){
                console.log('jsonp success data: ' + data);
            }, function(error){
                console.log('jsonp error');
            })
        },
        cors: function(){
            var self = this;
            CommonService.cors({
                method: 'get',
                baseURL: 'http://localhost:9002/api/',
                url: '/client/token',
                withCredentials: true
            }).then(function(data){
                console.log('cors success: ' + data);
            }, function(error){
                console.log('cors error');
            })
        }
    },
    created: function(){
        this.getSlides();
        this.loadBottom();
    },
    mounted: function(){
        console.log('mounted');
        window.addEventListener('message', function(message){
            console.log(message);
        });
    }
}
