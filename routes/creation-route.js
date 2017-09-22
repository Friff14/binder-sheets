let creation_template = `
<div class="container" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="col-xs-12" v-if="!flags.setupCompleted">
        <div v-if="!flags.pageDataRetrievalCompleted">
            <h2>
                Let's get started!
            </h2>
            <h4>
                To set up your template, please enter a title for it (you can (NOT YET) change this later on).
            </h4>
            <input type="text"
                   placeholder="Template Title"
                   id="binder-template-title"
                   class="form-control"
                   v-model="templateTitle">
                   
            <h4>
                Then, you'll need a Google Sheets URL. Please paste it in the box below.
            </h4>
            <input
                    type="text"
                    placeholder="Google Sheets URL"
                    id="sheets-url"
                    class="form-control"
                    v-model="sheetsUrl"
                    :disabled="!templateTitle"
            >
            <div class="col-xs-12">
                <h5>
                    (or, if you've already got one made, choose it from below)
                </h5>
                <div class="col-sm-4 col-xs-12" v-for="template in savedTemplates">
                    <button class="btn btn-block btn-info">
                        {{template.title}}
                    </button>
                </div>
            </div>
        </div>
        <!--{{flags}}-->
        <div v-if="flags.pageDataRetrievalInProgress" class="text-center">
            <h1>
                <span class="fa fa-spin fa-spinner"></span>
            </h1>
        </div>
        <div v-if="flags.pageDataRetrievalCompleted && !flags.setupCompleted">
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
                    <button class="btn btn-primary"
                            v-on:click="selectColumns()">
                        Create My Template
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="flags.setupCompleted">
         
    </div>
</div>
`;

// let store = require('store');


const creation_route = {
    template: creation_template,
    data: function () {
        return {
            sheetsUrl: null,
            rawSheetData: sheet_info,
            templateTitle: '',
            pagesContainer: null,
            columnsContainer: null,
            savedTemplates: [],
            flags: {
                // "pageDataRetrievalInProgress": false
            },
            templateObject: new BinderTemplate()
        }
    },
    beforeMount: function(x){
        let that = this;
        getBinderTemplateList().then(
            templateList=>{
                that.savedTemplates = templateList;
            }
        )
    },
    watch: {
        sheetsUrl: function (x) {
            let that = this;
            that.templateObject.setSheetId(x);
            that.pagesContainer = that.templateObject.pagesContainer;
            that.columnsContainer = that.templateObject.columnsContainer;
            that.flags = that.templateObject.flags;
        },
        templateTitle: function(title){
            this.templateObject.title = title;
        }
    },
    methods: {
        selectPage: function (index) {
            this.templateObject.setPageChosen(index);
        },
        selectColumns: function () {
            console.log("Selecting Columns");
            this.flags.setupCompleted = true;

            saveBinderTemplate(this.templateObject);
        }
    }
};

let template_object = null;

function getSavedTemplates(index){
    if(!index){
        let x = store.get("saved_templates");
        console.log("Saved templates", x);
        return x;
    }
}
