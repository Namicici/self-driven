<template>
    <div class="page card">
        <div class="page-wrapper card-wrapper">
            <div class="card-wrap-tips" v-if="isFirstCard">快来绑定你的第一张银行卡吧~</div>
            <div class="card-item" v-else="" v-for="card in cards">
                <div class="card-title">
                    <span class="card-logo" style="background-image: url('../../assets/img/transfer/xfLogo.png');"></span>
                    <h1>方付通银行</h1>
                    <label>{{ cardTypes[card.acctType] }}</label>
                </div>
                <div class="card-num">
                    {{ card.acctNo }}
                </div>
                <div class="card-btn">
                    <div></div>
                    <div></div>
                    <div>
                        <mt-button type="primary" size="small" v-on:click="manager(card)">管理</mt-button>
                    </div>
                </div>
            </div>
            <div class="footer-btn-push"></div>
        </div>
        <footer class="footer-btn">
            <mt-button type="primary" size="large" v-on:click="toBindPage">+ 绑定新银行卡</mt-button>
        </footer>
    </div>
</template>

<script>
import { CARD_TYPE_MAPPING } from '../../utils/constants'

export default {
    name: 'card',
    data () {
        return {
            cards: [],
            cardTypes: CARD_TYPE_MAPPING,
            bindFlag: 0
        }
    },
    activated () {
        this.bindFlag = localStorage.getItem('bindFlag')

        // 初始化数据
        this.getCards()
    },
    methods: {
        /**
         * 获取银行卡列表
         */
        getCards () {
            this.$http({
                method: 'get',
                url: '/account/cardList',
                data: {}
            }).then(data => {
                this.cards = data.data.LIST
            })
        },
        /**
         * 银行卡管理
         */
        manager (acct) {
            this.$store.commit('account/update', {key: 'account', value: acct})
            this.$router.push('/card/manager')
        },
        /**
         * 去到绑定银行卡页面
         */
        toBindPage () {
            if (this.isFirstCard) {
                this.$router.push('/card/bindType')
                return
            }
            this.$router.push('/card/bind')
        }
    },
    computed: {
        /**
         * 首次绑卡
         */
        isFirstCard () {
            return !this.bindFlag || this.bindFlag === '0'
        }
    }
}
</script>

<style lang="less">
@import "../../styles/card";
</style>
