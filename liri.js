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
  var song = process.argv.slice(3).join(" ");

  const spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items);

    var tracks = data.tracks.items;
    for (var i = 0; i < tracks.length; i++) {
      // display song's name
      const songName = tracks[i].name;
      console.log("\nSong name: " + songName);
      // display artists
      const artistName = tracks[i].album.artists[0].name;
      console.log("Artist name: " + artistName);
      // display a preview link of the song from Spotify
      const previewLink = tracks[i].preview_url;
      console.log("Here is a preview link: " + previewLink);
      // display the album that the song is from
      const album = tracks[i].album.name;
      console.log("Album: " + album);
    }
  });
}


// // You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     .then(function (response) {
//         console.log(response.data);

//         // IF node liri.js concert-this <artist/band name here>
//         // THEN THE APP SHOULD RETURN THIS DATA FROM THE API: Name of the venue, Venue location, Date of the Event (use moment to format this as "MM/DD/YYYY")
//         if (userCommand === "concert-this") {
//             console.log(response.data.VENUENAME, response.data.VENUELOVATION, response.data.DATEOFEVENT);
//         }
//         // IF node liri.js spotify-this-song '<song name here>'
//         // THEN it will show the following information about the song in your terminal/bash window
//         // Artist(s)
//         // The song's name
//         // A preview link of the song from Spotify
//         // The album that the song is from
//         if (userCommand === "spotify-this-song '<song name>'") {
//             console.log(response.data.ARTIST, response.data.SONGNAME, response.data.PREVIEWLINK, response.data.ALBUM);
//         }
//         // If no song is provided then your program will default to "The Sign" by Ace of Base.
//         if (userCommand === "") {
//             console.log(response.data.TheSign, response.data.AceOfBase);
//         }
//     });



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

