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
    db.query("SELECT * FROM department", function (err, results){
      if (err){
        throw err;
    }
console.log(results);
    let departmentChoices = results.map((department)=>{
      return {
        name: department.name,
        value: department.id
      }
    }) 
    console.log(departmentChoices);
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
        type: "list",
        message: "What is the name of the department for this role?",
        name: "department_id",
        choices: departmentChoices,
      },
    
    
    ])
    .then((answer) => {
      console.log(answer);
        const sqlR = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        const paramsR = [answer.role_name, answer.salary, answer.department_id];

        db.query(sqlR, paramsR, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });
      });
   }


   function addEmployee() {
    db.query("SELECT * FROM role", function (err, results){
      if (err){
        throw err;
      }
      let roleChoices = results.map((role)=>{
        return {
          name: role.title,
          value: role.id
        }
      });

      db.query("SELECT * FROM employee", function (err, results){
        if (err){
          throw err;
        }
        let managerChoices = results.map((manager)=>{
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id
          }
        })
      
   

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
        type: "list",
        message: "What is their role?",
        name: "role",
        choices: roleChoices,
      },
      {
        type: "list",
        message: "Who is their manager?",
        name: "manager",
        choices: managerChoices,
      },
    
    
    ])
    .then((answer) => {
      console.log(answer);
        const sqlE = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const paramsE = [answer.firstname, answer.lastname, answer.role, answer.manager];

        db.query(sqlE, paramsE, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
        });
      });
    });
   }
    
   function  updateEmployee() {
    db.query("SELECT * FROM employee", function (err, results){
      if (err){
        throw err;
      }
      let employeeChoices = results.map((updateEmployee)=>{
        return {
          name: updateEmployee.first_name + " " + updateEmployee.last_name,
          value: updateEmployee.id
        }
      })
   
    inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "update",
        choice: 
      },

      {
        type: "list",
        message: "What is their new role?",
        name: "role",
      },
    
    ])
    .then((answer) => {
        const sql2 = `UPDATE employee SET role_id = ${answer.role} WHERE employee.id = ${answer.update}`;

        db.query(sql2, function (err, results) {
            if (err){
                throw err;
            }console.table(results);
            startQuestions();
          });
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
   