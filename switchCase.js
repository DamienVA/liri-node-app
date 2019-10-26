const api = require('./api');
const inquirer = require('inquirer');
module.exports = async function switchCase(answers) {
    switch (answers.type) {
      case 'movie':
        const movie = await userInput();
        api.Movies(movie.subject);
        break;
      case 'song':
        api.Spotify();
        break;
      case 'concert':
        const band = await userInput();
        api.Bands(band.subject);
        break;
    }
  };

 async function userInput() {
     const answer = await inquirer.prompt([
      {
        name: 'subject',
        message: 'Enter search',
      },
    ]);
    return answer;
  };
