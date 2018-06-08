<template>
    <div class="page">
        <ss-header :title="'Games'"></ss-header>
        <section>
            <ul>
                <li v-for="item in games" :key="item.url">
                    <a :href="item.url">{{item.title}} </a>
                </li>
            </ul>
        </section>
    </div>
</template>
<style>

</style>
<script>
// import scrapeHtml from "file-loader!/games/scrape/index.html"
// import goldenEggHtml from 'file-loader!/games/goldenEgg/index.html'
// import turntableHtml from 'file-loader!/games/turntable/index.html'

export default {
    data () {
        return {
            games: [
                {title: '刮刮乐PC', url: '/games/scrape/index.html'},
                {title: '刮刮乐', url: '/tips/games/scrape'},
                {title: '砸金蛋', url: '/games/goldenEgg/index.html'},
                {title: '大转盘', url: '/tips/games/turntable'},
                {title: '大转盘PC', url: '/games/turntable/index.html'}
            ]
        }
    },
    methods: {
        routeTo (item) {
            this.$router.push(item.url)
        }
    }
}
</script>