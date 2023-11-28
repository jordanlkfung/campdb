const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');//using connection pool
//connections remaing open

require('dotenv').config()
const db = mysql.createPool({
    connectionLimit : 10,
    host : process.env.DBHOST,
    user : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME
});

app.use(bodyParser.urlencoded({extended:false}));//used for parsing url encoded data from form. ex url shows form submission with ?
app.use(bodyParser.json());//used for parsing json data that comes in
app.use(cors());

app.post('/signin', (req, res) => {//allows access to request that is coming to the server or response that we are sending out
    const username = req.body.username;//parses using body parser package
    const password = req.body.password;
    db.query("SELECT first_name, last_name FROM EMPLOYEES WHERE id = ? AND password = ?",[username, password])
    db.query("INSERT INTO EMPLOYEES (id,login) VALUES (?, ?)", [username,password], (err, result) =>{//use quesiton mark to escape query values to prevent from injection attacks
        if(err)
            console.log(err);
        else{
            res.send({username:username});
        }
    })
})

app.get('/viewCampers',(req,res) =>{
    const camp = req.query.campID;
    db.query("SELECT CHILD.first_name, CHILD.last_name FROM CHILD INNER JOIN CAMP_CAMPERS ON CHILD.id=CAMP_CAMPERS.camper_id INNER JOIN CAMP ON CAMP_CAMPERS.camp_id=?",[camp],(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.send(result);
            console.log(result);
        }
    })
})
app.get('/viewMyEmployees', (req,res) =>{
    const supervisorId = req.query.id;
    db.query("SELECT EMPLOYEES.first_name, EMPLOYEES.last_name, EMPLOYEES.email, EMPLOYEES.phone FROM EMPLOYEES INNER JOIN CAMP_STAFF ON EMPLOYEES.id=CAMP_STAFF.emp.id INNER JOIN CAMP ON CAMP_STAFF.camp_id=CAMP.id WHERE camp_boss=?",[supervisorId],(err,result)=>{
        if(err)
            console.log(err)
        else {
            res.send(result)
        }
    })
})

app.get('/viewChildCamps',(req,res)=>{
    const parentId = req.body;
    db.query("SELECT CHILD.first_name, CHILD.last_name, CAMP.name, CAMP.start_date, CAMP.end_date FROM CHILD INNER JOIN PARENT_CHILDREN ON CHILD.id=PARENT_CHILDREN.child_id INNER JOIN PARENT ON PARENT_CHILDREN.parent_id=PARENT.id INNER JOIN CAMP_CAMPERS ON CHILD.id=CAMP_CAMPERS.child_id INNER JOIN CAMP ON CAMP_CAMPERS.camp_id=CAMPS.id WHERE PARENT.id=?",[parentId],(err,result)=>{
        if(err)
            console.log(err)
        else   
            res.send(result)
    })
})
app.get('/campsAssignedTo',(req,res)=>{
    const empId = req.query.empId;
    console.log('2323')
    db.query("SELECT CAMP.id, CAMP.camp_name, CAMP.start_date, CAMP.end_date FROM CAMP INNER JOIN CAMP_STAFF ON CAMP.id=CAMP_STAFF.camp_id WHERE CAMP_STAFF.emp_id=?",[empId],(err,result)=>{
        if(err)
            console.log(err)
        else{
            res.send(result)
            console.log(result)
        }
    })
})
app.listen(8080, () => {
    console.log('server listening on port 8080');
});//starts server and has it listen for requests that come in