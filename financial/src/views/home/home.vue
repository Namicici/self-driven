<template>
	<div class="page">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in slides" :key="item.url"><img v-bind:src="item.url"/></mt-swipe-item>
		</mt-swipe>

		<div class="tab">
		    <router-link to="/home/account"><img v-bind:src="accountIcon"/><span>我的账户</span></router-link>
		    <router-link to="/home/safety"><img v-bind:src="safetyCenter"/><span>安全中心</span></router-link>
		</div>
		<div v-on:click="jsonp"> jsonp test </div>
		<div v-on:click="cors"> cors test </div>
		<div>
			<iframe src="">
				<html>
					<body>
						<div> this is test post message></div>
						<script type="javascript">
							console.log('postMessage');
							window.postMessage('I am from b.com', 'http://localhost:9001');
						</script>
					</body>
				</html>
			</iframe>
		</div>
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
