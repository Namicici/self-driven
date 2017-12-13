<template>
    <mt-popup v-model="visible" position="bottom" class="ui-picker">
        <mt-picker
            :slots="slots"
            @change="onValuesChange"
            ref="picker"
            show-toolbar>
            <span class="action cancel" @click="visible = false;$emit('cancel')">{{ cancelText }}</span>
            <span class="action confirm" @click="confirm">{{ confirmText }}</span>
        </mt-picker>
    </mt-popup>
</template>
<script>

export default {
    name: 'ui-picker',
    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        slots: {
            type: Array,
            default: []
        },
        value: null
    },
    data () {
        return {
            visible: false,
            currentValue: null
        }
    },
    methods: {
        open () {
            this.visible = true
            this.currentValue = this.value
            this.$refs.picker.setValues(this.currentValue)
        },
        onValuesChange (picker, values) {
            this.currentValue = picker.getValues()
            this.$emit('input', this.currentValue)
        },
        confirm () {
            this.visible = false
            this.$emit('confirm', this.currentValue)
        }
    }
}

</script>
<style lang="less">
.ui-picker{
    .action{
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }
    .cancel{
        float: left;
    }
    .confirm{
        float:right;
    }
}
.picker-toolbar{
    border-bottom: 1px solid #eaeaea;
}

</style>
