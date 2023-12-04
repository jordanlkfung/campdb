CREATE DATABASE campDataBase;
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
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    address varchar(128) NULL,
    city varchar(17) NULL,
    zip INT NULL,
    position_id INT NOT NULL,
    phone varchar(10) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar(128) NOT NULL,
    PRIMARY KEY(email),
    FOREIGN KEY (position_id) REFERENCES JOB_POSITIONS(pos_id)
);
CREATE TABLE PARENT(
	email varchar(30) NOT NULL,
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    password varchar(128) NOT NULL,
    phone varchar(10) NOT NULL,
    PRIMARY KEY (email)
);
CREATE TABLE CHILD(
	id INT NOT NULL,
    first_name varchar(32) NOT NULL,
    last_name varchar(32) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE PARENT_CHILDREN(
	parent_email varchar(30) NOT NULL,
    child_id INT NOT NULL,
    PRIMARY KEY(parent_email, child_id),
    FOREIGN KEY (parent_email) REFERENCES PARENT(email),
    FOREIGN KEY(child_id) REFERENCES  CHILD(id)
);
CREATE TABLE CAMP_LOCATIONS(
	location_id INT NOT NULL,
    location_description varchar(128),
	city varchar(32) NOT NULL,
    state varchar(2) NOT NULL,
    zip INT NOT NULL,
    address varchar(64) NOT NULL,
    PRIMARY KEY(location_id)
);
CREATE TABLE CAMP(
	id INT NOT NULL,
    camp_name varchar(64) NOT NULL,
    camp_boss INT NOT NULL,
    camp_location INT NOT NULL,
    max_capacity INT NOT NULL,
    start_date date,
    end_date date,
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
    emp_email varchar(64) NOT NULL,
    camp_id INT NOT NULL,
    PRIMARY KEY(emp_email, camp_id),
    FOREIGN KEY(emp_email) REFERENCES EMPLOYEES(email),
    FOREIGN KEY(camp_id) REFERENCES CAMP(id)
);
CREATE VIEW CAMPER_PARENTS AS
SELECT 
    CHILD.first_name AS child_first_name,
    CHILD.last_name AS child_last_name,
    CAMP.camp_name,
    PARENT.first_name AS parent_first_name,
    PARENT.last_name AS parent_last_name 
FROM CHILD 
INNER JOIN CAMP_CAMPERS ON CHILD.id = CAMP_CAMPERS.camper_id 
INNER JOIN CAMP ON CAMP_CAMPERS.camp_id = CAMP.id 
INNER JOIN PARENT_CHILDREN ON CHILD.id = PARENT_CHILDREN.child_id 
INNER JOIN PARENT ON PARENT_CHILDREN.parent_email = PARENT.email;

