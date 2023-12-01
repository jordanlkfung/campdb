CREATE DATABASE `campDataBase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE campDataBase;
CREATE TABLE JOB_POSITIONS(
	pos_id INT NOT NULL,
	title varchar(32) NOT NULL,
    job_des varchar(128) NULL,
    hourly_pay DECIMAL(2) NOT NULL,
    max_weekly_hours INT NULL,
    PRIMARY KEY(pos_id)
);
CREATE TABLE EMPLOYEES(
	id INT NOT NULL,
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    address varchar(128) NULL,
    city varchar(17) NULL,
    zip INT NULL,
    position_id INT NOT NULL,
    phone varchar(10) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar(128) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (position_id) REFERENCES JOB_POSITIONS(pos_id)
);
CREATE TABLE PARENT(
	id INT NOT NULL,
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    password varchar(128) NOT NULL,
    phone varchar(10) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE CHILD(
	id INT NOT NULL,
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE PARENT_CHILDREN(
	parent_id INT NOT NULL,
    child_id INT NOT NULL,
    PRIMARY KEY(parent_id, child_id),
    FOREIGN KEY (parent_id) REFERENCES PARENT(id),
    FOREIGN KEY(child_id) REFERENCES  CHILD(id)
);
CREATE TABLE ADDRESSES(
	id INT NOT NULL,
	city varchar(32) NOT NULL,
    state varchar(2) NOT NULL,
    zip INT NOT NULL,
    address varchar(64) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE CAMP_LOCATIONS(
	location_id INT NOT NULL,
    location_description varchar(128),
    address_id INT NOT NULL,
    PRIMARY KEY(location_id),
    FOREIGN KEY (address_id) REFERENCES ADDRESSES(id)
);
CREATE TABLE CAMP(
	id INT NOT NULL,
    camp_name varchar(64) NOT NULL,
    camp_boss INT NOT NULL,
    camp_location INT NOT NULL,
    min_age INT NULL,
    max_age INT NULL,
    cost FLOAT NOT NULL,
    current_capacity INT NULL,
    max_capacity INT NOT NULL,
    start_date date,
    end_date date,
    start_time time,
    end_time time,
    PRIMARY KEY(id),
    FOREIGN KEY (camp_location) REFERENCES CAMP_LOCATIONS(location_id)
);
CREATE TABLE CAMP_CAMPERS(
	camper_id INT NOT NULL,
    camp_id INT NOT NULL,
    PRIMARY KEY(camper_id, camp_id),
    FOREIGN KEY(camp_id) REFERENCES CAMP(id)
);
CREATE TABLE CAMP_STAFF(
	emp_id INT NOT NULL,
    camp_id INT NOT NULL,
    PRIMARY KEY(emp_id, camp_id),
    FOREIGN KEY(emp_id) REFERENCES EMPLOYEES(id),
    FOREIGN KEY(camp_id) REFERENCES CAMP(id)
);
CREATE VIEW ASSISTANTS AS
SELECT first_name, last_name, phone, email
FROM EMPLOYEES
WHERE position_id ='3264';
CREATE VIEW CAMPSATGYM AS
SELECT camp_name
FROM CAMP
WHERE camp_location = 0;
    