<template>
    <div class="transRecordDetailContainer">
        <div class="content">
            <mt-cell :title="detail.tranAmt" :value="detail.status"></mt-cell>
            <div class="line-pra" style="border-top: 1px solid rgb(241,241,241);">
                <div class="line">
                    <div class="left">流水号</div>
                    <div class="right">{{detail.billNo}}</div>
                </div>
                <div class="line">
                    <div class="left">手续费</div>
                    <div class="right">0.00</div>
                </div>
            </div>
            <div class="line-pra">
                <div class="line">
                    <div class="left">转出人</div>
                    <div class="right">{{detail.payAcctName}}</div>
                </div>
                <div class="line">
                    <div class="left"></div>
                    <div class="right">{{detail.payAcctNo}}</div>
                </div>
            </div>
            <div class="line-pra">
                <div class="line">
                    <div class="left">收款人</div>
                    <div class="right">{{detail.recAcctName}}</div>
                </div>
                <div class="line">
                    <div class="left"></div>
                    <div class="right">{{detail.bankName}}</div>
                </div>
                <div class="line">
                    <div class="left"></div>
                    <div class="right">{{detail.recAcctNo}}</div>
                </div>
            </div>
            <div class="line-pra">
                <div class="line" v-if="detail.payType!==1">
                    <div class="left">转账类型</div>
                    <div class="right">{{detail.transType}}</div>
                </div>
                <div class="line">
                    <div class="left">转账时间</div>
                    <div class="right">{{detail.tranTime}}</div>
                </div>
                <div class="line">
                    <div class="left">备注</div>
                    <div class="right">{{detail.note}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'transRecordDetail',
        data () {
            return {

            }
        },
        methods: {

        },
        created: function () {

        },
        computed: {
            detail () {
                return this.$store.state.transfer.transRecordDetail
            }
        }
    }
</script>
<style scoped lang="less">
    .transRecordDetailContainer{
        .content{
            background-color: #ffffff;
            // border-top: 1px solid rgb(241,241,241);
            margin-top: 10px;
            .line-pra{
                padding: 5px 0px;
                border-bottom: 1px solid rgb(241,241,241);
            }

            .line{
                display:flex;
                text-align: left;
                padding:0px 10px;
                .left{
                    flex-basis: 30%;
                    font-size: 0.16rem;
                    height: 25px;
                    line-height: 25px;
                }
                .right{
                    flex-basis:70%;
                    font-size: 0.18rem;
                    height: 25px;
                    line-height: 25px;
                }

            }
        }
    }
</style>
