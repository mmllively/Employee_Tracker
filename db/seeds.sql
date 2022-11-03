INSERT INTO department (name)
VALUES ("Sales"),
       ("Human Resources"),
        ("Marketing"),
       ("Engineering"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Project Manager", 50000, 1 ),
        ("Sales Manager", 80000, 2 ),
        ("Engineer", 75000, 3 ),
        ("Finance/Accountant", 90000, 4 ),
        ("Marketing Dept Employee", 40000, 5 ),
        ("HR New Hires", 40000, 1 ),
       ("Sales Rep", 50000, 2 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Jones", 6, NULL),
       ("Sandra", "Lee", 3, 1),
       ("Greg", "Schulz", 2, 1),
       ("Hugh", "Parker", 4, 3),
       ("Steve", "Smith", 1, 2);

    
     