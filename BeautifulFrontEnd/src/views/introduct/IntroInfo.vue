<template>
    <div class="infoHome">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in adList" :key="item.pk1">
                <a :href="item.linkPath"><img :src="item.adPath" :alt="item.adTitle"/></a>
            </mt-swipe-item>
        </mt-swipe>
        <div class="headerBar">
            <div v-bind:class="{active:item.active}" v-for="item in categoryList" :key="item.bizCategory" v-on:click="switchActive(item)">{{item.categoryName}}</div>
        </div>
        <ul class="news">
                <li v-for="item in intrList" :key="item.bizCategory">
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
    import { MessageBox } from 'mint-ui'
    export default{
        name: 'introductInfo',
        data () {
            return {
                adList: [],
                categoryList: [],
                intrList: [],
                clickKey: ''
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
            getCategoryList: function (superCategory) {
                let request = {}
                request.superCategory = superCategory
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
                        // 默认查询出的第一个分类的状态为激活
                        this.categoryList.forEach(function (arg, index) {
                            arg.active = false
                            // 默认所有的分类下的业务介绍集合为空
                            let intrList = []
                            arg.intrList = intrList
                        })
                        this.categoryList[0].active = true
                        // 默认点击的是第一个业务分类
                        this.clickKey = this.categoryList[0].bizCategory
                        this.getIntroInfoList(this.categoryList[0].bizCategory)
                    }
                })
            },
            getIntroInfoList: function (bizCategory) {
                let request = {}
                let self = this
                request.bizCategory = bizCategory
                this.$http({
                    type: 'GET',
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
                        self.categoryList.forEach(function (arg, index) {
                            if (arg.bizCategory === bizCategory) {
                                arg.intrList = data.data.LIST
                                self.intrList = data.data.LIST
                            }
                        })
                    }
                })
            },
            switchActive: function (item) {
                // 取出上次点击的业务分类，将其的active设置为false;
                let clickKey = this.clickKey
                let self = this
                // 两次点击相等
                if (clickKey === item.bizCategory) {
                    return
                }
                this.categoryList.forEach(function (arg, index) {
                    if (arg.bizCategory === clickKey) {
                        arg.active = false
                    }
                })
                this.categoryList.forEach(function (arg, index) {
                    if (arg.bizCategory === item.bizCategory) {
                        // 设置该业务状态为激活
                        arg.active = true
                        // 更新点击的id
                        self.clickKey = item.bizCategory
                        if (!arg.intrList.length > 0) {
                            // 发送请求查询改分类下的业务介绍信息
                            self.getIntroInfoList(item.bizCategory)
                        } else {
                            // 取出arg.intrList更新到全局
                            self.intrList = arg.intrList
                        }
                    }
                })
            }
        },
        created: function () {
            this.getAdList('FINANCE_BIZ') // FINANCE_BIZ 金融服务 广告分类
        },
        computed: {
            introduct () {
                return this.$store.state.introduct.clickKey
            }
        },
        activated: function () {
            this.getCategoryList(JSON.stringify(this.introduct))
        }
    }
</script>
<style lang="less" scoped>
@import "../../styles/custom";
    .infoHome{
        width: 100%;
        height: 100%;
        .mint-swipe{
            height: 2rem;
            img{
                width: 100%;
                height: 2rem;
            }
        }
        .headerBar{
            display: flex;
            height: 40px;
            background-color: rgb(10,155,255);
            color: #ffffff;
            div{
                flex-direction: column;
                text-decoration: none;
                align-items: center;
                flex-basis: 25%;
                text-align: center;
                height: 40px;
                line-height: 40px;
            }
            .active{
                background-color: #ffffff;
                color:rgb(10,155,255)
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
