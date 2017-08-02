<template lang="html">
    <div class="page card-bind-by-stick-card">
        <div class="page-wrapper">
            <mt-field label="户名" placeholder="请输入户名" :attr="{maxlength: 30}" v-model="custName"></mt-field>
            <mt-field label="预留手机号" placeholder="请输入预留手机号" :attr="{maxlength: 11}" type="tel" v-model="mobile"></mt-field>
            <div class="footer-btn-push"></div>
        </div>
        <footer class="footer-btn">
            <ui-button-spin @click.native="bind" :is-loading="binding">绑定</ui-button-spin>
        </footer>
    </div>
</template>

<script>
import UiButtonSpin from '../../components/ButtonSpin'
import { MessageBox, Toast } from 'mint-ui'
import validate from '../../utils/validate'

export default {
    name: 'card-bind-by-stick-card',
    components: {
        UiButtonSpin
    },
    data () {
        return {
            custName: '',
            mobile: '',
            binding: false
        }
    },
    activated () {
        this.custName = ''
        this.mobile = ''
        this.binding = false
    },
    methods: {
        /**
         * 绑定
         */
        bind () {
            if (!this.custName) {
                Toast({message: '请输入户名', position: 'bottom'})
                return
            }
            if (!this.mobile) {
                Toast({message: '请输入预留手机号', position: 'bottom'})
                return
            }
            if (!validate.isMobile(this.mobile)) {
                Toast({message: '请输入正确格式的手机号', position: 'bottom'})
                return
            }
            if (this.binding) return
            this.binding = true
            this.$http({
                method: 'POST',
                url: '/user/registAcctBySms',
                data: {
                    bindFlag: '1',
                    custName: this.custName,
                    mobile: this.mobile
                }
            }).then(data => {
                MessageBox.alert('请到贴膜卡完成认证').then(action => {
                    this.$router.go(-2)
                })
            }).catch(data => {
                this.binding = false
            })
        }
    }
}
</script>

<style lang="less">
@import "../../styles/card";
</style>
