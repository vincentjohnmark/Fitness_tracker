CREATE DATABASE fitness_tracker;

USE fitness_tracker;

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);
