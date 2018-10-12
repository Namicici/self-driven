<template>
    <div class="page">
        <ss-header title="Water Flow"></ss-header>
        <section class="fill">
            <ss-infinite-scroll @pullDown="load" @pullUp="loadMore">
                <div class="water-flow" ref="water-flow">
                    <div class="item" :id="'item' + index" v-for="(item, index) in datas" :key="item">
                        <div class="content">{{item}}</div>
                    </div>
                </div>
            </ss-infinite-scroll>
        </section>
    </div>
</template>
<style lang="less" scoped>
.fill{
    height: 100%;
}
.water-flow{
    display: flex;
    flex-flow: column wrap;
    height: 100%;
    .item{
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
        counter-increment: item-counter;
        .content{
            border: solid 1px gray;
            height: 100px;
            width: 100%;
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
        &:nth-child(4n){
            .content{
                height: 60px;
            }
        }
        &:nth-child(5n){
            .content{
                height: 50px;
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
            }).then((res) => {
                this.lastId = res.data.data[res.data.data.length - 1]
                // let lastIndex = this.datas.length
                this.datas = this.datas.concat(res.data.data)
                // this.$nextTick(() => {
                //     this.arrange(this.datas, lastIndex)
                // })
                this.loading = false
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
