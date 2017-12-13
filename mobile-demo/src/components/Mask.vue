<template lang="html">
    <transition :name="transformName">
        <div class="ui-mask" @click="handleClick" v-show="currShow" :style="styles"></div>
    </transition>
</template>

<script>
export default {
    name: 'ui-mask',
    props: {
        backgroundColor: {
            type: String,
            default: 'rgba(0,0,0,.2)'
        },
        autoClose: {
            type: [String, Boolean],
            default: false
        },
        transformName: {
            type: String,
            default: 'fade'
        }
    },
    data () {
        return {
            currShow: false
        }
    },
    computed: {
        styles () {
            return {
                backgroundColor: this.backgroundColor
            }
        }
    },
    methods: {
        handleClick () {
            if (this.autoClose) {
                this.currShow = false
                this.$emit('mask-close')
            }
        },
        show () {
            this.currShow = true
        },
        hide () {
            this.currShow = false
        }
    }

}
</script>

<style lang="less">
@import "../styles/animation/index.less";
@import "../styles/custom.less";

.ui-mask{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: @zindex-modal
}
</style>
