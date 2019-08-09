import _ from 'lodash';

const URL_TEMPLATE_REGEX = /^{(\w+)}$/;

export default {
    props: {
        property: {
            type    : String,
            required: true
        }
    },
    inject: [
        'getPropertyTemplate',
        'getPropertyValue',
        'setPropertyValue',
        'isFormDisabled'
    ],
    computed: {
        computedAttrs() {
            const disabled = this.isFormDisabled() || this.template.readOnly || false;

            const attrs    = {
                id            : this.template.name,
                label         : this.template.prompt   || this.template.name,
                required      : this.template.required || false,
                readonly      : disabled,
                disabled      : disabled,
                validateOnBlur: true,
                rules: [
                    this.validateFormat
                ],
            };

            if (this.template.hint) {
                attrs.hint = this.template.hint;
            }

            // TODO: maxLength wird nur für HTextField unterstützt und sollte verschoben werden
            if (this.template.maxLength) {
                attrs.counter = this.template.maxLength;
                attrs.rules.push(this.validateMaxLengthRule)
            }

            if (this.template.required) {
                attrs.rules.push(this.validateRequiredRule);
            }

            if (this.template.maximum || (this.template.maximum === 0)) {
                attrs.rules.push(this.validateMaximumRule);
            }

            if (this.template.minimum || (this.template.minimum === 0)) {
                attrs.rules.push(this.validateMinimumRule);
            }

            if (this.template.exclusiveMinimum || (this.template.exclusiveMinimum === 0)) {
                attrs.rules.push(this.validateExclusiveMinimumRule);
            }

            // Explizit gesetzte Attribute haben immer Vorang gegenüber den automatisch ermittelten.
            _.assign(attrs, this.$attrs);

            // Das Sternchen bei Pflichtfeldern soll auch hinter expizit gesetzten Labels erscheinen.
            if (attrs.required) {
                attrs.label = attrs.label + "*";
            }

            return attrs;
        },
        computedListeners() {
            return _.omit(this.$listeners, ['input', 'change']);
        },
        template() {
            return this.getPropertyTemplate(this.property);
        },
        value: {
            get() {
                return this.getPropertyValue(this.property);
            },
            set(value) {
                this.setPropertyValue(this.property, value);
            }
        }
    },
    methods: {
        validateRequiredRule(value) {
            if (this.template.required) {
                return !!value || (value === 0) || `${this.template.prompt} ist ein Pflichtfeld.`;
            }
            return true;
        },

        validateMaximumRule(value) {
            if (!value && (value !== 0)) {
                return true;
            }

            const [maximum, maximumProperty] = this.getPropertyConstraintValue('maximum');

            value = this.unformat(value, this.template.type);

            if (value > maximum) {
                if (maximumProperty) {
                    return `${this.template.prompt} darf nicht größer als ${maximumProperty.prompt} sein.`
                } else {
                    return `${this.template.prompt} darf nicht größer als ${this.format(maximum)} sein.`
                }
            }
            return true;
        },

        validateExclusiveMinimumRule(value) {
            if (!value && (value !== 0)) {
                return true;
            }
            const [exclusiveMinimum] = this.getPropertyConstraintValue('exclusiveMinimum');

            value = this.unformat(value, this.template.type);

            if (value <= exclusiveMinimum) {
                return `${this.template.prompt} darf nicht kleiner/gleich ${this.format(exclusiveMinimum)} sein.`
            }
            return true
        },

        validateMinimumRule(value) {
            if (!value && (value !== 0)) {
                return true;
            }
            const [minimum] = this.getPropertyConstraintValue('minimum');
            value = this.unformat(value, this.template.type);

            if (value < minimum) {
                return `${this.template.prompt} darf nicht kleiner als ${this.format(minimum)} sein.`
            }
            return  true
        },

        validateMaxLengthRule(value) {
            if (!value) {
                return true;
            }
            const [maxLength] = this.getPropertyConstraintValue('maxLength');

            if (value.length > maxLength) {
                return `${this.template.prompt} darf nicht länger als ${maxLength} sein.`
            }

            return true;
        },

        validateFormat() {
            return true;
        },

        getPropertyConstraintValue(constraint) {
            if (typeof this.template[constraint] === 'undefined') {
                return [];
            }
            
            let constraintValue = this.template[constraint];
            if (typeof constraintValue === 'string') {
                const match = constraintValue.match(URL_TEMPLATE_REGEX);
                if (match) {
                    const propertyName = match[1];
                    return [this.getPropertyValue(propertyName), this.getPropertyTemplate(propertyName)];
                }
            }
            return [constraintValue];
        },

        format(value) {
            return value;
        },

        unformat(value) {
            return value;
        }
    }
}