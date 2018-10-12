<template>
  <div id="app">
    <transition :name="transformName">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
    <!-- <div>
        <ss-progressbar ref="ProgressBar" class="page-loading-progress"></ss-progressbar>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import SsProgressbar from './components/progressbar/index'

export default {
    name: 'app',
    // components: {SsProgressbar},
    data () {
        return {
            transformName: 'vux-pop-in'
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    watch: {
        $route (to, from) {
            // 目标state为空为0时，为前进动作
            // if (!to.meta.state) {
            //     to.meta.state = (from.meta.state ? from.meta.state : 0) + 1
            // }
            if (to.path === '/' && from.path !== '/') {
                this.transformName = 'vux-pop-out'
            } else {
                this.transformName = 'vux-pop-in'
                // this.transformName = to.meta.state < from.meta.state ? 'vux-pop-out' : 'vux-pop-in'
                this.transformName = to.path.split('/').length < from.path.split('/').length ? 'vux-pop-out' : 'vux-pop-in'
            }
            // 目标state和来源state不为空，且目标state小于来源state时，为后退动作
            if (to.meta.state && from.meta.state && to.meta.state < from.meta.state) {
                from.meta.state = 0
            }
            // 通过replace跳转时，把from页的state重置掉，同时重置isReplace值为false
            if (this.$store.state.isReplace) {
                from.meta.state = 0
                this.$store.commit('updateReplace', false)
            }
        },
        // isLoading (val) {
            // val ? Indicator.open({
            //     text: 'Loading...',
            //     spinnerType: 'fading-circle'
            // }) : Indicator.close()
            // val ? this.$refs['ProgressBar'].start() : this.$refs['ProgressBar'].finished()
        // }
    }
}
</script>

<style lang="less">
@import "./styles/index.less";
#app {
    font-family: @font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @text-color;
    height: 100%;
    width: 100%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    // top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}
.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.page-loading-progress{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
