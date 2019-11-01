<template>
    <v-menu
        full-width
        lazy
        offset-y
        min-width                     = "350px"
        ref                           = "menu"
        transition                    = "scale-transition"
        v-model                       = "pickerVisible"
        v-bind:nudge-bottom           = "3"
        v-bind:nudge-left             = "12"
        v-bind:open-on-click          = "true"
        v-bind:close-on-content-click = "false"
        v-bind:return-value.sync      = "value"
    >
        <template #activator="data">
            <v-text-field
                box
                append-icon       = "event"
                ref               = "textField"
                v-bind            = "computedAttrs"
                v-bind:value      = "textFieldValue"
                v-on              = "mergeListeners(computedListeners, data.on)"
                v-on:change       = "propagateChangeEvent">
            </v-text-field>
        </template>
        <v-date-picker v-model="value" landscape first-day-of-week="1" locale="de-DE" scrollable>
            <v-spacer />
            <v-btn color="primary" @click="acceptDateSelection">OK</v-btn>
            <v-btn                 @click="cancelDateSelection">Abbrechen</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    import HypermediaFieldMixin from "../../mixins/HypermediaFieldMixin";
    import {formatDate, parseDate} from "../../util/date";
    import _ from 'lodash';

    export default {
        name        : "h-date-field",
        inheritAttrs: false,
        mixins      : [
            HypermediaFieldMixin
        ],
        data() {
            return {
                pickerVisible : false,
            };
        },
        computed: {
            textFieldValue() {
                return formatDate(this.value);
            }
        },
        methods: {
            mergeListeners(left, right) {
                // Wir dürfen nicht einfach _.assign verwenden, da die Listener aus right dann die aus left überschreiben
                // würden. Lodash's _.over kombiniert die Listener für uns.
                const customizer = (objValue, srcValue) => {
                    if (objValue && srcValue) {
                        return _.over([ objValue, srcValue ]);
                    }
                };

                return _.assignWith({}, left, right, customizer);
            },
            openDatePicker() {
                this.pickerVisible = true;
            },
            acceptDateSelection() {
                this.$refs.menu.save(this.value);
                this.$refs.textField.focus();
            },
            cancelDateSelection() {
                this.pickerVisible = false;
                this.$refs.textField.focus();
            },
            propagateChangeEvent(value) {
                if (this.validateFormat(value) === true) { // === true, da validateFormat im Fehlerfall einen string zurück gibt
                    this.value = parseDate(value);
                }
            },
            validateFormat(value) {
                if (!value) {
                    return true;
                }
                return  !!parseDate(value) || `${this.$attrs.label} hat das falsche Format`;
            },
            unformat(value) {
                return parseDate(value);
            },
            format(value) {
                return formatDate(value);
            }
        }
    }
</script>

<style scoped>

    /* Der DatePicker soll sich analog zum VSelect direkt an die untere Linie des TextField schmiegen. */
    .v-menu__content,
    .v-menu__content .v-picker {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

</style>