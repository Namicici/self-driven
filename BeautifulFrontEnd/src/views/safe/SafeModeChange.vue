<template lang="html">
    <div class="page safe-mode-change">
        <div class="page-wrapper">
            <mt-field label="户名" placeholder="请输入户名" v-model="acctName"></mt-field>
            <mt-field label="预留手机号" placeholder="请输入预留手机号" type="tel" v-model="phone"></mt-field>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="confirm" :is-loading="doing">确认</ui-button-spin>
        </footer>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'
import { MessageBox } from 'mint-ui'

export default {
    name: 'safe-mode-change',
    components: {
        UiButtonSpin
    },
    data () {
        return {
            acctName: '',
            phone: '',
            doing: false
        }
    },
    methods: {
        /**
         * 确认
         */
        confirm () {
            if (this.doing) return
            this.doing = true
            this.$http({
                method: 'POST',
                url: '/personal/authModeChange',
                data: {

                }
            }).then(data => {
                MessageBox.alert('请求已发送至银行，请到贴膜卡完成认证').then(action => {
                    this.doing = false
                    this.$router.go(-2)
                })
            }, data => {
                this.doing = false
            })
        }
    }
}
</script>

<style lang="less">
@import '../../styles/index';
</style>
