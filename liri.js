



//At the top of the liri.js file, 
//write the code you need to grab the data from keys.js. Then store the keys in a variable.

var keys = require("./keys.js");
//console.log(keys.prueba);


// Take two arguments.
// The first will be the media search (i.e. "spotify", "my-twitter", "omdb")
var media = process.argv[2];

// The second will be the searched parameter that will be : music, movie, etc)
var parameter = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (media) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotify(parameter);
    break;

  case "movie-this":
    movie(parameter);
    break;

  case "do-what-it-says":
    dowhat();
    break;  
}

//Make it so liri.js can take in one of the following commands:

//my-tweets
//node liri.js my-tweets

function myTweets() {
//This will show your last 20 tweets and when they were created at in your terminal/bash window.

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

//client request the updated tweets and get response from twitter
  client.get('statuses/user_timeline', {count: 20, screen_name: "Perla_Tapia"}, function(error, tweets, response) {
  	//console.log("hello");
    if (error) {
      
      //log the error
      //console.log("You have an error " + error);
    
    } else {
        //console.log("Tweets");
        
        //loop through all tweets limited to 20 only
        for (var i = 0; i < tweets.length; i++) {

          //console.log(JSON.stringify(tweets,null,2)); //to change JSON to string;
    
          //console.log(tweets);
        }
      }
    });
  }


//spotify-this-song
//node liri.js spotify-this-song '<song name here>'
//This will show the following information about the song in your terminal/bash window

//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//if no song is provided then your program will default to "The Sign" by Ace of Base

//create a function for spotify-this-song and retrieve the information 
function spotify(song) {

//this song is a default if user did not request the song
song = "The Sign by Ace of Base"
if (parameter ==""){
  parameter = song;
}

//send request to spotify queryURL
var spotify = require ('spotify');

//run the request to spotify with specific song the user entered
spotify.search({ type: 'track', query: parameter }, function(err, data) {
    if ( err ) {
        //console.log('Error occurred: ' + err);
        return;
    }


    //loop through all the data requested
    //for (var i=0; i<11; i++) {

    //console.log(JSON.stringify(data, null, 2));
    //log all necessary information of the song user requested
    ////console.log("----------------------------------------------------------------");
    ////console.log("Artist: " + data.tracks.items[i].artists[0].name);
    ////console.log("Song Name: " + data.tracks.items[i].name);
    ////console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
    ////console.log("Album Name: " + data.tracks.items[i].album.name);
    ////console.log("----------------------------------------------------------------");
   // };
  });
}

//movie-this
//node liri.js movie-this '<movie name here>'
//This will output the following information to your terminal/bash window:


//create a function for movie search and retrieve the information
function movie(movieName) {

//if user leaves the movie title blank, it automatically defaults to "Mr. Nobody"
movieName = "Mr. Nobody";
if (parameter == "") {
    movieName = parameter;
}

//store the request of OMDB in variable
var request = require("request");

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

// Then create a request to the queryUrl and run a request to the OMDB API with the movie specified
request(queryUrl, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // a varible for Parse the body of the site 
    var movieinfo = JSON.parse(body);
  
  //Title of the movie.
//Year the movie came out.
//IMDB Rating of the movie.
//Country where the movie was produced.
//Language of the movie.
//Plot of the movie.
//Actors in the movie.
//Rotten Tomatoes Rating.
//Rotten Tomatoes URL.
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix! 
    //log all necessary information in command line per user request
    console.log("----------------------------------------------------------------");
    console.log("Title of the movie: " + movieinfo.Title);
    console.log("Year of the movie: " + movieinfo.Year);
    console.log("IMDB Rating of the movie: " + movieinfo.imdbRating);
    console.log("Country where the movie was produced: " + movieinfo.Country);
    console.log("Language of the movie: " + movieinfo.Language);
    console.log("Plot of the movie: " + movieinfo.Plot);
    console.log("Actors in the movie: " + movieinfo.Actors);
    console.log("Rotten Tomatoes Rating: " + movieinfo.tomatoUserRating);
    console.log("Rotten Tomatoes URL: " + movieinfo.tomatoURL);
    console.log("----------------------------------------------------------------");
    }
  });
}


//do-what-it-says
//Using the fs Node package, LIRI will take the text inside of random.txt 
//and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.

