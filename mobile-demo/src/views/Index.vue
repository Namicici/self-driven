<template>
    <div class="page">
        <ss-header :title="'Home'" :isShowBackArrow="false"></ss-header>
		<div class="page-content">
			<section>
				<h3 class="section-name">小知识</h3>
				<ul class="topic">
					<li v-for="item in topics" :key="item.url" v-on:click="routeTo(item)">{{item.title}}</li>
				</ul>
			</section>
			<section>
				<h3 class="section-name">专题</h3>
				<ul class="subject">
					<li v-for="item in subjects" :key="item.url" v-on:click="routeTo(item)">{{item.title}}</li>
				</ul>
			</section>
		</div>
    </div>
</template>

<style lang="less" scoped>
@import "~@/assets/less/custom.less";
section {
    background: @section-color;
    overflow: auto;
    .section-name{
        color: @section-title-color;
        padding: 12px;
    }
    .topic, .subject{
        background: @section-content-color;
	}
}
.topic, .subject {
    overflow: -webkit-paged-y;
    padding: 8px;
    li{
        padding: 8px 16px;
        display: inline-block;
        color: @topic-o-color;
    }
}
.subject {
	li {
		display: block;
	}
}
</style>

<script>
export default {
    data () {
        return {
            topics: [
                {title: '下载', url: '/topic/download'},
                {title: '预取', url: '/topic/prefetch'},
                {title: 'Cookie', url: '/topic/cookie'},
                {title: '移动端适配演示', url: '/topic/adaptive'},
                {title: '上传', url: '/topic/upload'},
                
                {title: 'css居中', url: '/topic/center'},
                {title: 'css浮动', url: '/topic/float'},
                {title: 'css icon', url: '/topic/icons'},
                {title: 'css文档流', url: '/topic/flow'},
                {title: 'css布局', url: '/topic/layout'},

                {title: '正则表达式研究', url: '/topic/regexp'},

                {title: '瀑布流布局', url: '/topic/css/waterflow'},
                {title: 'h5小游戏', url: '/topic/games', blank: true},
                {title: '实时通讯', url: '/topic/chat', blank: false} // blank=true的时候新打开一个tab
			],
			subjects: [
				{title: '音频', url: '/subject/audio'}
			]
        }
    },
    methods: {
        routeTo (item) {
            console.log(item.url)
            this.$router.push(item.url)
        }
    },
    mounted () {
    }
}

</script>
