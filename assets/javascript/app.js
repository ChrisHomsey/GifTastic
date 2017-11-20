

var travelGifs = ['Peru', 'Thailand', 'Japan', 'Mexico', 'Hong Kong'];

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

$('#gifs-view').on('click','.gif', changeGif);

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

function query(buttonClicked) {

	var apiKey = 'aP6Fy47FRmXpwlyDMQopoPyhy7M5q1hB';
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + buttonClicked + '&limit=10' + '&api_key=' + apiKey;


	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response){
		$('#gifs-view').empty();

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

makeButtons();