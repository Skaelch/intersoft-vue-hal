
export function expandLink(link, params = {}) {

    if (link.templated) {
        return link.href.replace(/{(\w+)}/g, (_, name) => params[name]);
    }
    return link.href;
}

export function resolveResourceUrl(resource, relType, params = {}) {

    if (!resource._links) {
        throw new Error(`resource enthält keine Links`);
    }

    const link = resource._links[relType];

    if (!link) {
        throw new Error(`resource enthält keinen Link zum Link Relation Type ${relType}`);
    }

    return expandLink(link, params);
}

export function resolveFormResourceUrl(resource, relType, params = {}) {

    if (!resource._links[relType]) {
        throw new Error(`resource enthält keinen Link zum Link Relation Type ${relType}`);
    }

    const curies = resource._links['curies'];

    if (!curies) {
        throw new Error(`resource enthält keine CURIEs`);
    }

    const [prefix, name] = relType.split(':', 2);

    const curie = curies.find(x => x.name === prefix);

    if (!curie) {
        throw new Error(`resource enthält kein CURIE für den Link Relation Type ${relType}`);
    }
    
    return expandLink(curie, Object.assign({}, params, {rel: name}));
}