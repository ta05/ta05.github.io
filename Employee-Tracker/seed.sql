CREATE DATABASE business_db IF NOT EXISTS;

use business_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    `name` VARCHAR(30) NOT NULL
);

CREATE TABLE `role` (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);

INSERT INTO department
VALUES
    (1, "Human Resources"),
    (2, "Sales"),
    (3, "Product"),
    (4, "Marketing"),
    (5, "IT"),
    (6, "Finance"),
    (7, "Accounting");

INSERT INTO `role`
VALUES
    (21, "Sales Associate", 30000),
    (22, "Senior Sales Associate", 35000),
    (23, "Sales Manager", 42500),
    (52, "Senior Accountant", 65000),
    (53, "Accountant Manager", 72000),
    (34, "Product Manager", 68000),
    (35, "Product Director", 80000);

INSERT INTO employee
VALUES
    (293, "Boston", "Miller", 22, 228),
    (228, "Susie", "Norris", 23, null);