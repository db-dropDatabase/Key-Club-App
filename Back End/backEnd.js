 
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


    document.getElementById('subButton').addEventListener("click", function() {

        var name = document.getElementById('eventName').value;
        var disc = document.getElementById('eventDisc').value;
        var date = document.getElementById('eventDate').value;

        var event = {

        	Name: name,
        	Discription: disc,
        	Datetime: date
        };

        firebase.database().ref().child('Events').push(event);
    })

