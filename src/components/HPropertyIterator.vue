<template>
    <div>
        <h-property-iterator-item
            v-for           = "(item, index) in items"
            v-bind:key      = "item[propertyKey]"
            v-bind:property = "property"
            v-bind:index    = "index"
        >
            <slot v-bind:item="item"/>
        </h-property-iterator-item>
    </div>
</template>

<script>
    import HPropertyIteratorItem from "./HPropertyIteratorItem";

    export default {
        name      : 'h-property-iterator',
        components: {
            HPropertyIteratorItem
        },
        props: {
            property: {
                type    : String,
                required: true
            },
            propertyKey: {
                type    : String,
                required: true
            }
        },
        inject: [
            'getPropertyValue',
            'setPropertyValue'
        ],
        computed: {
            items() {
                return this.getPropertyValue(this.property);
            }
        }
    }
</script>

<style scoped>
</style>