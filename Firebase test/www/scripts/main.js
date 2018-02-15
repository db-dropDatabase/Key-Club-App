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

        //handle log out
        const btnLogout = document.getElementById("logout");

        btnLogout.addEventListener('click', e => {

            firebase.auth().signOut();

        });

        //auth handler for log out
        firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
                window.location.href = "index.html"; //returns to login page
            }

        })

        //list out events
        firebase.database().ref().child("Events").on("child_added", snap => {


            console.log(snap.val());

            var eventBox = document.createElement("div"); //create the box that holds the event data
            eventBox.id = snap.key;

            var name = document.createElement("h3"); //create event name
            var nameNode = document.createTextNode(snap.val().Name); 
            name.appendChild(nameNode);

            var disc = document.createElement("h5"); //create event discription
            var discNode = document.createTextNode(snap.val().Discription);
            disc.appendChild(discNode);

            var date = document.createElement("h4"); //create event date
            var dateNode = document.createTextNode(snap.val().Datetime);
            date.appendChild(dateNode);

            var button = document.createElement("button"); //create signup button
            button.setAttribute("id", "signUpButton" + snap.key); //create unique to div button id
            var buttonNode = document.createTextNode("sign up here");
            button.appendChild(buttonNode);

            eventBox.appendChild(button); //attach all event elements to the event box
            eventBox.appendChild(name);
            eventBox.appendChild(disc);
            eventBox.appendChild(date);

            document.getElementById("eventDiv").appendChild(eventBox); //attach the event box to the master box

            firebase.database().ref().child("Events").child(snap.key).child("Participants").on("child_added", snap1 => { //checks for participants  in each event

                if (snap1.val() == firebase.auth().currentUser.email) { //checks if the user has already signed up for the event

                    var alreadySignedUp = document.createElement("h4");
                    var alreadySignedUpNode = document.createTextNode("Already Signed Up");
                    alreadySignedUp.appendChild(alreadySignedUpNode);

                    document.getElementById(snap.key).replaceChild(alreadySignedUp, document.getElementById("signUpButton" + snap.key)); //if the user has signed up, replaces the button with "already signed up"
                }
            });

            button.addEventListener('click', function (e) {

                sessionStorage.sesTitle = snap.val().Name; //handles clicking on the signup button
                window.location.href = "eventPage.html"
            });

        });



        firebase.database().ref().child("Events").on("child_removed", snap => { //handles ifan event gets removed

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
