/**
 * Created by tannergriffin on 8/25/2017.
 */
/*
 * These flags let us know if things have been loaded
 * */
let sheet_picked = false;
let columns_loaded = false;

/**
 * Get the user's spreadsheets list in order to let them choose one
 */
function getSheetsList() {
    return []
}

let sheet_info = {};
let sheet_data = {};
let pages_list = [];
let selected_sheet = null;
let selected_columns = [];

/*
 After the JSON object is retrieved, get the pages list.
 Then the user can choose which page to use.
 */
function getPagesListFromSheet(sheet_info) {
    let pages = sheet_info.result.sheets;
    pages.forEach(function (page) {
        pages_list.push(page.properties.title);
    })
}
/**
 * Make the sheet into a JSON object by column
 */
function getJSONFromSheet(sheet_id) {
    sheet_id = getGoogleSheetIdFromUrl(sheet_id);
    gapi.client.sheets.spreadsheets.get({
        spreadsheetId: sheet_id
    }).then(function (returned_sheet_info) {
            console.log("Perhaps, ma'am, you should take _my_ carriage");
            sheet_info = returned_sheet_info;
        },
        function (error) {
            console.log("Could not get sheet data", error);
        }
    )
}

$(document).ready(function () {
    // getJSONFromSheet('1pOvtoewrUrTNQIvalZF_ruJXeue4IAx03Cgo3W8-R0A');
});

function listColumns() {

}

