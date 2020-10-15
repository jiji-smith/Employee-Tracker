const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = console.table;


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db.sql"
});


connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as Id" + connection.threadId)

    runSearch();
});

function runSearch() {

    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Dept",
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
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            runSearch()
        })
};


function addDept() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name
            },
            function (err) {
                if (err) throw err
                console.table(res);
                runSearch();
            }
        )
    })
}









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



