import Player from './Player'
import Vue from 'vue'

let playerInstance
Player.newInstance = properties => {
	const _props = properties || {}
	const Instance = new Vue({
		data: _props,
		render: (h) => {
			return h(Player, {props: _props})
		}
	})

	const component = Instance.$mount()
	document.body.appendChild(component.$el)

	const player = Instance.$children[0]

	return {
		play(source) {
			player.play(source)
		},
		pause() {
			player.pause()
		}
	}
}

export default {
	play(source) {
		playerInstance = playerInstance || Player.newInstance({autoplay: true})
		playerInstance.play(source)
	},
	pause() {
		playerInstance && playerInstance.pause()
	}
}