

// require("dotenv").config();

// // Add the code required to import the keys.js file and store it in a variable
// var keys = require("./keys.js");

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


var userCommand = process.argv[2];

if (userCommand === "movie-this") {
    
    var movieName = process.argv[3];
    
    var axios = require("axios");
    
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // console.log(response);
            // IF node liri.js movie-this '<movie name here>'
            // THEN it will output the following information to your terminal/bash window:
            function movieOutput() {
                console.log("The title of the movie is " + response.data.Title);
                console.log("The year this movie was released is " + response.data.Year);
                console.log("IMDB rating of this movie: " + response.data.imdbRating);
                console.log("The Rotten Tomatoes Rating of the movie is: " + response.data.Ratings[0]);
                console.log("The country where the movie was produced is: " + response.data.Country);
                console.log("Language(s) of the movie: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
            }
            // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            if (movieName === "") {
                movieName = "Mr. Nobody"
                movieOutput();
            } else {
                movieOutput();
            }
        });
 
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