<template>
    <v-text-field box v-bind="computedAttrs" v-on="computedListeners" v-model.lazy="value" />
</template>

<script>
    import HypermediaFieldMixin from "../../mixins/HypermediaFieldMixin";

    export default {
        name        : 'h-text-field',
        inheritAttrs: false,
        mixins      : [
            HypermediaFieldMixin
        ],
        computed: {
            computedListeners() {
                return this.$listeners;
            }
        }
    }
</script>

<style scoped>

</style>