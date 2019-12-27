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

DELIMITER $$
CREATE DEFINER=`mysql`@`localhost` PROCEDURE `EmployeeAddorEdit1`(IN `_id` INT, IN `_firstname` VARCHAR(30), IN `_lastname` VARCHAR(30), IN `_email` VARCHAR(50))
BEGIN
IF _id=0 THEN
    INSERT INTO Employee(firstname,lastname,email) 
        VALUES(_firstname,_lastname,_email);
        SET _id=LAST_INSERT_ID();
    ELSE
        UPDATE Employee
        SET
        firstname = _firstname,
        lastname = _lastname ,
        email = _email ,
        reg_date = CURRENT_TIMESTAMP()
        where id=_id;
    END IF;
    
    SELECT _id AS 'id';
END$$
DELIMITER ;


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

DELIMITER $$
CREATE DEFINER=`mysql`@`localhost` PROCEDURE `EmployeeAddorEdit1`(IN `_id` INT, IN `_firstname` VARCHAR(30), IN `_lastname` VARCHAR(30), IN `_email` VARCHAR(50))
BEGIN
IF _id=0 THEN
    INSERT INTO Employee2(firstname,lastname,email) 
        VALUES(_firstname,_lastname,_email);
        SET _id=LAST_INSERT_ID();
    ELSE
        UPDATE Employee2
        SET
        firstname = _firstname,
        lastname = _lastname ,
        email = _email ,
        reg_date = CURRENT_TIMESTAMP()
        where id=_id;
    END IF;
    
    SELECT _id AS 'id';
END$$
DELIMITER ;

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

DELIMITER $$
CREATE DEFINER=`mysql`@`localhost` PROCEDURE `EmployeeAddorEdit1`(IN `_id` INT, IN `_firstname` VARCHAR(30), IN `_lastname` VARCHAR(30), IN `_email` VARCHAR(50))
BEGIN
IF _id=0 THEN
    INSERT INTO Employee3(firstname,lastname,email) 
        VALUES(_firstname,_lastname,_email);
        SET _id=LAST_INSERT_ID();
    ELSE
        UPDATE Employee3
        SET
        firstname = _firstname,
        lastname = _lastname ,
        email = _email ,
        reg_date = CURRENT_TIMESTAMP()
        where id=_id;
    END IF;
    
    SELECT _id AS 'id';
END$$
DELIMITER ;

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

DELIMITER $$
CREATE DEFINER=`mysql`@`localhost` PROCEDURE `EmployeeAddorEdit1`(IN `_id` INT, IN `_firstname` VARCHAR(30), IN `_lastname` VARCHAR(30), IN `_email` VARCHAR(50))
BEGIN
IF _id=0 THEN
    INSERT INTO Employee4(firstname,lastname,email) 
        VALUES(_firstname,_lastname,_email);
        SET _id=LAST_INSERT_ID();
    ELSE
        UPDATE Employee4
        SET
        firstname = _firstname,
        lastname = _lastname ,
        email = _email ,
        reg_date = CURRENT_TIMESTAMP()
        where id=_id;
    END IF;
    
    SELECT _id AS 'id';
END$$
DELIMITER ;

use tcs;