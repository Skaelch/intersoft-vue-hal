<template>
    <v-form ref="myForm" v-model="internalValid" lazy-validation>

        <slot />

        <div class="caption">* erforderlich</div>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn ref="abbrechen" flat            @click="abort">Abbrechen</v-btn>
            <v-btn ref="speichern" color="primary" @click="save" :disabled="disabled || !isValid">Speichern</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    export default {
        name   : 'h-form',
        data() {
            return {
                internalValid: null
            }
        },
        props: {
            disabled: {
                type    : Boolean,
                required: false,
                default : false
            },
            valid: {
                type    : Boolean,
                required: false,
                default : true
            }
        },
        computed: {
            isValid() {
                return this.valid && this.internalValid;
            }
        },
        methods: {
            save() {
                if (this.$refs.myForm.validate()) {
                    this.$emit('submit');
                }
            },
            abort() {
                this.$emit('abort');
            }
        }
    }
</script>

<style scoped>

</style>