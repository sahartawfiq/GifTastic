window.onload = function(){
    var animals = ["cat","dog" ,"parrot","elephant","monkey","squirrel","mouse","dolphin","deer","camel","lion","giraffe","snake","sheep","cow","bull","goat","bee","rabbit","woodpecker"];
        var animalButton = [];
        for (var i = 0; i < animals.length; i++) {
            animalButton [i]= $("<button>");
            animalButton[i].text(animals[i]);
            animalButton[i].addClass("btn btn-primary btn-lg animal");
            $("#buttons").append(animalButton[i]);
        }
        
    $( "form" ).submit(function(event) {
        var input = $("input:first").val();
        console.log(input);
        var newButton = $("<button>");
        newButton.text(input);
        console.log("New Button Text:  " + input);
        newButton.addClass("btn btn-primary btn-lg animal" );
        $("#buttons").append(newButton);
        animalButton.push(newButton);
        console.log(animalButton.length);

    });

    $("#buttons").on("click", '.animal',function(){
        var currentButton = $(this).text();
        console.log("you clicked:  " +currentButton);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentButton + "&api_key=QBtdzuOs3DZZ3ws8mxbIYe3RxX4aetF4&limit=10&rating=pg";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var result = response.data;
            console.log(result);
            for (var j = 0; j < result.length; j++) {
                var rating = result[j].rating;
                var imageDiv = $("<div class= 'images'>");
                var animalImage = $("<img>");

                animalImage.addClass("gifImage");
                animalImage.attr("src", result[j].images.fixed_height_still.url);
                animalImage.attr("data-still", result[j].images.fixed_height_still.url);
                animalImage.attr("data-animate", result[j].images.fixed_height.url);
                animalImage.attr("data-state","still");

                var rateValue = $("<p>").text("Rating: " + rating);

                imageDiv.append(rateValue);
                imageDiv.append(animalImage);
                $("#animalImages").prepend(imageDiv);
            }
        });
    });
    $(document).on("click",".gifImage", function(){
        var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })
}