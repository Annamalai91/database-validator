CREATE TABLE Employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Table1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table3 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
INSERT INTO Employee(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Employee(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table1(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table1(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");


INSERT INTO Table2(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table2(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");





CREATE DATABASE IF NOT EXISTS TCS2;

GRANT ALL PRIVILEGES ON TCS2.* TO 'root' identified by 'password';

use TCS2;

CREATE TABLE Employee2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table21 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table22 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table23 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Employee2(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Employee2(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table22(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table22(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");


INSERT INTO Table23(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table23(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");




CREATE DATABASE IF NOT EXISTS TCS3;

GRANT ALL PRIVILEGES ON TCS3.* TO 'root' identified by 'password';
 
 use TCS3;


CREATE TABLE Employee3(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Table31 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table32 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table33 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO Employee3(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Employee3(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table31(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table31(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table33(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table33(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");




CREATE DATABASE IF NOT EXISTS TCS4;

GRANT ALL PRIVILEGES ON TCS4.* TO 'root' identified by 'password';

use TCS4;


CREATE TABLE Employee4(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Table41 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table42 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Table43 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    email VARCHAR(255),
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Employee4(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Employee4(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table43(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table43(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");

INSERT INTO Table42(firstname, lastname, email) VALUES ("Annamalai","Kennedi","anssdn@gmail.com");

INSERT INTO Table42(firstname, lastname, email) VALUES ("Vignesh","Kennedi","anssdn@gmail.com");


use tcs;