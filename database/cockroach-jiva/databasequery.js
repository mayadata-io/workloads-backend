const express = require('express');

const router = express();
const pg = require('pg');
const mysqlQuery = require('./dbconnection');

// create table for person

const createMaya = 'create table if not exists person(rNumber INT, name STRING,email STRING, age INT)';
mysqlQuery.query(createMaya, (err, results, fields) => {
    if (err) {
        console.log(err.message);
    }
});


router.post('/save', (req, res) => {
    const sql = 'INSERT INTO person (rNumber, name, email, age) VALUES ';
    let values = '';
    for (i = 0; i < req.body.length; i++) {
        // values.push([req.body[i].rNumber, req.body[i].name, req.body[i].email, req.body[i].age]);
        if (i == req.body.length - 1) {
            values += `( ${req.body[i].rNumber},' ${req.body[i].name}', '${req.body[i].email}', ${req.body[i].age})`;
        } else {
            values += `( ${req.body[i].rNumber}, '${req.body[i].name}', '${req.body[i].email}' , ${req.body[i].age}),`;
        }
    }
    // console.log(values);
    mysqlQuery.query(sql + values, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: 'Data is saved' });
        }
        console.log('The solution is: ', results);
        res.status(200).json({ status: 200, message: 'Data is saved' });
    });
});


// get 100 person details whose rNumber = id
router.get('/read/:id', (req, res) => {
    mysqlQuery.query(`SELECT * FROM person where rNumber =${req.params.id}`, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: 'Data is read' });
        }
        console.log('The solution is: ', results);
        res.status(200).json({ status: 200, message: 'Data is read' });
    });
});

// sample apli to test node server
router.get('/users/ali', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error);
        console.log('this is user api');
        res.status(200).json({ name: 'ali', age: '20' });
    });
});

module.exports = router;
