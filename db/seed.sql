INSERT INTO department (department_name)
VALUES ('Software');
INSERT INTO department (department_name)
VALUES ('Looney Bin');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Lead', 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Finding Neemo', 1000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Looney Lead', 900000, 2);

-- Employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Uncle', 'Sam', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Billy', 'Thomas', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jolly', 'Green', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sam', 'Wise', 2, 1);



INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Willy', 'Wonka', 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maddam', 'MadMan', 3, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Old', 'Yeller', 3, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Uncle', 'Sam', 3, 5);