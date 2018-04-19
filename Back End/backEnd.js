 
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
        console.log(date);


        var event = {

        	Name: name,
        	Discription: disc,
        	Datetime: date,
            Participants: {token: 'token'}
        };

        firebase.database().ref().child('Events').push(event);
        
    })

    firebase.database().ref().child("Events").on("child_added", snap => {


        console.log(snap.val());

        var eventBox = document.createElement("div");
        eventBox.id = "'" + snap.key + "'";

        var name = document.createElement("h3");
        var nameNode = document.createTextNode(snap.val().Name);
        name.appendChild(nameNode);

        var disc = document.createElement("h4");
        var discNode = document.createTextNode(snap.val().Discription);
        disc.appendChild(discNode);

        var date = document.createElement("h4");
        var dateNode = document.createTextNode(snap.val().Datetime);
        date.appendChild(dateNode);

        var participantDiv = document.createElement("div");

        firebase.database().ref().child("Events").child(snap.key).child("Participants").on("child_added", snap => {

            var personName = document.createElement("h5");
            var personNode = document.createTextNode(snap.val());
            personName.appendChild(personNode);
            participantDiv.appendChild(personName);
        });


        eventBox.appendChild(name);
        eventBox.appendChild(disc);
        eventBox.appendChild(date);
        eventBox.appendChild(participantDiv);

        document.getElementById("eventDiv").appendChild(eventBox);

    });

    firebase.database().ref().on("child_removed", snap => {

        document.getElementById(snap.key).remove;
    });

