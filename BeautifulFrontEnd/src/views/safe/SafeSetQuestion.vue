<template lang="html">
    <div class="page safe-set-question">
        <div class="page-wrapper">
            <div class="cell-tips">
                建议填写真实答案，以方便记住
            </div>
            <mt-cell title="your mother is boom sha ka la ka?" is-link></mt-cell>
            <mt-field placeholder="问题一答案" v-model="datas.answer1"></mt-field>
            <mt-cell title="your mother is boom sha ka la ka?" is-link></mt-cell>
            <mt-field placeholder="问题二答案" v-model="datas.answer2"></mt-field>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="finish" :is-loading="updating">下一步：短信验证</ui-button-spin>
        </footer>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;">
            <mt-picker :slots="slots" @change="onValuesChange" value-key="dicName"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'

export default {
    name: 'safe-set-question',
    components: {
        UiButtonSpin
    },
    data () {
        return {
            questions: [],
            datas: {
                answer1: '',
                answer2: ''
            },
            updating: false,
            popupVisible: false,
            slots: [{
                values: []
            }]
        }
    },
    created () {
        this.getQuestions()
    },
    methods: {
        /**
         * 获取安全问题列表
         */
        getQuestions () {
            this.$http({
                method: 'GET',
                url: '/personal/querySafetyProb',
                data: {}
            }).then(data => {
                this.questions = data.data.LIST
            }, data => {

            })
        },
        onValuesChange () {

        },
        /**
         * 完成安全问题设置
         */
        finish () {
            this.$router.push('/safe/setQuestion/verify')
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.path === '/card/bindType') {
            history.back()
        }
        next()
    }
}
</script>

<style lang="less">
@import '../../styles/index.less';
.cell-tips {
    font-weight: 600;
    padding: 0 10px;
    font-size: @font-size-base;
    line-height: 50px;
}
</style>
