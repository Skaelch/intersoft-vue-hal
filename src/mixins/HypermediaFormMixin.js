import HypermediaMixin from './HypermediaMixin';

export default {
    mixins: [
        HypermediaMixin
    ],
    data() {
        return {
            disabled: false,
            formData: {}
        }
    },
    provide() {
        return {
            getPropertyTemplate: this.getPropertyTemplate,
            getPropertyValue   : this.getPropertyValue,
            setPropertyValue   : this.setPropertyValue,
            getEmbeddedResource: this.getEmbeddedResource,
            isFormDisabled     : this.isFormDisabled
        }
    },
    created() {
        this.template.properties.forEach(property => {
            if (typeof property.value !== 'undefined') {
                this.setPropertyValue(property.name, property.value);
            } else {
                switch (property.type) {
                    case 'array' : this.setPropertyValue(property.name, []); break;
                    case 'object': this.setPropertyValue(property.name, {}); break;
                    default:
                        this.setPropertyValue(property.name, null);
                }
            }
        });
    },
    computed: {
        template() {
            return this.value._templates.default;
        }
    },
    methods: {
        /** @public */
        getPropertyTemplate(propertyName) {
            return this.template.properties.find(p => p.name === propertyName) || {};
        },

        /** @public */
        getPropertyValue(propertyName) {
            return this.formData[propertyName];
        },

        /** @public */
        setPropertyValue(propertyName, value) {
            this.$set(this.formData, propertyName, value);
        },

        /** @public */
        getEmbeddedResource(relType) {
            return this.value._embedded[relType];
        },

        /** @public */
        isFormDisabled() {
            return this.disabled;
        },

        async submitForm() {
            this.disabled = true;
            
            return await this.$axios.request(this.value.target, {
                method: this.template.method,
                headers: {
                    'Content-Type': this.template.contentType,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                data: this.formData
            });
        },

        async submitFormAndFollow() {
            return this.$axios.get((await this.submitForm()).headers.location);
        }
    }
}