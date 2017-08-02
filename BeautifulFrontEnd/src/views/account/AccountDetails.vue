<template>
    <div class="account-detail">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div @click="select">
            <mt-cell :title="selAccountNo[0]" >
                <img slot="icon" src="/assets/img/account/userIcon.png" width="24" height="24"/>
                <div class="select"></div>
            </mt-cell>
        </div>
        <ui-picker
            class="picker-wraper"
            ref="picker"
            :slots="slots" v-model="selAccountNo">
        </ui-picker>

        <mt-cell title="开始日期">
            <span>{{startDateFormat}}</span>
            <img src="/assets/img/calendar.png" v-on:click="selStartDate"/>
        </mt-cell>
        <mt-datetime-picker
            ref="startPicker"
            type="date"
            v-model="startDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>

        <mt-cell title="结束日期">
            <span>{{endDateFormat}}</span>
            <img src="/assets/img/calendar.png" v-on:click="selEndDate"/>
        </mt-cell>
        <mt-datetime-picker
            ref="endPicker"
            type="date"
            v-model="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>

        <div class="operate">
            <mt-button :plain="period != 1" size="large" type="primary" v-on:click="period = 1;">一周内</mt-button>
            <mt-button :plain="period != 2" size="large" type="primary" v-on:click="period = 2;">一月内</mt-button>
            <mt-button :plain="period != 3"  size="large" type="primary" v-on:click="period = 3;">三月内</mt-button>
        </div>
        <mt-button class="search" size="large" type="primary" v-on:click="search(true)">查询</mt-button>

        <mt-navbar v-model="selected">
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="income">收入</mt-tab-item>
            <mt-tab-item id="expenditure">支出</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="all">
                <div class="header">
                    <div>交易日期</div>
                    <div>交易摘要</div>
                    <div>交易金额</div>
                </div>
                    <ul>
                        <li v-for="item in detailList" :key="item.tranNo" v-on:click="routeTo(item, '/account/details/item')">
                            <div>{{item.tranTime}}</div>
                            <div>{{item.summary}}</div>
                            <div v-bind:class="{'income-text': item.tranType === isIncome, 'expenditure-text': item.tranType === isExpenditure}"><span v-if="item.tranType === isIncome">+</span><span v-if="item.tranType === isExpenditure">-</span>{{formatCurrency(item.tranAmt)}}</div>
                            <div class="arrow"></div>
                        </li>
                    </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="income">
                <div class="header">
                    <div>交易日期</div>
                    <div>交易摘要</div>
                    <div>交易金额</div>
                </div>
                <ul>
                    <li v-for="item in incomeList" :key="item.tranNo">
                        <div>{{item.tranTime}}</div>
                        <div>{{item.summary}}</div>
                        <div class="income-text">+{{formatCurrency(item.tranAmt)}}</div>
                        <div class="arrow"></div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="expenditure">
                <div class="header">
                    <div>交易日期</div>
                    <div>交易摘要</div>
                    <div>交易金额</div>
                </div>

                <ul>
                    <li v-for="item in expenditure" :key="item.tranNo">
                        <div>{{item.tranTime}}</div>
                        <div>{{item.summary}}</div>
                        <div class="expenditure-text">-{{formatCurrency(item.tranAmt)}}</div>
                        <div class="arrow"></div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </mt-loadmore>
    </div>
</template>
<script>

import { mapState } from 'vuex'
import {checkLogin, login, checkUserAuth} from '../../utils/businessCommon'
import Picker from '../../components/Picker'
import {dateFormatUtil} from '../../utils/date'
import {MessageBox} from 'mint-ui'
import {PAGE_SIZE, TRANSFER_TYPE} from '../../utils/constants'
import {currency} from '../../utils/filters'

