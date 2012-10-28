
var searchStrings = [
	'Taco Bell sick', 
	'Taco Bell vomit', 
	'taco bell sick',  
	'Taco bell sick',
	'sick taco bell',
	'vomit taco bell',
	'vomit Taco Bell',
	'taco bell vomit',
	'Taco Bell shit',
	'Taco Bell shits',
	'taco bell shit',
	'taco bell diarrhea',
	'Taco Bell diarrhea'
];

var express = require('express'),
    twitter = require('ntwitter'),
    twitSearch = require('node-twitter');


var app = express.createServer(express.logger()),
    port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('HELLO WORLD');
});

app.listen(port, function() {
  console.log("Listening on " + port);
});



var twit = new twitter({
  consumer_key: 		'4tAm43gekQCdSwxZnEbEQ',
  consumer_secret: 		'q41sTpAg8Ci1ENXJU3jkkC4EQIu2mGqEIyWzHnSE',
  access_token_key: 	'772725366-z9MefWFxhgxkxQC6CP6VUM8BU2ClIFIMzE4eoqZi',
  access_token_secret: 	'1pTCKtURxQOrrfntHfkrWG0KVAHwa4lJESDjjCTow4'
});



var twitterStreamClient = new twitSearch.StreamClient(
	'4tAm43gekQCdSwxZnEbEQ',
	'q41sTpAg8Ci1ENXJU3jkkC4EQIu2mGqEIyWzHnSE',
	'772725366-z9MefWFxhgxkxQC6CP6VUM8BU2ClIFIMzE4eoqZi',
	'1pTCKtURxQOrrfntHfkrWG0KVAHwa4lJESDjjCTow4'
);


twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('tweet', function(tweet) {
	
	var the_id = tweet.id_str;
	var text = tweet.text;
	var username = tweet.user.screen_name;
	
	twit
		.verifyCredentials(function (err, data) {
			if (err) {
				console.log("Error verifying credentials: " + err);
				process.exit(1);
			}
			//console.log(data);
		})
		.retweetStatus(tweet.id_str, function(err, data){
			if (err) console.log('Tweeting failed: ' + err);
			else console.log('Success!');
		});
		

});

twitterStreamClient.start(searchStrings);






