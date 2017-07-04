<template>
	<div class="page">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in slides" :key="item.url"><img v-bind:src="item.url"/></mt-swipe-item>
		</mt-swipe>

		<div class="tab">
		    <router-link to="/home/account"><img src="/assets/account.svg"/></router-link>
		    <router-link to="/home/safety"><img src="/assets/safety.svg"/></router-link>
		    <router-link to="/home/card"><img src="/assets/card.svg"/></router-link>
		    <router-link to="/home/transfer"><img src="/assets/transfer.svg"/></router-link>
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

<script src="./home.js"></script>
<style lang="sass">
	@import "./home.scss"
</style>
