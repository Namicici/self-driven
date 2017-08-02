<template>
    <div>
        <div @click="select">
            <mt-cell :title="selAccountNo[0]" is-link>
                <span>1000</span>
                <img slot="icon" src="http://chuantu.biz/t5/132/1499840883x3073971678.png" width="24" height="24">
            </mt-cell>
        </div>
        <ui-picker
            class="picker-wraper"
            ref="picker"
            :slots="slots" v-model="selAccountNo">
        </ui-picker>
        <mt-field label="转账金额" placeholder="请输入转账金额" class="border-field" v-model="transAmount"></mt-field>

        <mt-navbar>
            <mt-tab-item id="1">
                <span class="choose_transfer_date" v-bind:class="{ actived:arrivalTimeOne.actived }" v-on:click="selectArrivalTimeOne()">即时到帐</span>
            </mt-tab-item>
            <mt-tab-item id="2">  <span class="choose_transfer_date" v-bind:class="{ actived:arrivalTimeTwo.actived }" v-on:click="selectArrivalTimeTwo()">普通到账</span></mt-tab-item>
            <mt-tab-item id="3">  <span class="choose_transfer_date" v-bind:class="{ actived:arrivalTimeThree.actived }" v-on:click="selectArrivalTimeThree()">次日到账</span></mt-tab-item>
        </mt-navbar>
        <div>
            <div class="rec-Info">
                <div class="one">收款人</div>
                <div class="two">{{transfer.acctName}}</div>
                <div class="three"><span class="changeBtn" v-on:click="back">更改</span></div>
            </div>
            <div class="rec-Info_sec">
                <div class="one"></div>
                <div class="two">{{transfer.account}}</div>
                <div class="three"></div>
            </div>
        </div>
        <div class="transfer-info-three">
            <mt-cell title="短信通知收款人">
                <mt-switch v-model="isNotice"></mt-switch>
            </mt-cell>
            <mt-field label="收款人手机号" placeholder="请输入收款人手机号" type="tel" v-model="recPhoneNum" v-show="isNotice"></mt-field>
            <mt-field label="转账备注" placeholder="请输入转账备注" v-model="transMark"></mt-field>
        </div>
        <div class="transfer-info-three" v-show="transfer.isDisOutInfo">
            <div v-on:click="toSelectBank"><mt-field label="收款银行" placeholder="请选择收款银行" v-model="transfer.bankNameDis"></mt-field></div>
            <div v-on:click="toSelectCity"><mt-field label="开户城市" placeholder="请选择开户城市" v-model="transfer.cityName"></mt-field></div>
            <div v-on:click="toSelectNet"><mt-field label="开户网点" placeholder="请选择开户网点" v-model="transfer.branchName"></mt-field></div>
        </div>
        <footer class="footer-btn" style="margin:30px 0px;">
            <ui-button-spin @click.native="toComfir">下一步</ui-button-spin>
        </footer>
  </div>

</template>

<script>

