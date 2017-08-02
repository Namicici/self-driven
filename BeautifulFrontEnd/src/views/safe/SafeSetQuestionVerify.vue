<template lang="html">
    <div class="page safe-message-validate">
        <div class="page-wrapper">
            <mt-field label="安全手机号" type="tel" v-model="phone" :readonly="true"></mt-field>
            <mt-field label="短信验证码" placeholder="请输入验证码" v-model="captcha">
                <ui-sms-code v-model="captchaStatus" @click.native="getCaptcha"></ui-sms-code>
            </mt-field>
            <div class="captcha-tips" v-if="sequence">
                已向您的安全手机发送序号为<span>[:12,123456]</span>的验证码。若一分钟后仍未收到，请再次获取。
            </div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="finish" :is-loading="doing">确认</ui-button-spin>
        </footer>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'
import UiSmsCode from '../../components/SmsCode'
import { getSmsCaptcha } from '../../utils/businessCommon'
import { MessageBox } from 'mint-ui'

export default {
    name: 'safe-message-validate',
    components: {
        UiButtonSpin,
        UiSmsCode
    },
    data () {
        return {
            phone: '176****3993',
            captcha: '',
            captchaStatus: false,
            sequence: '',
            doing: false
        }
    },
    mounted () {
        this.getCaptcha()
    },
    methods: {
        /**
         * 获取短信验证码
         */
        getCaptcha () {
            this.captchaStatus = true
            getSmsCaptcha({}).then(data => {
                this.sequence = data.data.sequence
            }, data => {

            })
        },
        /**
         * 确认完成
         */
        finish () {
            if (this.doing) return
            this.doing = true
            this.$http({
                method: 'POST',
                url: '/personal/setSafetyProb',
                data: {

                }
            }).then(data => {
                MessageBox.alert('安全问题设置成功').then(action => {
                    this.doing = false
                    // 回到安全中心首页
                    this.$router.go(-2)
                })
            }, data => {
                this.doing = false
            })
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
@import '../../styles/index';
.cell-tips {
    font-weight: 600;
    padding: 0 10px;
    font-size: @font-size-base;
    line-height: 50px;
}
</style>
