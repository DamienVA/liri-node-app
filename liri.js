require("dotenv").config();

const inquirer = require('inquirer');
const keys = require("./keys.js");
const api = require('./api');
const switchCase = require('./switchCase');

const spotify = keys.spotify

function getUserInput() {
  return inquirer.prompt([
    {
      name: 'type',
      message: 'What do you want to search?',
      type: 'list',
      choices: ['movie', 'song', 'concert'],
      default: 'song',
    },
    {
      name: 'subject',
      message: 'Enter your search',
    },
  ]);
}

function run() {
  getUserInput()
      .then(switchCase);
      
}
run();
