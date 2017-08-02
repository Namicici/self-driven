<template>
    <div class="page card card-manager">
        <div class="page-wrapper card-wrapper">
            <div class="card-item">
                <div class="card-title">
                    <span class="card-logo" style="background-image: url('../../assets/img/transfer/xfLogo.png');"></span>
                    <h1>方付通银行</h1>
                    <label>{{ acctTypes[account.acctType] }}</label>
                </div>
                <div class="card-num">
                    {{ account.acctNo }}
                </div>
                <div class="card-btn">
                    <div>
                        <mt-button type="primary" size="small" v-on:click="myAccount">我的账户</mt-button>
                    </div>
                    <div>
                        <mt-button size="small" v-on:click="popupSheet">解除绑定</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"> </mt-actionsheet>
    </div>
</template>

<script>
import { CARD_TYPE_MAPPING, MODE_ADDED_TYPE, BIND_FLAG } from '../../utils/constants'
import { Indicator, MessageBox } from 'mint-ui'
import { unbindAcct } from '../../utils/businessCommon'
import { mapState } from 'vuex'

export default {
    name: 'card-manager',
    data () {
        return {
            acctTypes: CARD_TYPE_MAPPING,
            actions: [{name: '解除绑定', method: this.unbind}],
            sheetVisible: false,
            unbinding: false
        }
    },
    computed: {
        ...mapState('account', {
            account: state => state.account
        })
    },
    activated () {
        if (!this.account.acctNo) {
            window.history.back()
        }
    },
    methods: {
        /**
         * 我的账户
         */
        myAccount () {
            this.$router.push('/account/accountMgr')
        },
        /**
         * 弹出菜单层
         */
        popupSheet () {
            this.sheetVisible = true
        },
        /**
         * 解除绑定
         */
        unbind () {
            if (this.unbinding) return
            MessageBox.confirm('确认要解绑吗？').then(() => {
                this.unbinding = true
                if (this.account.addMode !== MODE_ADDED_TYPE.ADDED_BY_STICK_CARD) {
                    MessageBox.alert('贴膜卡类型不能解绑，请变更为短信模式')
                    return
                }
                Indicator.open('解绑中...')
                unbindAcct({
                    addMode: MODE_ADDED_TYPE.ADDED_BY_NORMAL,
                    acctIdx: this.account.acctIdx
                }).then(data => {
                    Indicator.close()
                    this.unbinding = false
                    if (data.code === '0000') {
                        MessageBox.alert('解绑成功').then(action => {
                            if (data.data.unbindFlag === BIND_FLAG.BINDED) {
                                sessionStorage.setItem('sMobile', '')
                                sessionStorage.setItem('dataStatus', '')
                                sessionStorage.setItem('bindType', '')
                                sessionStorage.setItem('bindFlag', BIND_FLAG.UNBIND)
                                window.history.go(-2)
                            } else {
                                window.history.back()
                            }
                        })
                    } else {
                        MessageBox.alert(data.message)
                    }
                }).catch(data => {
                    Indicator.close()
                    this.unbinding = false
                    MessageBox.alert(data.message)
                })
            })
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.sheetVisible) {
            this.sheetVisible = false
        }
        next()
    }
}
</script>

<style lang="less">
@import "../../styles/card";
</style>
