<template>
    <div class="page home">
        <div class="page-content">
            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in adList" :key="item.pk1">
                        <a :href="item.linkPath"><img :src="item.adPath" :alt="item.adTitle"/></a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="nav">
                <div v-on:click="$router.push('/account')">
                    <img src="../assets/img/account/account.png"/>
                    <p>我的账户</p>
                </div>
                <div v-on:click="$router.push('/card')">
                    <img src="../assets/img/card/card.png"/>
                    <p>银行卡</p>
                </div>
                <div v-on:click="$router.push('/transfer/index')">
                    <img src="../assets/img/transfer/transfer.png"/>
                    <p>转账汇款</p>
                </div>
                <div v-on:click="$router.push('/safe')">
                    <img src="../assets/img/safe/safety.png"/>
                    <p>安全中心</p>
                </div>
            </div>
            <ul class="news">
                <li v-for="item in bottomList" :key="item.bizCategory">
                    <a href="javascript:void(0)" v-on:click="$router.push('/introduct/introductCategory')">
                        <div class="content">
                            <h3 class="title">{{ item.bizTitle }}</h3>
                            <label>{{ item.businessDesc }}</label>
                        </div>
                        <img v-bind:src="item.pictureUrl" alt="">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import { checkLogin, login, getNews, getAdList } from '../utils/businessCommon'

export default {
    data () {
        return {
            adList: [],
            bottomList: []
        }
    },
    activated () {
        if (this.adList.length === 0) {
            this.getAdList('FINANCE_BIZ') // FINANCE_BIZ 金融服务 广告分类
        }
        if (this.bottomList.length === 0) {
            this.getBottomList(1, false)
        }
    },
    methods: {
        /**
         * 获取banner列表
         */
        getAdList (adpCode) {
            getAdList({adpCode: adpCode}).then(data => {
                this.adList = data.data.LIST
            })
        },
        // 加载底部list条目
        /*
          * @param {Object} bizCategory 分类编号,仅在点击上方小方块刷新list时候起作用
          * @param {Object} firstFlag  标明调用的页面是不是一级页面（即微信3 x 5菜单直接跳转）
        */
        getBottomList (firstFlag, bizCategory) {
            let request = {}
            // bizCategory分类编号，若是首页底部菜单则不传bizCategory
            bizCategory ? request.bizCategory = bizCategory : request.firstFlag = firstFlag
            getNews(request).then(data => {
                this.bottomList = data.data.LIST
            })
        }
    },
    beforeCreate () {
        if (checkLogin()) {
            login()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../styles/index";
</style>
