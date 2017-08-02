<template lang="html">
    <div class="page safe-phone-by-pwd">
        <div class="page-wrapper">
            <mt-field label="当前手机号" type="tel" v-model="datas.oldPhone" :readonly="true"></mt-field>
            <mt-field label="支付密码" placeholder="请输入公众银行支付密码" v-model="datas.password" @click.native.stop="showKeyBoard" :readonly="true"></mt-field>
            <mt-field label="新手机号码" placeholder="请输入新手机号码" type="tel" v-model="datas.phone"></mt-field>
            <mt-field label="短信验证码" placeholder="请输入验证码" v-model="datas.captcha">
                <ui-sms-code v-model="captchaStatus" @click.native="getCaptcha"></ui-sms-code>
            </mt-field>
            <div class="captcha-tips" v-if="sequence">
                已向您的安全手机发送序号为<span>[:12,123456]</span>的验证码。若一分钟后仍未收到，请再次获取。
            </div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="save" :is-loading="doing">保存</ui-button-spin>
        </footer>
        <ui-keyboard v-model="keyBoardStatus" @done="keyDone" :ekey="ekey" v-click-outside="test"></ui-keyboard>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'
import UiSmsCode from '../../components/SmsCode'
import { getSmsCaptcha } from '../../utils/businessCommon'
import { MessageBox } from 'mint-ui'
import ClickOutside from '../../directives/clickoutside'
import UiKeyboard from '../../components/keyboard/KeyBoard'

export default {
    name: 'safe-phone-by-pwd',
    components: {
        UiButtonSpin,
        UiSmsCode,
        UiKeyboard
    },
    directives: {
        ClickOutside
    },
    data () {
        return {
            datas: {
                oldPhone: '176****3993',
                password: '',
                phone: '',
                captcha: ''
            },
            keyBoardStatus: false,
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
         * 保存
         */
        save () {
            if (this.doing) return
            this.doing = true
            this.$http({
                method: 'POST',
                url: '/personal/updateMobileByMobile',
                data: {

                }
            }).then(data => {
                MessageBox.alert('安全手机号修改成功').then(action => {
                    this.doing = false
                    window.history.back()
                })
            }, data => {
                this.doing = false
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
    }
}
</script>

<style lang="less">
@import '../../styles/index';
</style>
