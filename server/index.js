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
    console.log(req.body)
    const id = req.body.username;//parses using body parser package
    const password = req.body.password;
    console.log(id)
    console.log(password)
    db.query("SELECT first_name, last_name, email FROM EMPLOYEES WHERE email = ? AND password = ?",[id, password], (err,result)=>{
        if(err)
            console.log(err)
        else{
            res.send(result)
            console.log(result)
        }
    })
})
app.post('/ParentSignIn',(req,res)=>{
    console.log(req)
    const id=req.body.username
    const password=req.body.password
    db.query("SELECT first_name, last_name, email FROM PARENT WHERE email = ? AND password = ?",[id,password], (err,result)=>{
        if(err)
            console.log(err)
        else{
            res.send(result)
            console.log(result)
        }
    })
})

app.get('/viewCampers',(req,res) =>{
    const camp = req.query.campID;
    db.query("SELECT DISTINCT CHILD.first_name, CHILD.last_name, PARENT.first_name AS parent_first_name, PARENT.last_name AS parent_last_name, PARENT.phone FROM CHILD INNER JOIN CAMP_CAMPERS ON CHILD.id=CAMP_CAMPERS.camper_id INNER JOIN CAMP ON CAMP_CAMPERS.camp_id=? INNER JOIN PARENT_CHILDREN ON CHILD.id=PARENT_CHILDREN.child_id INNER JOIN PARENT on PARENT_CHILDREN.parent_email=PARENT.email ORDER BY CHILD.last_name ASC",[camp],(err,result)=>{
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
    db.query("SELECT EMPLOYEES.first_name, EMPLOYEES.last_name, EMPLOYEES.email, EMPLOYEES.phone, CAMP.id, CAMP.camp_name FROM EMPLOYEES INNER JOIN CAMP_STAFF ON EMPLOYEES.email=CAMP_STAFF.emp_email INNER JOIN CAMP ON CAMP_STAFF.camp_id=CAMP.id WHERE camp_boss=?",[supervisorId],(err,result)=>{
        if(err)
            console.log(err)
        else {
            res.send(result)
        }
    })
})

app.get('/viewChildCamps',(req,res)=>{
    const parentId = req.query.id;
    console.log(req)
    db.query("SELECT CHILD.first_name, CHILD.last_name, CAMP.camp_name, CAMP.start_date, CAMP.end_date FROM CHILD INNER JOIN PARENT_CHILDREN ON CHILD.id=PARENT_CHILDREN.child_id INNER JOIN PARENT ON PARENT_CHILDREN.parent_email=PARENT.email INNER JOIN CAMP_CAMPERS ON CHILD.id=CAMP_CAMPERS.camper_id INNER JOIN CAMP ON CAMP_CAMPERS.camp_id=CAMP.id WHERE PARENT.email=?",[parentId],(err,result)=>{
        if(err)
            console.log(err)
        else   
            res.send(result)
    })
})
app.get('/campsAssignedTo',(req,res)=>{
    const empId = req.query.empId;
    console.log(empId)
    db.query("SELECT CAMP.id, CAMP.camp_name, CAMP.start_date, CAMP.end_date FROM CAMP INNER JOIN CAMP_STAFF ON CAMP.id=CAMP_STAFF.camp_id WHERE CAMP_STAFF.emp_email=?",[empId],(err,result)=>{
        if(err)
            console.log(err)
        else{
            res.send(result)
            console.log(result)
        }
    })
})
app.get('/getCamps', (req,res)=>{
    db.query("SELECT CAMP.camp_name,CAMP_LOCATIONS.address, CAMP_LOCATIONS.state, CAMP_LOCATIONS.zip, CAMP_LOCATIONS.city, CAMP.max_capacity, CAMP.start_date, CAMP.end_date FROM CAMP INNER JOIN CAMP_LOCATIONS ON CAMP.camp_location=CAMP_LOCATIONS.location_id",(err,result)=>{
    if(err)
        console.log(err)
    else{
        res.send(result)
    }
    })
})
app.post('/addChildToCamp', (req,res)=>{
    const childID = req.body.childID
    const campID = req.body.campID
    db.query("INSERT INTO CAMP_CAMPERS (?,?)"[childID,campID],(err,result)=>{
    if(err)
        console.log(err)
    else{
        res.send(result)
    }
})
})
app.get('/getChildren', (req,res)=>{
    const parentID = req.query.parendID
    db.query("SELECT CHILD.first_name, CHILD.last_name INNER JOIN PARENT_CHILDREN ON CHILD.id=PARENT_CHILDREN.child_id WHERE PARENT_CHILDREN.parent_email =?",[parentID], (err,result)=>{
        if(err)
            console.log(err)
        else
            res.send(result)
    })
})
app.get('/allEmployees',(req,res)=>{
    db.query("SELECT EMPLOYEES.first_name, EMPLOYEES.last_name, EMPLOYEES.phone, EMPLOYEES.email, EMPLOYEES.position_id FROM EMPLOYEES",(err,result)=>{
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