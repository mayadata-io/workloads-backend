const mysqlQuery = require('./dbconnection');
const express = require('express');
const router = express();
const pg = require('pg');

let createMaya = `create table if not exists person(rNumber INT, name STRING,email STRING, age INT)`;
mysqlQuery.query(createMaya, function (err, results, fields) {
    if (err) {
        console.log('table creating error '+ err.message);
    }
    else{console.log(' table created..! ')}
});

router.post('/save', (req, res) => {
    var sql = "INSERT INTO person (rNumber, name, email, age) VALUES ";
    var values = "";
    for (i = 0; i < req.body.length; i++) {
        // values.push([req.body[i].rNumber, req.body[i].name, req.body[i].email, req.body[i].age]);
        if (i == req.body.length-1) {
            values = values + `( ${req.body[i].rNumber},' ${req.body[i].name}', '${req.body[i].email}', ${req.body[i].age})`
        }
        else {
            values = values + `( ${req.body[i].rNumber}, '${req.body[i].name}', '${req.body[i].email}' , ${req.body[i].age}),`
        }
    }
    //console.log(values);
    mysqlQuery.query(sql+values, function (error, results, fields) {
        if (error){ 
            console.log('this is cockroadb erro :'+ error)	    
            res.status(500).json({ status: 500, message: "Data is saved" });	 
        }else{	       
            console.log('this is cockroachdb result after save: ', results);	
            res.status(200).json({ status: 200, message: "Data is saved" });	
        }
    });
});

router.get('/read/:id', (req, res) => {
    mysqlQuery.query('SELECT * FROM person where rNumber =' + req.params.id, function (error, results, fields) {
    if (error){ console.log('this is cockroadb erro :'+ error)
        res.status(500).json({ status: 500, message: "Data is read" });
    }else{
        console.log('this is cockroachdb result after save: ', results);
        res.status(200).json({ status: 200, message: "Data is read" });
    }
    });
});




module.exports = router;