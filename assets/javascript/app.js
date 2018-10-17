//RENDER BUTTON FROM ARRAY and  Initial array of movies
var topics = ["space", "time", "launch",];

// Generic function for capturing the topic name from the data-attribute
function alertTopicName() {
    var topicName = $(this).attr("data-topic");

    alert(topicName);
    console.log(topicName);
}

// Function for displaying topic data
function renderButtons() {
    


    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var spacebutton = $("<button>");
        // Adding a class of movie to our button
        spacebutton.addClass("btn btn-success");
        // Adding a data-attribute
        spacebutton.attr("data-topic", topics[i]);
        // Providing the initial button text
        spacebutton.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(spacebutton);
        spacebutton.show()
        .toggle().hide().toggle(1000).show(1000);
    }
    $(".btn-success").on("click", onclick);
}


// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

})
/////////////////// BUTTON ACTION\\\\\\\\\\\\\\\\\\ 
// Adding click event listener to all buttons
function onclick() {

    // Grabbing and storing the data-topic property value from the button
    var topic = $(this).attr("data-topic");
    // "space"
    console.log("on click here");

    // Constructing a queryURL using the topic name
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BdfguUwK9PdlLIUGhOp0zoLr4FUlIClu&q=" +
        topic + "&limit=10&offset=0&rating=G&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(doSomething);
}


function doSomething(response) {

    //console.log(queryURL);
    console.log(response);
    // storing the data from the AJAX request in the results variable
    //make a variable called results and set it equal to response.data
    var results = response.data;

    // make a for loop that will iterate through the results array
    for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var topicDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        topicDiv.append(p);
        topicDiv.append(topicImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(topicDiv);

        $(".gifs").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    }
}

