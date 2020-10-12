// NOTE: Don't forget to create the DB schema before running this code!

// Dependencies
const express = require("express");
const mysql = require("mysql");

// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "4Nm2&&lt4Vho",
  database: "wizard_schools_db"
});

// Initiate MySQL Connection.
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected to MySQL server as ID: ${connection.threadId}`);
});

// Routes
app.get("/", (req, res) => {
  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM schools", (err, result) => {
    if (err) {
      throw err;
    }
    // We then begin building out HTML elements for the page.
    let html = "<h1> Magical Schools </h1>";

    // Here we begin an unordered list.
    html += "<ul>";
    // The above line is the same as: html = html + "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (let i = 0; i < result.length; i++) {
      html += `<li><p> ID: ${result[i].id}</p>`;
      html += `<p>School: ${result[i].name}</p></li>`;
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});