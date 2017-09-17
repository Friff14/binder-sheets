function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

const CLIENT_ID = '327908214436-s881mi4ocl03725oluicie5apbva1r49.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


function google_sign_in(){
    gapi.auth2.getAuthInstance().signIn().then(function(){
        app.loggedIn = true;
    });
}
function google_sign_out(){
    gapi.auth2.getAuthInstance().signOut().then(function(){
        app.loggedIn = false;
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
function initClient(){
    gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function(){
        // gapi.auth2.getAuthInstance().signIn();
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
}


function updateSigninStatus(isSignedIn){
    app.loggedIn = isSignedIn;
    console.log("Got past the app.loggedin stuff", isSignedIn);
}
