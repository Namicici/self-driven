<template>
    <div class="page">
        <mt-cell title="test mongodb">
            <mt-button v-on:click="dbTest">db test</mt-button>
        </mt-cell>
        <mt-cell title="test download">
            <mt-button v-on:click="download">download test</mt-button>
        </mt-cell>
        <mt-cell title="test download a">
            <a href="http://localhost:9001/api/download/test" download>download test 现在常用方法</a>
        </mt-cell>
        <mt-cell title="test download 同页面接口方式下载">
            <mt-button v-on:click="downloadSamePage">download test</mt-button>
        </mt-cell>
        <div class="loading" v-if="show">Loading......</div>
        <iframe class="download-iframe" v-bind:src="downloadUrl" v-on:load="downloadFinish"></iframe>

        <mt-cell title="test custom keyboard">
            <mt-button v-on:click="">how to call custom keyboard</mt-button>
        </mt-cell>
        <ss-pie :percent-data="pieData" :colors="['#7ED321', '#50E3C2', '#4A90E2', '#F5A623', '#9013FE']"></ss-pie>
        <ss-pie2 :diameter="diameter" :stroke-width="strokeWidth" :percent-data="pieData"></ss-pie2>
        <input v-on:focus="visible = true;" v-on:blur="visible = false;"/>
        <!--ss-keyboard focus="visible"></ss-keyboard-->
    </div>
</template>

<script>
/**
* @fileoverview
* @author Sissi Lee(namicici.lee@outlook.com)
* @created June 8, 2017
*/
'use strict'

import CommonService from '../../utils/http'
import { Cell, Button } from 'mint-ui'

import Pie from '../../components/pie/pie'
import Pie2 from '../../components/pie/pie2'
// import Keyboard from '../../components/keyboard';

module.exports = {
    components: {Cell, Button, Pie, Pie2},
    data: function () {
        return {
            // focused: false
            show: false,
            download: false,
            pieData: [{name: '4305', value: 50}, {name: '3309', value: 200}, {name: '7890', value: 350}],
            diameter: 200,
            strokeWidth: 16
        }
    },
    methods: {
        dbTest: function () {
            CommonService.http({
                method: 'get',
                url: '/db/test'
            }).then(function (data) {
                console.log('get data: ' + data)
            }, function (error) {
                console.log('test db error: ' + error)
            })
        },
        download: function () {
            // 测试download请求发出后，后端返回流之前操作其他接口是否会导致卡断
            window.open('http://localhost:9001/api/download/test')
        },
        downloadSamePage: function () {
            var self = this
            self.show = true
            CommonService.http({
                method: 'get',
                url: '/download/test'
            }).then((data) => {
                self.download = true
                self.downloadUrl = 'http://localhost:9001/api/download/test'
                // self.show = false;
                // self.download = false;
            }, (error) => {
                self.show = false
                self.download = false
            })
        },
        downloadFinish: function () {
            var self = this
            self.show = false
            self.download = false
            console.log('download complete')
        }
    },
    mounted: function () {
    }
}

</script>
<style lang="less">

mt-button{
    font-size: 12px;
}

.loading{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-color: black;
}
.download-iframe{
    height: 0;
    width: 0;
}

</style>
