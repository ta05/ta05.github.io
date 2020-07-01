CREATE DATABASE business_db IF NOT EXISTS;

use business_db;

CREATE TABLE department IF NOT EXISTS (
    id INT PRIMARY KEY NOT NULL,
    `name` VARCHAR(30) NOT NULL
);

CREATE TABLE `role` IF NOT EXISTS (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT
);

CREATE TABLE employee IF NOT EXISTS (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);
