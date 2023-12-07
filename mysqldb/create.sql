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

-- Inserting data into JOB_POSITIONS table
INSERT INTO JOB_POSITIONS VALUES (1, 'Camp Counselor', 'Responsible for camper supervision', 15.00, 40);
INSERT INTO JOB_POSITIONS VALUES (2, 'Activity Instructor', 'Teaches various camp activities', 20.00, 30);
INSERT INTO JOB_POSITIONS VALUES (3, 'Camp Director', 'Oversees overall camp operations', 25.00, 45);
INSERT INTO JOB_POSITIONS VALUES (4, 'Kitchen Staff', 'Prepares meals for campers and staff', 18.00, 35);
INSERT INTO JOB_POSITIONS VALUES (5, 'Lifeguard', 'Ensures water safety at the camp lake', 18.50, 35);
INSERT INTO JOB_POSITIONS VALUES (6, 'Art Instructor', 'Conducts creative art sessions for campers', 21.00, 25);
INSERT INTO JOB_POSITIONS VALUES (7, 'Adventure Guide', 'Leads outdoor expeditions and activities', 22.00, 40);
INSERT INTO JOB_POSITIONS VALUES (8, 'Camp Chef', 'Manages camp kitchen and meal preparations', 20.50, 35);

-- Inserting data into EMPLOYEES table
INSERT INTO EMPLOYEES VALUES ('John', 'Doe', '123 Main St', 'Cityville', 12345, 1, '555-1234', 'john@example.com', 'password1');
INSERT INTO EMPLOYEES VALUES ('Jane', 'Smith', '456 Oak St', 'Townburg', 54321, 2, '555-5678', 'jane@example.com', 'password2');
INSERT INTO EMPLOYEES VALUES ('Michael', 'Johnson', '789 Pine St', 'Forestville', 67890, 5, '555-3333', 'michael@example.com', 'password5');
INSERT INTO EMPLOYEES VALUES ('Emily', 'Williams', '101 Maple St', 'Riverdale', 13579, 6, '555-4444', 'emily@example.com', 'password6');
INSERT INTO EMPLOYEES VALUES ('Christopher', 'Brown', '222 Forest Ln', 'Woodsville', 54321, 7, '555-5555', 'christopher@example.com', 'password9');
INSERT INTO EMPLOYEES VALUES ('Olivia', 'Taylor', '333 Meadow Dr', 'Greenville', 98765, 8, '555-6666', 'olivia@example.com', 'password10');

-- Inserting data into PARENT table
INSERT INTO PARENT VALUES ('parent1@example.com', 'Alice', 'Doe', 'password3', '555-1111');
INSERT INTO PARENT VALUES ('parent2@example.com', 'Bob', 'Smith', 'password4', '555-2222');
INSERT INTO PARENT VALUES ('parent3@example.com', 'Charlie', 'Wilson', 'password7', '555-3333');
INSERT INTO PARENT VALUES ('parent4@example.com', 'Diana', 'Miller', 'password8', '555-4444');
INSERT INTO PARENT VALUES ('parent5@example.com', 'Ethan', 'Davis', 'password11', '555-5555');
INSERT INTO PARENT VALUES ('parent6@example.com', 'Sophia', 'Anderson', 'password12', '555-6666');

-- Inserting data into CHILD table
INSERT INTO CHILD VALUES (1, 'Child1', 'Doe');
INSERT INTO CHILD VALUES (2, 'Child2', 'Smith');
INSERT INTO CHILD VALUES (3, 'Child3', 'Johnson');
INSERT INTO CHILD VALUES (4, 'Child4', 'Williams');
INSERT INTO CHILD VALUES (5, 'Child5', 'Brown');
INSERT INTO CHILD VALUES (6, 'Child6', 'Taylor');

