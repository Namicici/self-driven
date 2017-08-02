<template>
    <div class="transfer-detail">
        <mt-cell :title="account.acctNo">
            <img slot="icon" src="/assets/img/account/userIcon.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="交易时间" :value="detail.tranTime"></mt-cell>
        <mt-cell title="交易类型" :value="formatTransType(detail.tranType)"></mt-cell>
        <mt-cell title="交易金额" :value="detail.tranAmt"></mt-cell>
        <mt-cell title="摘要" :value="detail.summary"></mt-cell>
    </div>
</template>
<script>

import { mapState } from 'vuex'
import { TRANSFER_TYPE_MAPPING } from '../../utils/constants'

export default {
    data () {
        return {
        }
    },
    methods: {
        formatTransType (value) {
            return TRANSFER_TYPE_MAPPING[value]
        }
    },
    computed: {
        ...mapState('account', {
            account: 'account',
            detail: 'detail'
        })
    }
}
</script>
<style lang="less">
.transfer-detail{
    height: 100%;
    .mint-cell{
        button{
            width: 0.8rem;
            border-radius: 0.1rem;
            height: 0.25rem;
        }
    }
}
</style>
