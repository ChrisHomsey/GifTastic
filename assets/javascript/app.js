

var travelGifs = ['Peru', 'Thailand', 'Japan', 'Mexico', 'Hong Kong'];


// Clears the buttons div and then populates it with new buttons from the travelGifs array
function makeButtons(){
	$('#buttons').empty();

	for (var i = 0; i < travelGifs.length; i++) {
		var newButton = $('<button>');
		newButton.addClass("gif-button btn btn-primary")
		newButton.text(travelGifs[i]);
		newButton.attr('data-name', travelGifs[i]);
		$('#buttons').append(newButton);
	}
}

//When search-button is clicked, add the new location to the travelGifs array and run the makeButtons() function
$('#search-button').click(function(){
	travelGifs.push($('#search-field').val());
	makeButtons();
})



// Listener in the #buttons div for any .gif-button that is clicked
$('#buttons').on('click', '.gif-button', displayGif);



// displayGif calls the function query, using the data-name attribute of the button this clicked 
function displayGif(){
	query($(this).attr('data-name'));
}

// Anytime a .gif gets clicked in the #gifs-view, it will run changeGif();
$('#gifs-view').on('click','.gif', changeGif);

// Changes the state of a gif from still to active, and vice versa
function changeGif(){
	if ($(this).attr('data-state') === 'still'){
		$(this).attr('src', $(this).attr('data-active'));
		$(this).attr('data-state', 'active');
		console.log('active');
	}else if ($(this).attr('data-state') === 'active'){
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');
		console.log('still');
	}
}

// Does our AJAX call based on the argument sent when our .gif-button was clicked and the query function was called
function query(buttonClicked) {

	var apiKey = 'aP6Fy47FRmXpwlyDMQopoPyhy7M5q1hB';
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + buttonClicked + '&limit=10' + '&api_key=' + apiKey;


	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response){

		// Empty the gif-view
		$('#gifs-view').empty();

		// Populate the gif view with dank travel gifs
		for (i = 0; i < 10; i++) {
			var div = $('<div>');
			div.addClass('gif-div col-xs-12 col-sm-6 col-md-6 col-lg-4');
			var rating = $('<h3>');
			rating.text('Rated: ' + response.data[i].rating);
			var gif = $('<img>');
			gif.attr('src', response.data[i].images.fixed_height_still.url);
			gif.addClass('gif img-responsive');
			gif.attr('data-state', 'still');
			gif.attr('data-active', response.data[i].images.fixed_height.url);
			gif.attr('data-still', response.data[i].images.fixed_height_still.url);
			console.log(gif);
			$('#gifs-view').append(div)
			div.append(rating);
			div.append(gif);
		}
		
	}).fail(function(err){
		throw err;
	})

}

// initial populating of the #buttons div
makeButtons();