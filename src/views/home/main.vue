<template id="main_page">
	<div class="main">{{main}}
		<mt-swipe :auto="4000">
			<mt-swipe-item><img v-bind:src="swiper3"/></mt-swipe-item>
			<mt-swipe-item><img v-bind:src="swiper1"/></mt-swipe-item>
			<mt-swipe-item><img v-bind:src="swiper2"/></mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script src="./main.js"></script>
<style>
	@import "./main.scss"
</style>
