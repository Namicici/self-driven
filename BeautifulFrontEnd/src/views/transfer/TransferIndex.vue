<template>
  <div class="transfer">
      <div v-if="pieShow" style="background-color:#ffffff;">
        <ui-pie :percent-data="pieData":colors="['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']" nameText="尾号" valueText="转出金额"></ui-pie>
      </div>
    <div class="transfer-menu">

      <div class="link">
          <router-link to="/transfer/transRecord">
                  <img src="../../assets/img/transfer/traferRecord.png"/>
                  <div>转账记录</div>
              </router-link>
          <router-link to="/transfer/addPayee">
                  <img src="../../assets/img/transfer/traferNotes.png"/>
                  <div>转账汇款</div>
              </router-link>
          <router-link to="/transfer/tranPayee">
                  <img src="../../assets/img/transfer/ordPayee.png"/>
                  <div>常用收款人</div>
              </router-link>
      </div>

    </div>
  </div>

</template>

<script>
  import UiPie from '../../components/Pie.vue'
  import {dateFormatUtil} from '../../utils/date'
  export default {
      name: 'transfer',
      components: {UiPie},
      data () {
          return {
              pieShow: false,
              pieData: []
          }
      },
      methods: {
          getSumTransMoney: function () {
              let self = this
              let request = {}
              let transBeginTime = dateFormatUtil(new Date(new Date().getTime() - 2592000000).getTime(), 'yyyy-MM-dd')
              let begDate = new Date(transBeginTime).getTime() - 28800000
              let endDate = new Date().getTime()
              request.begDate = begDate
              request.endDate = endDate
              this.$http({
                  method: 'get',
                  url: '/transfer/sumAcctList',
                  data: request
              }).then(function (data) {
                  if (data.code !== '0000') {
                      alert(data.message, '信息提示')
                  } else {
                      if (data.data.LIST) {
                          let transInfoList = []
                          data.data.LIST.forEach(function (acct, index) {
                              let accInfo = {}
                              accInfo.name = acct.acctNo
                              accInfo.value = acct.acctSum
                              transInfoList.push(accInfo)
                          })
                          self.pieData = transInfoList
                          self.pieShow = true
                      }
                  }
              })
          }
      },
      created: function () {
          this.getSumTransMoney() // 查询转账金额汇总信息
      }
  }
</script>

<style scoped lang="less">
@import "../../styles/index.less";
  .transfer-menu {
    padding: 10px 0px;
    background-color: rgb(247,247,247)
  }
  .link{
      display: flex;
      padding: 0.4rem 0;
      a{
          display: flex;
          flex-direction: column;
          text-decoration: none;
          align-items: center;
          flex-basis: 33.33%;
          color: @text-color;
          img{
              height: 0.4rem;
          }
            div{
              margin: 0 auto;
              margin-top: 10px;
              width: 80%;
              background-color: rgb(10,155,255);
              height:30px;
              line-height: 30px;
              border-radius: 30px;
              color: #ffffff;
              padding: 0 5%;
              text-align: center;
            }
      }
  }
</style>
