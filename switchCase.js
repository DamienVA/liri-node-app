const api = require('./api');
const inquirer = require('inquirer');
const fs = require('fs');
 async function switchCase(answers, data) {
    switch (answers.type) {
      case 'movie':
        const movie = data ? {subject: data,} : await userInput();
        api.Movies(movie.subject);
        break;
      case 'song':
        const song = data ? {subject: data,} : await userInput();
        api.Spotify(song.subject);
        break;
      case 'concert':
        const band = data ? {subject: data,} : await userInput();
        api.Bands(band.subject);
        break;
      case 'do-it':
        doWhatItSays();
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

  async function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
      var dataArr = data.split(",");
      const answers = {
        type: dataArr[0],
      }
      console.log(dataArr[1])
      switchCase(answers, dataArr[1]);
    });
  };
  
  module.exports =(answers, data) => switchCase(answers, data);
