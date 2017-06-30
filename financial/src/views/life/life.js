/**
*/

"use strict";

import Vue from 'vue';
import CommonService from '../../services/common.js';

import {Swipe, SwipeItem} from "mint-ui";
import { Loadmore } from 'mint-ui';

import AccountIcon from "../../assets/images/icons/account.png";
import SafetyCenter from "../../assets/images/icons/safety.png";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);


Vue.component('test', {
	render: function (createElement) {
		return createElement(
			'h3',   // tag name 标签名称
			this.$slots.default // 子组件中的阵列
		)
	}
});


module.exports = {
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
        //this.getSlides();
        this.loadBottom();
    }
}
