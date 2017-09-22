
const routes = [
    {"path": '/create', component: creation_route},
    {"path": '/edit/:id', component: edit_route}
];

const router = new VueRouter({
    routes: routes
});
