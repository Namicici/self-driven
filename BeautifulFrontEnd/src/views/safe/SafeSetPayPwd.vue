<template lang="html">
    <div class="page safe-set-pay-pwd">
        <div class="page-wrapper">
            <mt-field label="设置密码" placeholder="6位字母,数字组合" v-model="datas.password" @click.native.stop="showKeyBoard" :readonly="true"></mt-field>
            <mt-field label="确认密码" placeholder="请再次输入密码" v-model="datas.confirmPwd" @click.native.stop="showKeyBoard" :readonly="true"></mt-field>
            <mt-field label="安全手机号" type="tel" v-model="datas.phone" :readonly="true"></mt-field>
            <mt-field label="短信验证码" placeholder="请输入验证码" v-model="datas.captcha">
                <ui-sms-code v-model="captchaStatus" @click.native="getCaptcha"></ui-sms-code>
            </mt-field>
            <div class="captcha-tips" v-if="sequence">
                已向您的安全手机发送序号为<span>[:12,123456]</span>的验证码。若一分钟后仍未收到，请再次获取。
            </div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="setPwd" :is-loading="setting">完成</ui-button-spin>
        </footer>
        <ui-keyboard v-model="keyBoardStatus" @done="keyDone" :ekey="ekey" v-click-outside="test"></ui-keyboard>
    </div>
</template>

<script>
import UiSmsCode from '../../components/SmsCode'
import UiButtonSpin from '../../components/ButtonSpin'
import UiKeyboard from '../../components/keyboard/KeyBoard'
import { getSmsCaptcha } from '../../utils/businessCommon'
import { MessageBox } from 'mint-ui'
import ClickOutside from '../../directives/clickoutside'

export default {
    name: 'safe-set-pay-pwd',
    components: {
        UiSmsCode,
        UiButtonSpin,
        UiKeyboard
    },
    directives: {
        ClickOutside
    },
    data () {
        return {
            datas: {
                password: '',
                confirmPwd: '',
                phone: '176****3993',
                captcha: ''
            },
            setting: false,
            captchaStatus: false,
            keyBoardStatus: false,
            sequence: '',
            ekey: ''
        }
    },
    methods: {
        /**
         * 完成设置密码
         */
        setPwd () {
            this.$http({
                method: 'POST',
                url: '/personal/updatePayPwd',
                data: {}
            }).then(data => {
                MessageBox.alert('支付密码设置成功').then(action => {
                    this.$router.replace('/safe/setQuestion')
                })
            }, data => {

            })
        },
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
        showKeyBoard () {
            this.ekey = 'ac8e5f9bea40d0c06b76b04595e8457679251d590f5f3f442b0802b2055ea63b72c7c3b502c05856154bba1fdfaa3fa50478273187882ccc4f02c3b192a1455a6572d0d68b5ce132e765449b1b2edcd3a9cf8cc66ea838ff7dc74bc5e8b8ef37b37914227de536b4ace62e537c41ef0ce6ce4194e9c4ef472dd61ce2fb5cdaf5'
            this.keyBoardStatus = true
        },
        keyDone (val) {
            console.log(val)
        },
        test () {
            if (this.keyBoardStatus) { this.keyBoardStatus = false }
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.path === '/card/bindType') {
            window.history.back()
        }
        next()
    }
}
</script>

<style lang="less">
@import '../../styles/index.less';

</style>
