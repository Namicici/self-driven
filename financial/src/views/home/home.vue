<template>
	<div class="page">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in slides" :key="item.url"><img v-bind:src="item.url"/></mt-swipe-item>
		</mt-swipe>

		<div class="tab">
		    <router-link to="/home/account"><img src="/assets/account.svg"/></router-link>
		    <router-link to="/home/safety"><img src="/assets/safety.svg"/></router-link>
		    <router-link to="/home/card"><img src="/assets/card.png"/></router-link>
		    <router-link to="/home/transfer"><img src="/assets/transfer.png"/></router-link>
		</div>
		<div class="tab">
		    <router-link to="/home/loan"><img src="/assets/loan.svg"/></router-link>
		</div>
		<!--div v-on:click="jsonp"> jsonp test </div>
		<div v-on:click="cors"> cors test </div-->
		<div class="list">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			  <ul>
			    <li v-for="item in cardList">
					<div class="left">
						<div class="title">{{item.title}}</div>
						<div class="content">{{item.content}}</div>
					</div>
					<div class="picture"><img v-bind:src="item.pictureUrl"/></div>
				</li>
			  </ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	"use strict";

	import Vue from 'vue';
	import CommonService from '../../services/common';

	import {Swipe, SwipeItem} from "mint-ui";
	import { Loadmore } from 'mint-ui';

	import AccountIcon from "../../assets/images/icons/account.svg";
	import SafetyIcon from "../../assets/images/icons/safety.svg";
	import CardIcon from "../../assets/images/icons/card.png";
	import TransferIcon from "../../assets/images/icons/transfer.png";
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

</script>
<style lang="less">
	@import "../../assets/scss/common.scss";

	.mint-swipe{
	    height: $slideHeight !important;
	    img{
	        width:100%;
	        height: $slideHeight;
	    }
	}

	.tab{
	    display: flex;
	    padding: 0.1rem 0;
	    background-color: white;
	    a{
	        display: flex;
	        flex-direction: column;
	        text-decoration: none;
	        align-items: center;
	        color: #282828;
	        flex-basis: 25%;
	        border-right: solid 1px #ccc;
	        &:nth-child(4){
	            border-right: none;
	        }
	        img{
	            height: 2.5rem;
	        }
	    }
	}
	.list{
	    margin-top:0.2rem;
	    background-color: white;
	    li{
	        display: flex;
	        padding: 0.1rem 0.2rem;
	        .left{
	            width:75%;
	            align-items: flex-start;
	            .title{
	                overflow: hidden;
	                text-overflow: ellipsis;
	                width: 90%;
	                white-space: nowrap;
	            }
	            .content{
	        		overflow : hidden;
	        		text-overflow: ellipsis;
	        		display: -webkit-box;
	        		-webkit-line-clamp: 2;
	        		-webkit-box-orient: vertical;
	                @include font-dpr(12px);
	                color: #ccc;
	            }
	        }
	        .picture{
	            width:25%;
	            align-items: flex-end;
	            img{
	                height: 1.5rem;
	                width: 100%;
	            }
	        }
	    }
	}
</style>
