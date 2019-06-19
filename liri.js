require("dotenv").config();

// pull the dependencies 
const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

var userCommand = process.argv[2];

if (userCommand === "movie-this") {

  var movieName = process.argv[3];

  // If the user doesn't type in a movie, the program will output data for the movie 'Mr. Nobody.'
  if (!movieName) {
    movieName = "Mr. Nobody"
  }
  axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      console.log(response.data);
      // IF node liri.js movie-this '<movie name here>'
      // THEN it will output the following information to your terminal/bash window:
      function movieOutput() {
        console.log("The title of the movie is " + response.data.Title);
        console.log("The year this movie was released is " + response.data.Year);
        console.log("IMDB rating of this movie: " + response.data.imdbRating);
        // add a line of code to check for Rotten Tomatoes rating - if it exists in the object OR I can go to the API's docs and see if there is such thing for each movie, etc.
        console.log("The Rotten Tomatoes Rating of the movie is: " + response.data.Ratings[1].Value);
        console.log("The country where the movie was produced is: " + response.data.Country);
        console.log("Language(s) of the movie: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors in the movie: " + response.data.Actors);
      }
      movieOutput();
    });

} else if (userCommand === "concert-this") {
  var artistName = process.argv[3];

  axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response)
      // Name of the venue
      // Venue location
      // Date of the Event (use moment to format this as "MM/DD/YYYY")
    });
} else if (userCommand === "spotify-this-song") {
  var songName = process.argv.slice(3).join(" ");

  const spotify = new Spotify(keys.spotify);
 

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items);
  });
  
}


