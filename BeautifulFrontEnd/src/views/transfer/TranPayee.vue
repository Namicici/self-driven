<template>
    <div calss="TranPayeeContain">
        <div>
            <mt-field placeholder="请输入姓名/卡号/银行名称" v-model="keyword">
              <mt-button type="primary" size="small">搜索</mt-button>
            </mt-field>
        </div>
        <div style="margin-top:15px;border-top:1px solid #cecece;">
            <mt-index-list>
              <mt-index-section :index="item.letter" v-for="item in disPayList" :key="item.letter">
                    <mt-cell :title="_item.acctName" v-for="_item in item.list" :key="_item.pk1" @click.native="toPayeeCtrl(_item)">
                        <img :src="_item.bankLogo" width="24"></img>{{_item.bankName}}
                    </mt-cell>
              </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>
<script>
    import {sortByFirst} from '../../utils/sort'
    export default{
        name: 'TranPayee',
        data () {
            return {
                keyword: '',
                payeeList: [],
                disPayList: []
            }
        },
        methods: {
            getTranPayList: function () {
                let self = this
                let request = {}
                // 收款人选择（收款人管理）
                request.tranFlag = 1
                this.$http({
                    method: 'get',
                    url: '/recipient/list',
                    data: request
                }).then(function (data) {
                    if (data.code !== '0000') {
                        alert(data.message, '信息提示')
                    } else {
                        if (data.data.LIST.length > 0) {
                            self.payeeList = sortByFirst(data.data.LIST, 'acctName')
                            self.payeeList.forEach(function (arg, index) {
                            // 由于后台返回用户账号时没有处理，所以添加在此需要处理bankName
                            // 处理后的数据例如:中国建设银行（尾号8888）
                                // console.log(JSON.stringify(arg[0]._letter))
                                arg.forEach(function (_arg, index) {
                                    _arg.bankNameDis = _arg.bankName
                                    _arg.bankName = _arg.bankName + '(尾号' + _arg.account.substring(_arg.account.length - 4, _arg.account.length) + ')'
                                })
                                let payeeInfo = {}
                                payeeInfo.letter = arg[0]._letter
                                payeeInfo.list = arg
                                self.disPayList.push(payeeInfo)
                            })
                            self.showPayeeList = true
                        } else {
                            // 提示无收款人记录
                            self.noList = true
                        }
                    }
                })
            },
            toPayeeCtrl: function (item) {
                item.isDisOutInfo = false
                if (item.acctType === 1) {
                    item.isDisOutInfo = false
                } else {
                    item.isDisOutInfo = true
                }
                this.$store.commit('transfer/update', {key: 'recINfo', value: item})
                this.$router.push('/transfer/TransferPayeeDetail')
            }
        },
        created: function () {
            this.getTranPayList()
        }
    }
</script>
<style lang="less" scoped></style>
