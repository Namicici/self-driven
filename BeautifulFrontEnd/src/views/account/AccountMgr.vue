<template>
    <div class="account-mgr">
        <mt-cell :title="accountAct.acctNo">
            <img slot="icon" src="/assets/img/account/userIcon.png" width="24" height="24">
            <mt-button type="primary" size="small" v-on:click="mgrAccount">管理</mt-button>
        </mt-cell>
        <mt-cell title="账户名称" :value="accountAct.acctName"></mt-cell>
        <mt-cell title="余额" :value="accountAct.acctBalance"></mt-cell>
        <mt-cell title="积分" :value="accountAct.acctPoint"></mt-cell>
        <div class="operate">
            <mt-button type="primary" size="small" v-on:click="routeTo('/transfer/addPayee?_from=account')">转账汇款</mt-button>
            <mt-button type="primary" size="small" v-on:click="routeTo('/account/details')">明细查询</mt-button>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"> </mt-actionsheet>
    </div>
</template>
<script>

import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import { MODE_ADDED_TYPE, BIND_FLAG } from '../../utils/constants'
import { unbindAcct } from '../../utils/businessCommon'

export default {
    data () {
        return {
            actions: [{name: '解除绑定', method: this.unbind}],
            sheetVisible: false,
            accountInfo: {}
        }
    },
    computed: {
        ...mapState('account', {
            account: 'account'
        }),
        accountAct () {
            console.log('ppppp')
            return (!!this.account && this.account.hasOwnProperty('acctIdx')) ? this.account : this.accountInfo
        }
    },
    activated () {
        if (!(!!this.account && this.account.hasOwnProperty('acctIdx'))) {
            this.$http({
                method: 'get',
                url: '/account/select',
                params: {
                    acctIdx: this.$route.params.idx
                }
            }).then((data) => {
                this.accountInfo = data.data
                console.log(this.accountInfo)
            })
        }
    },
    methods: {
        /**
         * 解绑账户
         */
        unbind () {
            MessageBox.confirm('确认要解绑吗？').then(() => {
                if (this.account.addMode !== MODE_ADDED_TYPE.ADDED_BY_STICK_CARD) {
                    MessageBox.alert('贴膜卡类型不能解绑，请变更为短信模式', '信息提示')
                    return
                }
                unbindAcct({
                    addMode: MODE_ADDED_TYPE.ADDED_BY_NORMAL,
                    acctIdx: this.account.acctIdx
                }).then((data) => {
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
                })
            })
        },
        mgrAccount () {
            this.sheetVisible = true
        },
        routeTo (url) {
            if (url.indexOf('/transfer/addPayee') > -1) {
                this.$store.commit('transfer/update', {key: 'payInfo', value: this.$store.state.account.account})
            }
            this.$router.push(url)
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.path === '/card') {
            window.history.back()
        }
        next()
    }
}
</script>
<style lang="less">
.account-mgr{
    height: 100%;
    .mint-cell{
        button{
            width: 0.8rem;
            border-radius: 0.1rem;
            height: 0.25rem;
        }
    }
    .operate{
        display: flex;
        justify-content: space-around;
        margin-top: 0.1rem;

        button{
            border-radius: 0.1rem;
            width: 1rem;
        }
    }
}
</style>
