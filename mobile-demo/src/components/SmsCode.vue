<template lang="html">
    <mt-button size="small" :disabled="disabled">
        <span v-show="!disabled">
            <slot>
                获取验证码
            </slot>
        </span>
        <span v-show="disabled">
            {{stext}}
        </span>
    </mt-button>
</template>

<script>
export default {
    name: 'ui-sms-code',
    props: {
        time: {
            default: 60
        },
        value: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            disabled: this.value,
            timeid: '',
            stime: this.time
        }
    },
    computed: {
        stext () {
            return `剩余${this.stime}秒`
        }
    },
    watch: {
        value (val) {
            this.disabled = val
            if (this.disabled) {
                this.getTime()
            } else {
                this.clearTime()
            }
        }
    },
    methods: {
        clearTime () {
            if (this.timeid) {
                clearTimeout(this.timeid)
                this.timeid = ''
                this.$emit('input', false)
            }
        },
        getTime () {
            this.stime = this.time
            this.timeid = setInterval(() => {
                if (this.stime <= 0) {
                    this.clearTime()
                } else {
                    this.stime = this.stime - 1
                }
            }, 1000)
        }
    }
}
</script>
