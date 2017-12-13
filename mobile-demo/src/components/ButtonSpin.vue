<template lang="html">
    <mt-button :disabled="disabled" type="primary" size="large">
        <mt-spinner type="fading-circle" slot="icon" v-show="isLoading"></mt-spinner>
        <slot></slot>
    </mt-button>
</template>

<script>
export default {
    name: 'ui-button-spin',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        disabled () {
            return this.isLoading || this.isDisabled
        }
    }
}
</script>
