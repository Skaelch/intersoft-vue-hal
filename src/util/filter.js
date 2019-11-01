import accounting from 'accounting';
import {formatDate} from "./date.js";


export function euro(value) {
    if (typeof value === 'undefined') {
        return '';
    }
    return accounting.formatMoney(Number(value), {
        symbol:   '€',
        format:   '%v %s',
        decimal:  ',',
        thousand: '.'
    });
}

export function euroWert(value) {
    if (typeof value === 'undefined') {
        return '';
    }
    return accounting.formatMoney(Number(value), {
        format:   '%v',
        decimal:  ',',
        thousand: '.'
    });
}

export function date(date) {
    return formatDate(date)
}

export function iban4Format(value) {

    var laenderKz = value.substring(0,2);
    var pruefziffer = value.substring(2,4);
    var nummernrest = value.substring(4,value.length);

    const target = [];
    for (
        const array = Array.from(nummernrest);
        array.length;
        target.push(array.splice(0,4).join(''))
    );

    nummernrest = target.join(' ');
    return laenderKz + pruefziffer + ' '+ nummernrest;
}