<template>
    <div class="tranferComfirContainer">
        <label class="mint-checklist-title">请确认转账信息</label>
        <div class="content">
            <mt-cell title="转出金额"><span style="color:red">{{comfirInfo.transAmount}}</span></mt-cell>
            <div class="content-child" style="margin-top:1px;">
                <div class="comfir-Info">
                    <div class="one">付款账户</div>
                    <div class="two">{{comfirInfo.payAccNo}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">付款人</div>
                    <div class="two">{{comfirInfo.payName}}</div>
                </div>
            </div>
            <div class="content-child">
                <div class="comfir-Info">
                    <div class="one">收款账号</div>
                    <div class="two">{{comfirInfo.recNo}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">收款人</div>
                    <div class="two">{{comfirInfo.recName}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">备注</div>
                    <div class="two">{{comfirInfo.transMark}}</div>
                </div>
            </div>
            <div class="content-child" v-show="comfirInfo.isOutTrans">
                <div class="comfir-Info">
                    <div class="one">收款银行</div>
                    <div class="two">{{comfirInfo.recBankName}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">开户城市</div>
                    <div class="two">{{comfirInfo.recBankCity}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">开户网点</div>
                    <div class="two">{{comfirInfo.recBankNet}}</div>
                </div>
                <div class="comfir-Info">
                    <div class="one">手续费</div>
                    <div class="two">0.00</div>
                </div>
            </div>
            <footer class="footer-btn" style="margin:40px 0px;">
                <ui-button-spin @click.native="toSuccess">下一步</ui-button-spin>
            </footer>
        </div>
    </div>
</template>

<script>
    import UiButtonSpin from '../../components/ButtonSpin'
    import { MessageBox } from 'mint-ui'
    export default{
        name: '',
        components: {
            UiButtonSpin
        },
        data () {
            return {

            }
        },
        methods: {
            toSuccess: function () {
                let request = {}
                request.acctIdx = this.comfirInfo.payAccId
                request.tranAmt = this.comfirInfo.payAccNo
                request.arrivalTime = this.comfirInfo.arrivalTime
                request.payType = this.comfirInfo.payType
                request.recAcctNo = this.comfirInfo.recNo
                request.recAcctName = this.comfirInfo.recName
                request.recMobile = this.comfirInfo.recPhoneNum
                request.note = this.comfirInfo.transMark
                request.bankCode = this.comfirInfo.bankCode
                request.bankName = this.comfirInfo.recBankName
                request.cityCode = this.comfirInfo.cityCode
                request.cityName = this.comfirInfo.recBankCity
                request.branchCode = this.comfirInfo.branchCode
                request.branchName = this.comfirInfo.recBankNet
                request.isSaveAcct = this.comfirInfo.isSaveAcct
                request.isNotice = this.comfirInfo.isNotice
                request.fee = 0
                this.$http({
                    method: 'get',
                    data: request,
                    url: '/transfer/payment'
                }).then((data) => {
                    if (data.code === '0000') {
                        this.$router.push('/transfer/transferSuccess')
                    } else {
                        MessageBox({
                            title: '信息提示',
                            message: data.message,
                            showCancelButton: false
                        })
                    }
                })
            }
        },
        created: function () {

        },
        computed: {
            comfirInfo () {
                return this.$store.state.transfer.comfirInfo
            }
        },
        activated: function () {

        }
    }
</script>

<style lang="less" scoped>
    .content-child{
        border-top:1px solid #cecece;
    }
    .comfir-Info{
          nin-height: 40px;
          background-color: white;
          padding: 0 10px;
          line-height: 40px;
          display: flex;
          .one{
              width:35%;
          }
          .two{
              width:65%;
              word-wrap:break-word;
          }

          div{
              display: flex;
              flex-direction: column;
          }
    }
    .footer-btn {
        padding: 0 7px;
    }
</style>
