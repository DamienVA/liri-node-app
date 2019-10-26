const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment')

module.exports = {
    async Movies(answers) {
      const url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + answers
      const {data} = await axios.get(url)
    
      const {Title} = data
      const {Year} = data
      const {Country} = data
      const imdbRate = data.Ratings[0].Value
      const rtRate = data.Ratings[1].Value
      const {Language} = data
      const {Plot} = data
      const {Actors} = data
      const str = `---------------------------
      Title: ${Title}
      Year: ${Year}
      Country: ${Country}
      IMDB: ${imdbRate}
      Rotten Tomato: ${rtRate}
      Language: ${Language}
      Plot: ${Plot}
      Actors: ${Actors}
      `
      console.log(str)
  },
    async Spotify(answers) {
      await spotify.search({ type: 'track', query: answers }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      const trackname = data.tracks.items[0].name;
      const artist = data.tracks.items[0].artists[0].name;
      const album = data.tracks.items[0].album.name;
      const preview = data.tracks.items[0].preview_url;
      const str = `---------------------------
      Title: ${trackname}
      Artist: ${artist}
      Album: ${album}
      Preview: ${preview}
      `
      console.log(str); 
      });
},
    async Bands(answers) {
      const url = 'https://rest.bandsintown.com/artists/' + answers +'/events?app_id=codingbootcamp'
      const {data} = await axios.get(url)

      const vName = data[0].venue.name;
      const vCity = data[0].venue.city;
      const vRegion = data[0].venue.region
      const vCountry = data[0].venue.country;
      const date = moment(data[0].datetime).format('MMM Do YYYY');
      const str = `---------------------------
      Venue Name: ${vName}
      Venue Region, Country: ${vRegion}, ${vCountry}
      venue City: ${vCity}
      Date: ${date}
      `
      console.log(str);
},
};

