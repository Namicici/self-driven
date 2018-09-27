<template>
    <div class="page">
        <ss-header title="Icons"></ss-header>
        <section>

            <div class="triangle">重点是display:block;border: solid xxpx transparent;</div>
        </section>
    </div>
</template>
<style lang="less">
.triangle{
    margin: 20px;
    &:after{
        content:"";
        height: 0;
        width: 0;
        border: solid 12px transparent;//transparent
        border-left: solid 12px thistle;
        display: block;
    }
}
</style>

