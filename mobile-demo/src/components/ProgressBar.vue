<template lang="html">
    <div class="ui-progress-bar" :style="styles"></div>
</template>

<script>
export default {
    name: 'ui-progress-bar',
    props: {
        color: {
            type: String,
            default: '#ffca2b'
        },
        failedColor: {
            type: String,
            default: '#ff0000'
        }
    },
    data () {
        return {
            percent: 0,
            show: false,
            isSucc: true,
            duration: 3000,
            height: '2px'
        }
    },
    computed: {
        styles () {
            return {
                width: this.percent + '%',
                height: this.height,
                backgroundColor: this.isSucc ? this.color : this.failedColor,
                opacity: this.show ? 1 : 0
            }
        }
    },
    methods: {
        start () {
            this.show = true
            this.isSucc = true
            if (this._timer) {
                clearInterval(this._timer)
                this.percent = 0
            }
            this._cut = 10000 / Math.floor(this.duration)
            this._timer = setInterval(() => {
                this.percent = this.percent + Math.floor(this._cut * Math.random())
                if (this.percent > 95) {
                    this.finish()
                }
            }, 100)
        },
        finish () {
            this.percent = 100
            this.hide()
        },
        hide () {
            clearInterval(this._timer)
            this._timer = null
            setTimeout(() => {
                this.show = false
                this.$nextTick(() => {
                    this.percent = 0
                })
            }, 500)
        },
        fail () {
            this.isSucc = false
            this.finish()
        }
    }

}
</script>

<style lang="css">
.ui-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 0%;
    height: 2px;
    transition: width .2s, opacity 0.4s;
    opacity: 1;
    z-index: 5000;
}
</style>
