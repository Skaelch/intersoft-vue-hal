<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name : "h-property-iterator-item",
        props: {
            property: {
                type    : String,
                required: true
            },
            index: {
                type    : Number,
                required: true
            }
        },
        inject: {
            getParentPropertyTemplate: 'getPropertyTemplate',
            getParentPropertyValue   : 'getPropertyValue',
            setParentPropertyValue   : 'setPropertyValue'
        },
        computed: {
            item() {
                return this.getParentPropertyValue(this.property)[this.index];
            }
        },
        methods: {
            getPropertyTemplate(propertyName) {
                return this.getParentPropertyTemplate(this.property)
                    .items
                    .properties
                    .find(p => p.name === propertyName);
            },
            getPropertyValue(propertyName) {
                return this.item[propertyName];
            },
            setPropertyValue(propertyName, value) {
                this.$set(this.item, propertyName, value);
            }
        },
        provide() {
            return {
                getPropertyTemplate: this.getPropertyTemplate,
                getPropertyValue   : this.getPropertyValue,
                setPropertyValue   : this.setPropertyValue,
            }
        }
    }
</script>

<style scoped>
</style>