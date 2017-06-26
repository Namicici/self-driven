<template>
	<div class="page" style="z-index:999;">
		<div id="chart" class="chart-container"></div>
		<input v-on:focus="safeInputFocused"/>
	</div>
</template>
<script src="./account.js"></script>
<style lang="sass">
	@import "./account.scss"
</style>
