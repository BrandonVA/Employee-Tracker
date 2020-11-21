DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30)NOT NULL, -- to hold department name
    PRIMARY KEY(id)
);



CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL, -- to hold role title
  salary  numeric(8,2) NOT NULL, -- to hold role salary
  department_id INT NOT NULL, -- to hold reference to department role belongs to
  PRIMARY key (id)
);



CREATE TABLE employee (
   id  INT NOT NULL AUTO_INCREMENT,
   first_name  VARCHAR(30) NOT NULL, -- to hold employee first name
   last_name  VARCHAR(30) NOT NULL, -- to hold employee last name
   role_id  INT NOT NULL, -- to  hold reference to role employee has
   manager_id  INT, -- to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
   PRIMARY KEY (id)
);




