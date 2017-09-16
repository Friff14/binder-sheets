

let app = new Vue({
    el: "#app",
    data: {
        loggedIn: "loading"
    },
    methods: {
        google_sign_in: google_sign_in,
        google_sign_out: google_sign_out
    },
    router: router
});


