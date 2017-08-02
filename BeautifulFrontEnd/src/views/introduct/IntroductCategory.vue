<template>
    <div class="home">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in adList" :key="item.pk1">
                <a :href="item.linkPath"><img :src="item.adPath" :alt="item.adTitle"/></a>
            </mt-swipe-item>
        </mt-swipe>

       <div class="link">
           <router-link to="" v-for="item in categoryList" @click.native="toIntroInfo(item)" :key="item.bizCategory">
                <img :src="item.categoryIco"/>
                <div>{{item.categoryName}}</div>
            </router-link>
        </div>

        <ul class="news">
                <li v-for="item in bottomList" :key="item.bizCategory">
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
</template>

<script>

import {checkLogin, login} from '../../utils/businessCommon'
import { MessageBox } from 'mint-ui'

export default {
    data () {
        return {
            adList: [],
            bottomList: [],
            categoryList: []
        }
    },
    methods: {
        getAdList (adpCode) {
            this.$http({
                type: 'get',
                url: '/ad/list',
                data: {
                    adpCode: adpCode // 广告分类code
                }
            }).then((data) => {
                if (data.code !== '0000') {
                    MessageBox({
                        title: '信息提示',
                        message: data.message,
                        showCancelButton: false
                    })
                } else {
                    this.adList = data.data.LIST
                }
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
            this.$http({
                method: 'get',
                url: '/introduct/intrInfo',
                data: request
            }).then((data) => {
                if (data.code !== '0000') {
                    MessageBox({
                        title: '信息提示',
                        message: data.message,
                        showCancelButton: false
                    })
                } else {
                    this.bottomList = data.data.LIST
                }
            })
        },
        getCategoryList: function () {
            let request = {}
            request.superCategory = 1
            this.$http({
                type: 'GET',
                url: '/introduct/categoryList',
                data: request
            }).then((data) => {
                if (data.code !== '0000') {
                    MessageBox({
                        title: '信息提示',
                        message: data.message,
                        showCancelButton: false
                    })
                } else {
                    this.categoryList = data.data.LIST
                }
            })
        },
        toIntroInfo: function (item) {
            this.$store.commit('introduct/update', {key: 'clickKey', value: item.bizCategory})
            this.$router.push('/introduct/introductInfo')
        }
    },
    created () {
        this.getAdList('FINANCE_BIZ') // FINANCE_BIZ 金融服务 广告分类
        this.getBottomList('', '')
        this.getCategoryList()
    },
    beforeCreate () {
        if (checkLogin()) {
            login()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../styles/custom";
.home{
    width: 100%;
    height: 100%;
    .mint-swipe{
        height: 2rem;
        img{
            width: 100%;
            height: 2rem;
        }
    }

    .link{
        display: flex;
        padding: 0.08rem 0;
        background-color: white;
        a{
            display: flex;
            flex-direction: column;
            text-decoration: none;
            align-items: center;
            flex-basis: 25%;
            color: @text-color;
            /*border-right: solid 1px #ccc;
            &:nth-child(4){
                border-right: none;
                }*/
                img{
                    height: 0.3rem;
                }
            div{
                margin-top: 0.1rem;
            }
        }
    }
    .news {
        margin-top: 0.15rem;
        background: @body-background;
        li {
            a {
                position: relative;
                display: block;
                width: 100%;
                padding: 0.1rem;
                color: @text-color;
                padding-right: 1.2rem;
                .content {
                    padding: 0 0.05rem;
                    .title {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: @font-size-base;
                        font-weight: normal;
                    }
                    label {
                        font-size: @font-size-small;
                        color: @text-gray-color;
                    }
                }
                img {
                    position: absolute;
                    top: 50%;
                    margin-top: -0.3rem;
                    right: 0.1rem;
                    width: 1rem;
                    height: 0.6rem;

                }
                &:active {
                    opacity: .6;
                }
            }
        }
    }
}

</style>
