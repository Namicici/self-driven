export default [
	{
		path: '/subject/audio',
		name: 'Audio',
		component: resolve => require(['../views/audio/index.vue'], resolve),
		meta: {
			title: 'Audio'
		}
	}
]