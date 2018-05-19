// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAFPBdpAU_vsV1VGg4aFrlFlHjdcJhFtTo",
    authDomain: "train-schedule-6c20a.firebaseapp.com",
    databaseURL: "https://train-schedule-6c20a.firebaseio.com",
    storageBucket: "train-schedule-6c20a.appspot.com",
    messagingSenderId: "1015247756810"
};

firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val(), "hh:mm").format("X");
  var trainMin = $("#min-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    min: trainMin
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.min);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#min-input").val("");
});

// 3. Create Firebase event for adding train to the database 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainMin = childSnapshot.val().min;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(trainMin);

  // Train start
  var trainTime = moment.unix(trainTime).format("hh:mm");

  // Calculate 
  var trainMin = moment().diff(moment(trainTime, "X"), "minutes");
  console.log(trainMin);

  // Calculate 
  var minAway = trainTime * trainMin;


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainMin + "</td><td>" + trainTime + "</td><td>" );
});