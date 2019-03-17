const mysqlQuery = require('./dbconnection');
const express = require('express');
const router = express();

//create table for person

let createMaya = `create table if not exists person(
    rNumber INT, name VARCHAR(255),email VARCHAR(255), age INT
)`;
mysqlQuery.query(createMaya, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }else{
        console.log("table is create in percona-cstor")
    }
});

// save 100 person details
router.post('/save', (req, res) => {
    var sql = "INSERT INTO person (rNumber, name, email, age) VALUES ?";
    var values = [];
    for (i = 0; i < req.body.length; i++) {
        values.push([req.body[i].rNumber, req.body[i].name, req.body[i].email, req.body[i].age]);
    }
    mysqlQuery.query(sql, [values], function (error, results, fields) {
        if (error) {
            console.log('percona-cstor insert error: ' +error  );
            res.status(500).json({ status: 500, message: "Data is not saved" });
        }
        else{
            console.log('percona-cstor The solution is: ', results);
            res.status(200).json({ status: 200, message: "Data is saved" });
        }
        
    });

});

// get 100 person details whose rNumber = id
router.get('/read/:id', (req, res) => {
    mysqlQuery.query('SELECT * FROM person where rNumber =' + req.params.id, function (error, results, fields) {
        if (error) {
            console.log('percona-cstor insert error: ' +error  );
            res.status(500).json({ status: 500, message: "Data is not Read" });
        }
        else{
            console.log('percona-cstor The solution is: ', results);
            res.status(200).json({ status: 200, message: "Data is Read" });
        }
});
});


module.exports = router;
