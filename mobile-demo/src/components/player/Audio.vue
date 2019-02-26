<template>
	<div>
		<div class="audio-container">
			<div class="playctr" :class="{'play': !audio.paused, 'pause': audio.paused}" v-on:click="onplaycontroll"></div>
			<div ref="progressbar" class="progressbar" v-on:click="onseek" >
				<div class="progress" :style="`width: ${progress}px`">
					<div class="endpoint" :style="`left:${progress - 12}px`" v-on:mousedown="onmousedown"></div>
				</div>
			</div>
			<div class="volume"></div>
		</div>
		<audio :id="`h5audio-${audio.mid}`" 
			:src="`${audio.src}`" 
			:autoplay="audio.autoplay" 
			:controls="audio.controls"
			:volume="audio.volume"
			:loop="audio.loop"
			:muted="audio.muted"
			:preload="audio.preload"
			v-on:ended="onended"
			v-on:timeupdate="ontimeupdate"
			v-on:play="onplay"></audio>
	</div>
</template>
<style lang="less">
	.audio-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: gray;
		.playctr{
			border-radius: 100%;
			height: 48px;
			width: 48px;
		}
		.progressbar{
			position: relative;
			width: 120px;
			height: 4px;
			padding: 4px 0;
			background-clip: content-box;
			background-color: lightblue;
			border-radius: 8px;
			&:hover{
				cursor: pointer;
			}
		}
		.volume{
			width: 24px;
			height: 24px;
			background-color: lightblue;
		}
	}
	.play{
		border-radius: 100%;
		height: 48px;
		width: 48px;
		background-color: lightblue;
	}
	.pause{
		background-color: red;
	}
	.progress{
		position: absolute;
		top: 4px;
		left: 0px;
		bottom: 4px;
		border-radius: 4px;
		background-color: green;
		width: 0;
		.endpoint{
			background-color: green;
			width: 8px;
			height: 8px;
			border-radius: 100%;
			position: absolute;
			top: -10px;
			left: 0;
			padding: 8px;
			background-clip: content-box;
		}
	}
</style>
<script>
	export default {
		name: 'Audio',
		props: {
			option: Object
		},
		data() {
			return {
				audio: Object.assign({
					mid: setTimeout('1'),
					controls: false,
					autoplay: false,
					preload: false,
					src: '',
					paused: true,
					played: 0,
					volume: 0.3,
					loop: false,
					muted: false,
					author: '',
					price: 0,
					collected: false
				}, this.option),
				audioCtx: null,
				progress: 0,
				seekPos: 0,
				dragstart: false,
				currentMid: '',
				prgrect: null
			}
		},
		methods: {
			pauseNow(mid) {
				if (this.audio.mid == mid){
					this.audio.paused = true
					this.audioCtx.pause()
				}
			},
			onplaycontroll(e) {
				this.audio.paused = !this.audio.paused
				if (this.audio.paused) {
					this.audioCtx.pause()
				} else {
					this.audioCtx.play()
					this.$emit('playaudio', this.audio.mid)
				}
			},
			onplay(e) {
				if (this.seekPos > 0) {
					this.audioCtx.currentTime = this.seekPos * e.target.duration
					this.seekPos = 0
				} 
			},
			onended() {
				this.audio.paused = true
				this.audioCtx.pause()
			},
			ontimeupdate(e) {
				let duration = e.target.duration
				let currentTime = this.audioCtx.currentTime
				let percent = currentTime / duration
				if (!this.dragstart)
				this.progress = percent * this.prgrect.width
			},
			caculateprogress(e) {
				let pageX = e.pageX
				if (pageX < this.prgrect.left) {
					this.doseek(0)
				} else if (pageX > this.prgrect.right) {
					this.doseek(this.prgrect.width)
				} else {
					let ol = pageX - this.prgrect.left
					this.doseek(ol)
				}
			},
			onseek(e) {
				let orgPausedStatus = this.audio.paused
				if (!this.audio.paused) {
					this.audioCtx.pause()
				}
				this.caculateprogress(e)
				if (!orgPausedStatus) {
					this.audioCtx.play()
				}
				this.currentMid = ''
			},
			doseek(ol) {
				this.progress = ol
				this.seekPos = ol / this.prgrect.width
			},
			onmousedown(e) {
				this.dragstart = true
				this.currentMid = this.audio.mid
			},
			onmousemove(e) {
				if (this.dragstart) {
					this.caculateprogress(e)
				}
			},
			onmouseup(e) {
				this.dragstart = false
				if (this.currentMid == this.audio.mid) {
					this.onseek(e)
				}
			},
			progressbarRect() {
				let el = this.$refs['progressbar']
				this.prgrect = el.getClientRects()[0]
			}
		},
		mounted() {
			this.audioCtx = document.getElementById(`h5audio-${this.audio.mid}`)
			document.addEventListener('mousemove', this.onmousemove)
			document.addEventListener('mouseup', this.onmouseup)
			this.progressbarRect()
			this.$bus.$on('pauseaudio', this.pauseNow)
		},
		created() {
		}
	}
</script>