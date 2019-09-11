require("dotenv").config()
const express = require("express");
const hbs = require("hbs");
// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: "f8ee4bc97e244de9819e319c46afb888",
    clientSecret: "fe4826866c934916bafdab5f35cf8149"
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch(error => {
        console.log("Something went wrong when retrieving an access token", error);
    });




// the routes go here:


app.get("/", function (req, res, next) {
    res.render("index");
});

app.get("/search", function (req, res, next) {
    console.log(req.query.artistName)
    spotifyApi
        .searchArtists()
        .then(data => {
            console.log(data)
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('index', { artist: data.body.artists.items })
        })
        .catch(err => {
            console.log("The error while searching artists occurred: ", err);
        });
});

app.get("/albums", function (req, res, next) {
    spotifyApi.getArtistAlbums().then(
        function (data) {
            console.log('Artist albums', data.body);
            res.render('albums', { albumsName: data.body.albums });
        },
        function (err) {
            console.error(err);
        }
    );
})


app.get("/index", function (req, res, next) {
    console.log('text')
    res.render('whatever', {
        stuff: [
            { name: 'The Beatles' }, { name: 'Sia' }, { name: 'eminem' }
        ]
    })
})


app.listen(3000, () => console.log("My Spotify project running on port 3000 :headphones: :drum_with_drumsticks: :guitar: :loud_sound:"));

