export default {
    namespaced: true,

    state () {
        return {
            account: {
                // acctNo: '',
                // acctLastFour: '',
                // acctName: '',
                // acctIdx: '',
                // acctBalance: '',
                // acctPoint: '',
                // addMode: '',
                // acctType: ''
            },
            detail: {
                // tranNo:"W1",
                // tranType:"0",
                // summary:'账户转账',
                // tranTime:'2016-05-14',
                // tranAmt:'1111111111'
            }
        }
    },

    mutations: {
        update (state, obj) {
            state[obj.key] = obj.value
        }
    },

    getters: {

    },

    actions: {

    }

}
