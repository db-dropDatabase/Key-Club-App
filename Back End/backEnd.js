 
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

        var event = document.getElementById('events').value;
        firebase.database().ref().push(event);
    })

