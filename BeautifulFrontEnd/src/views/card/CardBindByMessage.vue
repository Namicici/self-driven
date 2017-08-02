<template lang="html">
    <div class="page card-bind-by-message">
        <div class="page-wrapper">
            <mt-field label="银行卡号" placeholder="请输入银行卡号" :attr="{maxlength: 23}" v-model="cardNoDisplayValue"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" :attr="{maxlength: 30}" v-model="datas.custName"></mt-field>
            <mt-field label="证件类型" @click.native="chooseCertType" placeholder="请选择证件类型" v-model="datas.identType.dicName" :readonly="true"></mt-field>
            <mt-field label="证件号码" placeholder="请输入证件号码" :attr="{maxlength: 30}" type="number" v-model="datas.identNo"></mt-field>
            <mt-field label="预留手机号" placeholder="请输入预留手机号" :attr="{maxlength: 11}" type="tel" v-model="datas.mobile"></mt-field>
            <mt-field label="短信验证码" placeholder="请输入验证码" :attr="{maxlength: 6}" v-model="datas.verifyCode">
                <ui-sms-code v-model="captchaStatus" @click.native="getCaptcha"></ui-sms-code>
            </mt-field>
            <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text">同意<a class="agreement" v-on:click="$router.push('/card/agreement')">《用户协议》</a></span>
                    </div>
                    <div class="mint-cell-value">
                        <mt-switch v-model="agreement"></mt-switch>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <div class="captcha-tips" v-if="sequence">
                已向您的安全手机发送序号为<span>[{{ sequence }}]</span>的验证码。若一分钟后仍未收到，请再次获取。
            </div>
            <div class="footer-btn-push"></div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="bind" :is-loading="binding" :is-disabled="!agreement">绑定</ui-button-spin>
        </footer>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;">
            <mt-picker :slots="slots" @change="onValuesChange" value-key="dicName"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import UiSmsCode from '../../components/SmsCode'
import UiButtonSpin from '../../components/ButtonSpin'
import { MessageBox, Toast } from 'mint-ui'
import { getDic, getSmsCaptcha } from '../../utils/businessCommon'
import validate from '../../utils/validate'

export default {
    name: 'card-bind-by-message',
    components: {
        UiSmsCode,
        UiButtonSpin
    },
    data () {
        return {
            datas: {
                cardNo: '',
                custName: '',
                identType: {},
                identNo: '',
                mobile: '',
                verifyCode: ''
            },
            agreement: true, // 协议标识符
            captchaStatus: false, // 验证码按钮状态
            sequence: '', // 验证码短信序号
            popupVisible: false,
            slots: [{
                values: []
            }],
            binding: false
        }
    },
    activated () {
        this.binding = false
        this.sequence = ''
        this.agreement = true
        this.cardNoDisplayValue = ''
        this.datas.cardNo = ''
        this.datas.custName = ''
        this.datas.identNo = ''
        this.datas.mobile = ''
        this.datas.verifyCode = ''
        if (this.slots[0].values.length === 0) {
            this.getCertType()
        }
    },
    computed: {
        cardNoDisplayValue: {
            get () {
                return this.datas.cardNo.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
            },
            set (newValue) {
                this.datas.cardNo = newValue.replace(/ /g, '')
            }
        }
    },
    methods: {
        /**
         * 获取证件类型字典值
         */
        getCertType () {
            getDic({type: 'ID_CARD_TYPE'}).then(data => {
                if (data.data.LIST && data.data.LIST.length > 0) {
                    this.slots[0].values = data.data.LIST
                    // init identType
                    this.datas.identType = data.data.LIST[0]
                }
            })
        },
        /**
         * 绑定
         */
        bind () {
            if (!this.datas.cardNo) {
                Toast({message: '请输入银行卡号', position: 'bottom'})
                return
            }
            if (!this.datas.custName) {
                Toast({message: '请输入姓名', position: 'bottom'})
                return
            }
            if (!this.datas.identNo) {
                Toast({message: '请输入证件号码', position: 'bottom'})
                return
            }
            if (!this.datas.mobile) {
                Toast({message: '请输入预留手机号', position: 'bottom'})
                return
            }
            if (!validate.isMobile(this.datas.mobile)) {
                Toast({message: '请输入正确格式的手机号', position: 'bottom'})
                return
            }
            if (!this.sequence) {
                Toast({message: '请获取短信验证码', position: 'bottom'})
                return
            }
            if (!this.datas.verifyCode) {
                Toast({message: '请输入短信验证码', position: 'bottom'})
                return
            }
            if (this.binding) return
            this.binding = true
            this.$http({
                method: 'POST',
                url: '/user/registAcctBySms',
                data: {
                    cardNo: this.datas.cardNo,
                    custName: this.datas.custName,
                    identType: this.datas.identType.dicCode,
                    identNo: this.datas.identNo,
                    mobile: this.datas.mobile,
                    verifyCode: this.datas.verifyCode,
                    sequence: this.sequence
                }
            }).then(data => {
                MessageBox.alert('银行卡绑定成功，但为了您的账户安全，请设置支付密码').then(action => {
                    this.$router.replace('/safe/setPayPwd')
                })
            }).catch(data => {
                this.binding = false
            })
        },
        /**
         * 证件类型change事件
         */
        onValuesChange (picker, values) {
            if (values[0]) { this.datas.identType = values[0] }
        },
        /**
         * 选择证件类型
         */
        chooseCertType () {
            this.popupVisible = true
        },
        /**
         * 获取验证码
         */
        getCaptcha () {
            if (!this.datas.mobile) {
                Toast({message: '请输入预留手机号', position: 'bottom'})
                return
            }
            if (!validate.isMobile(this.datas.mobile)) {
                Toast({message: '请输入正确格式的手机号', position: 'bottom'})
                return
            }
            this.captchaStatus = true
            getSmsCaptcha({
                tranAmt: 0.00,
                mobile: this.datas.mobile
            }).then(data => {
                this.sequence = data.data.sequence
            }).catch(data => {

            })
        }
    },
    beforeRouteLeave (to, from, next) {
        // 该页面离开之前，隐藏证件类型弹出层
        if (this.popupVisible) {
            this.popupVisible = false
        }
        // 该页面离开之前，检测是否存在表单值
        if (!this.binding && (this.datas.cardNo || this.datas.custName || this.datas.identNo || this.datas.mobile || this.datas.verifyCode)) {
            MessageBox.confirm('该页面表单数据未保存，请确认要离开吗？').then(action => {
                next()
            })
            return
        }
        next()
    }
}
</script>

<style lang="less">
@import "../../styles/card";
</style>
