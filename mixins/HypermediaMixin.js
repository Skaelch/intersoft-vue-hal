import {resolveResourceUrl} from "../util/hypermedia.js";
import {resolveFormResourceUrl} from "../util/hypermedia";

export default {
    props: {
        // HAL-Resource
        value: {
            type    : Object,
            required: true
        }
    },
    methods: {
        async fetch(baseResource, relType, params) {
            return this.$axios.get(resolveResourceUrl(baseResource, relType, params || {}));
        },

        async fetchForm(baseResource, relType, params) {
            return this.$axios.get(resolveFormResourceUrl(baseResource, relType, params)).then(response => {
                response.data.target = resolveResourceUrl(baseResource, relType, params);
                return response;
            });
        }
    }
}