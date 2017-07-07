<template>
	<div class="page">
		<mt-cell title="test mongodb">
			<mt-button v-on:click="dbTest">db test</mt-button>
		</mt-cell>
		<mt-cell title="test download">
			<mt-button v-on:click="download">download test</mt-button>
		</mt-cell>
		<mt-cell title="test download a">
			<a href="http://localhost:9001/api/download/test" download>download test 现在常用方法</a>
		</mt-cell>
		<mt-cell title="test download 同页面接口方式下载">
			<mt-button v-on:click="downloadSamePage">download test</mt-button>
		</mt-cell>
		<div class="loading" v-if="show">Loading......</div>
		<iframe class="download-iframe" v-bind:src="downloadUrl" v-on:load="downloadFinish"></iframe>

		<mt-cell title="test custom keyboard">
			<mt-button v-on:click="">how to call custom keyboard</mt-button>
		</mt-cell>
		<ss-pie :diameter="200" :select-diameter="240" :stroke-width="16" :percent-data="pieData" :duration="2" :colors="['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']"></ss-pie>
		<ss-pie2 :diameter="diameter" :stroke-width="strokeWidth" :percent-data="pieData"></ss-pie2>
	</div>
</template>

<script src="./mine.js"></script>
<style lang="sass">
	@import "./mine.scss"
</style>
