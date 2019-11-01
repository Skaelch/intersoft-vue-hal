export function formatDate(isoDate) {
    if (!isoDate) {
        return '';
    }
    const [year, month, day] = isoDate.split('-');
    switch (isoDate.length) {
        case 10:
            return `${day}.${month}.${year}`;
        case  7:
            return `${month}.${year}`;
        case  4:
            return `${year}`;
    }
}

export function parseDate(localeDate) {
    let m;
    // Tag, Monat und Jahr durch Punkt getrennt
    if ((m = localeDate.match(/^([0-3]?\d)\.([01]?\d)\.(\d{2,4})$/))) {
        return `${m[3].padStart(4, '20')}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
    }

    // Monat und Jahr durch Punkt getrennt
    if ((m = localeDate.match(/^([01]?\d)\.(\d{2,4})$/))) {
        return `${m[2].padStart(4, '20')}-${m[1].padStart(2, '0')}`;
    }

    // Tag, Monat und Jahr nicht getrennt
    if ((m = localeDate.match(/^\d{2,8}$/))) {
        let year, month, day;
        switch (localeDate.length) {
            // ddmmyyyy
            case 8:
                year  = localeDate.slice(4, 8);
                month = localeDate.slice(2, 4);
                day   = localeDate.slice(0, 2);
                return `${year}-${month}-${day}`;

            // ddmmyy
            // mmyyyy
            case 6:
                if (parseInt((localeDate.slice(2, 4)), 10) > 12) {
                    year  = localeDate.slice(2, 6);
                    month = localeDate.slice(0, 2);
                    return `${year}-${month}`;
                } else {
                    year  = localeDate.slice(4, 6).padStart(4, '20');
                    month = localeDate.slice(2, 4);
                    day   = localeDate.slice(0, 2);
                    return `${year}-${month}-${day}`;
                }

            // yyyy
            // mmyy
            case 4:
                if (parseInt(localeDate.slice(0, 2), 10) > 12) {
                    return localeDate;
                } else {
                    year  = localeDate.slice(2, 4).padStart(4, '20');
                    month = localeDate.slice(0, 2);
                    return `${year}-${month}`;
                }

            case 2:
                return localeDate.padStart(4, '20');
        }
    }

    return null;
}


