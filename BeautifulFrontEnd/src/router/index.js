import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Router.prototype._replace = Router.prototype.replace

Router.prototype.replace = function (location, onComplete, onAbort) {
    // 更新公共参数isReplace为true，表示是replace
    store.commit('updateReplace', true)
    return this._replace(location, onComplete, onAbort)
}

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['../views/Index.vue'], resolve),
            meta: {
                title: '微信银行首页',
                state: 0
            }
        }, {
            path: '/account',
            name: 'Account',
            component: resolve => require(['../views/account/Account.vue'], resolve),
            meta: {
                title: '我的账户'
            }
        }, {
            path: '/account/accountMgr/:idx',
            name: 'AccountMgr',
            component: resolve => require(['../views/account/AccountMgr.vue'], resolve),
            meta: {
                title: '账户信息'
            }
        }, {
            path: '/account/details',
            name: 'AccountDetails',
            component: resolve => require(['../views/account/AccountDetails.vue'], resolve),
            meta: {
                title: '账户明细'
            }
        }, {
            path: '/account/details/item',
            name: 'AccountDetailsItem',
            component: resolve => require(['../views/account/TransferDetail.vue'], resolve),
            meta: {
                title: '账户明细详情'
            }
        }, {
            path: '/card',
            name: 'Card',
            component: resolve => require(['../views/card/Card.vue'], resolve),
            meta: {
                title: '我的银行卡'
            }
        }, {
            path: '/card/bindType',
            name: 'CardBindType',
            component: resolve => require(['../views/card/CardBindType.vue'], resolve),
            meta: {
                title: '选择绑卡类型'
            }
        }, {
            path: '/card/bindByMessage',
            name: 'CardBindByMessage',
            component: resolve => require(['../views/card/CardBindByMessage.vue'], resolve),
            meta: {
                title: '根据短信绑定银行卡'
            }
        }, {
            path: '/card/bindByStickCard',
            name: 'CardBindByStickCard',
            component: resolve => require(['../views/card/CardBindByStickCard.vue'], resolve),
            meta: {
                title: '根据贴膜卡绑定银行卡'
            }
        }, {
            path: '/card/bind',
            name: 'CardBind',
            component: resolve => require(['../views/card/CardBind.vue'], resolve),
            meta: {
                title: '绑定银行卡'
            }
        }, {
            path: '/card/manager',
            name: 'CardManager',
            component: resolve => require(['../views/card/CardManager.vue'], resolve),
            meta: {
                title: '银行卡管理'
            }
        }, {
            path: '/card/agreement',
            name: 'Agreement',
            component: resolve => require(['../views/card/Agreement.vue'], resolve),
            meta: {
                title: '用户协议'
            }
        }, {
            path: '/transfer/index',
            name: 'TransferIndex',
            component: resolve => require(['../views/transfer/TransferIndex.vue'], resolve),
            meta: {
                title: '转账汇款'
            }
        }, {
            path: '/transfer/addPayee',
            name: 'AddPayee',
            component: resolve => require(['../views/transfer/AddPayee.vue'], resolve),
            meta: {
                title: '新增常用收款人'
            }
        }, {
            path: '/transfer/transfer',
            name: 'Transfer',
            component: resolve => require(['../views/transfer/Transfer.vue'], resolve),
            meta: {
                title: '转账汇款'
            }
        }, {
            path: '/transfer/selectBank',
            name: 'SelectBank',
            component: resolve => require(['../views/transfer/SelectBank.vue'], resolve),
            meta: {
                title: '选择银行'
            }
        }, {
            path: '/transfer/selectCity',
            name: 'SelectCity',
            component: resolve => require(['../views/transfer/SelectCity.vue'], resolve),
            meta: {
                title: '选择开户城市'
            }
        }, {
            path: '/transfer/selectNet',
            name: 'SelectNet',
            component: resolve => require(['../views/transfer/SelectNet.vue'], resolve),
            meta: {
                title: '选择开户网点'
            }
        }, {
            path: '/transfer/transferComfir',
            name: 'TransferComfir',
            component: resolve => require(['../views/transfer/TransferComfir.vue'], resolve),
            meta: {
                title: '转账信息确认'
            }
        }, {
            path: '/transfer/transferSuccess',
            name: 'TransferSuccess',
            component: resolve => require(['../views/transfer/TransferSuccess.vue'], resolve),
            meta: {
                title: '交易详情'
            }
        }, {

            path: '/safe',
            name: 'Safe',
            component: resolve => require(['../views/safe/Safe.vue'], resolve),
            meta: {
                title: '安全中心'
            }
        }, {
            path: '/safe/setPayPwd',
            name: 'SafeSetPayPwd',
            component: resolve => require(['../views/safe/SafeSetPayPwd.vue'], resolve),
            meta: {
                title: '设置支付密码'
            }
        }, {
            path: '/safe/setQuestion',
            name: 'SafeSetQuestion',
            component: resolve => require(['../views/safe/SafeSetQuestion.vue'], resolve),
            meta: {
                title: '设置安全问题'
            }
        }, {
            path: '/safe/setQuestion/verify',
            name: 'SafeSetQuestionVerify',
            component: resolve => require(['../views/safe/SafeSetQuestionVerify.vue'], resolve),
            meta: {
                title: '安全问题短信验证'
            }
        }, {
            path: '/safe/safeManager',
            name: 'SafeManager',
            component: resolve => require(['../views/safe/SafeManager.vue'], resolve),
            meta: {
                title: '安全认证管理'
            }
        }, {
            path: '/safe/phone/verify',
            name: 'SafePhoneVerify',
            component: resolve => require(['../views/safe/SafePhoneVerify.vue'], resolve),
            meta: {
                title: '验证原手机号'
            }
        }, {
            path: '/safe/phone/change',
            name: 'SafePhoneChange',
            component: resolve => require(['../views/safe/SafePhoneChange.vue'], resolve),
            meta: {
                title: '修改新手机号'
            }
        }, {
            path: '/safe/phone/changeByPwd',
            name: 'SafePhoneChangeByPwd',
            component: resolve => require(['../views/safe/SafePhoneChangeByPwd.vue'], resolve),
            meta: {
                title: '修改新手机号'
            }
        }, {
            path: '/safe/modeChange',
            name: 'SafeModeChange',
            component: resolve => require(['../views/safe/SafeModeChange.vue'], resolve),
            meta: {
                title: '修改安全认证方式'
            }
        }, { path: '/transfer/tranPayee',
            name: 'tranPayee',
            component: resolve => require(['../views/transfer/TranPayee.vue'], resolve),
            meta: {
                title: '常用收款人管理'
            }
        }, {
            path: '/transfer/TransferPayeeDetail',
            name: 'TransferPayeeDetail',
            component: resolve => require(['../views/transfer/TransferPayeeDetail.vue'], resolve),
            meta: {
                title: '收款人详情'
            }
        }, {
            path: '/transfer/transRecord',
            name: 'TransRecord',
            component: resolve => require(['../views/transfer/TranRecord.vue'], resolve),
            meta: {
                title: '转账记录'
            }
        }, {
            path: '/transfer/transRecordDetail',
            name: 'TransRecordDetail',
            component: resolve => require(['../views/transfer/TranRecordDetail.vue'], resolve),
            meta: {
                title: '转账记录详情'
            }
        }, {
            path: '/introduct/introductCategory',
            name: 'introductCategory',
            component: resolve => require(['../views/introduct/IntroductCategory.vue'], resolve),
            meta: {
                title: '业务分类'
            }
        }, {
            path: '/introduct/introductInfo',
            name: 'introductInfo',
            component: resolve => require(['../views/introduct/IntroInfo.vue'], resolve),
            meta: {
                title: '业务信息'
            }
        }
    ]
})

export default router
