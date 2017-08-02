<template>
    <div class="safe page">
        <div class="page-content">
            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in adList" :key="item.pk1">
                        <a :href="item.linkPath"><img :src="item.adPath" :alt="item.adTitle"/></a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="nav">
                <div v-on:click="$router.push('/safe/setPayPwd')">
                    <img src="../../assets/img/safe/setPayPwd.png"/>
                    <p>设置支付密码</p>
                </div>
                <div v-on:click="$router.push('/safe/setQuestion')">
                    <img src="../../assets/img/safe/setPayQuestion.png"/>
                    <p>设置安全问题</p>
                </div>
                <div v-on:click="$router.push('/safe/safeManager')">
                    <img src="../../assets/img/safe/safeOrg.png"/>
                    <p>安全认证管理</p>
                </div>
            </div>
            <ul class="news">
                <li v-for="item in newsList" :key="item.bizCategory">
                    <a href="#">
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
import { getAdList, getNews } from '../../utils/businessCommon'

export default {
    name: 'safe',
    data () {
        return {
            adList: [],
            newsList: []
        }
    },
    activated () {
        if (this.adList.length === 0) {
            // FINANCE_BIZ 金融服务(首页) 广告分类
            this.getAdList('FINANCE_BIZ')
        }
        if (this.newsList.length === 0) {
            this.getNewsList(1, false)
        }
    },
    methods: {
        /**
         * 获取banner图列表
         */
        getAdList (adpCode) {
            getAdList({adpCode: adpCode}).then(data => {
                this.adList = data.data.LIST
            })
        },
        /**
         * 获取资讯列表
         */
        getNewsList (firstFlag, bizCategory) {
            getNews().then(data => {
                this.newsList = data.data.LIST
            })
        }
    }
}
</script>

<style lang="less">
@import '../../styles/index';
</style>
