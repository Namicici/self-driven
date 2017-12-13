export default {
    namespaced: true,

    state () {
        return {
            recINfo: {},
            /** payInfo:付款人信息对象
             * acctIdx:付款账户id
             * acctNo:付款账号（前8后3规则隐藏）
             * acctBalance:账户余额
             * 用于其它页面快速进入转账流程，使用指定账户进行转账
            */
            payInfo: {},
            /**
             *确认转账信息对象
             *transAmount:交易金额
             *payAccNo:付款账户（前8后三展示规则）
             *payAccId:付款账户id
             *payName:付款人名称
             *recNo:收款账号(完全展示，不做隐藏)
             *recName:收款人名称
             *transMark:转账备注
             *recBankName:收款银行（跨行转账时显示）
             *recBankCity:开户城市（跨行转账时显示）
             *recBankNet:开户网点（跨行转账时显示）
             *isOutTrans:是否为跨行转账
             */
            comfirInfo: {},
            /**
            *转账记录详情
            *tranAmt：交易金额
            *status:交易状态
            *billNo:流水号
            *payAcctName:转出人
            *payAcctNo:转出账号
            *recAcctName:收款人
            *recAcctNo:收款人账号
            *bankName:收款银行
            *payType:转账类型
            *tranTime:转账时间
            *note:备注
            */
            transRecordDetail: {}
        }
    },

    mutations: {
        update (state, obj) {
            state[obj.key] = obj.value
            // console.log(JSON.stringify(state.recINfo))
        }
    },

    getters: {

    },

    actions: {

    }

}
