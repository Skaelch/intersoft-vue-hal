<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-autocomplete box v-bind="computedAttrs" v-on="computedListeners" v-model.lazy="value"  ref="select">
        <slot v-for="(node, slot) in $slots" :name="slot" v-slot:[slot] />

        <template v-for="(func, slot) in $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
        </template>
    </v-autocomplete>
</template>
<script>
    import HypermediaFieldMixin from '../../mixins/HypermediaFieldMixin';

    export default {
        name        : "h-select-field",
        inheritAttrs: false,
        mixins: [
            HypermediaFieldMixin
        ],
        inject: [
            'getEmbeddedResource'
        ],
        computed: {
            computedAttrs() {
                const attrs = HypermediaFieldMixin.computed.computedAttrs.call(this);

                if (this.template.suggest) {
                    if (Array.isArray(this.template.suggest)) {
                        attrs.items     = this.template.suggest.map(e => ({text: e.prompt, value: e.value}));
                    } else {
                        attrs.items     = this.getEmbeddedResource([this.template.suggest.embedded]);
                        attrs.itemText  = this.template.suggest['prompt-field'];
                        attrs.itemValue = this.template.suggest['value-field'];
                    }
                    attrs.validateOnBlur = false;
                }

                if (this.$attrs['items']) {
                    attrs.items = this.$attrs['items'];
                }

                if (this.$attrs['item-text']) {
                    attrs.itemText = this.$attrs['item-text'];
                    delete attrs['item-text'];
                }

                attrs.clearable = !attrs.required;

                return attrs;
            },
            computedListeners() {
                return this.$listeners;
            }
        },
        methods: {
            focus() {
                this.$refs.select.focus();
            }
        }
    }
</script>

<style scoped>

</style>