<template>
    <ss-infinite-scroll @pullDown="load" @pullUp="loadMore">
        <div class="water-flow" ref="water-flow">
            <div class="item" :id="'item' + index" v-for="(item, index) in datas" :key="item">
                <div class="content">{{item}}</div>
            </div>
        </div>
    </ss-infinite-scroll>
</template>
<style lang="less" scoped>
.water-flow{
    // column-width: 112px;
    position: relative;
    height: 100%;
    .item{
        width: 100px;
        float: left;
        // position: absolute;
        column-width: 112px;
        padding: 10px;
        text-align: center;
        .content{
            border: solid 1px gray;
            height: 100px;
        }
        &:nth-child(2n){
            .content{
                height: 80px;
            }
        }
        &:nth-child(3n){
            .content{
                height: 40px;
            }
        }
    }
}

</style>
<script>
import ssInfiniteScroll from '@/components/infinite-scroll/index'
export default {
    components: {ssInfiniteScroll},
    data () {
        return {
            datas: [],
            lastId: 0,
            loading: false,
            heights: []
        }
    },
    methods: {
        rearrange (sources) {
            this.arrange(sources, 0)
        },
        arrange (sources, lastIndex) {
            let width = document.getElementById('item0').parentNode.clientWidth
            let boxWidth = document.getElementById('item0').clientWidth
            let cols = Math.floor(width / boxWidth)
            for (let i = lastIndex; i < sources.length; i++) {
                let boxHeight = document.getElementById('item' + i).offsetHeight
                if (i < cols) {
                    this.heights.push(boxHeight)
                } else {
                    let minHeight = Math.min.apply(this, this.heights)
                    let minBoxIndex = this.heights.indexOf(minHeight)
                    let ele = document.getElementById('item' + i)
                    ele.style = 'position: absolute; top:' + minHeight + 'px;left:' + boxWidth * minBoxIndex + 'px;'
                    this.heights[minBoxIndex] += boxHeight
                }
            }
            this.loading = false
        },
        getData () {
            if (this.loading) return
            this.loading = true
            this.$http({
                method: 'get',
                url: '/waterflow/datas',
                params: {
                    lastId: this.lastId
                }
            }).then((data) => {
                this.lastId = data.data[data.data.length - 1]
                let lastIndex = this.datas.length
                this.datas = this.datas.concat(data.data)
                this.$nextTick(() => {
                    this.arrange(this.datas, lastIndex)
                })
            }, () => {
                this.loading = false
            })
        },
        load () {
            console.log('new data')
            this.lastId = 0
            this.datas = []
            this.heights = []
            this.getData()
        },
        loadMore () {
            console.log('more')
            this.getData()
        }
    },
    created () {
        this.load()
    }
}
</script>
