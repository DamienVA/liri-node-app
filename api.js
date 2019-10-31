const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs = require('fs');
module.exports = {
  async Movies(answers) {
    try {
      const url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + answers
      const { data } = await axios.get(url)
      console.log(answers);
      const { Title, Year } = data
      const { Country } = data
      const imdbRate = data.Ratings[0].Value
      const rtRate = data.Ratings[1].Value
      const { Language } = data
      const { Plot } = data
      const { Actors } = data
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
      fs.appendFile('log.txt', str, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    } catch (err) { console.log(answers + 'is not a valid search') }
  },
  async Spotify(answers) {
    try {
      await spotify.search({ type: 'track', query: answers }, function (err, data) {
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
        fs.appendFile('log.txt', str, (err) => {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      });
    } catch (err) { console.log(answers + 'is not a valid search') }
  },
  async Bands(answers) {
    const url = 'https://rest.bandsintown.com/artists/' + answers + '/events?app_id=codingbootcamp'
    const { data } = await axios.get(url)

    const vName = data[0].venue.name;
    const vCity = data[0].venue.city;
    const vRegion = data[0].venue.region
    const vCountry = data[0].venue.country;
    const date = moment(data[0].datetime).format('MMM Do YYYY');
    const str = `---------------------------
      Venue Name: ${vName}
      Venue Country: ${vCountry}
      Venue City, State: ${vCity}, ${vRegion}
      Date: ${date}
      `
    console.log(str);
    fs.appendFile('log.txt', str, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  },
};

