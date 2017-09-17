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