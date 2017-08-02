<template lang="html">
    <div class="page card-bind-type">
        <div class="page-content">
            <div class="card-bind-type-tips">首次绑卡请先选择绑定类型</div>
            <mt-cell title="通过短信绑定" to="/card/bindByMessage" is-link></mt-cell>
            <mt-cell title="通过贴膜卡手机银行绑定" to="/card/bindByStickCard" is-link></mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card-bind-type'
}
</script>

<style lang="less">
@import "../../styles/card";
.card-bind-type {
    .card-bind-type-tips {
        font-weight: 600;
        padding: 0 10px;
        font-size: @font-size-base;
        line-height: 50px;
    }
}
</style>
