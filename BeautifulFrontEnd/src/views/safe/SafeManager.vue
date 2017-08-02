<template lang="html">
    <div class="page safe-manager">
        <div class="page-content">
            <mt-cell title="当前安全手机" @click.native="changePhone" :value="phone" is-link></mt-cell>
            <mt-cell title="当前认证方式" to="/safe/modeChange" :value="safeMode" is-link></mt-cell>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
    name: 'safe-manager',
    data () {
        return {
            phone: '176****3993',
            safeMode: '普通短信验证'
        }
    },
    methods: {
        /**
         * 修改手机号
         */
        changePhone () {
            MessageBox.confirm('原安全手机是否在身边？', '', {
                confirmButtonText: '不在',
                cancelButtonText: '在'
            }).then(action => {
                // 手机不在身边
                this.$router.push('/safe/phone/changeByPwd')
            }, action => {
                // 手机在身边
                this.$router.push('/safe/phone/verify')
            })
        }
    }
}
</script>

<style lang="less">
@import '../../styles/index';
</style>
