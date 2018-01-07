﻿(function () {
    "use strict";


    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
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


        var addButton = document.getElementById("addToDb");
        var readButton = document.getElementById("readDb");
        var data;

        addButton.addEventListener("click", function () {

            data = document.getElementById("txtAreaIn").value;
            firebase.database().ref().push(data);
            console.log("data Pushed");
        });

        readButton.addEventListener("click", function () {

            firebase.database().ref().on("child_added", snap => {

                var output = snap.val();
                document.getElementById("txtAreaOut").innerText = output;
                console.log(output);
            });
            console.log("data read");

        });

    };

 

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();