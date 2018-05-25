<template>
    <header>
        <p v-on:click="back" :class="{'header-return': isShowBackArrow}"></p>
        <p>{{this.title}}</p>
        <p><slot name="headerRight"></slot></p>
    </header>
</template>
<style lang="less" scoped>
@import "../../styles/custom";
header{
    color: #fff;
    padding: 12px 0;
    font-size: 18px;
    background: @primary-color;
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    p{
        padding: 0 12px;
    }
}
.header-return{
    display: -webkit-box;
    -webkit-box-align: center;
    &:before{
        content: "";
        width: 12px;
        height: 12px;
        border-bottom: solid 2px #FFF;
        border-left: solid 2px #FFF;
        display: block;
        transform: rotate(45deg);
    }
}
</style>
<script>
export default {
    name: 'ss-header',
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        backStep: {
            type: Number,
            default: 1
        },
        isShowBackArrow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        back () {
            this.$router.back(-this.backStep)
        }
    },
    created () {
        console.log(this.isShowBackArrow)
    }
  
}
</script>

