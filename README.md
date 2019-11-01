# intersoft-vue-hal
HAL is a standard to describe REST request vie json. http://stateless.co/hal_specification.html
Aditional there is HAL Forms to describe forms https://rwcbook.github.io/hal-forms/

These plugin contains vuetify components that transform a json document to usable components. All views that uses any component has to implement the HypermediaFormMixin.

## Basic usage
``` html
<template>
    <h-form @submit="submit" @abort="abort" :disabled="disabled" :valid="!loading">
        <h-currency-field ref="currency field" label="currency field" property="currencyfield" />
        <anyOtherComponent />
    </h-form>
</template>
```

``` javascript
import {
    HypermediaFormMixin,
    HCurrencyField,
    } from "intersoft-vue-js-hal";

export default {
    name: 'vue-component',
    components: {
        'h-currency-field': HCurrencyField,
        'h-form': HForm
    },
    mixins: [
        HypermediaFormMixin
    ]
}
```

## Availible Components
All components are created by vue extension vuetify which folowing the material design guide. These components inherited all props by there vuetify parent.

### h-currency-field
```html
<h-currency-field ref="currency field" label="currency field" property="currencyfield" />
```

### h-date-field
```html
<h-date-field label="Date" property="date" />
```

### h-select-field
```html
<h-select-field property="abrechnungsempfaenger">
```

### h-textarea
```html
<h-textarea label="Freitext" property="freitext" />
```

### h-text-field
```html
<h-text-field field" label="currency field" property="currencyfield" />
```
