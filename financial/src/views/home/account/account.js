'use strict';

import Vue from 'vue';
import CommonService from '../../../services/common.js';
import Echarts from "../../../assets/libs/echarts.js";
import Keyboard from "../../../components/keyboard/keyboard.vue";

import BankCardIcom from "../../../assets/images/icons/bandByCar.png";

import { Button } from 'mint-ui';

Vue.component(Button.name, Button);

Vue.component(Keyboard.name, Keyboard);

module.exports = {
	data: function(){
		return {
			//focused: false
			cards: [],
			map: CommonService.map
		}
	},
	methods: {
		initChart: function(){
			// 基于准备好的dom，初始化echarts实例
			var myChart = Echarts.init(document.getElementById('chart'));
			// 绘制图表
			myChart.setOption({
				title: {text: '环形图'},
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
			    series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:335, name:'直接访问'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ]
			        }
			    ]
			});
		},
		getCardList: function(){
			var self = this;
			CommonService.http({
				method: 'get',
				url: '/account/list'
			}).then(function(data){
				self.cards = data;
			})
		}
	},
	mounted: function(){
		this.getCardList();
		this.initChart();
	}
}
