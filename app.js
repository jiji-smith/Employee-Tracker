// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express")

// Create express app instance.
const app = express();

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// MySQL DB Connection Information
const connection = require("./db/connection");
const { inherits } = require("util");

// Initiate MySQL Connection.
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected to MySQL server as ID: ${connection.threadId}`);
  init();
});


async function init (){
    try{
        const menuAnswer = await inquirer.prompt(menuQuestion);
        console.log(menueAnswer);
    } catch(err) {
        console.log(err);
    }
}

const menuQuestion = {
    type: "list",
    name: "menuChoice",
    question: "What would you like to do?",
    choices: ["view Dept" , "Add a Dept", "Delete a Dept", "Exit"]
}




////여기 까지가 따라한거

connection.connect(err => {
    if (err) {
      throw err;
    }
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Find songs by artist",
          "Find all artists who appear more than once",
          "Find data within a specific range",
          "Search for a specific song",
          "exit"
        ]
      })
      .then(({ action }) => {
        switch (action) {
          case "Find songs by artist":
            artistSearch();
            break;

          case "Find all artists who appear more than once":
            multiSearch();
            break;

          case "Find data within a specific range":
            rangeSearch();
            break;

          case "Search for a specific song":
            songSearch();
            break;

          case "exit":
          default:
            console.log("Goodbye!");
            connection.end();
            break;
        }
      });
  }

  function artistSearch() {
    inquirer
      .prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      })
      .then(({ artist }) => {
        const query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist }, (err, res) => {
          if (err) {
            throw err;
          }
          for (let i = 0; i < res.length; i++) {
            console.log(`Position: ${res[i].position} || Song: ${res[i].song} || Year: ${res[i].year}`);
          }
          runSearch();
        });
      });
  }

  function multiSearch() {
    const query = "SELECT artist FROM top5000 GROUP BY artist HAVING COUNT(*) > 1";
    connection.query(query, (err, res) => {
      if (err) {
        throw err;
      }
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      runSearch();
    });
  }

  function rangeSearch() {
    inquirer
      .prompt([
        {
          name: "start",
          type: "input",
          message: "Enter starting position: ",
          validate: value => isNaN(value) === false
        },
        {
          name: "end",
          type: "input",
          message: "Enter ending position: ",
          validate: value => isNaN(value) === false
        }
      ])
      .then(({ start, end }) => {
        const query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
        connection.query(query, [start, end], (err, res) => {
          if (err) {
            throw err;
          }
          for (let i = 0; i < res.length; i++) {
            const song = res[i];
            console.log(`Position: ${song.position} || Song: ${song.song} || Artist:  ${song.artist} || Year: ${song.year}`);
          }
          runSearch();
        });
      });
  }

  function songSearch() {
    inquirer
      .prompt({
        name: "title",
        type: "input",
        message: "What song would you like to look for?"
      })
      .then(({ title }) => {
        connection.query("SELECT * FROM top5000 WHERE ?", { song: title }, (err, res) => {
          if (err) {
            throw err;
          }
          const result = res[0];
          console.log(`Position: ${result.position} || Song: ${result.song} || Artist:  ${result.artist} || Year: ${result.year}`);
          runSearch();
        });
      });
  }

