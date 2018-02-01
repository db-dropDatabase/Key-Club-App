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

        const btnLogout = document.getElementById("logout");

        btnLogout.addEventListener('click', e => {

            firebase.auth().signOut();

        });

        firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
                window.location.href = "index.html";
            }

        })


        firebase.database().ref().child("Events").on("child_added", snap => {

            console.log(snap.val());

            var eventBox = document.createElement("div");
            eventBox.id = "'" + snap.key + "'";

            var name = document.createElement("h3");
            var nameNode = document.createTextNode(snap.val().Name);
            name.appendChild(nameNode);

            var disc = document.createElement("h5");
            var discNode = document.createTextNode(snap.val().Discription);
            disc.appendChild(discNode);

            var date = document.createElement("h4");
            var dateNode = document.createTextNode(snap.val().Datetime);
            date.appendChild(dateNode);

            eventBox.appendChild(name);
            eventBox.appendChild(disc);
            eventBox.appendChild(date);

            document.getElementById("eventDiv").appendChild(eventBox);

        });

        firebase.database().ref().on("child_removed", snap => {

            document.getElementById(snap.key).remove;
        });

    };



    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();
