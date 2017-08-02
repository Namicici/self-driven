<template>

    <div class="tranRecordContain">
        <div class="header">
            <div>全部<span class="header_icon"></span></div>
            <div>三月内<span class="header_icon"></span></div>
        </div>
        <div class="content">
            <div class="contet_div" v-for="item in paymentList" :key="item.billNo" v-on:click="toTransRecordDetail(item)">
                <div class="conten_line_up">
                    <div class="one">{{item.Tdate}}</div>
                    <div class="two">{{item.recAcctName}}</div>
                    <div class="three">{{item.tranAmt}}</div>
                </div>
                <div class="conten_line_down">
                    <div class="one">{{item.Ttime}}</div>
                    <div class="two">{{item.bankName}}</div>
                    <div class="three">{{item.status}}</div>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import {TRANS_STATUS_MAPPING} from '../../utils/constants'
import {currency} from '../../utils/filters'
import {TRANS_TYPE_MAPPING} from '../../utils/constants'
export default{
    name: 'TranRecord',
    data () {
        return {
            paymentList: []
        }
    },
    methods: {
        getPayeeList: function () {
            let self = this
            let request = {}
            request.queryFlag = 2// 根据付款人去查询
            request.acctIdxNo = ''
            request.begDate = ''
            request.endDate = ''
            request.pageNumber = ''
            request.pageSize = ''
            this.$http({
                method: 'GET',
                url: '/transfer/paymentList',
                data: request
            }).then(function (data) {
                if (data.code === '0000') {
                    data.data.LIST.forEach(function (arg, index) {
                        let paymentInfo = arg
                        paymentInfo.Tdate = arg.tranTime.split(' ')[0].substring(5, arg.tranTime.split(' ')[0].length)
                        paymentInfo.Ttime = arg.tranTime.split(' ')[1].substring(0, arg.tranTime.split(' ')[0].length)
                        paymentInfo.status = TRANS_STATUS_MAPPING[arg.status]
                        paymentInfo.transType = TRANS_TYPE_MAPPING[arg.payType]
                        paymentInfo.tranAmt = currency(arg.tranAmt)
                        self.paymentList.push(paymentInfo)
                    })
                }
            })
        },
        toTransRecordDetail: function (item) {
            this.$store.commit('transfer/update', {key: 'transRecordDetail', value: item})
            this.$router.push('/transfer/transRecordDetail')
        }
    },
    created: function () {
        this.getPayeeList()
    },
    computed: {

    }
}
</script>

<style scoped lang="less">
    .tranRecordContain{
        height: 40px;
        background-color: #ffffff;
        .header{
            display: flex;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid rgb(243,243,243);
            div{
                flex-basis: 50%;
            }
            div:last-child{
                border-left: 1px solid rgb(243,243,243);
            }
            div span{
                font-size: 0;
                line-height: 0;
                border-width: 6px;
                border-color: #25A6FF;
                border-bottom-width: 0;
                border-style: dashed;
                border-top-style: solid;
                border-left-color: transparent;
                border-right-color: transparent;
                margin-left: 5px;
            }

        }
        .content{
            margin-top:10px;
            padding: 0px 5px;
            .contet_div{
                border-bottom: 1px solid rgb(241,241,241);
                height: 50px;
                background-color: #ffffff;
                padding: 5px 0px;
            }
            .conten_line_up{
                height:20px;
                display: flex;
                background-color: #ffffff;
                padding: 2px 0px;
                div{
                    // height: 30px;
                    // line-height: 15px;
                }
                .one{
                    width: 20%;
                }
                .two{
                    width:50%;
                }
                .three{
                    width: 30%;
                    text-align: right;
                }
            }
            .conten_line_down{
                height:20px;
                display: flex;
                background-color: #ffffff;
                div{
                    // height: 30px;
                    // line-height: 15px;
                }
                .one{
                    width: 20%;
                }
                .two{
                    width:50%;
                }
                .three{
                    width: 30%;
                    text-align: right;
                }
            }
        }
    }
</style>
