<template>
  <div class="selectBank_container">
    <mt-field placeholder="请输入银行名称" v-model="keyword">
      <mt-button type="primary" size="small">搜索</mt-button>
    </mt-field>
    <label class="mint-checklist-title">请选择开户银行</label>
    <div>
      <mt-cell :title="item.bankName" v-for="item in bankList" @click.native="backAndSelectBank(item)" :key="item.bankCode">
        <img slot="icon" :src="item.bankLogo" width="24" height="24">
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default{
      name: 'selectBank',
      data () {
          return {
              keyword: '',
              page: {'pageSize': 20, 'pageNumber': 0, 'totalCount': 0, 'hasNext': 0},
              tranType: 1, // 默认是跨行转账
              bankList: [],
              loading: false
          }
      },
      methods: {
          getNetList: function () {
              let self = this
              let request = {}
              request.pageNumber = this.page.pageNumber + 1
              // 如果当前页的页数大于总页数或者加载状态处于loading,将终止本次操作
              if (request.pageNumber > this.page.pageCount || this.loading) {
                  return
              }
              request.pageSize = this.page.pageSize
              request.keyword = this.keyword
              request.tranType = this.tranType
              this.$http({
                  method: 'get',
                  url: '/bankInfo/getBankTypeList',
                  data: request
              }).then(function (data) {
                  if (data.code !== '0000') {
                      alert(data.message, '信息提示')
                  } else {
                      self.page.pageNumber = data.page.pageNumber
                      self.page.pageCount = data.page.pageCount
                      self.page.pageSize = data.page.pageSize
                      if (data.data.LIST) {
                          data.data.LIST.forEach(function (bank, index) {
                              let bankInfo = {}
                              bankInfo.bankCode = bank.bankCode
                              bankInfo.bankLogo = bank.bankLogo
                              bankInfo.bankName = bank.bankName
                              /** 清算行行号 */
                              bankInfo.bankNo = bank.bankNo// 当tranType=1超网时，此字段不为空
                              /** 清算行名称 */
                              bankInfo.bankNoName = bank.bankNoName// 当tranType=1超网时，此字段不为空
                              self.bankList.push(bankInfo)
                          })
                      }
                  }
              })
          },
          backAndSelectBank: function (item) {
             // 修改vuex中的数值
              let newRecINfo = this.transfer
              newRecINfo.bankNameDis = item.bankName
              newRecINfo.bankCode = item.bankCode
              this.$store.commit('transfer/update', {key: 'recINfo', value: newRecINfo})
              history.go(-1)
          }
      },
      created: function () {
          this.getNetList()
      },
      computed: {
          transfer () {
              return this.$store.state.transfer.recINfo
          }
      }
  }
</script>

<style scoped lang="less"></style>
