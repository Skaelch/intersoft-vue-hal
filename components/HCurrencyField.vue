<template>
    <v-text-field
        append-icon = "euro_symbol"
        box         
        v-bind       = "computedAttrs"
        v-bind:value = "textFieldValue"
        v-on         = "computedListeners"
        v-on:change  = "propagateChangeEvent"
    />
</template>

<script>
    import HypermediaFieldMixin from '../../mixins/HypermediaFieldMixin';
    import accounting from 'accounting';

    const currencyFormat = /^-?[0-9][0-9.]*(,[0-9]{1,2})?$/;

    export default {
        name        : "h-currency-field",
        inheritAttrs: false,
        mixins: [
            HypermediaFieldMixin
        ],
        computed: {
            textFieldValue() {
                return this.format(this.value);
            }
        },
        methods: {
            propagateChangeEvent(value) {
                if (this.validateFormat(value) === true) { // === true, da validateFormat im Fehlerfall einen string zurück gibt
                    value = this.unformat(value);
                    this.value = value;
                    this.$emit('change', value);
                }
            },
            format(value) {
                if (!value) {
                    return '';
                }

                return accounting.formatMoney(Number(value), {
                    format:   '%v',
                    decimal:  ',',
                    thousand: '.'
                });
            },
            unformat(value) {
                if (!value) {
                    return null;
                }

                if (!value.match(currencyFormat)) {
                    return null;
                }

                return accounting.unformat(value, ',');
            },
            validateFormat(value) {
                if (!value) {
                    return true;
                }
                return !!value.match(currencyFormat) || `${this.$attrs.label} hat das falsche Format`;
            }
        }
    }
</script>

<style scoped>

</style>