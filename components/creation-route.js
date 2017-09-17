let creation_template = `
<div class="container">
    <div class="col-xs-12">
        <div v-if="!templateObject">
            <input
                    type="text"
                    placeholder="Google Sheets URL"
                    id="sheets-url"
                    class="form-control"
                    v-model="sheetsUrl"
            >
        </div>
        <p>
            {{ sheetsUrl }}
        </p>
    </div>
</div>
`;

const creation_route = {
    template: creation_template,
    data: function(){
        return {
            sheetsUrl: '',
            rawSheetData: sheet_info,
            templateObject: null
        }
    },
    watch:{
        sheetsUrl: function(x){
            let that = this;

            that.templateObject = new Template(x);
        },
        templateObject: function(x){
            console.log("doing something", x);
        },
        rawSheetData: function(sheet_info){
            console.log("Sheet data retrieved");
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