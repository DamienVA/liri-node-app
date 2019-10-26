const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

module.exports = {
    async Movies(answers) {
      const url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + answers
      const {data} = await axios.get(url)
    
      const {Title} = data
      const {Year} = data
      const {Country} = data
      const {Language} = data
      const {Plot} = data
      const {Actors} = data
      const str = `---------------------------
      Title: ${Title}
      Year: ${Year}
      Country: ${Country}
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
       
      console.log(data); 
      });
},
    async Bands(answers) {
      const url = 'https://rest.bandsintown.com/artists/' + answers +'/events?app_id=codingbootcamp'
      const {data} = await axios.get(url)

      const {venue} = data
    
      console.log(venue)
},
};

