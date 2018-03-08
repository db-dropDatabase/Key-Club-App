(function () {
    "use strict";


    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD1ErUGsqUboJTgJMo2wNIVABkBgW_bs7Y",
            authDomain: "key-club-5dd8a.firebaseapp.com",
            databaseURL: "https://key-club-5dd8a.firebaseio.com",
            projectId: "key-club-5dd8a",
            storageBucket: "key-club-5dd8a.appspot.com",
            messagingSenderId: "367057032737"
        };
        firebase.initializeApp(config);

        //get page data
        const txtEmail = document.getElementById("email");
        const txtPassword = document.getElementById("password");
        const txtNewPassword = document.getElementById("password2");
        const txtName = document.getElementById("name");
        const btnLogin = document.getElementById("login");
        const btnsignUp = document.getElementById("signup");

        //signup event
        btnsignUp.addEventListener('click', e => {

            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth();

            if (txtEmail != null && txtName != null && txtPassword != null) {

                if (txtPassword.value == txtNewPassword.value) {

                    const promise = auth.createUserWithEmailAndPassword(email, pass)
                    promise.catch(e => console.log(e.message));

                } else {

                    console.log("The passwords do not match.");
                }
            } else {

                console.log("Please fill out all fields.");
            }

        });

        //login event
        btnLogin.addEventListener('click', e => {

            window.location.href = "index.html";
        });

        //auth handler
        firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                const name = txtName.value;
                firebaseUser.updateProfile({

                    displayName: name
                });
                console.log(firebaseUser);

                firebaseUser.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (error) {
                    // An error happened.
                });

                window.location.href = "main.html"; //displays the user to the console and switches to main page

            } else {
                console.log('not logged in');

            }

        })

    };



    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();
