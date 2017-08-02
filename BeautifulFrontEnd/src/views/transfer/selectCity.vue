<template>
  <div class="selectCity_container">
    <mt-field placeholder="请输入城市名称" v-model="keyword">
      <mt-button type="primary" size="small">搜索</mt-button>
    </mt-field>
    <label class="mint-checklist-title">请选择开户城市</label>
      <div v-for="item in cityList" class="p_city" key="item.id">
        <div v-on:click="showCity(item)">{{item.pName}}</div>
        <li v-show="item.showInfo" v-for="city in item.cList" v-on:click="goBack(city)" key="city.id">{{city.cityName}}</li>
      </div>
  </div>
</template>

<script>
  export default{
      name: 'selectCity',
      data () {
          return {
              keyword: '',
              cityList: [
        //   {cCode: '001', cName: '广西壮族自治区', showInfo: true, cList: [{'cCode': '0011', cName: '南宁市'}, {'cCode': '0012', cName: '柳州市'}]},
        //   {cCode: '002', cName: '广东省', showInfo: false, cList: [{'cCode': '0021', cName: '广州市'}, {'cCode': '0022', cName: '珠海市'}]},
        //   {cCode: '003', cName: '福建省', showInfo: false, cList: []}
              ]
          }
      },
      methods: {
          showCity: function (item) {
        // 如果一级城市中cList为空，则需要向后台发起请求获取数据
              if (item.cList.length === 0) {
                  // 如果点击的是一个城市，将会跳转返回
                  if (item.pcFlag === '1') {
                      // 替换vuex中的城市参数
                      this.goBack(item)
                      return
                  }
                  this.getCity(item.pCode, item.pCode)
              }
              if (item.showInfo) {
                  item.showInfo = false
              } else {
                  item.showInfo = true
              }
          },
          goBack: function (item) {
              let newRecINfo = this.transfer
              newRecINfo.cityName = item.cityName
              newRecINfo.cityCode = item.cityCode
              this.$store.commit('transfer/update', {key: 'recINfo', value: newRecINfo})
              history.go(-1)
          },
          getCity: function (pifCode, pCode) {
              let self = this
              let request = {}
              request.pifCode = pifCode// 省份code，不上送时默认查出全部省份
              request.keyword = this.keyword
              this.$http({
                  method: 'GET',
                  url: '/bankInfo/getCityList',
                  data: request
              }).then(function (data) {
                  if (data.code === '0000') {
                      if (pifCode === '') {
                          data.data.LIST.forEach(function (arg, index) {
                              let cityInfo = {}
                            //   console.log(JSON.stringify(arg))
                              cityInfo.pCode = arg.pCode
                              cityInfo.pName = arg.pName
                              cityInfo.cityCode = arg.cityCode
                              cityInfo.cityName = arg.cityName
                              cityInfo.pcFlag = arg.pcFlag
                              cityInfo.showInfo = false
                              cityInfo.cList = []
                              self.cityList.push(cityInfo)
                          })
                      } else {
                        //   console.log(JSON.stringify(self.cityList))
                          self.cityList.forEach(function (arg, index) {
                              if (arg.pCode === pCode) {
                                  arg.cList = data.data.LIST
                                  arg.showInfo = true
                              }
                          })
                      }
                  }
              })
          },
          backAndSelectCity: function (item) {
             // 修改vuex中的数值
              let newRecINfo = this.transfer
              newRecINfo.cityName = item.cityName
              this.$store.commit('transfer/update', {key: 'recINfo', value: newRecINfo})
              history.go(-1)
          }
      },
      computed: {
          transfer () {
              return this.$store.state.transfer.recINfo
          }
      },
      created: function () {
          this.getCity('')
      }
  }
</script>

<style scoped lang="less">
  .p_city{
    background-color: #ffffff;
    div{
        height: 40px;
        width: 100%;
        line-height: 40px;
        padding-left: 10px;
    }
    div:last-child{
        border-bottom:1px solid #cecece;
    }
    div:first-child{
        border-bottom:1px solid #cecece;
    }
    div:before{
      width: 100%;
      content: "";
      background-color: #cecece;
      height: 1px;
    }
    div:after{
      border: 2px solid #c8c8cd;
      border-bottom-width: 0;
      border-left-width: 0;
      content: "";
      right: 20px;
      position: absolute;
      margin-top: 18px;
      width: 6px;
      height: 6px;
      transform: translateY(-50%) rotate(45deg);
    }
    li{
        list-style: none;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border-bottom: 1px solid #cecece;
    }
  }
</style>
