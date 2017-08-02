<template>
  <div class="selectBank_container">
    <mt-field placeholder="请输入网点名称" v-model="keyword">
      <mt-button type="primary" size="small">搜索</mt-button>
    </mt-field>
    <label class="mint-checklist-title">请选择开户网点</label>
    <div v-infinite-scroll="getNetList" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
      <mt-cell :title="item.branchName" v-for="item in netListInfo" :key="item.branchCode" @click.native="backAndSelectNet(item)">
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
              netListInfo: [],
              page: {'pageNumber': 0, 'pageSize': 20, 'totalCount': 0, 'pageCount': 1},
              bankCode: '',
              cityCode: '',
              keyword: '',
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
                //   return
              }
              request.pageSize = this.page.pageSize
              request.bankCode = this.bankCode
              request.keyword = this.keyword
              request.cityCode = this.cityCode
              this.loading = true
              this.$http({
                  method: 'get',
                  url: '/bankInfo/getBranch',
                  data: request
              }).then(function (data) {
                  if (data.code !== '0000') {
                      alert(data.message, '信息提示')
                  } else {
                      self.page.pageNumber = data.page.pageNumber
                      self.page.pageCount = data.page.pageCount
                      self.page.pageSize = data.page.pageSize
                      if (data.data.LIST) {
                          data.data.LIST.forEach(function (net, index) {
                              let netInfo = {}
                              netInfo.branchCode = net.acctNo
                              netInfo.bankLogo = net.bankLogo
                              netInfo.branchName = net.branchName
                              self.netListInfo.push(netInfo)
                          })
                          self.loading = false
                      }
                  }
              })
          },
          backAndSelectNet: function (item) {
              // 修改vuex中的数值
              let newRecINfo = this.transfer
              newRecINfo.branchName = item.branchName
              newRecINfo.branchCode = item.branchCode
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