import { mapState } from 'vuex'
import Picker from '../../components/Picker'
import UiButtonSpin from '../../components/ButtonSpin'
import {getQueryFromUrl} from '../../utils/tools'
import { MessageBox } from 'mint-ui'
export default{
    name: 'transfer',
    components: {
        UiButtonSpin,
        'ui-picker': Picker
    },
    data () {
        return {
            slots: [],
            selAccountNo: [],
            accounts: [],
            selAccount: {},
            payType: '1', // 转账方式，默认是行内转账
            isNotice: false, // 是否通知收款人
            transAmount: '', // 交易金额
            recTime: '', // 到账时间
            recPhoneNum: '', // 收款人手机号
            transMark: '', // 转账备注
            payName: '', // 付款人名称
            clickKey: {}, // 记录用户点击转账到账时间
            arrivalTimeOne: {
                // 即时到帐
                actived: false,
                value: 1
            },
            arrivalTimeTwo: {
                // 普通到账
                actived: false,
                value: 2
            },
            arrivalTimeThree: {
                // 次日到账
                actived: false,
                value: 2
            }

        }
    },
    methods: {
        convert (data) {
            let tmp = {
                values: []
            }
            this.payName = data[0].acctName
            for (let i = 0; i < data.length; i++) {
                tmp.values.push(data[i].acctNo)
            }
            return this.slots.push(tmp)
        },
        select () {
            this.$refs.picker.open()
        },
        back: function () {
            history.go(-1)
        },
        toSelectBank: function () {
            this.$router.push('/transfer/selectBank')
        },
        toSelectCity: function () {
            this.$router.push('/transfer/selectCity')
        },
        toSelectNet: function () {
            this.$router.push('/transfer/selectNet')
        },
        toComfir: function () {
            if (this.transAmount === '') {
                this.$toast('转账金额不能为空')
                return
            }
            if (this.isNotice) {
                if (this.recPhoneNum === '') {
                    this.$toast('收款人手机号不能为空')
                    return
                }
            }

            if (this.transMark === '') {
                this.$toast('转账备注不能为空')
                return
            }
            if (this.clickKey == null) {
                this.$toast('请选择到账时间')
                return
            }
            // 如果是跨行转账，则查询最优转账方式
            if (this.transfer.isDisOutInfo) {
                this.getPayType(this.transAmount)
            }
            // 传值进vuex
            let comfirInfo = {}
            comfirInfo.transAmount = this.transAmount
            comfirInfo.payAccNo = this.selAccountNo[0]
            comfirInfo.payAccId = ''
            comfirInfo.payName = this.payName
            comfirInfo.payType = this.payType
            comfirInfo.recPhoneNum = this.recPhoneNum
            comfirInfo.recNo = this.transfer.account
            comfirInfo.recName = this.transfer.acctName
            comfirInfo.transMark = this.transMark
            comfirInfo.recBankName = this.transfer.bankName
            comfirInfo.recBankNet = this.transfer.branchName
            comfirInfo.recBankCity = this.transfer.cityName
            comfirInfo.isOutTrans = this.transfer.isDisOutInfo
            comfirInfo.arrivalTime = this.clickKey.value
            comfirInfo.isSaveAcct = this.transfer.isSaveAcct
            comfirInfo.isNotice = this.isNotice
            comfirInfo.bankCode = this.transfer.bankCode
            this.$store.commit('transfer/update', {key: 'comfirInfo', value: comfirInfo})
            this.$router.push('/transfer/transferComfir')
        },
        selectArrivalTimeOne: function () {
            this.clickKey = this.arrivalTimeOne
            this.arrivalTimeOne.actived = true
            this.arrivalTimeTwo.actived = false
            this.arrivalTimeThree.actived = false
        },
        selectArrivalTimeTwo: function () {
            this.clickKey = this.arrivalTimeTwo
            this.arrivalTimeTwo.actived = true
            this.arrivalTimeOne.actived = false
            this.arrivalTimeThree.actived = false
        },
        selectArrivalTimeThree: function () {
            this.clickKey = this.arrivalTimeThree
            this.arrivalTimeThree.actived = true
            this.arrivalTimeOne.actived = false
            this.arrivalTimeTwo.actived = false
        },
        /** 校验页面是否从快捷转账进入 */
        checkFromQucik: function () {
            let isQuickTrans = getQueryFromUrl('_from')
            if (isQuickTrans) {
                return true
            } else {
                return false
            }
        },
        getAccounts () {
            this.selAccountNo = []
            this.slots = []
            this.accounts = []
            this.selAccount = {}
            this.$http({
                method: 'get',
                url: '/account/list'
            }).then((data) => {
                this.accounts = data.data.LIST
                this.convert(data.data.LIST)
                this.selAccountNo = [this.slots[0].values[0]]
            })
        },
        /**
         *查询最优转账汇款方式（只有跨行转账才有）
         */
        getPayType: function () {
            let request = {}
            let self = this
            request.tranAmt = this.transAmount
            this.$http({
                method: 'GET',
                url: '/transfer/payTypeList',
                data: request
            }).then((data) => {
                if (!data.code === '0000') {
                    MessageBox({
                        title: '信息提示',
                        message: data.message,
                        showCancelButton: false
                    })
                } else {
                    self.payType = data.data.LIST.payType
                }
            })
        }
    },
    created: function () {
    },
    activated: function () {
        if (this.checkFromQucik()) {
            // 表示该是从选定付款账号进行转账的
            var tmp = {
                values: [this.transfer.acctNo]
            }
            this.slots.push(tmp)
            this.selAccountNo = [this.transfer.acctNo]
            this.accounts = [this.transfer]
        } else {
            this.getAccounts()
        }
    },
    computed: {
        ...mapState('transfer', {
            payInfo: 'payInfo'
        }),
        transfer () {
            return this.$store.state.transfer.recINfo
        }
    },
    watch: {
        selAccountNo () {
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].acctNo === this.selAccountNo[0]) {
                    this.selAccount = this.accounts[i]
                    break
                }
            }
        }
    }
}

</script>

<style scoped lang="less">

@import "../../styles/index.less";
    .choose_transfer_date{
        display: inline-block;
        width: 70px;
        background-color: #ffffff;
        height: 30px;
        line-height: 30px;
        color: rgb(10,155,255);
        border: 1px solid rgb(10,155,255);
        border-radius: 20px;
    }

    .border-field{
        border-bottom: 1px solid #cecece;
    }
    .actived{
        background-color: rgb(10,155,255);
        color: white;
    }
  .rec-Info{
    height: 40px;
    background-color: white;
    padding: 0 10px;
    line-height: 40px;
    margin-top: 10px;
    display: flex;
    .one{
        width:20%;
    }
    .two{
        width:60%;
    }
    .three{
        width:20%;
    }
    div{display: flex;
        flex-direction: column;
    }
  }
  .rec-Info_sec{
    height: 30px;
    background-color: white;
    padding: 0 10px;
    line-height: 30px;
    display: flex;
    .one{
        width:20%;
    }
    .two{
        width:60%;
    }
    .three{
        width:20%;
    }
    div{
        display: flex;
        flex-direction: column
    }
  }
  .changeBtn{
      width: 100%;
      background-color: rgb(10,155,255);
      text-align: center;
      color: white;
      border-radius: 20px;
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
  }
  .transfer-info-three{
      margin-top: 10px;
  }
  .footer-btn {
      padding: 0 7px;
  }
  .picker-wraper{
      background-color: @body-background;
      position: absolute;
      bottom: 0;
      width: 100%;
  }
</style>
