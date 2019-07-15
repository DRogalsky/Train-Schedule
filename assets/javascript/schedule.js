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
let firstTimeBox = $('#firstTime')
let name = "";
let destination = "";
let frequency = "";
let firstTrain = "";

$('#submit').on('click', function (event) {
    event.preventDefault();
    if (nameBox.val() !== "" && destinationBox.val() !== "" && frequencyBox.val() !== "" & firstTimeBox !== "") {
        name = nameBox.val().trim();
        destination = destinationBox.val().trim();
        frequency = frequencyBox.val().trim();
        firstTrain = firstTimeBox.val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain
        });
    }
});



database.ref().on('child_added', function (childSnapshot) {
    let newRow = $('<tr>');
    let nextTrainTime;
    let minAway;

    function nextTrain(firstTrain, frequency) {
        let currentTime = moment();
        let firstTrainTime = moment(firstTrain, "HH:mm");
        let compareCurrent = currentTime.format("HHmm");
        let compareTrain = firstTrainTime.format("HHmm")
        if(compareCurrent < compareTrain) {
            nextTrainTime = firstTrainTime.format("hh:mm A");
            minAway = firstTrainTime.diff(currentTime, 'minutes');
        } else {
            let timePassed = currentTime.diff(firstTrainTime, "minutes");
            let timeMath = timePassed % frequency;
            timeMath = frequency - timeMath;
            minAway = timeMath;
            timeMath = currentTime.add(timeMath, 'minutes');
            nextTrainTime = timeMath.format('hh:mm A');
        }
    }

    nextTrain(childSnapshot.val().firstTrain, childSnapshot.val().frequency);

    newRow.append($('<td>').text(childSnapshot.val().name));
    newRow.append($('<td>').text(childSnapshot.val().destination));
    newRow.append($('<td>').text(childSnapshot.val().frequency));
    newRow.append($('<td>').text(nextTrainTime));
    newRow.append($('<td>').text(minAway));
    

    table.append(newRow);
})

function nextTrain(firstTime) {

}

