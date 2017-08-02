<template lang="html">
    <div class="page safe-update-phone">
        <div class="page-wrapper">
            <mt-field label="当前手机号" type="tel" v-model="phone" :readonly="true"></mt-field>
            <mt-field label="短信验证码" placeholder="请输入验证码" v-model="captcha">
                <ui-sms-code v-model="captchaStatus" @click.native="getCaptcha"></ui-sms-code>
            </mt-field>
            <div class="captcha-tips" v-if="sequence">
                已向您的安全手机发送序号为<span>[:12,123456]</span>的验证码。若一分钟后仍未收到，请再次获取。
            </div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="nextStep" :is-loading="doing">下一步</ui-button-spin>
        </footer>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'
import UiSmsCode from '../../components/SmsCode'
import { getSmsCaptcha } from '../../utils/businessCommon'

export default {
    name: 'safe-update-phone',
    components: {
        UiButtonSpin,
        UiSmsCode
    },
    data () {
        return {
            phone: '176****3993',
            captcha: '',
            captchaStatus: false,
            doing: false,
            sequence: ''
        }
    },
    methods: {
        /**
         * 获取验证码
         */
        getCaptcha () {
            this.captchaStatus = true
            getSmsCaptcha({}).then(data => {
                this.sequence = data.data.sequence
            }, data => {

            })
        },
        /**
         * 下一步
         */
        nextStep () {
            if (this.doing) return
            this.doing = true
            this.$http({
                method: 'POST',
                url: '/common/checkVerifyCode',
                data: {

                }
            }).then(data => {
                this.doing = false
                this.$router.replace('/safe/phone/change')
            }, data => {
                this.doing = false
            })
        }
    }
}
</script>

<style lang="less">
@import '../../styles/index';
</style>
