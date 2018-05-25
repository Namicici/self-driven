<template>
    <canvas id="randomText" ref="randomText" @click="routeTo" :height="height" :width="width">
        <p>当不支持canvas的时候显示这里的内容</p>
    </canvas>
</template>
<style scoped>
#randomText{
    background-color: antiquewhite;
    width: 100%;
    margin-top: 16px;
}
</style>
<script>
const PADDING = 16 // 画布padding
const ITEM_HEIGHT = 20 //文字/元素 高度
export default {
    name: 'random-item-canvas',
    props:{
        data: {
            type: Array,
            default: []
        },
        height: {
            type: Number,
            default: 200
        },
        width: {
            type: Number,
            default: screen.width
        }
    },
    data () {
        return {
            items: []
        }
    },
    methods: {
        routeTo(e) {
            for (let i = 0; i < this.items.length; i++){
                let temp = this.items[i]
                let isInArea = (e.offsetX >= temp.x && e.offsetX <= (temp.x + temp.textWidth) && e.offsetY >= temp.y && e.offsetY <= (temp.y+20))
                if (isInArea){
                    // this.$router.push(temp.url)
                    this.$emit('click', temp)
                    break
                }
            }
        },
        drawText (ctx) {
            this.items = []
            for (let i = 0; i < this.data.length; i++){
                let item = {
                    font: "16px senrif",
                    fillStyle: 'rgb(0,' + Math.floor(255-255/this.data.length*i) + ',' + Math.floor(255-255/this.data.length*i) + ')',
                    x: Math.random()*this.width,
                    y: Math.random()*this.height,
                    textWidth: ctx.measureText(this.data[i].title).width,
                    url: this.data[i].url
                }
                this.getNoCoverPosition(item)
                this.items.push(item)
                ctx.font = item.font
                ctx.fillStyle = item.fillStyle
                ctx.fillText(this.data[i].title, item.x, item.y)
            }
        },
        getNoCoverPosition (current) {
            // 文字跟画布边缘有一定的空间位置
            if (current.x <= PADDING){
                current.x = current.x + PADDING
            }
            if ((current.x + PADDING + current.textWidth) > screen.width){
                current.x = screen.width - PADDING - current.textWidth
            }
            if (current.y <= PADDING){
                current.y = current.y + PADDING
            }
            if (current.y > this.height/2){
                current.y = current.y - PADDING
            }
            for (let i = 0; i < this.items.length; i++){
                let item = this.items[i]
                let isOverlap = false
                // 以文字长度长的为参照对象来判断长度短的文字是有存在有点落在长文字区间内
                if (current.textWidth <= item.textWidth){
                    isOverlap = (current.x >= item.x && current.x <= (item.x + item.textWidth) && current.y >= item.y && current.y <= (item.y+ITEM_HEIGHT))
                        || ((current.x+current.textWidth) >= item.x && (current.x+current.textWidth) <= (item.x + item.textWidth) && current.y >= item.y && current.y <= (item.y+ITEM_HEIGHT))
                        || (current.x >= item.x && current.x <= (item.x + item.textWidth) && (current.y+ITEM_HEIGHT) >= item.y && (current.y+ITEM_HEIGHT) <= (item.y+ITEM_HEIGHT))
                        || ((current.x+current.textWidth) >= item.x && (current.x+current.textWidth) <= (item.x + item.textWidth) && (current.y+ITEM_HEIGHT)>= item.y && (current.y+ITEM_HEIGHT) <= (item.y+ITEM_HEIGHT))
                } else {
                    isOverlap = (item.x >= current.x && item.x <= (current.x + current.textWidth) && item.y >= current.y && item.y <= (current.y+ITEM_HEIGHT))
                        || ((item.x+item.textWidth) >= current.x && (item.x+item.textWidth) <= (current.x + current.textWidth) && item.y >= current.y && item.y <= (current.y+ITEM_HEIGHT))
                        || (item.x >= current.x && item.x <= (current.x + current.textWidth) && (item.y+ITEM_HEIGHT) >= current.y && (item.y+ITEM_HEIGHT) <= (current.y+ITEM_HEIGHT))
                        || ((item.x+item.textWidth) >= current.x && (item.x+item.textWidth) <= (current.x + current.textWidth) && (item.y+ITEM_HEIGHT)>= current.y && (item.y+ITEM_HEIGHT) <= (current.y+ITEM_HEIGHT))
                }
                if (isOverlap){
                    current.x = Math.random()*this.width
                    current.y = Math.random()*this.height
                    this.getNoCoverPosition(current)
                    break
                }
            }
        },
        initCanvas () {
            if (!this.$refs['randomText'].getContext){
                console.log('不支持canvas')
                return
            }
            let ctx = this.$refs['randomText'].getContext('2d')
            this.drawText(ctx)
        }
    },
    mounted () {
        this.initCanvas()
    }
  
}
</script>
