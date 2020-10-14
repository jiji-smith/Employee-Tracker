-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Created the DB "employee_tracker_db" (only works on local connections)
CREATE DATABASE employee_tracker_db;

-- Use the DB employee_tracker_db for all the rest of the script
USE employee_tracker_db;

-- Created the tables ""
CREATE TABLE Depts (
  dept_id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(dept_id)
);

CREATE TABLE Roles (
  role_id int AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  dept_id int,
  PRIMARY KEY(role_id),
  FOREIGN KEY(dept_id) REFERENCES Depts(dept_id)
  );

CREATE TABLE Employees (
  employee_id int AUTO_INCREMENT NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  manager_id int NULL,
  Role_id int,
  PRIMARY KEY(employee_id),
  FOREIGN KEY(role_id) REFERENCES Roles(role_id)
  );

-- Insert Data

INSERT INTO Depts (name)
VALUES
("HR"),
("Procurement"),
("Logistics"),
("Engineering"),
("Security"),
("Food")
;

INSERT INTO Roles (title, salary, Dept_id)
VALUES
("Manager", 85000, 1),
("Purchasing specialist", 60000, 2),
("Dispatcher", 55000, 3),
("Staff Engineer", 150000, 4),
("Director", 78000, 5);
("Chef", 65000, 6);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES
("Jia", "Smith",1, null),
("Alex", "B", 2, null),
("Dragon", "C", 3, null),
("Ellie", "D", 4, null),
("Fink", "S", 5, null);
("Sola", "J", 6, null);