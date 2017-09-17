/**
 * Created by tannergriffin on 9/17/2017.
 */

class Template {

    // Google Sheet Information
    // private sheetId = null;
    // private sheetInfo = null;
    // private pageList = [];
    // private pageChosen = 0;
    // private columnsList = [];

    // Sheet Data Retrieval info
    // pageDataRetrievalInProgress = false;

    //

    constructor(sheetId) {
        this.setSheetId(sheetId);
        this.retrievePageData()
    }

    getSheetId() {
        return this.sheetId;
    }

    setSheetId(sheetId) {
        this.sheetId = getGoogleSheetIdFromUrl(sheetId);
    }

    getSheetInfo() {
        if (this.sheetInfo){
            return this.sheetInfo;
        }
        else if (this.pageDataRetrievalInProgress){
            return this.getSheetInfo();
        }
        else{
            throw "Sheet Info not downloaded."
        }
    }

    setSheetInfo(sheetInfo) {
        this.sheetInfo = sheetInfo;

    //    set page list, column list, n stuff
        let pages = [];
        sheetInfo.result.sheets.forEach(page => {
            pages.push(page.properties.title)
        });
        this.setPageList(pages);
    }

    getPageList() {
        return this.pageList;
    }

    setPageList(pageList) {
        this.pageList = pageList;
    }

    getPageChosen() {
        return this.pageChosen
    }

    setPageChosen(pageChosen) {
        this.pageChosen = pageChosen;

    }

    getColumnsList() {
        return this.columnsList
    }

    setColumnsList(columnsList) {
        this.columnsList = columnsList;
    }

    getPageName() {
        if (this.pageList.length > this.pageChosen) {
            return this.pageList[this.pageChosen]
        }
        else return null
    }

    retrievePageData() {
        if (this.getSheetId()) {
            this.pageDataRetrievalInProgress = true;
            let that = this;
            gapi.client.sheets.spreadsheets.get({
                spreadsheetId: that.getSheetId()
            }).then(function (returned_sheet_info) {
                    that.setSheetInfo(returned_sheet_info);
                    that.pageDataRetrievalInProgress = false;
                },
                function (error) {
                    that.pageDataRetrievalInProgress = false;
                    console.log("Could not get sheet data", error);
                }
            )
        }
        else {
            throw "No Sheet ID registered on this template.";

        }
    }

}