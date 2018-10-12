<template>
    <div class="scroll-wapper" :class="{'overflow-x': enableHerizal, 'overflow-y': enableVertical, 'overflow-hidden-x': !enableHerizal, 'overflow-hidden-y': !enableVertical}" 
        v-on:scroll="scrollListener" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.scroll-wapper{
    height: 100%;
}
.overflow-x{
    overflow-x: auto;
}
.overflow-y{
    overflow-y: auto;
}
.overflow-hidden-x{
    overflow-x: hidden;
}
.overflow-hidden-y{
    overflow-:y hidden;
}
</style>
<script>
export default {
    name: 'ss-infinite-scroll',
    props: {
        bottomDistance: {
            type: Number,
            default: 20
        },
        upDistance: {
            type: Number,
            default: 20
        },
        leftDistance: {
            type: Number,
            default: 20
        },
        rightDistance: {
            type: Number,
            default: 20
        },
        enableVertical: {
            type: Boolean,
            default: true
        },
        enableHerizal: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            offset: {},
            scrollHeight: 0
        }
    },
    methods: {
        touchstart (e) {
            this.offset = {
                startX: e.changedTouches[0].pageX,
                startY: e.changedTouches[0].pageY
            }
        },
        touchmove (e) {
            this.offset.timeOutEvent = setTimeout(() => {
                this.offset.timeOutEvent = 0
                this.offset.touchType = 'press'
            }, 300)
        },
        touchend (e) {
            clearTimeout(this.offset.timeOutEvent)
            this.offset.timeOutEvent = 0
            this.offset.endX = e.changedTouches[0].pageX
            this.offset.endY = e.changedTouches[0].pageY
            if (this.offset.touchType != 'press') {
                if ((this.offset.endY - this.offset.startY) >= this.upDistance) {
                    this.$emit('pullDown', e)
                }
            }
        },
        scrollListener (e) {
            setTimeout(() => {
                if (this.enableVertical) {
                    console.log('scroll:' + (e.target.scrollTop + e.target.clientHeight))
                    console.log('scroll height: ' + e.target.scrollHeight)
                    if ((e.target.scrollTop + e.target.clientHeight) >= (e.target.scrollHeight)) {
                        // this.scrollHeight = e.target.scrollTop
                        this.$emit('pullUp', e)
                    }
                }
            }, 500)
        }
    },
    created () {
        
    }
}
</script>
