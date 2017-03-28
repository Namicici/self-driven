<template>
	<div class="page">
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

<script src="./life.js"></script>
<style lang="sass">
	@import "./life.scss"
</style>
