let creation_template = `
<div class="container" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="col-xs-12">
        <div v-if="!flags.pageDataRetrievalCompleted">
            <h2>
                Let's get started!
            </h2>
            <h4>
                The first thing we'll need from you is a Google Sheets URL.
                Please paste it in the box below.
            </h4>
            <input
                    type="text"
                    placeholder="Google Sheets URL"
                    id="sheets-url"
                    class="form-control"
                    v-model="sheetsUrl"
            >
        </div>
        <!--{{flags}}-->
        <div v-if="flags.pageDataRetrievalInProgress" class="text-center">
            <h1>
                <span class="fa fa-spin fa-spinner"></span>
            </h1>
        </div>
        <div v-if="flags.pageDataRetrievalCompleted">
            <div v-if="!pagesContainer.pageChosen">
                <div class="row">
                    <div class="col-xs-12">
                        <h2>
                            Thanks!
                        </h2>
                        <h4>
                            Next step: which page is the data on?
                        </h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-2 top-10" v-for="(page, index) in pagesContainer.pageList">
                        <button
                                v-on:click="selectPage(index)"
                                class="btn btn-block btn-info">
                            {{page}}
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <h2>
                        One more step...
                    </h2>
                    <h4>
                        Which columns of that sheet do you want to track?
                    </h4>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div
                                class="checkbox"
                                v-for="(column, index) in columnsContainer.columnsList"
                        >
                            <label v-bind:for="'column_' + index">
                                <input
                                        type="checkbox"
                                        v-bind:value="index"
                                        v-bind:name="'column_' + index"
                                        v-bind:id="'column_' + index"
                                        v-model="columnsContainer.columnsSelected"
                                        
                                >
                                {{column}}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const creation_route = {
    template: creation_template,
    data: function(){
        return {
            sheetsUrl: null,
            rawSheetData: sheet_info,
            pagesContainer: null,
            columnsContainer: null,
            flags: {
                // "pageDataRetrievalInProgress": false
            },
            templateObject: new Template()
        }
    },
    watch:{
        sheetsUrl: function(x){
            let that = this;
            that.templateObject.setSheetId(x);
            that.pagesContainer = that.templateObject.pagesContainer;
            that.columnsContainer = that.templateObject.columnsContainer;
            that.flags = that.templateObject.flags;
            // that.templateObject = new Template(x);
        },
        'templateObject': function(x){
            console.log("doing something", x);
        },
        rawSheetData: function(sheet_info){
            console.log("Sheet data retrieved");
        }
    },
    methods: {
        selectPage: function(index){
            this.templateObject.setPageChosen(index);
        }
    }
};

let template_object = null;

const routes = [
    {"path": '/create', component: creation_route}
];

const router = new VueRouter({
    routes: routes
});