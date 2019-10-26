require("dotenv").config();

const inquirer = require('inquirer');

const switchCase = require('./switchCase');


function searchFor() {
  return inquirer.prompt([
    {
      name: 'type',
      message: 'What do you want to search?',
      type: 'list',
      choices: ['movie', 'song', 'concert'],
      default: 'song',
    },
  ]);
}

function run() {
  searchFor()
      .then(switchCase);
      
}
run();
