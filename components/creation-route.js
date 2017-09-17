let creation_template = `
<div class="container">
    <div class="col-xs-12">
        <input
                type="text"
                placeholder="Google Sheets URL"
                id="sheets-url"
                class="form-control"
                v-model="sheetsUrl"
        >
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
            sheetsUrl: ''
        }
    },
    watch:{
        sheetsUrl: function(x){
            console.log("every breath", x, "takes");
        }
    }
};

const routes = [
    {"path": '/create', component: creation_route}
];

const router = new VueRouter({
    routes: routes
});