-- Inserting data into PARENT_CHILDREN table
INSERT INTO PARENT_CHILDREN VALUES ('parent1@example.com', 1);
INSERT INTO PARENT_CHILDREN VALUES ('parent2@example.com', 2);
INSERT INTO PARENT_CHILDREN VALUES ('parent3@example.com', 3);
INSERT INTO PARENT_CHILDREN VALUES ('parent4@example.com', 4);
INSERT INTO PARENT_CHILDREN VALUES ('parent5@example.com', 5);
INSERT INTO PARENT_CHILDREN VALUES ('parent6@example.com', 6);

-- Inserting data into CAMP_LOCATIONS table
INSERT INTO CAMP_LOCATIONS VALUES (1, 'Lakeview Campground', 'Lake City', 'CA', 98765, '789 Lakeview Rd');
INSERT INTO CAMP_LOCATIONS VALUES (2, 'Mountain Retreat', 'Mountainville', 'CO', 54321, '123 Mountain Rd');
INSERT INTO CAMP_LOCATIONS VALUES (3, 'Beachside Retreat', 'Seaville', 'FL', 54321, '456 Beach Rd');
INSERT INTO CAMP_LOCATIONS VALUES (4, 'Desert Oasis Camp', 'Sandtown', 'AZ', 98765, '789 Dune Rd');
INSERT INTO CAMP_LOCATIONS VALUES (5, 'Mountain Peak Camp', 'Summitville', 'CO', 87654, '789 Summit Rd');
INSERT INTO CAMP_LOCATIONS VALUES (6, 'Riverbank Retreat', 'Rivertown', 'NY', 23456, '123 River Rd');

-- Inserting data into CAMP table
INSERT INTO CAMP VALUES (1, 'Summer Adventure Camp', 3, 1, 100, '2023-06-15', '2023-08-15');
INSERT INTO CAMP VALUES (2, 'Nature Explorer Camp', 2, 2, 75, '2023-07-01', '2023-07-15');
INSERT INTO CAMP VALUES (3, 'Water Adventure Camp', 4, 3, 80, '2023-07-10', '2023-07-25');
INSERT INTO CAMP VALUES (4, 'Desert Explorer Camp', 5, 4, 60, '2023-08-01', '2023-08-15');
INSERT INTO CAMP VALUES (5, 'Mountain Challenge Camp', 8, 5, 70, '2023-07-05', '2023-07-20');
INSERT INTO CAMP VALUES (6, 'River Adventure Camp', 9, 6, 50, '2023-08-05', '2023-08-20');

-- Inserting data into CAMP_CAMPERS table
INSERT INTO CAMP_CAMPERS VALUES (1, 1);
INSERT INTO CAMP_CAMPERS VALUES (2, 1);
INSERT INTO CAMP_CAMPERS VALUES (1, 2);
INSERT INTO CAMP_CAMPERS VALUES (3, 3);
INSERT INTO CAMP_CAMPERS VALUES (4, 4);
INSERT INTO CAMP_CAMPERS VALUES (5, 5);
INSERT INTO CAMP_CAMPERS VALUES (6, 6);

-- Inserting data into CAMP_STAFF table
INSERT INTO CAMP_STAFF VALUES ('john@example.com', 1);
INSERT INTO CAMP_STAFF VALUES ('jane@example.com', 2);
INSERT INTO CAMP_STAFF VALUES ('michael@example.com', 3);
INSERT INTO CAMP_STAFF VALUES ('emily@example.com', 4);
INSERT INTO CAMP_STAFF VALUES ('christopher@example.com', 5);
INSERT INTO CAMP_STAFF VALUES ('olivia@example.com', 6);
INSERT INTO CAMP_STAFF VALUES ('christopher@example.com', 7);
INSERT INTO CAMP_STAFF VALUES ('olivia@example.com', 8);
INSERT INTO CAMP_STAFF VALUES ('christopher@example.com', 5);
INSERT INTO CAMP_STAFF VALUES ('olivia@example.com', 6);
