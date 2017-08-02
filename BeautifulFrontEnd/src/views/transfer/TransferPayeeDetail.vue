<template>
    <div class="TransferPayeeDetailContain">
        <div class="detail_header">
            <div class="left">{{transfer.acctName}}</div>
            <div class="right">
                <li><img :src="transfer.bankLogo" width="24" style="vertical-align:middle"></img>{{transfer.bankNameDis}}</li>
                <li>{{transfer.account}}</li>
            </div>
        </div>
        <div class="detail-ctrl">
            <div>删除</div>
            <div v-on:click="toTransfer">立即转账</div>
        </div>
        <div class="detail_content" v-for="item in paymentList" :key="item.billNo">
            <div class="detail_Info">
                <div class="left">{{item.Tdate}}</div>
                <div class="left">{{item.Ttime}}</div>
            </div>
            <div class="detail_Info">
                <div class="right">{{item.tranAmt}}</div>
                <div class="right">{{item.status}}</div>
            </div>
        </div>

    </div>
</template>
<script>
    import { TRANS_STATUS_MAPPING } from '../../utils/constants'
    import {currency} from '../../utils/filters'
    export default{
        name: 'TransferPayeeDetail',
        data () {
            return {
                paymentList: []
            }
        },
        methods: {

            /** 根据收款人查询交易记录 */
            getPayeeListByrec: function () {
                let self = this
                let request = {}
                request.queryFlag = 1// 根据收款人去查询
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
                            paymentInfo.tranAmt = currency(arg.tranAmt)
                            self.paymentList.push(paymentInfo)
                        })
                    }
                })
            },
            toTransfer: function () {
                this.$router.push('/transfer/transfer')
            }
        },
        created: function () {
            this.getPayeeListByrec()
        },
        computed: {
            transfer () {
                return this.$store.state.transfer.recINfo
            }
        }
    }
</script>
<style scoped lang="less">
    .TransferPayeeDetailContain{
        .detail_header{
            display: flex;
            margin: 10px 10px 0px 10px;
            div{
                height: 60px;
                background-color: #ffffff;
            }
            .left{
                width: 25%;
                line-height: 60px;
                text-align: center;
            }
            .right{
                width: 75%;
                li{
                    height: 30px;
                    line-height: 30px;
                    list-style: none;
                }
                li:before{
                    height: 1px;
                    width: 70%;
                    content: '';
                    background-color: #cecece;
                }
                li:last-child{
                    // border-top: 1px solid #cecece;
                }
            }
        }
        .detail-ctrl{
            margin: 0px 10px;
            background-color: rgb(247,247,248);
            height: 50px;
            display: flex;
            text-align: center;
            div{
                width: 30%;
                height: 30px;
                line-height: 30px;
                background-color: rgb(9,155,254);
                color: #ffffff;
                margin: 10px auto;
                border-radius: 30px;
            }
        }
        .detail_content{
            display: flex;
            padding: 0 10px;
            background-color: #ffffff;
            .detail_Info{
                height: 50px;
                width: 100%;
                border-bottom: 1px solid #cecece;
                div{
                    height: 25px;
                    line-height: 25px;
                }
                .left{
                    text-align: left;
                }
                .right{
                    text-align: right;
                }
            }
        }
    }
</style>
