<template>
    <div class="code xml">
        <header>Example</header>
        <ul>
            <li v-for="item in xml">{{item}}</li>
        </ul>
    </div>
</template>
<style lang="less">
.code{
    border: solid 1px #ccc;
    header{
        border-bottom: solid 1px #ccc;
        background-color: #eee;
    }
}
</style>
<script>
export default {
    name: 'ss-code',
    props: {
        xml: Array
    },
    data () {
        return {

        }
    },
    created () {
        console.log(this.xml)
    }
}
</script>
