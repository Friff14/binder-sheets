let edit_template = `
<div>
    <h1>
    This is the edit template
</h1>

</div>
`;

const edit_route = {
    template: edit_template,
    data: function(){
        return {
            bt: null
        }
    },
    beforeMount: function(){
        let that = this;
        let id = parseInt(this.$route.params.id);
        getBinderTemplate(id).then(bt_skeleton=>{
            that.bt = new BinderTemplate(bt_skeleton)
        })
    },
    watch: {

    },
    methods:{

    }
};

