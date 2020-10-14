const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db.sql"
});



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
        "View Dept" ,
        "Add a Dept",
        "Delete a Dept",
        "Exit"
      ]
    })
    .then(({ action }) => {
      switch (action) {
        case "View Dept":
            console.log("Running get all Departments");
            deptSearch();
            break;
        case "Add a Dept":
            console.log("Adding a Departments");
            addDept();
            break;
        case "Delete a Dept":
            console.log("Deleting a Departments");
            deleteDept();
            break;
        case "exit":
            default:
            console.log("Goodbye!");
            connection.end();
            break;
      }
    });
}

function deptSearch() {
  inquirer
    .prompt({
      name: "dept",
      type: "list",
      message: "Choose the department"
    })
    .then(({ dept }) => {
      const query = "SELECT name FROM  WHERE Depts";
      connection.query(query, { dept }, (err, res) => {
        if (err) {
          throw err;
        }
        for (let i = 0; i < res.length; i++) {
          console.log(`id: ${res[i].dept_id} || Name: ${res[i].name}`);
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

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "title",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(({ title }) => {
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: title }, (err, res) => {
//         if (err) {
//           throw err;
//         }
//         const result = res[0];
//         console.log(`Position: ${result.position} || Song: ${result.song} || Artist:  ${result.artist} || Year: ${result.year}`);
//         runSearch();
//       });
//     });
// }












//-----------This is the code from 1:1 class : something is wrong-------------//
// const mysql = require("mysql");
// const inquirer = require("inquirer");
// const connection = require("./db/connection.js");
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected as id' + connection.threadID + '\n');
//     init();
// });



// const menuQuestion = {
//     type: "list",
//     message: "What would you like to do",
//     name: "menuChoice",
//     choices: ["View Dept" , "Add a Dept", "Delete a Dept", "Exit"]
// }

// async function init (){
//     try {
//         const menuAnswer = await inquirer.prompt(menuQuestion);
//         console.log(menuAnswer);
//         switch (menuAnswer.menuChoice){
//             case "View Dept":
//                 console.log("Running get all Departments");
//                 init();
//                 break;
//             case "Add a Dept":
//                 console.log("Adding a Departments");
//                 break;
//             case "Delete a Dept":
//                 console.log("Deleting a Departments");
//                 break;
//             case "exit":
//                 default:
//                 console.log("Goodbye!");
//                 connection.end();
//                 break;
//         }
//     } catch(err) {
//         console.log(err);
//     }
// }



