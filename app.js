const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = console.table;


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
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
                "View Employees",
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
                case "View Employees":
                    console.log("Running get all Employees");
                    employeeSearch();
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
    connection.query("SELECT * FROM Depts",
        function (err, res) {
            if (err) throw err
            console.table(res)
            runSearch()
        })
};

function employeeSearch() {
    connection.query("SELECT Employees.first_name, Employees.last_name, Depts.name AS Department FROM Employees JOIN Roles ON Employees.role_id = Roles.role_id JOIN Depts ON Roles.dept_id = Depts.dept_id ORDER BY Employees.employee_id",
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
            "INSERT INTO Depts SET ? ",
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

function deleteDept() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department id would you like to delete?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "DELETE FROM Depts WHERE dept_id=?", [{
                dept_id: res.answer
            }], function (err) {
                if (err) throw err
                console.table(res);
                runSearch();
            }
        )
    })
}



//"Delete a Dept" : 1 . asuumption : user knows all the id >>> 2. how can I not use ID





//-----------I waana try with this code later-------------//
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



