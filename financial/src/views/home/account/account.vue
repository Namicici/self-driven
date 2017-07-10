<template>
	<div class="page" style="z-index:999;">
		<div id="chart" class="chart-container"></div>
		<div class="card-container">
			<ul>
				<li v-for="item in cards">
					<div class="card">
						<div class="card-type">{{map.cardType(item.acctType)}}</div>
						<div class="card-no">{{item.acctNo}}</div>
						<div class="card-icon"><img src="/assets/bandByCar.png"/></div>
						<div class="balance">{{item.acctBalance}}</div>
					</div>
					<div class="operate">
						<mt-button plain size="large" type="primary">转账汇款</mt-button>
						<mt-button plain size="large" type="primary">账户信息</mt-button>
						<mt-button plain size="large" type="primary">账户明细</mt-button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	'use strict';

	import Vue from 'vue';
	import CommonService from '../../../services/common';
	import Echarts from "../../../assets/libs/echarts";
	import Keyboard from "../../../components/keyboard/keyboard";

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

</script>
<style lang="less">
	@import "../../../assets/scss/common.scss";

	.chart-container{
		background-color: white!important;
		width: 100%;
		height: $slideHeight;
	}

	.card-container{
		li{
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			margin-top: 0.1rem;
			background-color: #fff;
			padding: 0.2rem 0.2rem;
			.card{
				flex-direction: column;
				column-count: 2;
				width: 100%;
				div{
					height: 1rem;
					display: flex;
					align-items: center;
					img{
						width:1rem;
					}
				}
				.card-icon{
					justify-content: flex-end;
				}
				.balance{
					justify-content: flex-end;
					color: red;
				}
			}
			.operate{
				display: flex;
			    width: 100%;
			    justify-content: space-around;
				margin-top: 0.2rem;
			}
		}
	}

</style>
