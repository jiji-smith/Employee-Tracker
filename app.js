// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express")

// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// MySQL DB Connection Information
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db"
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
  connection.query("SELECT * FROM Depts", (err, result) => {
    if (err) {
      throw err;
    }

