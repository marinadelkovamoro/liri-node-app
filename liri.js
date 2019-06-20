require("dotenv").config();
const fs = require('fs');
const moment = require('moment');



// pull the dependencies 
const axios = require("axios");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

var userCommand = process.argv[2];

var fetchMovies = function () {
  if (!movieName) {
    movieName = "Mr. Nobody"
  }
  axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      // console.log(response.data);
      function movieOutput() {
        const movie = response.data;
        console.log("\nThe title of the movie is " + movie.Title);
        console.log("The year this movie was released is " + movie.Year);
        console.log("IMDB rating of this movie: " + movie.imdbRating);
        console.log("The country where the movie was produced is: " + movie.Country);
        console.log("Language(s) of the movie: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors in the movie: " + movie.Actors);
        //check if Rotten Tomatoes rating exists for the movie
        if (movie.Ratings[1]) {
          const rottenTomatoesRating = movie.Ratings[1].Value;
          console.log("The Rotten Tomatoes Rating of the movie is: " + rottenTomatoesRating);
        } else {
          console.log("Sorry, Rotten Tomatoes rating is not available for this movie")
        }
      }
      movieOutput();
    });
}

const spotify = new Spotify(keys.spotify);
var song = process.argv.slice(3).join(" ");

function spotifySong() {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    // console.log("Spotify is working");
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items);
    var tracks = data.tracks.items;
    for (var i = 0; i < tracks.length; i++) {
      const songName = tracks[i].name;
      console.log("\nSong name: " + songName);
      const artistName = tracks[i].album.artists[0].name;
      console.log("Artist name: " + artistName);
      const previewLink = tracks[i].preview_url;
      console.log("Here is a preview link: " + previewLink);
      const album = tracks[i].album.name;
      console.log("Album: " + album);
    }
  });
}


if (userCommand === "movie-this") {
  var movieName = process.argv.slice(3).join(" ");

  // If the user doesn't type in a movie, the program will output data for the movie 'Mr. Nobody.'

  fetchMovies();

} else if (userCommand === "spotify-this-song") {

  // If no song is provided then your program will default to "The Sign" by Ace of Base.
  if (!song) {
    song = "The Sign"
  }
  spotifySong(song);
} else if (userCommand === "concert-this") {
  var artistName = process.argv.slice(3).join(" ");

  axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // console.log(response.data);
      var concert = response.data;
      for (var i = 0; i < concert.length; i++) {
        // Name of the venue
        console.log("\nVenue name: " + concert[i].venue.name);
        // Venue location
        console.log("Location: " + concert[i].venue.city);
        // Display the Date of the Event (use moment to format this as "MM/DD/YYYY")
        var date = moment(concert[i].datetime);
        var formattedDate = date.format('YYYY MM DD');
        console.log("Date: " + formattedDate);
      }
    });
} else if (userCommand === "do-what-it-says") {
  // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  var readSong = function () {
    fs.readFile('random.txt', "utf8", function (error, data) {

      console.log(data);
      var output = data.split(",");
      // console.log(output[1]);
      if (output[0] === "spotify-this-song") {
        song = output[1];
        console.log(song);
        spotifySong();
      } else if (output[0] === "movie-this") {
        movieName = output[1];
        fetchMovies();
      }

    });
  }
  readSong();

}


















// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.


// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file. 
// Do not overwrite your file each time you run a command.
// As always, we grab the fs package to handle read/write.
// var fs = require("fs");

// // Next, we store the text given to us from the command line.
// var text = process.argv[2];

// // Next, we append the text into the "sample.txt" file.
// // If the file didn't exist, then it gets created on the fly.
// fs.appendFile("log.txt", text, function (err) {

//     // If an error was experienced we will log it.
//     if (err) {
//         console.log(err);
//     }
//     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//         console.log("Content Added!");
//     }
// });



// // deposit an amount 
// if (process.argv[2] === "deposit") {
//     var text = ", " + process.argv[3];
//     fs.appendFile("bank.txt", text, function (err) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("You have deposited " + process.argv[3] + " in your bank account!");
//         }
//     })
// }

