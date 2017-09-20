/**
 * Created by tannergriffin on 8/25/2017.
 */

/**
 * Just stupid functions
 */
function getExcelColumnName(columnNumber) {
    let dividend = columnNumber;
    let columnName = '';
    let modulo;

    while (dividend > 0) {
        modulo = (dividend - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        dividend = Math.floor((dividend - modulo) / 26);
    }

    return columnName;
}

/*
* Source: Henrique G. Abreu
* https://stackoverflow.com/questions/16840038/
* */
function getGoogleSheetIdFromUrl(url) {
    return url.match(/[-\w]{25,}/);
}

function isUrl(url){
    url = String(url);
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    return !!url.match(regex);

}

/*
 * Source: Jon Surell
 * https://stackoverflow.com/questions/105034/
* */
function uuid4() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}