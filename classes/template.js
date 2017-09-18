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
        this.pagesContainer = {
            "pageList": [],
            "pageChosen": 0
        };
        this.columnsContainer = {
            "columnsList": [],
            "columnsSelected": []
        };
        this.flags = {
            "pageDataRetrievalInProgress": false,
            "pageDataRetrievalCompleted": true
        };
        if(sheetId){
            this.setSheetId(sheetId);
        }
    }

    getSheetId() {
        return this.sheetId;
    }

    setSheetId(sheetId) {
        this.sheetId = getGoogleSheetIdFromUrl(sheetId);
        this.retrievePageData()
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
        return this.pagesContainer.pageList;
    }

    setPageList(pageList) {
        this.pagesContainer.pageList = pageList;
        if (pageList.length == 1){
            this.setPageChosen(0);
        }
    }

    getPageChosen() {
        return this.pagesContainer.pageChosen
    }
    setPageChosen(pageChosen) {
        console.log("Choosing page", pageChosen);
        this.pagesContainer.pageChosen = pageChosen;
        console.log(this.sheetInfo.result.sheets);
        this.setGridData(this.sheetInfo.result.sheets[pageChosen])
    }

    getGridData(){
        return this.gridData;
    }
    setGridData(gridData){
        this.gridData = gridData;
        console.log("Grid data", gridData);
        this.setColumnsList(gridData.data[0].rowData[0].values);
    }

    getColumnsList() {
        return this.columnsList
    }

    setColumnsList(columnsList) {
        let columns = [];
        let columnsSelected = [];
        columnsList.forEach((column, index)=>{
            columns.push(column.formattedValue);
            if(column.formattedValue != undefined){
                columnsSelected.push(index);
            }
        });
        this.columnsContainer.columnsList = columns;
        this.columnsContainer.columnsSelected = columnsSelected;
        console.log("Columns list", columns);
    }

    getPageName() {
        if (this.pageList.length > this.pageChosen) {
            return this.pageList[this.pageChosen]
        }
        else return null
    }

    retrievePageData() {
        if (this.getSheetId()) {
            this.flags.pageDataRetrievalInProgress = true;
            this.flags.pageDataRetrievalCompleted = false;
            let that = this;
            gapi.client.sheets.spreadsheets.get({
                spreadsheetId: that.getSheetId(),
                includeGridData: true
            }).then(function (returned_sheet_info) {
                    that.setSheetInfo(returned_sheet_info);
                    that.flags.pageDataRetrievalInProgress = false;
                    that.flags.pageDataRetrievalCompleted = true;
                },
                function (error) {
                    that.flags.pageDataRetrievalInProgress = false;
                    console.log("Could not get sheet data", error);
                }
            )
        }
        else {
            throw "No Sheet ID registered on this template.";

        }
    }

}