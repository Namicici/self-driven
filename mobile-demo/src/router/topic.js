export default [
	{
		path: '/topic/download',
		name: 'Download',
		component: resolve => require(['../views/download/download.vue'], resolve),
		meta: {
			title: 'download'
		}
	}, {
		path: '/topic/prefetch',
		name: 'Prefetch',
		component: resolve => require(['../views/prefetch.vue'], resolve),
		meta: {
			title: 'prefetch'
		}
	}, {
		path: '/topic/cookie',
		name: 'Cookie',
		component: resolve => require(['../views/cookie.vue'], resolve),
		meta: {
			title: 'Cookie'
		}
	}, {
		path: '/topic/adaptive',
		name: 'Adaptive',
		component: resolve => require(['../views/adaptive/adaptive.vue'], resolve),
		meta: {
			title: 'Adaptive'
		}
	}, {
		path: '/topic/upload',
		name: 'Upload',
		component: resolve => require(['../views/upload/upload.vue'], resolve),
		meta: {
			title: 'Upload'
		}
	}, {
		path: '/topic/center',
		name: 'Center',
		component: resolve => require(['../views/css/center.vue'], resolve),
		meta: {
			title: 'Center'
		}
	}, {
		path: '/topic/float',
		name: 'Float',
		component: resolve => require(['../views/css/float.vue'], resolve),
		meta: {
			title: 'Float'
		}
	}, {
		path: '/topic/flow',
		name: 'Flow',
		component: resolve => require(['../views/css/flow.vue'], resolve),
		meta: {
			title: 'Flow'
		}
	}, {
		path: '/topic/icons',
		name: 'Icons',
		component: resolve => require(['../views/css/icons.vue'], resolve),
		meta: {
			title: 'Icons'
		}
	}, {
		path: '/topic/layout',
		name: 'Layout',
		component: resolve => require(['../views/css/layout.vue'], resolve),
		meta: {
			title: 'Layout'
		}
	}, {
		path: '/topic/regexp',
		name: 'Regexp',
		component: resolve => require(['../views/regexp/regexp.vue'], resolve),
		meta: {
			title: 'Regexp'
		}
	}, {
		path: '/topic/css/waterflowByJS',
		name: 'Water Flow By JS',
		component: resolve => require(['../views/css/waterflowByJS.vue'], resolve),
		meta: {
			title: 'Water Flow By JS'
		}
	}, {
		path: '/topic/css/waterflowByCSS',
		name: 'Water Flow By CSS',
		component: resolve => require(['../views/css/waterflowByCSS.vue'], resolve),
		meta: {
			title: 'Water Flow By CSS'
		}
	}, {
		path: '/topic/css/waterflowByFlex',
		name: 'Water Flow By Flex',
		component: resolve => require(['../views/css/waterflowByFlex.vue'], resolve),
		meta: {
			title: 'Water Flow By Flex'
		}
	}, {
		path: '/topic/games',
		name: 'Games',
		component: resolve => require(['../views/games/index.vue'], resolve),
		meta: {
			title: 'Games'
		}
	}, {
		path: '/topic/games/turntable',
		name: 'Turntable Games',
		component: resolve => require(['../views/games/turntable/index.vue'], resolve),
		meta: {
			title: 'Turntable Games'
		}
	}, {
		path: '/topic/games/scrape',
		name: 'Scrape Games',
		component: resolve => require(['../views/games/scrape/index.vue'], resolve),
		meta: {
			title: 'Scrape Games'
		}
	}, {
		path: '/topic/chat',
		name: 'Chat',
		component: resolve => require(['../views/chat/index.vue'], resolve),
		meta: {
			title: 'Chat'
		}
	}
]