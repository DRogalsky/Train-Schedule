var firebaseConfig = {
    apiKey: "AIzaSyA7ZIV7X5PhN59xz3nbRLjh5aML2TwJwiE",
    authDomain: "train-schedule-69bce.firebaseapp.com",
    databaseURL: "https://train-schedule-69bce.firebaseio.com",
    projectId: "train-schedule-69bce",
    storageBucket: "train-schedule-69bce.appspot.com",
    messagingSenderId: "343987916486",
    appId: "1:343987916486:web:dddfbcf40410eb58"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let table = $('#trains');
let nameBox = $('#name');
let destinationBox = $('#destination');
let frequencyBox = $('#frequency');
let name = "";
let destination = "";
let frequency = "";

$('#submit').on('click', function (event) {
    event.preventDefault();
    if (nameBox.val() !== "" && destinationBox.val() !== "" && frequencyBox.val() !== "") {
        name = nameBox.val().trim();
        destination = destinationBox.val().trim();
        frequency = frequencyBox.val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency
        });
    }
});

database.ref().on('child_added', function (childSnapshot) {
    let newRow = $('<tr>');
    newRow.append($('<td>').text(childSnapshot.val().name));
    newRow.append($('<td>').text(childSnapshot.val().destination));
    newRow.append($('<td>').text(childSnapshot.val().frequency));

    table.append(newRow);
})