export default {
    components: {'ui-picker': Picker},
    data () {
        return {
            slots: [],
            selAccountNo: [],
            accounts: [],
            selAccount: {},
            startDate: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
            startDateFormat: null,
            endDateFormat: null,
            selected: 'all',
            pageNo: 1,
            detailList: [],
            period: 1,
            allLoaded: false,
            isIncome: TRANSFER_TYPE.INCOME,
            isExpenditure: TRANSFER_TYPE.EXPENDITURE
        }
    },
    watch: {
        selAccountNo () {
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].acctNo === this.selAccountNo[0]) {
                    this.selAccount = this.accounts[i]
                    break
                }
            }
        },
        period () {
            let interval = 0
            if (this.period === 1) {
                interval = 7 // 7天
            } else if (this.period === 2) {
                interval = 30 // 30 days
            } else if (this.period === 3) {
                interval = 90 // 90days
            }
            let now = new Date()
            this.endDate = now
            this.startDate = new Date(now - interval * 24 * 60 * 60 * 1000)
        },
        startDate () {
            let end = this.endDate - 0
            let start = this.startDate - 0
            if (end < start) {
                MessageBox('开始时间不能大于开始时间')
                this.startDate = this.endDate
            }
            this.startDateFormat = dateFormatUtil(this.startDate, 'yyyy-MM-dd')
        },
        endDate () {
            let end = this.endDate - 0
            let start = this.startDate - 0
            if (end < start) {
                MessageBox('结束时间不能小于开始时间')
                this.endDate = this.startDate
            }
            this.endDateFormat = dateFormatUtil(this.endDate, 'yyyy-MM-dd')
        }
    },
    methods: {
        convert (data) {
            let tmp = {
                values: []
            }
            for (let i = 0; i < data.length; i++) {
                tmp.values.push(data[i].acctNo)
            }
            return this.slots.push(tmp)
        },
        select () {
            this.$refs.picker.open()
        },
        selStartDate () {
            this.$refs.startPicker.open()
        },
        selEndDate () {
            this.$refs.endPicker.open()
        },
        search (isNew) {
            if (isNew) {
                this.detailList = []
            }
            this.$http({
                method: 'get',
                url: '/account/getAcctDetailList',
                params: {
                    acctIdx: this.selAccount.acctIdx,
                    begDate: this.startDate - 0,
                    endDate: this.endDate - 0,
                    pageNumber: this.pageNo,
                    pageSize: PAGE_SIZE
                }
            }).then((data) => {
                for (let i = 0; i < data.data.LIST.length; i++) {
                    this.detailList.push(data.data.LIST[i])
                }
                this.pageNo++
                this.$refs.loadmore.onBottomLoaded()
                if (!data.page.hasNext) {
                    this.allLoaded = true
                }
            })
        },
        loadTop () {
            this.$refs.loadmore.onTopLoaded()
        },
        loadBottom () {
            this.search()
        },
        getAccounts () {
            this.$http({
                method: 'get',
                url: '/account/list'
            }).then((data) => {
                this.accounts = data.data.LIST
                this.convert(data.data.LIST)
                this.selAccountNo = [this.slots[0].values[0]]
            })
        },
        routeTo (item, url) {
            this.$store.commit('account/update', {key: 'detail', value: item})
            this.$router.push(url)
        },
        init () {
            this.slots = []
            this.pageNo = 1
            this.period = 1
            this.detailList = []
            if (checkLogin()) {
                login().then(() => {
                    checkUserAuth().then(() => {
                        this.getAccounts()
                    })
                })
            } else {
                var tmp = {
                    values: [this.account.acctNo]
                }
                this.slots.push(tmp)
                this.selAccountNo = [this.account.acctNo]
                this.accounts = [this.account]
            }
        },
        formatCurrency (value) {
            return currency(value)
        }
    },
    computed: {
        ...mapState('account', {
            account: 'account'
        }),
        incomeList () {
            let tmp = []
            for (let i = 0; i < this.detailList.length; i++) {
                if (this.detailList[i].tranType === TRANSFER_TYPE.INCOME) {
                    tmp.push(this.detailList[i])
                }
            }
            return tmp
        },
        expenditure () {
            let tmp = []
            for (let i = 0; i < this.detailList.length; i++) {
                if (this.detailList[i].tranType === TRANSFER_TYPE.EXPENDITURE) {
                    tmp.push(this.detailList[i])
                }
            }
            return tmp
        }
    },
    activated () {
        this.init()
    }
}
</script>
<style lang="less">
@import "../../styles/index.less";

.account-detail{
    height: 100%;
    .picker-wraper{
        background-color: @body-background;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .select{
        transform: rotate(-45deg);
        border-right: solid 0.02rem gray;
        border-bottom: solid 0.02rem gray;
        width: 0.1rem;
        height: 0.1rem;
        margin-right: 0.25rem
    }
    img{
        max-height: 0.3rem;
    }

    .operate{
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin: 0.1rem 0;

        button{
            height: 0.3rem;
            border-radius: 0.8rem;
            margin: 0 0.08rem;
            font-size: 0.14rem;
        }
    }
    .search{
        margin: auto;
        width: 94%;
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 0.4rem;
        align-items:center;
        background-color: @slider-disabled-color;
    }
    ul{
        background-color: @body-background;
        li{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 0.4rem;
            div{
                width: 25%;
                text-align: center;
                &:nth-child(3), &:nth-child(4){
                    text-align:right;
                }
            }
            .arrow{
                width: 0.1rem;
                height: 0.1rem;
                border-right: solid 0.01rem gray;
                border-bottom: solid 0.01rem gray;
                transform: rotate(-45deg);
            }
        }
    }
    .mint-navbar {
        margin-top: 0.2rem;
    }
    .income-text{
        color: red;
    }
    .expenditure-text{
        color: green;
    }
}
</style>
