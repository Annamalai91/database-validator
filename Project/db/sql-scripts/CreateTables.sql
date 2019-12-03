use tcs;

CREATE TABLE Employee (
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