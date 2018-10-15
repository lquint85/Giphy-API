
    //RENDER BUTTON FROM ARRAY\\

    // Initial array of movies
    var topics = ["space", "launch", "satellite", "astronaut", ];

    // Generic function for capturing the movie name from the data-attribute
    function alertMovieName() {
        var topicName = $(this).attr("data-name");

        alert(topicName);
    }

    // Function for displaying movie data
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
            spacebutton.addClass("movie");
            // Adding a data-attribute
            spacebutton.attr("data-name", topics[i]);
            // Providing the initial button text
            spacebutton.text(topics[i]);
            // Adding the button to the HTML
            $("#buttons-view").prepend(spacebutton);
            spacebutton.hide()
                .toggle(3000)
                .show(3000);
        }
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

    });

    // Function for displaying the movie info
    // We're adding a click event listener to all elements with the class "movie"
    // We're adding the event listener to the document because it will work for dynamically generated elements
    // $(".movies").on("click") will only add listeners to elements that are on the page at that time
    $(document).on("click", ".topic", alertMovieName);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();


    // BUTTON ACTION (NOT YET WORKING)

    // Adding click event listener to all buttons
    $("button").on("click", function () {

        // Grabbing and storing the data-animal property value from the button
        var topic = $(this).attr("topics");
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BdfguUwK9PdlLIUGhOp0zoLr4FUlIClu&q=" +
            animal + "&limit=2&offset=0&rating=G&lang=en";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .then(function (response) {

                //console.log(queryURL);
                console.log(response);
                // storing the data from the AJAX request in the results variable
                //make a variable called results and set it equal to response.data
                var results = (response.data);

                var rating = results[i].rating;
            })
        // make a for loop that will iterate through the results array
        for (var i = 0; i < results.length; i++) {}
    });
