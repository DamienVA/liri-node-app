const api = require('./api');

module.exports = function switchCase(answers) {
    switch (answers.type) {
      case 'movie':
        api.Movies();
        break;
      case 'song':
        api.Spotify();
        break;
      case 'concert':
        api.Bands()
    }
  };
