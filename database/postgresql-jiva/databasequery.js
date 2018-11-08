const pgsql = require('./dbconnection');
const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    const pquery = 'INSERT INTO person (rNumber, name, email, age) VALUES ';
    const values = "";
    for (i = 0; i < req.body.length; i++) {
        if (i == req.body.length-1) {
            values = values + `( ${req.body[i].rNumber},' ${req.body[i].name}', '${req.body[i].email}', ${req.body[i].age})`
        }
        else {
            values = values + `( ${req.body[i].rNumber}, '${req.body[i].name}', '${req.body[i].email}' , ${req.body[i].age}),`
        }
    }
    pgsql.query(pquery+values,(error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.status(200).json({ status: 200, message: "Data is saved" });
    });
});

router.get('/read/:id', (req, res) => {
    pgsql.query('SELECT * FROM person where rNumber =' + req.params.id,(error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.status(200).json({ status: 200, message: "Data is read" });
    });
});


module.exports = router;
