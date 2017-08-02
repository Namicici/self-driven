
<template>
    <div class="account">
        <ui-pie v-if="pieData.length > 0" :percent-data="pieData" name-text="尾号" value-text="余额"></ui-pie>
        <ul class="cards">
            <li v-for="item in accountList" :key="item.acctNo">
                <div class="card">
                    <div class="card-type">{{map(item.acctType)}}</div>
                    <div class="card-no">{{item.acctNo}}</div>
                    <div class="card-icon"><img src="/assets/img/bandByCar.png"/></div>
                    <div class="balance">{{item.acctBalance}}</div>
                </div>
                <div class="operate">
                    <mt-button plain size="large" type="primary" v-on:click="routeTo(item, '/transfer/addPayee?_from=account')">转账汇款</mt-button>
                    <mt-button plain size="large" type="primary" v-on:click="routeTo(item, '/account/accountMgr/' + item.acctIdx)">账户信息</mt-button>
                    <mt-button plain size="large" type="primary" v-on:click="routeTo(item, '/account/details')">账户明细</mt-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Pie from '../../components/Pie'
import {checkLogin, login, checkUserAuth} from '../../utils/businessCommon'
import {CARD_TYPE_MAPPING} from '../../utils/constants'

export default {
    name: 'Account',
    components: {'ui-pie': Pie},
    data () {
        return {
            pieData: [],
            accountList: []
        }
    },
    methods: {
        map (cardType) {
            return CARD_TYPE_MAPPING[cardType]
        },
        routeTo (item, url) {
            this.$store.commit('account/update', {key: 'account', value: item})
            this.$store.commit('transfer/update', {key: 'transfer', value: item})
            this.$router.push(url)
        },
        getAccounts () {
            let cardType = sessionStorage.getItem('FromMycard')
            sessionStorage.removeItem('accMsg')
            if (cardType === 'true') {
                sessionStorage.removeItem('FromMycard')
                return
            }
            this.$http({
                method: 'get',
                url: '/account/list'
            }).then((data) => {
                let list = data.data.LIST
                this.accountList = list
                let tmp = []
                for (let i = 0; i < list.length; i++) {
                    tmp.push({
                        name: list[i].acctLastFour,
                        value: parseFloat(list[i].acctBalance)
                    })
                }
                this.pieData = tmp
            })
        }
    },
    created () {
        checkUserAuth().then(() => {
            this.getAccounts()
        })
    },
    beforeCreate () {
        if (checkLogin()) {
            login()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../styles/index.less";
.account{
    height: 100%;
    .pie-container{
        background-color: #fff;
    }
    .cards{
        li{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            background-color: @body-background;
            margin-top: 0.1rem;
            padding: 0.1rem 0.2rem;
            .card{
                flex-direction: column;
                column-count: 2;
                width: 100%;
                div{
                    height: 0.25rem;
                    display: flex;
                    align-items: center;
                    img{
                        width: 0.25rem;
                    }
                }
                .card-icon{
                    justify-content: flex-end;
                }
                .balance{
                    justify-content: flex-end;
                    color: @error-color;
                }
            }
            .operate{
                display: flex;
                width: 100%;
                justify-content: space-around;
                margin-top: 0.2rem;
                button{
                    height: 0.25rem;
                    border-radius: 0.2rem;
                    margin: 0 0.1rem;
                    font-size: 0.14rem;
                }
            }
        }
    }
}

</style>
