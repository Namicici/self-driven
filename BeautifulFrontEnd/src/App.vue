<template>
  <div id="app">
    <transition :name="transformName">
        <keep-alive exclude="Account">
            <router-view></router-view>
      	</keep-alive>
    </transition>
    <ui-progress-bar ref="ProgressBar"></ui-progress-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Indicator } from 'mint-ui'
import UiProgressBar from './components/ProgressBar'

export default {
    name: 'app',
    components: {
        UiProgressBar
    },
    data () {
        return {
            transformName: 'ui-page-in'
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
            if (!to.meta.state) {
                to.meta.state = (from.meta.state ? from.meta.state : 0) + 1
            }
            if (to.path === '/' && from.path !== '/') {
                this.transformName = 'ui-page-out'
            } else {
                this.transformName = to.meta.state < from.meta.state ? 'ui-page-out' : 'ui-page-in'
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
        isLoading (val) {
            // val ? Indicator.open({
            //     text: 'Loading...',
            //     spinnerType: 'fading-circle'
            // }) : Indicator.close()
            val ? this.$refs['ProgressBar'].start() : this.$refs['ProgressBar'].finish()
        }
    }
}
</script>

<style lang="less">
@import "./styles/index.less";
@import "./styles/animation/index.less";
#app {
    font-family: @font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @text-color;
    height: 100%;
    width: 100%;
}
</style>
