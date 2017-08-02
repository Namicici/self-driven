<template >
  <div style="text-align:left">
    <div v-on:click="changeShowStatus">
        <mt-cell title="新增收款人" is-link></mt-cell>
    </div>
    <div v-show="isShow">
      <mt-field label="收款账号" placeholder="请输入收款人账号" v-model="userAcctount" type="text"></mt-field>
      <mt-field label="收款人" placeholder="请输入收款人姓名" v-model="username"></mt-field>
      <mt-cell title="保存为常用收款人">
        <mt-switch v-model="isSaveAcct"></mt-switch>
      </mt-cell>
      <div class="addBtn" v-on:click="verifyAccNo">确定</div>
    </div>
    <div style="text-align:left">
      <label class="mint-checklist-title">常用收款人</label>
      <div v-for="payee in payeeList" v-if="showPayeeList" v-on:click="toTransfer(payee)" :key="payee.pk1">
        <mt-cell :title="payee.acctName">
          <span><img :src="payee.bankLogo"></img>{{payee.bankName}}</span>
        </mt-cell>
      </div>
      <div class="noList" v-if="noList">无收款人记录</div>
    </div>
  </div>
</template>

<script>
export default{
    name: 'addPayee',
    data () {
        return {
            desc: 'this is addPayee Page',
            userAcctount: '',
            isShow: false,
            showPayeeList: false,
            noList: false,
            username: '',
            isSaveAcct: true,
            payeeList: []
        }
    },
    methods: {
        changeShowStatus: function () {
            if (this.isShow) {
                this.isShow = false
            } else {
                this.isShow = true
            }
        },
        getPayeeList: function () {
            let self = this
            let request = {}
        // 收款人选择（按转账次数和交易时间排序）
            request.tranFlag = 2
            this.$http({
                method: 'get',
                url: '/recipient/list',
                data: request
            }).then(function (data) {
                if (data.code !== '0000') {
                    alert(data.message, '信息提示')
                } else {
                    if (data.data.LIST.length > 0) {
                        self.payeeList = data.data.LIST
                        self.payeeList.forEach(function (arg, index) {
                    // 由于后台返回用户账号时没有处理，所以添加在此需要处理bankName
                    // 处理后的数据例如:中国建设银行（尾号8888）
                            arg.bankNameDis = arg.bankName
                            arg.bankName = arg.bankName + '(尾号' + arg.account.substring(arg.account.length - 4, arg.account.length) + ')'
                        })
                        self.showPayeeList = true
                    } else {
                        // 提示无收款人记录
                        self.noList = true
                    }
                }
            })
        },
        toTransfer: function (item) {
            if (item.acctType === '1') {
                item.isDisOutInfo = false
            } else {
                item.isDisOutInfo = true
            }
            this.$store.commit('transfer/update', {key: 'recINfo', value: item})
            this.$router.push('/transfer/transfer')
        },
        verifyAccNo: function () {
        /** 用户点击新增收款人点击确定后需要做账户校验，校验改账号是否为本行账号 */
            let self = this
            if (!this.userAcctount) {
                this.$toast('收款账号不能为空')
                return
            }
            if (!this.username) {
                this.$toast('收款人不能为空')
                return
            }
            let request = {}
            request.acctNo = this.userAcctount
            // 将用户输入的收款人名称，收款人账号存入vuex对象中，方便转账页面调用
            let userInfo = {}
            userInfo.acctName = this.username
            userInfo.account = this.userAcctount
            userInfo.isSaveAcct = this.isSaveAcct
            this.$http({
                method: 'POST',
                url: '/account/verify',
                data: request
            }).then(function (data) {
                if (data.code === '0000') {
                    if (data.data.isInnerAcct) {
                        // 行内
                        /**
                        *跳转到跨行转账页面时，需要该参数判断是否为行内转账，如果为行内转账
                        *如果为行内转账，则不显示选择银行等信息
                        */
                        userInfo.isDisOutInfo = false
                        self.$store.commit('transfer/update', {key: 'recINfo', value: userInfo})
                        self.$router.push('/transfer/transfer')
                    } else {
                        // 跨行
                        userInfo.isInner = true
                        self.$store.commit('transfer/update', {key: 'recINfo', value: userInfo})
                        self.$router.push('/transfer/transfer')
                    }
                }
            })
        }
    },
    created: function () {
        this.getPayeeList() // 查询转账金额汇总信息
    }
}
</script>

<style lang="less" scoped>
  .addBtn{
      width: 80px;
      height: 30px;
      text-align: center;
      background-color: rgb(9,155,254);
      margin: 20px auto;
      line-height: 30px;
      color: white;
      border-radius: 30px;
  }
  .mint-field-core {
      text-align: right;
  }
  .noList{
      text-align: center;
      margin-top: 20px;
  }
</style>
