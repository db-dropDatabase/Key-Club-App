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

        document.getElementById('title').innerHTML = sessionStorage.sesTitle;

        var signUp = document.getElementById("signUp");

        var Disc = document.getElementById("discr");

        var Time = document.getElementById("time");


        //tries to load the event discription
        firebase.database().ref().child("Events").orderByChild("Name").equalTo(sessionStorage.sesTitle).once('value', snap => {
            snap.forEach(snap1 => {
                Disc.innerHTML = snap1.child("Discription").val();
                var initTime = snap1.child("Datetime").val();
                console.log(initTime);
                Time.innerHTML = initTime;
            })
        });


        //handles signup
        signUp.addEventListener('click', e => {

            var name = firebase.auth().currentUser.displayName;

            firebase.database().ref().child("Events").orderByChild("Name").equalTo(sessionStorage.sesTitle).on('child_added', snap => {
                console.log(snap.key);
                firebase.database().ref().child("Events").child(snap.key).child("Participants").push(name);
                window.location.href = "main.html"
            });
            
            
        });

        //handles back button
        back.addEventListener('click', e => {

            window.location.href = "main.html"
        });

    };



    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

