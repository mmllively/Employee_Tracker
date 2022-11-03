const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'rootroot',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  ); 
db.connect(function(err){
if (err){
    throw err;
} startQuestions();
});

function startQuestions() {
    inquirer
      .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
            name: "choice",
        },
      ])
      .then((answer) => {
        if (answer.choice === "view all departments") {
          viewDepartments();
        } else if (answer.choice === "view all roles") {
          viewRoles();
        } else if (answer.choice === "view all employees"){
          viewEmployees();
        } else if (answer.choice === "add a department"){
            addDept();
        } else if (answer.choice === "add a role"){
            addRole();
        } else if (answer.choice === "add an employee"){
            addEmployee();
        } else {
            updateEmployee();
        }
      });
    }

   function viewDepartments() {

    db.query('SELECT id, name FROM department', function (err, results) {
        if (err){
            throw err;
        }console.table(results);
        startQuestions();
      });
      
   }

   function  viewRoles() {

    db.query('SELECT id, title, salary, department_id FROM role', function (err, results) {
        if (err){
            throw err;
        }console.table(results);
        startQuestions();
      });
      
   }


   function  viewEmployees() {

    db.query('SELECT id, first_name, last_name, role_id, manager_id FROM employee', function (err, results) {
        if (err){
            throw err;
        }console.table(results);
        startQuestions();
      });
      
   }
    
    
   function addDept() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
      },
    
    ])
    .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.name];

        db.query(sql, params, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });
      
   }
    
    

   function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "role_name",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the name of the department for this role?",
        name: "department_name",
      },
    
    
    ])
    .then((answer) => {
        const sqlR = `INSERT INTO role (name) VALUES (?)`;
        const paramsR = [answer.role_name, answer.salary, answer.department_name];

        db.query(sqlR, paramsR, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });
      
   }


   function addEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastname",
      },
      {
        type: "input",
        message: "What is their role?",
        name: "role",
      },
      {
        type: "input",
        message: "Who is their manager?",
        name: "manager",
      },
    
    
    ])
    .then((answer) => {
        const sqlE = `INSERT INTO employee (name) VALUES (?)`;
        const paramsE = [answer.firstname, answer.lastname, answer.role, answer.manager];

        db.query(sqlE, paramsE, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });
      
   }










    
   function  updateEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "update",
      },

      {
        type: "input",
        message: "What is their new role?",
        name: "role",
      },
    
    ])
    .then((answer) => {
        const sql2 = `UPDATE employee SET WHERE VALUES (?)`;
        const params2 = [answer.name];

        db.query(sql2, params2, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });

    //   const sql2 = `UPDATE *, `

    // db.query('UPDATE *, first_name, last_name, role_id, manager_id SET employee WHERE', function (err, results) {
    //     if (err){
    //         throw err;
    //     }console.table(results);
    //     startQuestions();
    //   });
      
   }
   