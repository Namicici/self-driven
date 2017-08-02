<template>
    <div class="transferSuccess">
        <div style="text-align:center;background-color:#ffffff;margin-top:15px;">
            <img src="../../assets/img/transfer/success.png" width="50" style="vertical-align:middle"></img>
            <span>交易成功</span>
        </div>
        <div class="content-child">
            <div class="success-Info">
                <div class="one">付款账户</div>
                <div class="two">{{comfirInfo.payAccNo}}</div>
            </div>
            <div class="success-Info">
                <div class="one">付款人</div>
                <div class="two">{{comfirInfo.payName}}</div>
            </div>
            <div class="success-Info">
                <div class="one">转账金额</div>
                <div class="two">{{comfirInfo.transAmount}}</div>
            </div>
            <div class="success-Info">
                <div class="one">收款账号</div>
                <div class="two">{{comfirInfo.recNo}}</div>
            </div>
            <div class="success-Info">
                <div class="one">收款人</div>
                <div class="two">{{comfirInfo.recName}}</div>
            </div>
            <div class="success-Info">
                <div class="one">转账备注</div>
                <div class="two">{{comfirInfo.transMark}}</div>
            </div>
            <footer class="footer-btn" style="margin:90px 0px;">
                <ui-button-spin @click.native="toTransferDetail">转账记录查询</ui-button-spin>
            </footer>
        </div>
    </div>
</template>
<script>
    import UiButtonSpin from '../../components/ButtonSpin'
    export default{
        name: 'TransferSuccess',
        components: {
            UiButtonSpin
        },
        data () {
            return {}
        },
        methods: {
            toTransferDetail: function () {
                this.$router.push('/transfer/transRecord')
            }
        },
        created: function () {

        },
        computed: {
            comfirInfo () {
                return this.$store.state.transfer.comfirInfo
            }
        }
    }
</script>
<style scoped lang="less">
    .content-child{
    }
    .success-Info{
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
              flex-direction: column;}
    }
    .footer-btn {
        padding: 0 7px;
    }
</style>
