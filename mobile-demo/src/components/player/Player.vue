<template>
	<div>
		<audio :id="`ss-h5audioplayer`" 
			:controls="option.controls"
			:autoplay="option.autoplay"
			:preload="option.preload"
			:src="`${audioData.src}`"
			:volume="audioData.volume"
			:loop="option.loop"
			:muted="option.muted"
			:buffered="buffer"
			v-on:loadstart="onLoadstart"
			v-on:progress="onProgress"
			v-on:timeupdate="onTimeupdate"
			v-on:suspend="onSuspend"
			v-on:canplay="onCanplay"
			v-on:error="onError"
			v-on:abort="onAbort"
			v-on:ended="onEnded"
			v-on:emptied="onEmptied"></audio>
	</div>
</template>
<style lang="less">
</style>
<script>
	export default {
		name: 'ss-player',
		props: {
			option: {
				type: Object,
				default: () => {
					return {
						controls: false,
						autoplay: false,
						preload: false,
						loop: false,
						muted: false
					}
				}
			}
		},
		data() {
			return {
				audioData: {
					src: ''
				},
				buffer: null
			}
		},
		methods: {
			play(source) {
				this.audioData = Object.assign(this.audioData, source)
				this.$nextTick(() => {
					this.ctx = document.getElementById('ss-h5audioplayer')
					if (this.ctx.paused) {
						this.ctx.currentTime = 0
						this.ctx.play()
					}
				})
			},
			pause() {
				if (this.ctx) {
					this.ctx.pause()
					// 暂停之后再播放时从头开始
					// this.audioData.src = ''
				}
			},
			onLoadstart() {
				if (this.audioData.onLoadstart) {
					this.audioData.onLoadstart()
				}
			},
			onProgress(e) {
				if (this.audioData.onProgress) {
					this.audioData.onProgress(e)
				}
			},
			onTimeupdate(e) {
				if (this.audioData.onTimeupdate) {
					this.audioData.onTimeupdate(e)
				}
			},
			onSuspend() {
				if (this.audioData.onSuspend) {
					this.audioData.onSuspend()
				}
			},
			onError(e) {
				if (this.audioData.onError) {
					this.audioData.onError(e)
				}
			},
			onCanplay(e) {
				console.log('canplay')
				if (this.audioData.onCanplay) {
					this.audioData.onCanplay(e)
				}
			},
			onAbort(e) {
				console.log('abort')
				if (this.audioData.onAbort) {
					this.audioData.onAbort(e)
				}
			},
			onEnded(e) {
				console.log('onEnded')
				if (this.audioData.onEnded) {
					this.audioData.onEnded(e)
				}
			},
			onEmptied(e) {
				console.log('onEmptied')
				if (this.audioData.onEmptied) {
					this.audioData.onEmptied(e)
				}
			}
		}
	}
</script>